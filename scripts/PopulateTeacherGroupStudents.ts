import { randomBytes } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const { nextTeacherFixtureName } = (await import(
  new URL("./TeacherFixtureNames.ts", import.meta.url).href
)) as typeof import("./TeacherFixtureNames");
const { nextTeacherFixtureEmail } = (await import(
  new URL("./TeacherFixtureEmails.ts", import.meta.url).href
)) as typeof import("./TeacherFixtureEmails");

type GroupTarget = { current: number; departed: number; paused: number };
type Group = { id: string; name: string; slug: string };
type Student = { displayName: string; email: string | null; id: string };
type Member = {
  displayName: string;
  email: string | null;
  endedAt: string | null;
  membershipId: string;
  rosterStatus: "ACTIVE" | "PAUSED" | "DEBTOR" | "DEPARTED";
  studentId: string;
};
type Connection<T> = {
  edges: Array<{ node: T }>;
  pageInfo: { endCursor: string | null; hasNextPage: boolean };
};

// Fictional local-development targets only. Application pages always read GraphQL.
const targets = new Map<string, GroupTarget>([
  ["demo-ibrohim-cefr-a2-path", { current: 15, departed: 1, paused: 1 }],
  ["demo-ibrohim-cefr-b1-quest", { current: 11, departed: 0, paused: 0 }],
  ["demo-ibrohim-cefr-b2-elevate", { current: 12, departed: 1, paused: 2 }],
  ["demo-ibrohim-cefr-c1-studio", { current: 15, departed: 0, paused: 0 }],
  ["demo-ibrohim-cefr-foundation", { current: 14, departed: 0, paused: 1 }],
  ["demo-ibrohim-general-english-conversation", { current: 10, departed: 1, paused: 0 }],
  ["demo-ibrohim-general-english-explorer", { current: 15, departed: 0, paused: 1 }],
  ["demo-ibrohim-general-english-starter", { current: 12, departed: 0, paused: 2 }],
  ["demo-ibrohim-ielts-bridge", { current: 15, departed: 1, paused: 1 }],
  ["demo-ibrohim-ielts-focus", { current: 13, departed: 1, paused: 0 }],
  ["demo-ibrohim-ielts-sprint", { current: 15, departed: 0, paused: 1 }],
  ["intermediate-036a0834", { current: 11, departed: 1, paused: 0 }],
  ["upper-intermediate-87ea6b6f", { current: 14, departed: 0, paused: 2 }],
]);

const apiUrl = process.env.BEST_FIXTURE_API_URL ?? "http://127.0.0.1:4199/graphql";
const mailpitUrl = process.env.BEST_FIXTURE_MAILPIT_URL ?? "http://127.0.0.1:8025";

function requireLoopback(value: string): void {
  const host = new URL(value).hostname;
  if (host !== "127.0.0.1" && host !== "localhost") {
    throw new Error("Fixture import is limited to loopback services.");
  }
}

function loadIgnoredEnvironment(file: string): void {
  try {
    for (const line of readFileSync(file, "utf8").split(/\r?\n/)) {
      const match = /^([A-Z][A-Z0-9_]*)=(.*)$/.exec(line);
      if (match && process.env[match[1]] === undefined) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
}

function required(key: string): string {
  const value = process.env[key]?.trim();
  if (!value) throw new Error(`Missing ${key} in ignored local environment.`);
  return value;
}

async function graphql<T>(
  query: string,
  variables: Record<string, unknown> = {},
  token?: string,
): Promise<T> {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  const result = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string; extensions?: { code?: string } }>;
  };
  if (!response.ok || !result.data || result.errors?.length) {
    const code = result.errors?.[0]?.extensions?.code ?? String(response.status);
    throw new Error(`GraphQL request failed (${code}).`);
  }
  return result.data;
}

async function mailIds(): Promise<Set<string>> {
  const response = await fetch(`${mailpitUrl}/api/v1/messages?limit=100`);
  if (!response.ok) throw new Error("Mailpit is unavailable.");
  const data = (await response.json()) as { messages?: Array<{ ID: string }> };
  return new Set(data.messages?.map((message) => message.ID) ?? []);
}

async function waitForCode(email: string, previousIds: Set<string>): Promise<string> {
  for (let attempt = 0; attempt < 40; attempt++) {
    const response = await fetch(`${mailpitUrl}/api/v1/messages?limit=100`);
    if (!response.ok) throw new Error("Mailpit is unavailable.");
    const data = (await response.json()) as {
      messages?: Array<{ ID: string; To: unknown }>;
    };
    const message = data.messages?.find(
      (item) =>
        !previousIds.has(item.ID) &&
        JSON.stringify(item.To).toLowerCase().includes(email.toLowerCase()),
    );
    if (message) {
      const detail = await fetch(`${mailpitUrl}/api/v1/message/${message.ID}`);
      if (!detail.ok) throw new Error("Mailpit message could not be read.");
      const body = (await detail.json()) as { Text?: string };
      const code = body.Text?.match(/\b\d{6}\b/)?.[0];
      if (!code) throw new Error("Login code not found in the local email.");
      return code;
    }
    await new Promise((done) => setTimeout(done, 500));
  }
  throw new Error("No fresh login code arrived in Mailpit.");
}

