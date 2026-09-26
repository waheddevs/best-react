import { createRequire } from "node:module";
import { resolve } from "node:path";

const { nextTeacherFixtureEmail } = (await import(
  new URL("./TeacherFixtureEmails.ts", import.meta.url).href
)) as typeof import("./TeacherFixtureEmails");

type User = {
  displayName: string;
  email: string | null;
  groupMemberships: Array<{ id: string }>;
  id: string;
  role: string;
};
type UserWriter = {
  user: {
    updateMany(input: {
      data: { email: string };
      where: { email: string; id: string; role: string };
    }): Promise<{ count: number }>;
  };
};
type Database = UserWriter & {
  user: UserWriter["user"] & {
    findMany(input: {
      select: {
        displayName: true;
        email: true;
        groupMemberships: { select: { id: true } };
        id: true;
        role: true;
      };
    }): Promise<User[]>;
  };
  $disconnect(): Promise<void>;
  $transaction<T>(
    action: (transaction: UserWriter) => Promise<T>,
    options: { timeout: number },
  ): Promise<T>;
};

const legacyFixtureEmail = /^best-fixture-[a-z0-9-]+-(?:current|departed)-\d{2}@example\.com$/;
const reservedEmail = /@(?:example\.(?:com|net|org)|[a-z0-9.-]+\.example)$/i;
const backendRoot = resolve(process.cwd(), "../best-server");
const backendRequire = createRequire(resolve(backendRoot, "package.json"));
const userSelection = {
  displayName: true,
  email: true,
  groupMemberships: { select: { id: true } },
  id: true,
  role: true,
} as const;

function requireLocalDatabase(): void {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Fixture email repair is disabled in production.");
  }
  const host = process.env.DATABASE_URL
    ? new URL(process.env.DATABASE_URL).hostname
    : process.env.POSTGRES_HOST;
  if (host !== "127.0.0.1" && host !== "localhost") {
    throw new Error("Fixture email repair is limited to a loopback PostgreSQL database.");
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
    const users = await database.user.findMany({ select: userSelection });
    const fixtures = users
      .filter(
        (user): user is User & { email: string } =>
          user.role === backend.UserRole.STUDENT &&
          (legacyFixtureEmail.test(user.email ?? "") ||
            (user.groupMemberships.length > 0 && reservedEmail.test(user.email ?? ""))),
      )
      .sort((left, right) => left.id.localeCompare(right.id));
    const fixtureIds = new Set(fixtures.map((user) => user.id));
    const usedEmails = new Set(
      users
        .filter((user) => !fixtureIds.has(user.id))
        .map((user) => user.email?.toLowerCase())
        .filter((email): email is string => Boolean(email)),
    );
    const changes = fixtures
      .map((user) => ({
        ...user,
        nextEmail: nextTeacherFixtureEmail(user.displayName, usedEmails),
      }))
      .filter((user) => user.email !== user.nextEmail);

    const originalOwner = new Map(users.filter((user) => user.email).map((user) => [user.email, user.id]));
    for (const user of changes) {
      const owner = originalOwner.get(user.nextEmail);
      if (owner && owner !== user.id) {
        throw new Error("A target email is currently held by another user; review before applying.");
      }
    }

    console.log(
      JSON.stringify({
        fixtureStudents: fixtures.length,
        emailsToUpdate: changes.length,
        sample: changes.slice(0, 5).map((user) => ({ name: user.displayName, email: user.nextEmail })),
      }),
    );
    if (!process.argv.includes("--apply")) {
      console.log("Dry run only. Pass --apply to update these local fixture accounts.");
      return;
    }
    if (fixtures.length === 0) throw new Error("No matching fixture students were found.");

    await database.$transaction(
      async (transaction) => {
        for (const user of changes) {
          const result = await transaction.user.updateMany({
            data: { email: user.nextEmail },
            where: { email: user.email, id: user.id, role: backend.UserRole.STUDENT },
          });
          if (result.count !== 1) throw new Error("A fixture changed; all email updates were rolled back.");
        }
      },
      { timeout: 120_000 },
    );
    const verified = await database.user.findMany({ select: userSelection });
    const byId = new Map(verified.map((user) => [user.id, user.email]));
    if (changes.some((user) => byId.get(user.id) !== user.nextEmail)) {
      throw new Error("Fixture email verification failed after the database update.");
    }
    console.log(`Updated and verified ${changes.length} fictional student emails.`);
  } finally {
    await database.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Fixture email repair failed.");
  process.exitCode = 1;
});
