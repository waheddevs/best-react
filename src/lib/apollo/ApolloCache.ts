import { InMemoryCache } from "@apollo/client-integration-nextjs";
import { relayStylePagination } from "@apollo/client/utilities";

export function createApolloCache(): InMemoryCache {
  return new InMemoryCache({
    typePolicies: {
      // Localized public records share database IDs across languages.
      PublicCourse: { keyFields: ["id", "language"] },
      PublicEvent: { keyFields: ["id", "language"] },
      // These localized responses omit language, so keep them scoped to each query's arguments.
      PublicFaqItem: { keyFields: false },
      PublicExamOffering: { keyFields: false },
      PublicResultVideo: { keyFields: false },
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
