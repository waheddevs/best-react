import "server-only";

import { createHmac, randomUUID } from "node:crypto";

type SocialProvider = "apple" | "facebook" | "google";

type ExchangeIdentity = {
  displayName: string;
  email?: string | null;
  emailVerified: boolean;
  provider: SocialProvider;
  providerAccountId: string;
};

export type BestApiToken = {
  accessToken: string;
  expiresAt: number;
};

function encodeJson(value: Readonly<Record<string, unknown>>): string {
  return Buffer.from(JSON.stringify(value), "utf8").toString("base64url");
}

function createIdentityAssertion(identity: ExchangeIdentity): string | undefined {
  const secret = process.env.AUTH_EXCHANGE_SECRET;
  if (!secret || secret.length < 32) return undefined;

  const issuedAt = Math.floor(Date.now() / 1000);
  const header = encodeJson({ alg: "HS256", typ: "JWT" });
  const payload = encodeJson({
    aud: process.env.AUTH_EXCHANGE_AUDIENCE ?? "best-api",
    email: identity.email ?? undefined,
    emailVerified: identity.emailVerified,
    exp: issuedAt + 45,
    iat: issuedAt,
    iss: process.env.AUTH_EXCHANGE_ISSUER ?? "best-web",
    jti: randomUUID(),
    name: identity.displayName,
    provider: identity.provider,
    sub: identity.providerAccountId,
    tokenType: "identity_exchange",
  });
  const signingInput = `${header}.${payload}`;
  const signature = createHmac("sha256", secret).update(signingInput).digest("base64url");
  return `${signingInput}.${signature}`;
}

function parseExchangeResponse(
  value: unknown,
): { accessToken: string; expiresInSeconds: number } | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  const record = value as Record<string, unknown>;
  return typeof record.accessToken === "string" && typeof record.expiresInSeconds === "number"
    ? { accessToken: record.accessToken, expiresInSeconds: record.expiresInSeconds }
    : undefined;
}

export async function exchangeSocialIdentity(
  identity: ExchangeIdentity,
): Promise<BestApiToken | undefined> {
  const apiUrl = process.env.BEST_API_INTERNAL_URL;
  const assertion = createIdentityAssertion(identity);
  if (!apiUrl || !assertion) return undefined;

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/internal/auth/exchange`, {
      body: JSON.stringify({ assertion }),
      cache: "no-store",
      headers: { "content-type": "application/json" },
      method: "POST",
    });
    if (!response.ok) return undefined;
    const result = parseExchangeResponse(await response.json());
    return result
      ? { accessToken: result.accessToken, expiresAt: Date.now() + result.expiresInSeconds * 1000 }
      : undefined;
  } catch {
    return undefined;
  }
}
