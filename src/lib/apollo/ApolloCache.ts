import { InMemoryCache } from "@apollo/client-integration-nextjs";
import { relayStylePagination } from "@apollo/client/utilities";

export function createApolloCache(): InMemoryCache {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          myNotifications: relayStylePagination(),
          teacherGroupLessons: relayStylePagination(["groupId"]),
          teacherGroupRoster: relayStylePagination(["groupId", "includeEnded"]),
          teacherGroups: relayStylePagination(["status"]),
          teacherTasks: relayStylePagination(),
        },
      },
    },
  });
}