async function login(name: string, email: string, password: string, role: "ADMIN" | "TEACHER") {
  const previousIds = await mailIds();
  const challenge = await graphql<{ beginCredentialLogin: { challengeId: string } }>(
    "mutation Begin($input: BeginCredentialLoginInput!) { beginCredentialLogin(input: $input) { challengeId } }",
    { input: { name, email, password, expectedRole: role } },
  );
  const code = await waitForCode(email, previousIds);
  const verified = await graphql<{
    verifyCredentialLogin: {
      accessToken: string;
      refreshToken: string;
      user: { displayName: string; role: string };
    };
  }>(
    "mutation Verify($input: VerifyCredentialLoginInput!) { verifyCredentialLogin(input: $input) { accessToken refreshToken user { displayName role } } }",
    { input: { challengeId: challenge.beginCredentialLogin.challengeId, code } },
  );
  const session = verified.verifyCredentialLogin;
  if (session.user.role !== role) throw new Error(`Unexpected ${role} login role.`);
  return session;
}

async function pages<T>(query: string, field: string, token: string): Promise<T[]> {
  const result: T[] = [];
  let after: string | null = null;
  do {
    const data: Record<string, Connection<T>> = await graphql<Record<string, Connection<T>>>(
      query,
      { after },
      token,
    );
    const page: Connection<T> = data[field];
    if (!page) throw new Error(`Missing ${field} connection.`);
    result.push(...page.edges.map((edge) => edge.node));
    after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null;
    if (page.pageInfo.hasNextPage && !after) throw new Error("Invalid connection cursor.");
  } while (after);
  return result;
}

async function roster(groupId: string, token: string): Promise<Member[]> {
  const data = await graphql<{
    teacherGroupRoster: {
      edges: Array<{ node: Member }>;
      pageInfo: { hasNextPage: boolean };
    };
  }>(
    "query Roster($groupId: ID!) { teacherGroupRoster(groupId: $groupId, first: 100, includeEnded: true) { edges { node { displayName email endedAt membershipId rosterStatus studentId } } pageInfo { hasNextPage } } }",
    { groupId },
    token,
  );
  if (data.teacherGroupRoster.pageInfo.hasNextPage) {
    throw new Error("Roster exceeds the safe local fixture page size.");
  }
  return data.teacherGroupRoster.edges.map((edge) => edge.node);
}

