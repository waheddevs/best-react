import { createRequire } from "node:module";
import { resolve } from "node:path";

const { nextTeacherFixtureName } = (await import(
  new URL("./TeacherFixtureNames.ts", import.meta.url).href
)) as typeof import("./TeacherFixtureNames");

type Student = { displayName: string; email: string | null; id: string };
type UserWriter = {
  user: {
    updateMany(input: {
      data: { displayName: string };
      where: { displayName: string; email: string; id: string };
    }): Promise<{ count: number }>;
  };
};
type Database = UserWriter & {
  user: UserWriter["user"] & {
    findMany(input: {
      select: { displayName: true; email: true; id: true };
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
const backendRoot = resolve(process.cwd(), "../best-server");
const backendRequire = createRequire(resolve(backendRoot, "package.json"));

function requireLocalDatabase(): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Fixture name repair is disabled in production.");
  }
  const host = process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).hostname
    : process.env.POSTGRES_HOST;
  if (host !== "127.0.0.1" && host !== "localhost") {
    throw new Error("Fixture name repair is limited to a loopback PostgreSQL database.");
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
      select: { displayName: true, email: true, id: true },
      where: { role: backend.UserRole.STUDENT },
    });
    const fixtures = students
      .filter((student): student is Student & { email: string } =>
        fixtureEmailPattern.test(student.email ?? ""),
      )
      .sort((left, right) => left.email.localeCompare(right.email));
    const usedNames = new Set(
      students
        .filter((student) => !fixtureEmailPattern.test(student.email ?? ""))
        .map((student) => student.displayName.toLocaleLowerCase("uz")),
    );
    const sequence = { value: 0 };
    const proposed = fixtures.map((student) => ({
      ...student,
      nextName: nextTeacherFixtureName(usedNames, sequence),
    }));
    const changes = proposed.filter((student) => student.displayName !== student.nextName);

    console.log(
      JSON.stringify({
        fixtureStudents: fixtures.length,
        currentUniqueSurnames: new Set(
          fixtures.map((student) => student.displayName.split(" ").at(-1)),
        ).size,
        newUniqueSurnames: new Set(proposed.map((student) => student.nextName.split(" ").at(-1)))
          .size,
        namesToUpdate: changes.length,
        preview: changes.slice(0, 8).map((student) => ({
          before: student.displayName,
          after: student.nextName,
        })),
      }),
    );

    if (!process.argv.includes("--apply")) {
      console.log("Dry run only. Pass --apply to update these local fixture accounts.");
      return;
    }
    if (fixtures.length === 0) throw new Error("No matching fixture students were found.");

    await database.$transaction(
      async (transaction) => {
        for (const student of changes) {
          const result = await transaction.user.updateMany({
            data: { displayName: student.nextName },
            where: {
              displayName: student.displayName,
              email: student.email,
              id: student.id,
            },
          });
          if (result.count !== 1) {
            throw new Error(
              "A fixture student changed during repair; all updates were rolled back.",
            );
          }
        }
      },
      { timeout: 120_000 },
    );
    const verified = await database.user.findMany({
      select: { displayName: true, email: true, id: true },
      where: { role: backend.UserRole.STUDENT },
    });
    const byId = new Map(verified.map((student) => [student.id, student]));
    if (changes.some((student) => byId.get(student.id)?.displayName !== student.nextName)) {
      throw new Error("Fixture name verification failed after the database update.");
    }
    console.log(`Updated and verified ${changes.length} fictional student names.`);
  } finally {
    await database.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Fixture name repair failed.");
  process.exitCode = 1;
});
