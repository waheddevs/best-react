import "server-only";

import {
  ProfileAvatarDownloadIntentsDocument,
  type ProfileAvatarDownloadIntentsMutation,
} from "@/gql/graphql";
import { executeApolloMutation } from "@/lib/apollo/ApolloServerClient";

const avatarBatchSize = 100;

export async function profileAvatarUrlsFor(
  accessToken: string,
  userIds: readonly string[],
): Promise<Map<string, string>> {
  const uniqueIds = [...new Set(userIds)];
  const urls = new Map<string, string>();

  for (let index = 0; index < uniqueIds.length; index += avatarBatchSize) {
    const data = await executeApolloMutation<
      ProfileAvatarDownloadIntentsMutation,
      { userIds: string[] }
    >(
      ProfileAvatarDownloadIntentsDocument,
      { userIds: uniqueIds.slice(index, index + avatarBatchSize) },
      { accessToken, cache: "no-store" },
    );
    for (const intent of data.profileAvatarDownloadIntents) {
      urls.set(intent.userId, intent.url);
    }
  }

  return urls;
}
