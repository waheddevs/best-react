/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AdminAssignTeacherTaskInput = {
  dueAt?: string | null | undefined;
  groupId?: string | number | null | undefined;
  kind: TeacherTaskKind;
  requestId: string | number;
  teacherId: string | number;
  title: string;
};

export type AdminProvisionUserInput = {
  displayName: string;
  email: string;
  password: string;
  role: UserRole;
};

export type AttendanceStatus =
  | 'ABSENT'
  | 'EXCUSED'
  | 'LATE'
  | 'PRESENT';

export type BeginCredentialLoginInput = {
  email: string;
  expectedRole: UserRole;
  firstName?: string | null | undefined;
  lastName?: string | null | undefined;
  name: string;
  password: string;
};

export type CompleteTeacherTaskInput = {
  taskId: string | number;
};

export type ContentStatus =
  | 'ACTIVE'
  | 'ARCHIVED'
  | 'DELETED';

export type CreateTeacherGroupInput = {
  category: GroupCategory;
  endsAtMinutes?: number | null | undefined;
  name: string;
  room?: string | null | undefined;
  scheduleDays: Array<number>;
  slug: string;
  startsAtMinutes?: number | null | undefined;
  timeZone?: string | null | undefined;
};

export type GroupCategory =
  | 'CEFR'
  | 'GENERAL_ENGLISH'
  | 'IELTS';

export type GroupMembershipStatus =
  | 'ACTIVE'
  | 'PAUSED';

export type GroupRosterStatus =
  | 'ACTIVE'
  | 'DEBTOR'
  | 'DEPARTED'
  | 'PAUSED';

export type IntakeStatus =
  | 'IN_REVIEW'
  | 'NEW'
  | 'REJECTED'
  | 'RESOLVED';

export type Language =
  | 'EN'
  | 'RU'
  | 'UZ';

export type LessonStatus =
  | 'CANCELLED'
  | 'COMPLETED'
  | 'DRAFT'
  | 'SCHEDULED';

export type MarkNotificationReadInput = {
  notificationId: string | number;
};

export type MediaMalwareStatus =
  | 'CLEAN'
  | 'INFECTED'
  | 'PENDING';

export type MediaObjectReferenceInput = {
  mediaObjectId: string | number;
};

export type MediaObjectStatus =
  | 'PENDING_UPLOAD'
  | 'READY'
  | 'REJECTED'
  | 'VERIFYING';

export type PublicContentStatus =
  | 'ARCHIVED'
  | 'DRAFT'
  | 'PUBLISHED';

export type PublicCourseAccent =
  | 'BLUE'
  | 'TURQUOISE'
  | 'YELLOW';

export type PublicCourseCategory =
  | 'ENGLISH'
  | 'EXAM'
  | 'LANGUAGE';

export type PublicEventTimelineStatus =
  | 'PAST'
  | 'UPCOMING';

export type RefreshCredentialSessionInput = {
  refreshToken: string;
};

export type RegisterForCourseInput = {
  consent: boolean;
  courseSlug: string;
  currentLevel?: string | null | undefined;
  email?: string | null | undefined;
  locale: Language;
  message?: string | null | undefined;
  name: string;
  phone: string;
};

export type RegisterForEventInput = {
  consent: boolean;
  email?: string | null | undefined;
  eventId: string | number;
  locale: Language;
  name: string;
  participantCount: number;
  phone: string;
};

export type ResendCredentialLoginCodeInput = {
  challengeId: string | number;
};

export type RevokeCredentialSessionInput = {
  refreshToken: string;
};

export type SetGroupMembershipParticipationStatusInput = {
  membershipId: string | number;
  reason: string;
  status: GroupMembershipStatus;
};

export type SubmitContactRequestInput = {
  consent: boolean;
  email?: string | null | undefined;
  locale: Language;
  message: string;
  name: string;
  phone?: string | null | undefined;
  subject: string;
};

export type SubmitExamRegistrationInput = {
  consent: boolean;
  currentLevel: string;
  email?: string | null | undefined;
  locale: Language;
  name: string;
  offeringKey: string;
  phone: string;
  sessionId?: string | number | null | undefined;
};

export type TeacherTaskKind =
  | 'ADMINISTRATIVE'
  | 'FOLLOW_UP'
  | 'PREPARATION';

export type TeacherTaskStatus =
  | 'COMPLETED'
  | 'OPEN';

export type TransferRequestStatus =
  | 'APPROVED'
  | 'CANCELLED'
  | 'DECLINED'
  | 'PENDING';

export type TuitionLedgerStatus =
  | 'DUE'
  | 'OVERDUE'
  | 'PAID';

export type UpdateMyProfileInput = {
  avatarMediaObjectId?: string | number | null | undefined;
  branchName?: string | null | undefined;
  displayName: string;
  phone?: string | null | undefined;
  preferredLanguage: Language;
  teacherSubject?: string | null | undefined;
};

