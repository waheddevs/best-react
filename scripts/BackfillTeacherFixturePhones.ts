import { randomInt } from "node:crypto";
import { createRequire } from "node:module";
import { resolve } from "node:path";

type Student = {
  email: string | null;
  groupMemberships: Array<{ id: string }>;
  id: string;
  phone: string | null;
};
type UserWriter = {
  user: {
    updateMany(input: {
      data: { phone: string };
      where: { email: string; id: string; phone: null; role: string };
    }): Promise<{ count: number }>;
  };
};
type Database = UserWriter & {
  user: UserWriter["user"] & {
    findMany(input: {
      select: {
        email: true;
        groupMemberships: { select: { id: true } };
        id: true;
        phone: true;
      };
      where: { role: string };
    }): Promise<Student[]>;
  };
  $disconnect(): Promise<void>;
  $transaction<T>(
    action: (transaction: UserWriter) => Promise<T>,
    options: { timeout: number },
  ): Promise<T>;
};

const fixtureEmailPattern = /^best-fixture-[a-z0-9-]+-(?:current|departed)-\d{2}@example\.com$/;
const reservedEmailPattern = /@(?:example\.(?:com|net|org)|[a-z0-9.-]+\.example)$/i;
const backendRoot = resolve(process.cwd(), "../best-server");
const backendRequire = createRequire(resolve(backendRoot, "package.json"));

function requireLocalDatabase(): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Fixture phone backfill is disabled in production.");
  }
  const host = process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).hostname
    : process.env.POSTGRES_HOST;
  if (host !== "127.0.0.1" && host !== "localhost") {
    throw new Error("Fixture phone backfill is limited to a loopback PostgreSQL database.");
  }
}

async function main(): Promise<void> {
  requireLocalDatabase();
  const backend = backendRequire("./packages/database/dist/src/index.js") as {
    createDatabaseClient: () => Database;
    UserRole: { STUDENT: string };
  };
  const database = backend.createDatabaseClient();
  try {
    const students = await database.user.findMany({
      select: { email: true, groupMemberships: { select: { id: true } }, id: true, phone: true },
      where: { role: backend.UserRole.STUDENT },
    });
    const isReservedFixture = (student: Student): student is Student & { email: string } =>
      fixtureEmailPattern.test(student.email ?? "") ||
      (student.groupMemberships.length > 0 && reservedEmailPattern.test(student.email ?? ""));
    const fixtures = students.filter(isReservedFixture);
    const missing = fixtures.filter((student) => !student.phone);
    console.log(
      JSON.stringify({
        students: students.length,
        fixtureStudents: fixtures.length,
        fixtureMissingPhone: missing.length,
        fixtureMissingEmail: fixtures.filter((student) => !student.email).length,
        otherStudentsMissingPhone: students.filter(
          (student) => !isReservedFixture(student) && !student.phone,
        ).length,
        otherGroupStudentsMissingPhone: students.filter(
          (student) =>
            !isReservedFixture(student) && !student.phone && student.groupMemberships.length > 0,
        ).length,
      }),
    );
    if (!process.argv.includes("--apply") || missing.length === 0) return;

    const usedPhones = new Set(students.map((student) => student.phone).filter(Boolean));
    const updates = missing.map((student) => {
      let phone: string;
      do {
        // Fictional +998 00 prefix for local-development fixtures only.
        phone = `+99800${String(randomInt(0, 10_000_000)).padStart(7, "0")}`;
      } while (usedPhones.has(phone));
      usedPhones.add(phone);
      return { student, phone };
    });
    await database.$transaction(
      async (transaction) => {
        for (const { student, phone } of updates) {
          const result = await transaction.user.updateMany({
            data: { phone },
            where: {
              email: student.email,
              id: student.id,
              phone: null,
              role: backend.UserRole.STUDENT,
            },
          });
          if (result.count !== 1) throw new Error("Fixture student changed during backfill.");
        }
      },
      { timeout: 30_000 },
    );
    console.log(JSON.stringify({ fixturePhonesUpdated: updates.length }));
  } finally {
    await database.$disconnect();
  }
}

void main();