async function main(): Promise<void> {
  const planned = [...targets.values()];
  if (
    planned.filter((target) => target.current === 15).length !== 5 ||
    planned.some((target) => target.current < 10 || target.current > 15)
  ) {
    throw new Error("Fixture targets must keep five full groups and all others at 10–14.");
  }
  if (process.argv.includes("--plan")) {
    for (const [slug, target] of targets) console.log(slug, target);
    return;
  }

  loadIgnoredEnvironment(resolve(process.cwd(), ".env.local"));
  loadIgnoredEnvironment(resolve(process.cwd(), "../best-server/.env"));
  if (process.env.NODE_ENV === "production")
    throw new Error("Fixtures are disabled in production.");
  requireLoopback(apiUrl);
  requireLoopback(mailpitUrl);
  const adminPassword = required("BOOTSTRAP_ADMIN_PASSWORD");
  const teacherPassword = required("BEST_FIXTURE_TEACHER_PASSWORD");
  const adminEmail = required("BOOTSTRAP_ADMIN_EMAIL");
  const adminName = required("BOOTSTRAP_ADMIN_NAME");
  const teacherEmail = process.env.BEST_FIXTURE_TEACHER_EMAIL ?? "ibrohim_gaffarov@gmail.com";
  const teacherName = process.env.BEST_FIXTURE_TEACHER_NAME ?? "Ibrohim";

  // Both authenticated roles must be available before any student is created.
  const [admin, teacher] = await Promise.all([
    login(adminName, adminEmail, adminPassword, "ADMIN"),
    login(teacherName, teacherEmail, teacherPassword, "TEACHER"),
  ]);
  try {
    if (teacher.user.displayName !== "Ibrohim") {
      throw new Error("Only the local Ibrohim Teacher fixture may be populated.");
    }
    const groups = await pages<Group>(
      "query Groups($after: String) { teacherGroups(first: 100, after: $after, status: ACTIVE) { edges { node { id name slug } } pageInfo { endCursor hasNextPage } } }",
      "teacherGroups",
      teacher.accessToken,
    );
    if (groups.length !== targets.size || groups.some((group) => !targets.has(group.slug))) {
      throw new Error("Teacher group inventory changed; review targets before importing.");
    }
    const originalRosters = new Map<string, Member[]>();
    for (const group of groups) {
      const members = await roster(group.id, teacher.accessToken);
      const target = targets.get(group.slug)!;
      if (members.filter((member) => !member.endedAt).length > target.current) {
        throw new Error(`Existing roster exceeds fixture target for ${group.name}.`);
      }
      originalRosters.set(group.slug, members);
    }
    const students = await pages<Student>(
      "query Students($after: String) { adminUsers(first: 100, after: $after, role: STUDENT) { edges { node { id displayName email } } pageInfo { endCursor hasNextPage } } }",
      "adminUsers",
      admin.accessToken,
    );
    const usedEmails = new Set(
      students.filter((student) => student.email).map((student) => student.email!.toLowerCase()),
    );
    const usedNames = new Set(
      students.map((student) => student.displayName.toLocaleLowerCase("uz")),
    );
    const sequence = { value: 0 };

    async function studentFor(): Promise<Student> {
      const displayName = nextTeacherFixtureName(usedNames, sequence);
      const email = nextTeacherFixtureEmail(displayName, usedEmails);
      const created = await graphql<{ adminProvisionUser: { user: Student } }>(
        "mutation Provision($input: AdminProvisionUserInput!) { adminProvisionUser(input: $input) { user { id displayName email } } }",
        {
          input: {
            displayName,
            email,
            password: randomBytes(24).toString("base64url"),
            role: "STUDENT",
          },
        },
        admin.accessToken,
      );
      const student = created.adminProvisionUser.user;
      return student;
    }

    for (const group of groups) {
      const target = targets.get(group.slug)!;
      const members = [...originalRosters.get(group.slug)!];
      while (members.filter((member) => member.endedAt).length < target.departed) {
        const student = await studentFor();
        let member = members.find((item) => item.studentId === student.id);
        if (!member) {
          const added = await graphql<{ addStudentToGroup: { membership: Member } }>(
            "mutation Add($input: AddStudentToGroupInput!) { addStudentToGroup(input: $input) { membership { membershipId studentId displayName email endedAt rosterStatus } } }",
            { input: { groupId: group.id, studentId: student.id } },
            teacher.accessToken,
          );
          member = added.addStudentToGroup.membership;
          members.push(member);
        }
        if (!member.endedAt) {
          await graphql(
            "mutation End($input: EndGroupMembershipInput!) { endGroupMembership(input: $input) { membership { membershipId endedAt } } }",
            {
              input: {
                membershipId: member.membershipId,
                reason: "Local fictional roster fixture departure.",
              },
            },
            teacher.accessToken,
          );
          member.endedAt = new Date().toISOString();
        }
      }

      while (members.filter((member) => !member.endedAt).length < target.current) {
        const student = await studentFor();
        if (members.some((member) => member.studentId === student.id)) continue;
        const added = await graphql<{ addStudentToGroup: { membership: Member } }>(
          "mutation Add($input: AddStudentToGroupInput!) { addStudentToGroup(input: $input) { membership { membershipId studentId displayName email endedAt rosterStatus } } }",
          { input: { groupId: group.id, studentId: student.id } },
          teacher.accessToken,
        );
        members.push(added.addStudentToGroup.membership);
      }

      const paused = members.filter(
        (member) => !member.endedAt && member.rosterStatus === "PAUSED",
      ).length;
      const toPause = members
        .filter((member) => !member.endedAt && member.rosterStatus === "ACTIVE")
        .slice(0, target.paused - paused);
      for (const member of toPause) {
        await graphql(
          "mutation Pause($input: SetGroupMembershipParticipationStatusInput!) { setGroupMembershipParticipationStatus(input: $input) { membership { membershipId rosterStatus } } }",
          {
            input: {
              membershipId: member.membershipId,
              status: "PAUSED",
              reason: "Local fictional roster fixture pause.",
            },
          },
          teacher.accessToken,
        );
      }

      const checked = await graphql<{
        teacherGroupRosterSummary: {
          active: number;
          currentTotal: number;
          debtors: number;
          departed: number;
          historicalTotal: number;
          paused: number;
        };
      }>(
        "query Summary($groupId: ID!) { teacherGroupRosterSummary(groupId: $groupId) { active currentTotal debtors departed historicalTotal paused } }",
        { groupId: group.id },
        teacher.accessToken,
      );
      const summary = checked.teacherGroupRosterSummary;
      if (
        summary.currentTotal !== target.current ||
        summary.departed < target.departed ||
        summary.paused < target.paused
      ) {
        throw new Error(`Roster verification failed for ${group.name}.`);
      }
      console.log(
        `${group.name}: ${summary.currentTotal}/15 current, ${summary.paused} paused, ${summary.debtors} debtors, ${summary.departed} departed.`,
      );
    }
  } finally {
    for (const session of [admin, teacher]) {
      await graphql(
        "mutation Revoke($input: RevokeCredentialSessionInput!) { revokeCredentialSession(input: $input) }",
        { input: { refreshToken: session.refreshToken } },
      ).catch(() => undefined);
    }
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Fixture import failed.");
  process.exitCode = 1;
});