export type UpdateTeacherGroupInput = {
  category: GroupCategory;
  endsAtMinutes?: number | null | undefined;
  groupId: string | number;
  name: string;
  room?: string | null | undefined;
  scheduleDays: Array<number>;
  slug: string;
  startsAtMinutes?: number | null | undefined;
  timeZone?: string | null | undefined;
};

export type UserRole =
  | 'ADMIN'
  | 'STUDENT'
  | 'TEACHER';

export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE';

export type VerifyCredentialLoginInput = {
  challengeId: string | number;
  code: string;
};

export type AdminOperationalOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminOperationalOverviewQuery = { adminOperationalOverview: { activeGroups: number, activeUsers: number, openTransfers: number, pendingIntakes: number, pendingMedia: number, unreadNotifications: number }, adminAcademicOverview: { activeStudentCount: number, activeTeacherCount: number, assignedTestCount: number, completionPercentage: number } };

export type AdminContactRequestsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminContactRequestsQuery = { adminContactRequests: { edges: Array<{ node: { id: string, name: string, kind: string, status: IntakeStatus, createdAt: string, email: string | null, phone: string | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminEventRegistrationsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminEventRegistrationsQuery = { adminEventRegistrations: { edges: Array<{ node: { id: string, name: string, kind: string, status: IntakeStatus, createdAt: string, email: string | null, phone: string | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminExamRegistrationsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminExamRegistrationsQuery = { adminExamRegistrations: { edges: Array<{ node: { id: string, name: string, kind: string, status: IntakeStatus, createdAt: string, email: string | null, phone: string | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminStudentsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminStudentsQuery = { adminStudents: { edges: Array<{ node: { studentId: string, displayName: string, currentGroupName: string | null, status: UserStatus, averagePercentage: number | null, scoredTestCount: number } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminUsersQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  role?: UserRole | null | undefined;
}>;


export type AdminUsersQuery = { adminUsers: { edges: Array<{ node: { id: string, displayName: string, email: string | null, branchName: string | null, teacherSubject: string | null, status: UserStatus, role: UserRole } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminGroupsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminGroupsQuery = { adminGroups: { edges: Array<{ node: { id: string, slug: string, name: string, room: string | null, status: ContentStatus } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminCoursesQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  language: Language;
}>;


export type AdminCoursesQuery = { adminCourses: { edges: Array<{ node: { id: string, slug: string, title: string, level: string | null, status: PublicContentStatus, duration: string | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminEventsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  language: Language;
}>;


export type AdminEventsQuery = { adminEvents: { edges: Array<{ node: { id: string, slug: string, title: string, location: string | null, startsAt: string, status: PublicContentStatus } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminLocationsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminLocationsQuery = { adminLocations: Array<{ room: string, activeGroupCount: number, scheduledLessonCount: number, nextLessonAt: string | null }> };

export type AdminScheduleQueryVariables = Exact<{
  from: string;
  to: string;
}>;


export type AdminScheduleQuery = { adminSchedule: Array<{ id: string, groupId: string, startsAt: string, endsAt: string, room: string | null, status: LessonStatus, translations: Array<{ language: Language, title: string }> }> };

export type AdminAttendanceQueryVariables = Exact<{
  lessonId: string | number;
}>;


export type AdminAttendanceQuery = { adminAttendance: Array<{ id: string, studentId: string, studentName: string, status: AttendanceStatus, note: string | null, recordedAt: string }> };

export type AdminTuitionLedgerQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminTuitionLedgerQuery = { adminTuitionLedger: { edges: Array<{ node: { chargeId: string, studentDisplayName: string, groupName: string, billingMonth: string, dueDate: string, amountUzs: string, outstandingAmountUzs: string, status: TuitionLedgerStatus } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminTestsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  language: Language;
}>;


export type AdminTestsQuery = { adminTests: { edges: Array<{ node: { id: string, title: string, groupName: string, teacherDisplayName: string, questionCount: number, attemptCount: number, awaitingReviewCount: number, status: ContentStatus } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminGroupProgressesQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminGroupProgressesQuery = { adminGroupProgresses: { edges: Array<{ node: { groupId: string, groupName: string, teacherDisplayName: string, completionPercentage: number, averagePercentage: number | null, groupStatus: ContentStatus } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminLibraryItemsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminLibraryItemsQuery = { adminLibraryItems: { edges: Array<{ node: { id: string, title: string, ownerName: string, status: ContentStatus, updatedAt: string } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminMediaObjectsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminMediaObjectsQuery = { adminMediaObjects: { edges: Array<{ node: { id: string, originalName: string, mimeType: string, status: MediaObjectStatus, malwareStatus: MediaMalwareStatus, createdAt: string } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminTransferRequestsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminTransferRequestsQuery = { adminTransferRequests: { edges: Array<{ node: { id: string, studentDisplayName: string, fromGroupName: string, toGroupName: string, status: TransferRequestStatus, createdAt: string } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminNotificationsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminNotificationsQuery = { myNotifications: { edges: Array<{ node: { id: string, title: string, body: string | null, kind: string, readAt: string | null, createdAt: string } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminAuditLogsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type AdminAuditLogsQuery = { adminAuditLogs: { edges: Array<{ node: { id: string, action: string, actorId: string | null, targetId: string, targetType: string, reason: string | null, createdAt: string } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type AdminProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminProfileQuery = { myProfile: { id: string, displayName: string, email: string | null, branchName: string | null, phone: string | null, status: UserStatus, role: UserRole } };

export type BeginCredentialLoginMutationVariables = Exact<{
  input: BeginCredentialLoginInput;
}>;


export type BeginCredentialLoginMutation = { beginCredentialLogin: { challengeId: string, maskedEmail: string, expiresAt: string, resendAvailableAt: string } };

export type ResendCredentialLoginCodeMutationVariables = Exact<{
  input: ResendCredentialLoginCodeInput;
}>;


export type ResendCredentialLoginCodeMutation = { resendCredentialLoginCode: { challengeId: string, maskedEmail: string, expiresAt: string, resendAvailableAt: string } };

export type VerifyCredentialLoginMutationVariables = Exact<{
  input: VerifyCredentialLoginInput;
}>;


export type VerifyCredentialLoginMutation = { verifyCredentialLogin: { accessToken: string, expiresInSeconds: number, refreshToken: string, refreshExpiresAt: string, user: { id: string, displayName: string, role: UserRole } } };

export type RefreshCredentialSessionMutationVariables = Exact<{
  input: RefreshCredentialSessionInput;
}>;


export type RefreshCredentialSessionMutation = { refreshCredentialSession: { accessToken: string, expiresInSeconds: number, refreshToken: string, refreshExpiresAt: string, user: { id: string, displayName: string, role: UserRole } } };

export type RevokeCredentialSessionMutationVariables = Exact<{
  input: RevokeCredentialSessionInput;
}>;


export type RevokeCredentialSessionMutation = { revokeCredentialSession: boolean };

export type AdminProvisionUserMutationVariables = Exact<{
  input: AdminProvisionUserInput;
}>;


export type AdminProvisionUserMutation = { adminProvisionUser: { user: { id: string, displayName: string, role: UserRole } } };

export type PublicCoursesQueryVariables = Exact<{
  language: Language;
  first?: number | null | undefined;
}>;


export type PublicCoursesQuery = { publicCourses: { edges: Array<{ node: { id: string, slug: string, language: Language, status: PublicContentStatus, category: PublicCourseCategory, accent: PublicCourseAccent, symbol: string, featured: boolean, position: number, heroVariant: string | null, imagePath: string | null, posterImagePath: string | null, title: string, description: string, audience: string | null, comparisonTitle: string | null, duration: string | null, focus: string | null, formatLabel: string | null, imageAlt: string | null, level: string | null, posterAlt: string | null, posterTitle: string | null, prerequisites: string | null, schedule: string | null, overview: Array<string>, highlights: Array<string>, outcomes: Array<string>, curriculum: Array<string>, tracks: Array<{ position: number, title: string, level: string, summary: string, highlights: Array<string> }> } }> } };

export type PublicCourseQueryVariables = Exact<{
  language: Language;
  slug: string;
}>;


export type PublicCourseQuery = { publicCourse: { id: string, slug: string, language: Language, status: PublicContentStatus, category: PublicCourseCategory, accent: PublicCourseAccent, symbol: string, featured: boolean, position: number, heroVariant: string | null, imagePath: string | null, posterImagePath: string | null, title: string, description: string, audience: string | null, comparisonTitle: string | null, duration: string | null, focus: string | null, formatLabel: string | null, imageAlt: string | null, level: string | null, posterAlt: string | null, posterTitle: string | null, prerequisites: string | null, schedule: string | null, overview: Array<string>, highlights: Array<string>, outcomes: Array<string>, curriculum: Array<string>, tracks: Array<{ position: number, title: string, level: string, summary: string, highlights: Array<string> }> } };

export type PublicEventsQueryVariables = Exact<{
  language: Language;
  first?: number | null | undefined;
}>;


export type PublicEventsQuery = { publicEvents: { edges: Array<{ node: { id: string, slug: string, language: Language, status: PublicContentStatus, timelineStatus: PublicEventTimelineStatus, position: number, startsAt: string, endsAt: string | null, capacity: number | null, location: string | null, imagePath: string | null, title: string, description: string, imageAlt: string | null, formatLabel: string | null, dateLabel: string | null, timeLabel: string | null, durationLabel: string | null, locationLabel: string | null, topics: Array<string>, overview: Array<string>, audience: Array<string>, takeaways: Array<string>, practicalInfo: Array<string>, programme: Array<{ position: number, timeLabel: string, title: string, description: string }>, faq: Array<{ position: number, question: string, answer: string }> } }> } };

export type PublicEventQueryVariables = Exact<{
  language: Language;
  slug: string;
}>;


export type PublicEventQuery = { publicEvent: { id: string, slug: string, language: Language, status: PublicContentStatus, timelineStatus: PublicEventTimelineStatus, position: number, startsAt: string, endsAt: string | null, capacity: number | null, location: string | null, imagePath: string | null, title: string, description: string, imageAlt: string | null, formatLabel: string | null, dateLabel: string | null, timeLabel: string | null, durationLabel: string | null, locationLabel: string | null, topics: Array<string>, overview: Array<string>, audience: Array<string>, takeaways: Array<string>, practicalInfo: Array<string>, programme: Array<{ position: number, timeLabel: string, title: string, description: string }>, faq: Array<{ position: number, question: string, answer: string }> } };

export type PublicFaqQueryVariables = Exact<{
  language: Language;
}>;


export type PublicFaqQuery = { publicFaq: Array<{ id: string, key: string, category: string, position: number, question: string, answer: string }> };

export type PublicExamOfferingsQueryVariables = Exact<{
  language: Language;
}>;


export type PublicExamOfferingsQuery = { publicExamOfferings: Array<{ id: string, key: string, position: number, title: string, description: string, level: string, duration: string, formatLabel: string, highlights: Array<string>, sessions: Array<{ id: string, startsAt: string, capacity: number | null, availablePlaces: number }> }> };

export type PublicResultVideosQueryVariables = Exact<{
  language: Language;
}>;


export type PublicResultVideosQuery = { publicResultVideos: Array<{ id: string, key: string, position: number, title: string, duration: string, videoPath: string, posterPath: string, source: { provider: string, creator: string, url: string, licenseUrl: string } }> };

export type RegisterForCourseMutationVariables = Exact<{
  input: RegisterForCourseInput;
}>;


export type RegisterForCourseMutation = { registerForCourse: { accepted: boolean, receiptId: string } };

export type RegisterForEventMutationVariables = Exact<{
  input: RegisterForEventInput;
}>;


export type RegisterForEventMutation = { registerForEvent: { accepted: boolean, receiptId: string } };

export type SubmitExamRegistrationMutationVariables = Exact<{
  input: SubmitExamRegistrationInput;
}>;


export type SubmitExamRegistrationMutation = { submitExamRegistration: { accepted: boolean, receiptId: string } };

export type SubmitContactRequestMutationVariables = Exact<{
  input: SubmitContactRequestInput;
}>;


export type SubmitContactRequestMutation = { submitContactRequest: { accepted: boolean, receiptId: string } };

export type TeacherGroupsQueryVariables = Exact<{
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;


export type TeacherGroupsQuery = { teacherGroups: { edges: Array<{ node: { id: string, createdAt: string, name: string, slug: string, category: GroupCategory | null, room: string | null, scheduleDays: Array<number>, startsAtMinutes: number | null, endsAtMinutes: number | null, activeStudentCount: number } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type TeacherGroupQueryVariables = Exact<{
  groupId: string | number;
}>;


export type TeacherGroupQuery = { teacherGroup: { id: string, name: string, slug: string, category: GroupCategory | null, room: string | null, scheduleDays: Array<number>, startsAtMinutes: number | null, endsAtMinutes: number | null, activeStudentCount: number } };

export type TeacherGroupOverviewDataQueryVariables = Exact<{
  groupId: string | number;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;


export type TeacherGroupOverviewDataQuery = { teacherGroupOverview: { activeAssignmentCount: number, scheduledTestCount: number, materialCount: number, currentStudentCount: number }, teacherGroupLessons: { edges: Array<{ node: { id: string, groupId: string, startsAt: string, endsAt: string, room: string | null, status: LessonStatus, translations: Array<{ language: Language, title: string, summary: string | null }> } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type TeacherGroupRosterDataQueryVariables = Exact<{
  groupId: string | number;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;


export type TeacherGroupRosterDataQuery = { teacherGroupRosterSummary: { currentTotal: number, historicalTotal: number, active: number, paused: number, debtors: number, departed: number }, teacherGroupRoster: { edges: Array<{ node: { membershipId: string, studentId: string, displayName: string, phone: string | null, rosterStatus: GroupRosterStatus, outstandingBalanceUzs: string, startedAt: string, endedAt: string | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type TeacherCreateGroupMutationVariables = Exact<{
  input: CreateTeacherGroupInput;
}>;


export type TeacherCreateGroupMutation = { createTeacherGroup: { group: { id: string, name: string, category: GroupCategory | null } } };

export type TeacherUpdateGroupMutationVariables = Exact<{
  input: UpdateTeacherGroupInput;
}>;


export type TeacherUpdateGroupMutation = { updateTeacherGroup: { group: { id: string, name: string, slug: string, category: GroupCategory | null, room: string | null, scheduleDays: Array<number>, startsAtMinutes: number | null, endsAtMinutes: number | null, activeStudentCount: number } } };

export type TeacherDeleteGroupMutationVariables = Exact<{
  groupId: string | number;
}>;


export type TeacherDeleteGroupMutation = { deleteTeacherGroup: { group: { id: string, status: ContentStatus } } };

export type TeacherSetGroupMembershipParticipationStatusMutationVariables = Exact<{
  input: SetGroupMembershipParticipationStatusInput;
}>;


export type TeacherSetGroupMembershipParticipationStatusMutation = { setGroupMembershipParticipationStatus: { membership: { membershipId: string, studentId: string, rosterStatus: GroupRosterStatus, outstandingBalanceUzs: string, endedAt: string | null } } };

export type TeacherHeaderQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherHeaderQuery = { myUnreadNotificationCount: number, myProfile: { displayName: string, avatarMediaObjectId: string | null }, myNotifications: { edges: Array<{ node: { id: string, kind: string, taskId: string | null, title: string, body: string | null, readAt: string | null, createdAt: string } }> } };

export type TeacherNotificationUpdatesQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherNotificationUpdatesQuery = { myUnreadNotificationCount: number, myNotifications: { edges: Array<{ node: { id: string, kind: string, taskId: string | null, title: string, body: string | null, readAt: string | null, createdAt: string } }> } };

export type TeacherMarkNotificationReadMutationVariables = Exact<{
  input: MarkNotificationReadInput;
}>;


export type TeacherMarkNotificationReadMutation = { markNotificationRead: { notification: { id: string, readAt: string | null } } };

export type TeacherAvatarIntentMutationVariables = Exact<{
  input: MediaObjectReferenceInput;
}>;


export type TeacherAvatarIntentMutation = { createMediaDownloadIntent: { downloadIntent: { url: string } } };

export type TeacherTasksQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;


export type TeacherTasksQuery = { teacherTasks: { edges: Array<{ node: { id: string, groupId: string | null, kind: TeacherTaskKind, status: TeacherTaskStatus, title: string, dueAt: string | null, createdAt: string, completedAt: string | null } }>, pageInfo: { endCursor: string | null, hasNextPage: boolean } } };

export type TeacherCompleteTaskMutationVariables = Exact<{
  input: CompleteTeacherTaskInput;
}>;


export type TeacherCompleteTaskMutation = { completeTeacherTask: { task: { id: string, status: TeacherTaskStatus, completedAt: string | null } } };

export type AdminAssignTeacherTaskMutationVariables = Exact<{
  input: AdminAssignTeacherTaskInput;
}>;


export type AdminAssignTeacherTaskMutation = { adminAssignTeacherTask: { task: { id: string, title: string } } };

export type TeacherProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type TeacherProfileQuery = { myProfile: { displayName: string, email: string | null, phone: string | null, teacherSubject: string | null, branchName: string | null, preferredLanguage: Language, avatarMediaObjectId: string | null } };

export type TeacherUpdateProfileMutationVariables = Exact<{
  input: UpdateMyProfileInput;
}>;


export type TeacherUpdateProfileMutation = { updateMyProfile: { profile: { displayName: string, email: string | null, phone: string | null, teacherSubject: string | null, branchName: string | null, preferredLanguage: Language, avatarMediaObjectId: string | null } } };


export const AdminOperationalOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminOperationalOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOperationalOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeGroups"}},{"kind":"Field","name":{"kind":"Name","value":"activeUsers"}},{"kind":"Field","name":{"kind":"Name","value":"openTransfers"}},{"kind":"Field","name":{"kind":"Name","value":"pendingIntakes"}},{"kind":"Field","name":{"kind":"Name","value":"pendingMedia"}},{"kind":"Field","name":{"kind":"Name","value":"unreadNotifications"}}]}},{"kind":"Field","name":{"kind":"Name","value":"adminAcademicOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeStudentCount"}},{"kind":"Field","name":{"kind":"Name","value":"activeTeacherCount"}},{"kind":"Field","name":{"kind":"Name","value":"assignedTestCount"}},{"kind":"Field","name":{"kind":"Name","value":"completionPercentage"}}]}}]}}]} as unknown as DocumentNode<AdminOperationalOverviewQuery, AdminOperationalOverviewQueryVariables>;
export const AdminContactRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminContactRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminContactRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminContactRequestsQuery, AdminContactRequestsQueryVariables>;
export const AdminEventRegistrationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminEventRegistrations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminEventRegistrations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>;
export const AdminExamRegistrationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminExamRegistrations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminExamRegistrations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminExamRegistrationsQuery, AdminExamRegistrationsQueryVariables>;
export const AdminStudentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminStudents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminStudents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"currentGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"averagePercentage"}},{"kind":"Field","name":{"kind":"Name","value":"scoredTestCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminStudentsQuery, AdminStudentsQueryVariables>;
export const AdminUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UserRole"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"branchName"}},{"kind":"Field","name":{"kind":"Name","value":"teacherSubject"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUsersQuery, AdminUsersQueryVariables>;
export const AdminGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGroupsQuery, AdminGroupsQueryVariables>;
export const AdminCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminCoursesQuery, AdminCoursesQueryVariables>;
export const AdminEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminEventsQuery, AdminEventsQueryVariables>;
export const AdminLocationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLocations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"activeGroupCount"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledLessonCount"}},{"kind":"Field","name":{"kind":"Name","value":"nextLessonAt"}}]}}]}}]} as unknown as DocumentNode<AdminLocationsQuery, AdminLocationsQueryVariables>;
export const AdminScheduleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminSchedule"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSchedule"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<AdminScheduleQuery, AdminScheduleQueryVariables>;
export const AdminAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAttendance"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lessonId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lessonId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"studentName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"recordedAt"}}]}}]}}]} as unknown as DocumentNode<AdminAttendanceQuery, AdminAttendanceQueryVariables>;
export const AdminTuitionLedgerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminTuitionLedger"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminTuitionLedger"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chargeId"}},{"kind":"Field","name":{"kind":"Name","value":"studentDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"billingMonth"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"amountUzs"}},{"kind":"Field","name":{"kind":"Name","value":"outstandingAmountUzs"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminTuitionLedgerQuery, AdminTuitionLedgerQueryVariables>;
export const AdminTestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminTests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminTests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"teacherDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"questionCount"}},{"kind":"Field","name":{"kind":"Name","value":"attemptCount"}},{"kind":"Field","name":{"kind":"Name","value":"awaitingReviewCount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminTestsQuery, AdminTestsQueryVariables>;
export const AdminGroupProgressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminGroupProgresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGroupProgresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"groupName"}},{"kind":"Field","name":{"kind":"Name","value":"teacherDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"completionPercentage"}},{"kind":"Field","name":{"kind":"Name","value":"averagePercentage"}},{"kind":"Field","name":{"kind":"Name","value":"groupStatus"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminGroupProgressesQuery, AdminGroupProgressesQueryVariables>;
export const AdminLibraryItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminLibraryItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminLibraryItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"ownerName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminLibraryItemsQuery, AdminLibraryItemsQueryVariables>;
export const AdminMediaObjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminMediaObjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminMediaObjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"originalName"}},{"kind":"Field","name":{"kind":"Name","value":"mimeType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"malwareStatus"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminMediaObjectsQuery, AdminMediaObjectsQueryVariables>;
export const AdminTransferRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminTransferRequests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminTransferRequests"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"studentDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"fromGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"toGroupName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminTransferRequestsQuery, AdminTransferRequestsQueryVariables>;
export const AdminNotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminNotifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminNotificationsQuery, AdminNotificationsQueryVariables>;
export const AdminAuditLogsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminAuditLogs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAuditLogs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"action"}},{"kind":"Field","name":{"kind":"Name","value":"actorId"}},{"kind":"Field","name":{"kind":"Name","value":"targetId"}},{"kind":"Field","name":{"kind":"Name","value":"targetType"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<AdminAuditLogsQuery, AdminAuditLogsQueryVariables>;
export const AdminProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"branchName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<AdminProfileQuery, AdminProfileQueryVariables>;
export const BeginCredentialLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BeginCredentialLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BeginCredentialLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"beginCredentialLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeId"}},{"kind":"Field","name":{"kind":"Name","value":"maskedEmail"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"resendAvailableAt"}}]}}]}}]} as unknown as DocumentNode<BeginCredentialLoginMutation, BeginCredentialLoginMutationVariables>;
export const ResendCredentialLoginCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResendCredentialLoginCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResendCredentialLoginCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resendCredentialLoginCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeId"}},{"kind":"Field","name":{"kind":"Name","value":"maskedEmail"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"resendAvailableAt"}}]}}]}}]} as unknown as DocumentNode<ResendCredentialLoginCodeMutation, ResendCredentialLoginCodeMutationVariables>;
export const VerifyCredentialLoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyCredentialLogin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyCredentialLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyCredentialLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresInSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<VerifyCredentialLoginMutation, VerifyCredentialLoginMutationVariables>;
export const RefreshCredentialSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshCredentialSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RefreshCredentialSessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshCredentialSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresInSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<RefreshCredentialSessionMutation, RefreshCredentialSessionMutationVariables>;
export const RevokeCredentialSessionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RevokeCredentialSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RevokeCredentialSessionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"revokeCredentialSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RevokeCredentialSessionMutation, RevokeCredentialSessionMutationVariables>;
export const AdminProvisionUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminProvisionUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminProvisionUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminProvisionUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<AdminProvisionUserMutation, AdminProvisionUserMutationVariables>;
export const PublicCoursesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicCourses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicCourses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"accent"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"heroVariant"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"posterImagePath"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"comparisonTitle"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"focus"}},{"kind":"Field","name":{"kind":"Name","value":"formatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"imageAlt"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"posterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"posterTitle"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisites"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}},{"kind":"Field","name":{"kind":"Name","value":"outcomes"}},{"kind":"Field","name":{"kind":"Name","value":"curriculum"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PublicCoursesQuery, PublicCoursesQueryVariables>;
export const PublicCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"accent"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}},{"kind":"Field","name":{"kind":"Name","value":"featured"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"heroVariant"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"posterImagePath"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"comparisonTitle"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"focus"}},{"kind":"Field","name":{"kind":"Name","value":"formatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"imageAlt"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"posterAlt"}},{"kind":"Field","name":{"kind":"Name","value":"posterTitle"}},{"kind":"Field","name":{"kind":"Name","value":"prerequisites"}},{"kind":"Field","name":{"kind":"Name","value":"schedule"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}},{"kind":"Field","name":{"kind":"Name","value":"outcomes"}},{"kind":"Field","name":{"kind":"Name","value":"curriculum"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}}]}}]}}]}}]} as unknown as DocumentNode<PublicCourseQuery, PublicCourseQueryVariables>;
export const PublicEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"50"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timelineStatus"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageAlt"}},{"kind":"Field","name":{"kind":"Name","value":"formatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"dateLabel"}},{"kind":"Field","name":{"kind":"Name","value":"timeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"durationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"locationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"takeaways"}},{"kind":"Field","name":{"kind":"Name","value":"practicalInfo"}},{"kind":"Field","name":{"kind":"Name","value":"programme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"timeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faq"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<PublicEventsQuery, PublicEventsQueryVariables>;
export const PublicEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}},{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"timelineStatus"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"imagePath"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageAlt"}},{"kind":"Field","name":{"kind":"Name","value":"formatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"dateLabel"}},{"kind":"Field","name":{"kind":"Name","value":"timeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"durationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"locationLabel"}},{"kind":"Field","name":{"kind":"Name","value":"topics"}},{"kind":"Field","name":{"kind":"Name","value":"overview"}},{"kind":"Field","name":{"kind":"Name","value":"audience"}},{"kind":"Field","name":{"kind":"Name","value":"takeaways"}},{"kind":"Field","name":{"kind":"Name","value":"practicalInfo"}},{"kind":"Field","name":{"kind":"Name","value":"programme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"timeLabel"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"faq"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]}}]}}]} as unknown as DocumentNode<PublicEventQuery, PublicEventQueryVariables>;
export const PublicFaqDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicFaq"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicFaq"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]}}]} as unknown as DocumentNode<PublicFaqQuery, PublicFaqQueryVariables>;
export const PublicExamOfferingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicExamOfferings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicExamOfferings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"formatLabel"}},{"kind":"Field","name":{"kind":"Name","value":"highlights"}},{"kind":"Field","name":{"kind":"Name","value":"sessions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"availablePlaces"}}]}}]}}]}}]} as unknown as DocumentNode<PublicExamOfferingsQuery, PublicExamOfferingsQueryVariables>;
export const PublicResultVideosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicResultVideos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"language"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Language"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicResultVideos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"language"},"value":{"kind":"Variable","name":{"kind":"Name","value":"language"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"videoPath"}},{"kind":"Field","name":{"kind":"Name","value":"posterPath"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"provider"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"licenseUrl"}}]}}]}}]}}]} as unknown as DocumentNode<PublicResultVideosQuery, PublicResultVideosQueryVariables>;
export const RegisterForCourseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterForCourse"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterForCourseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerForCourse"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"receiptId"}}]}}]}}]} as unknown as DocumentNode<RegisterForCourseMutation, RegisterForCourseMutationVariables>;
export const RegisterForEventDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterForEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterForEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"registerForEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"receiptId"}}]}}]}}]} as unknown as DocumentNode<RegisterForEventMutation, RegisterForEventMutationVariables>;
export const SubmitExamRegistrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitExamRegistration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitExamRegistrationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitExamRegistration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"receiptId"}}]}}]}}]} as unknown as DocumentNode<SubmitExamRegistrationMutation, SubmitExamRegistrationMutationVariables>;
export const SubmitContactRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitContactRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitContactRequestInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitContactRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"receiptId"}}]}}]}}]} as unknown as DocumentNode<SubmitContactRequestMutation, SubmitContactRequestMutationVariables>;
export const TeacherGroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherGroups"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherGroups"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"EnumValue","value":"ACTIVE"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleDays"}},{"kind":"Field","name":{"kind":"Name","value":"startsAtMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"endsAtMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"activeStudentCount"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherGroupsQuery, TeacherGroupsQueryVariables>;
export const TeacherGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleDays"}},{"kind":"Field","name":{"kind":"Name","value":"startsAtMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"endsAtMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"activeStudentCount"}}]}}]}}]} as unknown as DocumentNode<TeacherGroupQuery, TeacherGroupQueryVariables>;
export const TeacherGroupOverviewDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherGroupOverviewData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherGroupOverview"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeAssignmentCount"}},{"kind":"Field","name":{"kind":"Name","value":"scheduledTestCount"}},{"kind":"Field","name":{"kind":"Name","value":"materialCount"}},{"kind":"Field","name":{"kind":"Name","value":"currentStudentCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacherGroupLessons"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"translations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherGroupOverviewDataQuery, TeacherGroupOverviewDataQueryVariables>;
export const TeacherGroupRosterDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherGroupRosterData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherGroupRosterSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentTotal"}},{"kind":"Field","name":{"kind":"Name","value":"historicalTotal"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"paused"}},{"kind":"Field","name":{"kind":"Name","value":"debtors"}},{"kind":"Field","name":{"kind":"Name","value":"departed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacherGroupRoster"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"includeEnded"},"value":{"kind":"BooleanValue","value":true}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipId"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"rosterStatus"}},{"kind":"Field","name":{"kind":"Name","value":"outstandingBalanceUzs"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherGroupRosterDataQuery, TeacherGroupRosterDataQueryVariables>;
export const TeacherCreateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherCreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateTeacherGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTeacherGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherCreateGroupMutation, TeacherCreateGroupMutationVariables>;
export const TeacherUpdateGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherUpdateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTeacherGroupInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTeacherGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"room"}},{"kind":"Field","name":{"kind":"Name","value":"scheduleDays"}},{"kind":"Field","name":{"kind":"Name","value":"startsAtMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"endsAtMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"activeStudentCount"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherUpdateGroupMutation, TeacherUpdateGroupMutationVariables>;
export const TeacherDeleteGroupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherDeleteGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTeacherGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"groupId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherDeleteGroupMutation, TeacherDeleteGroupMutationVariables>;
export const TeacherSetGroupMembershipParticipationStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherSetGroupMembershipParticipationStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetGroupMembershipParticipationStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setGroupMembershipParticipationStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membership"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membershipId"}},{"kind":"Field","name":{"kind":"Name","value":"studentId"}},{"kind":"Field","name":{"kind":"Name","value":"rosterStatus"}},{"kind":"Field","name":{"kind":"Name","value":"outstandingBalanceUzs"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherSetGroupMembershipParticipationStatusMutation, TeacherSetGroupMembershipParticipationStatusMutationVariables>;
export const TeacherHeaderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherHeader"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"avatarMediaObjectId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"myUnreadNotificationCount"}},{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"8"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeacherHeaderQuery, TeacherHeaderQueryVariables>;
export const TeacherNotificationUpdatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherNotificationUpdates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myUnreadNotificationCount"}},{"kind":"Field","name":{"kind":"Name","value":"myNotifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"8"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<TeacherNotificationUpdatesQuery, TeacherNotificationUpdatesQueryVariables>;
export const TeacherMarkNotificationReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherMarkNotificationRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MarkNotificationReadInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markNotificationRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherMarkNotificationReadMutation, TeacherMarkNotificationReadMutationVariables>;
export const TeacherAvatarIntentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherAvatarIntent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MediaObjectReferenceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMediaDownloadIntent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"downloadIntent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherAvatarIntentMutation, TeacherAvatarIntentMutationVariables>;
export const TeacherTasksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherTasks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teacherTasks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"dueAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherTasksQuery, TeacherTasksQueryVariables>;
export const TeacherCompleteTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherCompleteTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompleteTeacherTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeTeacherTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherCompleteTaskMutation, TeacherCompleteTaskMutationVariables>;
export const AdminAssignTeacherTaskDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminAssignTeacherTask"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminAssignTeacherTaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAssignTeacherTask"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<AdminAssignTeacherTaskMutation, AdminAssignTeacherTaskMutationVariables>;
export const TeacherProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeacherProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"teacherSubject"}},{"kind":"Field","name":{"kind":"Name","value":"branchName"}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"avatarMediaObjectId"}}]}}]}}]} as unknown as DocumentNode<TeacherProfileQuery, TeacherProfileQueryVariables>;
export const TeacherUpdateProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeacherUpdateProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMyProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMyProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"teacherSubject"}},{"kind":"Field","name":{"kind":"Name","value":"branchName"}},{"kind":"Field","name":{"kind":"Name","value":"preferredLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"avatarMediaObjectId"}}]}}]}}]}}]} as unknown as DocumentNode<TeacherUpdateProfileMutation, TeacherUpdateProfileMutationVariables>;