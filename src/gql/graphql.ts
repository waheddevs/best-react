/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
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

export type AnswerOptionDraftInput = {
  isCorrect: boolean;
  translations: Array<AnswerOptionTranslationInput>;
};

export type AnswerOptionTranslationInput = {
  language: Language;
  text: string;
};

export type AttemptStatus = "IN_PROGRESS" | "REVIEW_REQUIRED" | "SCORED" | "SUBMITTED";

export type AttendanceStatus = "ABSENT" | "EXCUSED" | "LATE" | "PRESENT";

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

export type ConfirmAttemptAudioUploadInput = {
  attemptId: string | number;
  mediaObjectId: string | number;
  questionId: string | number;
};

export type ContentStatus = "ACTIVE" | "ARCHIVED" | "DELETED";

export type CreateAttemptAudioUploadInput = {
  attemptId: string | number;
  mimeType: string;
  originalName: string;
  questionId: string | number;
  sizeBytes: number;
};

export type CreateLessonInput = {
  endsAt: string;
  groupId: string | number;
  room?: string | null | undefined;
  startsAt: string;
  translations: Array<LessonTranslationInput>;
};

export type CreateLessonMaterialInput = {
  groupId: string | number;
  kind?: LessonMaterialKind;
  lessonId?: string | number | null | undefined;
  libraryItemId: string | number;
  position?: number;
};

export type CreateLibraryCategoryInput = {
  name: string;
};

export type CreateLibraryDownloadIntentInput = {
  libraryItemId: string | number;
  mediaObjectId: string | number;
};

export type CreateLibraryItemInput = {
  categoryId: string | number;
  groupIds: Array<string | number>;
  mediaObjectIds: Array<string | number>;
  primaryLanguage: Language;
  translations: Array<LibraryTranslationInput>;
  visibility: LibraryVisibility;
};

export type CreateMediaUploadIntentInput = {
  mimeType: string;
  originalName: string;
  sizeBytes: number;
};

export type CreateNextTestVersionInput = {
  testId: string | number;
};

export type CreateTeacherGroupInput = {
  category: GroupCategory;
  endsAtMinutes?: number | null | undefined;
  monthlyTuitionUzs?: string | null | undefined;
  name: string;
  room?: string | null | undefined;
  scheduleDays: Array<number>;
  slug: string;
  startsAtMinutes?: number | null | undefined;
  timeZone?: string | null | undefined;
};

export type CreateTeacherPracticeTestInput = {
  groupId: string | number;
};

export type CreateTestQuestionInput = {
  acceptedAnswers?: Array<string> | null | undefined;
  answerLimit?: number | null | undefined;
  kind?: QuestionKind | null | undefined;
  maxSelections?: number | null | undefined;
  options: Array<AnswerOptionDraftInput>;
  sectionId?: string | number | null | undefined;
  testVersionId: string | number;
  translations: Array<QuestionTranslationInput>;
};

export type CreateTestSectionBlockInput = {
  headingLevel?: number | null | undefined;
  kind: TestSectionBlockKind;
  mediaObjectId?: string | number | null | undefined;
  questionIds?: Array<string | number> | null | undefined;
  tableHeaderRows?: Array<TestTableRowInput> | null | undefined;
  tableRows?: Array<TestTableRowInput> | null | undefined;
  testSectionId: string | number;
  translations: Array<TestSectionBlockTranslationInput>;
};

export type CreateTestSectionInput = {
  mediaObjectId?: string | number | null | undefined;
  minimumWords?: number | null | undefined;
  preparationSeconds?: number | null | undefined;
  responseSeconds?: number | null | undefined;
  suggestedMinutes?: number | null | undefined;
  testVersionId: string | number;
  translations: Array<TestSectionTranslationInput>;
};

export type GenerateListeningAudioInput = {
  testSectionId: string | number;
  transcript: string;
};

export type GroupCategory = "CEFR" | "GENERAL_ENGLISH" | "IELTS";

export type GroupMembershipStatus = "ACTIVE" | "PAUSED";

export type GroupRosterStatus = "ACTIVE" | "DEBTOR" | "DEPARTED" | "PAUSED";

export type IntakeStatus = "IN_REVIEW" | "NEW" | "REJECTED" | "RESOLVED";

export type Language = "EN" | "RU" | "UZ";

export type LessonMaterialKind = "MATERIAL" | "TASK";

export type LessonStatus = "CANCELLED" | "COMPLETED" | "DRAFT" | "SCHEDULED";

export type LessonTranslationInput = {
  language: Language;
  summary?: string | null | undefined;
  title: string;
};

export type LibraryTranslationInput = {
  description?: string | null | undefined;
  language: Language;
  title: string;
};

export type LibraryVisibility = "ALL_GROUPS" | "SELECTED_GROUPS";

export type MarkNotificationReadInput = {
  notificationId: string | number;
};

export type MediaMalwareStatus = "CLEAN" | "INFECTED" | "PENDING";

export type MediaObjectReferenceInput = {
  mediaObjectId: string | number;
};

export type MediaObjectStatus = "PENDING_UPLOAD" | "READY" | "REJECTED" | "VERIFYING";

export type MediaType = "ARCHIVE" | "AUDIO" | "IMAGE" | "PDF" | "VIDEO";

export type PublicContentStatus = "ARCHIVED" | "DRAFT" | "PUBLISHED";

export type PublicCourseAccent = "BLUE" | "TURQUOISE" | "YELLOW";

export type PublicCourseCategory = "ENGLISH" | "EXAM" | "LANGUAGE";

export type PublicEventTimelineStatus = "PAST" | "UPCOMING";

export type QuestionKind =
  | "AUDIO_RESPONSE"
  | "LONG_TEXT"
  | "MATCHING"
  | "MULTIPLE_CHOICE"
  | "SHORT_TEXT"
  | "SINGLE_CHOICE"
  | "TRUE_FALSE_NOT_GIVEN"
  | "YES_NO_NOT_GIVEN";

export type QuestionTranslationInput = {
  language: Language;
  prompt: string;
  rationale?: string | null | undefined;
};

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

export type ReorderTestQuestionsInput = {
  questionIds: Array<string | number>;
  testVersionId: string | number;
};

export type ReorderTestSectionBlocksInput = {
  testSectionBlockIds: Array<string | number>;
  testSectionId: string | number;
};

export type ReorderTestSectionsInput = {
  testSectionIds: Array<string | number>;
  testVersionId: string | number;
};

export type ReplaceTestDraftTranslationsInput = {
  testVersionId: string | number;
  translations: Array<TestTranslationInput>;
};

export type ResendCredentialLoginCodeInput = {
  challengeId: string | number;
};

export type RevokeCredentialSessionInput = {
  refreshToken: string;
};

export type SaveAttemptAnswerInput = {
  attemptId: string | number;
  questionId: string | number;
  responseMediaObjectId?: string | number | null | undefined;
  selectedOptionId?: string | number | null | undefined;
  selectedOptionIds?: Array<string | number> | null | undefined;
  textValue?: string | null | undefined;
};

export type SaveAttemptSectionNoteInput = {
  attemptId: string | number;
  sectionId: string | number;
  text: string;
};

export type SaveSpeakingAttemptReviewInput = {
  attemptId: string | number;
  feedback?: string | null | undefined;
  fluencyCoherence: number;
  grammaticalRangeAccuracy: number;
  lexicalResource: number;
  practiceBand: number;
  pronunciation: number;
  release: boolean;
};

export type SaveWritingAttemptReviewInput = {
  attemptId: string | number;
  expectedUpdatedAt?: string | null | undefined;
  feedback?: string | null | undefined;
  release: boolean;
  task1: WritingTaskRubricInput;
  task2: WritingTaskRubricInput;
};

export type SetGroupMembershipParticipationStatusInput = {
  membershipId: string | number;
  reason: string;
  status: GroupMembershipStatus;
};

export type SetLessonArchivedInput = {
  archived: boolean;
  lessonId: string | number;
};

export type SetLessonMaterialArchivedInput = {
  archived: boolean;
  materialId: string | number;
};

export type SetLibraryItemArchivedInput = {
  archived: boolean;
  libraryItemId: string | number;
};

export type StartTestAttemptInput = {
  language: Language;
  testId: string | number;
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

export type SubmitTestAttemptInput = {
  attemptId: string | number;
};

export type TeacherCreateStudentInGroupInput = {
  email: string;
  firstName: string;
  groupId: string | number;
  lastName: string;
  password: string;
  phone: string;
};

export type TeacherDeleteStudentInput = {
  membershipId: string | number;
};

export type TeacherTaskKind = "ADMINISTRATIVE" | "FOLLOW_UP" | "PREPARATION";

export type TeacherTaskStatus = "COMPLETED" | "OPEN";

export type TestSectionBlockKind =
  "AUDIO" | "HEADING" | "IMAGE" | "QUESTION_GROUP" | "RICH_TEXT" | "TABLE";

export type TestSectionBlockTranslationInput = {
  altText?: string | null | undefined;
  caption?: string | null | undefined;
  language: Language;
  text?: string | null | undefined;
};

export type TestSectionTranslationInput = {
  content?: string | null | undefined;
  instructions: string;
  language: Language;
  title: string;
};

export type TestSkill = "LISTENING" | "READING" | "SPEAKING" | "WRITING";

export type TestTableRowInput = {
  cells: Array<string>;
};

export type TestTranslationInput = {
  description?: string | null | undefined;
  language: Language;
  title: string;
};

export type TestVersionIdInput = {
  testVersionId: string | number;
};

export type TestVersionStatus = "DRAFT" | "PUBLISHED";

export type TuitionLedgerStatus = "DUE" | "OVERDUE" | "PAID";

export type UpdateLessonInput = {
  endsAt: string;
  groupId: string | number;
  lessonId: string | number;
  room?: string | null | undefined;
  startsAt: string;
  translations: Array<LessonTranslationInput>;
};

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
  monthlyTuitionUzs?: string | null | undefined;
  name: string;
  room?: string | null | undefined;
  scheduleDays: Array<number>;
  slug: string;
  startsAtMinutes?: number | null | undefined;
  timeZone?: string | null | undefined;
};

export type UpdateTestDraftSettingsInput = {
  attemptLimit: number;
  availabilityEndsAt?: string | null | undefined;
  availabilityStartsAt?: string | null | undefined;
  durationMinutes?: number | null | undefined;
  passingPercentage: number;
  primaryLanguage: Language;
  testVersionId: string | number;
};

export type UpdateTestQuestionInput = {
  acceptedAnswers?: Array<string> | null | undefined;
  answerLimit?: number | null | undefined;
  kind?: QuestionKind | null | undefined;
  maxSelections?: number | null | undefined;
  options: Array<AnswerOptionDraftInput>;
  questionId: string | number;
  sectionId?: string | number | null | undefined;
  translations: Array<QuestionTranslationInput>;
};

export type UpdateTestSectionBlockInput = {
  headingLevel?: number | null | undefined;
  kind: TestSectionBlockKind;
  mediaObjectId?: string | number | null | undefined;
  questionIds?: Array<string | number> | null | undefined;
  tableHeaderRows?: Array<TestTableRowInput> | null | undefined;
  tableRows?: Array<TestTableRowInput> | null | undefined;
  testSectionBlockId: string | number;
  translations: Array<TestSectionBlockTranslationInput>;
};

export type UpdateTestSectionInput = {
  mediaObjectId?: string | number | null | undefined;
  minimumWords?: number | null | undefined;
  preparationSeconds?: number | null | undefined;
  responseSeconds?: number | null | undefined;
  suggestedMinutes?: number | null | undefined;
  testSectionId: string | number;
  translations: Array<TestSectionTranslationInput>;
};

export type UserRole = "ADMIN" | "STUDENT" | "TEACHER";

export type UserStatus = "ACTIVE" | "DELETED" | "INACTIVE";

export type VerifyCredentialLoginInput = {
  challengeId: string | number;
  code: string;
};

export type WritingTaskRubricInput = {
  coherenceCohesion: number;
  feedback?: string | null | undefined;
  grammaticalRangeAccuracy: number;
  lexicalResource: number;
  taskAchievement: number;
};

export type AdminOperationalOverviewQueryVariables = Exact<{ [key: string]: never }>;

export type AdminOperationalOverviewQuery = {
  adminOperationalOverview: {
    activeGroups: number;
    activeUsers: number;
    pendingIntakes: number;
    pendingMedia: number;
    unreadNotifications: number;
  };
  adminAcademicOverview: {
    activeStudentCount: number;
    activeTeacherCount: number;
    assignedTestCount: number;
    completionPercentage: number;
  };
};

export type AdminContactRequestsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminContactRequestsQuery = {
  adminContactRequests: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        kind: string;
        status: IntakeStatus;
        createdAt: string;
        email: string | null;
        phone: string | null;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminEventRegistrationsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminEventRegistrationsQuery = {
  adminEventRegistrations: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        kind: string;
        status: IntakeStatus;
        createdAt: string;
        email: string | null;
        phone: string | null;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminExamRegistrationsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminExamRegistrationsQuery = {
  adminExamRegistrations: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        kind: string;
        status: IntakeStatus;
        createdAt: string;
        email: string | null;
        phone: string | null;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminStudentsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminStudentsQuery = {
  adminStudents: {
    edges: Array<{
      node: {
        studentId: string;
        displayName: string;
        currentGroupName: string | null;
        status: UserStatus;
        averagePercentage: number | null;
        scoredTestCount: number;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminUsersQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  role?: UserRole | null | undefined;
}>;

export type AdminUsersQuery = {
  adminUsers: {
    edges: Array<{
      node: {
        id: string;
        displayName: string;
        email: string | null;
        branchName: string | null;
        teacherSubject: string | null;
        status: UserStatus;
        role: UserRole;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminGroupsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminGroupsQuery = {
  adminGroups: {
    edges: Array<{
      node: { id: string; slug: string; name: string; room: string | null; status: ContentStatus };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminCoursesQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  language: Language;
}>;

export type AdminCoursesQuery = {
  adminCourses: {
    edges: Array<{
      node: {
        id: string;
        slug: string;
        title: string;
        level: string | null;
        status: PublicContentStatus;
        duration: string | null;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminEventsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  language: Language;
}>;

export type AdminEventsQuery = {
  adminEvents: {
    edges: Array<{
      node: {
        id: string;
        slug: string;
        title: string;
        location: string | null;
        startsAt: string;
        status: PublicContentStatus;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminLocationsQueryVariables = Exact<{ [key: string]: never }>;

export type AdminLocationsQuery = {
  adminLocations: Array<{
    room: string;
    activeGroupCount: number;
    scheduledLessonCount: number;
    nextLessonAt: string | null;
  }>;
};

export type AdminScheduleQueryVariables = Exact<{
  from: string;
  to: string;
}>;

export type AdminScheduleQuery = {
  adminSchedule: Array<{
    id: string;
    groupId: string;
    startsAt: string;
    endsAt: string;
    room: string | null;
    status: LessonStatus;
    translations: Array<{ language: Language; title: string }>;
  }>;
};

export type AdminAttendanceQueryVariables = Exact<{
  lessonId: string | number;
}>;

export type AdminAttendanceQuery = {
  adminAttendance: Array<{
    id: string;
    studentId: string;
    studentName: string;
    status: AttendanceStatus;
    note: string | null;
    recordedAt: string;
  }>;
};

export type AdminTuitionLedgerQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminTuitionLedgerQuery = {
  adminTuitionLedger: {
    edges: Array<{
      node: {
        chargeId: string;
        studentDisplayName: string;
        groupName: string;
        billingMonth: string;
        dueDate: string;
        amountUzs: string;
        outstandingAmountUzs: string;
        status: TuitionLedgerStatus;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminTestsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
  language: Language;
}>;

export type AdminTestsQuery = {
  adminTests: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        groupName: string;
        teacherDisplayName: string;
        questionCount: number;
        attemptCount: number;
        awaitingReviewCount: number;
        status: ContentStatus;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminGroupProgressesQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminGroupProgressesQuery = {
  adminGroupProgresses: {
    edges: Array<{
      node: {
        groupId: string;
        groupName: string;
        teacherDisplayName: string;
        completionPercentage: number;
        averagePercentage: number | null;
        groupStatus: ContentStatus;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminLibraryItemsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminLibraryItemsQuery = {
  adminLibraryItems: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        ownerName: string;
        status: ContentStatus;
        updatedAt: string;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminMediaObjectsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminMediaObjectsQuery = {
  adminMediaObjects: {
    edges: Array<{
      node: {
        id: string;
        originalName: string;
        mimeType: string;
        status: MediaObjectStatus;
        malwareStatus: MediaMalwareStatus;
        createdAt: string;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminNotificationsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminNotificationsQuery = {
  myNotifications: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        body: string | null;
        kind: string;
        readAt: string | null;
        createdAt: string;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminAuditLogsQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type AdminAuditLogsQuery = {
  adminAuditLogs: {
    edges: Array<{
      node: {
        id: string;
        action: string;
        actorId: string | null;
        targetId: string;
        targetType: string;
        reason: string | null;
        createdAt: string;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type AdminProfileQueryVariables = Exact<{ [key: string]: never }>;

export type AdminProfileQuery = {
  myProfile: {
    id: string;
    displayName: string;
    email: string | null;
    branchName: string | null;
    phone: string | null;
    preferredLanguage: Language;
    avatarMediaObjectId: string | null;
    status: UserStatus;
    role: UserRole;
  };
};

export type AdminUpdateProfileMutationVariables = Exact<{
  input: UpdateMyProfileInput;
}>;

export type AdminUpdateProfileMutation = {
  updateMyProfile: {
    profile: {
      displayName: string;
      email: string | null;
      phone: string | null;
      preferredLanguage: Language;
      avatarMediaObjectId: string | null;
    };
  };
};

export type BeginCredentialLoginMutationVariables = Exact<{
  input: BeginCredentialLoginInput;
}>;

export type BeginCredentialLoginMutation = {
  beginCredentialLogin: {
    challengeId: string;
    maskedEmail: string;
    expiresAt: string;
    resendAvailableAt: string;
  };
};

export type ResendCredentialLoginCodeMutationVariables = Exact<{
  input: ResendCredentialLoginCodeInput;
}>;

export type ResendCredentialLoginCodeMutation = {
  resendCredentialLoginCode: {
    challengeId: string;
    maskedEmail: string;
    expiresAt: string;
    resendAvailableAt: string;
  };
};

export type VerifyCredentialLoginMutationVariables = Exact<{
  input: VerifyCredentialLoginInput;
}>;

export type VerifyCredentialLoginMutation = {
  verifyCredentialLogin: {
    accessToken: string;
    expiresInSeconds: number;
    refreshToken: string;
    refreshExpiresAt: string;
    user: { id: string; displayName: string; role: UserRole };
  };
};

export type RefreshCredentialSessionMutationVariables = Exact<{
  input: RefreshCredentialSessionInput;
}>;

export type RefreshCredentialSessionMutation = {
  refreshCredentialSession: {
    accessToken: string;
    expiresInSeconds: number;
    refreshToken: string;
    refreshExpiresAt: string;
    user: { id: string; displayName: string; role: UserRole };
  };
};

export type RevokeCredentialSessionMutationVariables = Exact<{
  input: RevokeCredentialSessionInput;
}>;

export type RevokeCredentialSessionMutation = { revokeCredentialSession: boolean };

export type AdminProvisionUserMutationVariables = Exact<{
  input: AdminProvisionUserInput;
}>;

export type AdminProvisionUserMutation = {
  adminProvisionUser: { user: { id: string; displayName: string; role: UserRole } };
};

export type PublicCoursesQueryVariables = Exact<{
  language: Language;
  first?: number | null | undefined;
}>;

export type PublicCoursesQuery = {
  publicCourses: {
    edges: Array<{
      node: {
        id: string;
        slug: string;
        language: Language;
        status: PublicContentStatus;
        category: PublicCourseCategory;
        accent: PublicCourseAccent;
        symbol: string;
        featured: boolean;
        position: number;
        heroVariant: string | null;
        imagePath: string | null;
        posterImagePath: string | null;
        title: string;
        description: string;
        audience: string | null;
        comparisonTitle: string | null;
        duration: string | null;
        focus: string | null;
        formatLabel: string | null;
        imageAlt: string | null;
        level: string | null;
        posterAlt: string | null;
        posterTitle: string | null;
        prerequisites: string | null;
        schedule: string | null;
        overview: Array<string>;
        highlights: Array<string>;
        outcomes: Array<string>;
        curriculum: Array<string>;
        tracks: Array<{
          position: number;
          title: string;
          level: string;
          summary: string;
          highlights: Array<string>;
        }>;
      };
    }>;
  };
};

export type PublicCourseQueryVariables = Exact<{
  language: Language;
  slug: string;
}>;

export type PublicCourseQuery = {
  publicCourse: {
    id: string;
    slug: string;
    language: Language;
    status: PublicContentStatus;
    category: PublicCourseCategory;
    accent: PublicCourseAccent;
    symbol: string;
    featured: boolean;
    position: number;
    heroVariant: string | null;
    imagePath: string | null;
    posterImagePath: string | null;
    title: string;
    description: string;
    audience: string | null;
    comparisonTitle: string | null;
    duration: string | null;
    focus: string | null;
    formatLabel: string | null;
    imageAlt: string | null;
    level: string | null;
    posterAlt: string | null;
    posterTitle: string | null;
    prerequisites: string | null;
    schedule: string | null;
    overview: Array<string>;
    highlights: Array<string>;
    outcomes: Array<string>;
    curriculum: Array<string>;
    tracks: Array<{
      position: number;
      title: string;
      level: string;
      summary: string;
      highlights: Array<string>;
    }>;
  };
};

export type PublicEventsQueryVariables = Exact<{
  language: Language;
  first?: number | null | undefined;
}>;

export type PublicEventsQuery = {
  publicEvents: {
    edges: Array<{
      node: {
        id: string;
        slug: string;
        language: Language;
        status: PublicContentStatus;
        timelineStatus: PublicEventTimelineStatus;
        position: number;
        startsAt: string;
        endsAt: string | null;
        capacity: number | null;
        location: string | null;
        imagePath: string | null;
        title: string;
        description: string;
        imageAlt: string | null;
        formatLabel: string | null;
        dateLabel: string | null;
        timeLabel: string | null;
        durationLabel: string | null;
        locationLabel: string | null;
        topics: Array<string>;
        overview: Array<string>;
        audience: Array<string>;
        takeaways: Array<string>;
        practicalInfo: Array<string>;
        programme: Array<{
          position: number;
          timeLabel: string;
          title: string;
          description: string;
        }>;
        faq: Array<{ position: number; question: string; answer: string }>;
      };
    }>;
  };
};

export type PublicEventQueryVariables = Exact<{
  language: Language;
  slug: string;
}>;

export type PublicEventQuery = {
  publicEvent: {
    id: string;
    slug: string;
    language: Language;
    status: PublicContentStatus;
    timelineStatus: PublicEventTimelineStatus;
    position: number;
    startsAt: string;
    endsAt: string | null;
    capacity: number | null;
    location: string | null;
    imagePath: string | null;
    title: string;
    description: string;
    imageAlt: string | null;
    formatLabel: string | null;
    dateLabel: string | null;
    timeLabel: string | null;
    durationLabel: string | null;
    locationLabel: string | null;
    topics: Array<string>;
    overview: Array<string>;
    audience: Array<string>;
    takeaways: Array<string>;
    practicalInfo: Array<string>;
    programme: Array<{ position: number; timeLabel: string; title: string; description: string }>;
    faq: Array<{ position: number; question: string; answer: string }>;
  };
};

export type PublicFaqQueryVariables = Exact<{
  language: Language;
}>;

export type PublicFaqQuery = {
  publicFaq: Array<{
    id: string;
    key: string;
    category: string;
    position: number;
    question: string;
    answer: string;
  }>;
};

export type PublicExamOfferingsQueryVariables = Exact<{
  language: Language;
}>;

export type PublicExamOfferingsQuery = {
  publicExamOfferings: Array<{
    id: string;
    key: string;
    position: number;
    title: string;
    description: string;
    level: string;
    duration: string;
    formatLabel: string;
    highlights: Array<string>;
    sessions: Array<{
      id: string;
      startsAt: string;
      capacity: number | null;
      availablePlaces: number;
    }>;
  }>;
};

export type PublicResultVideosQueryVariables = Exact<{
  language: Language;
}>;

export type PublicResultVideosQuery = {
  publicResultVideos: Array<{
    id: string;
    key: string;
    position: number;
    title: string;
    duration: string;
    videoPath: string;
    posterPath: string;
    source: { provider: string; creator: string; url: string; licenseUrl: string };
  }>;
};

export type RegisterForCourseMutationVariables = Exact<{
  input: RegisterForCourseInput;
}>;

export type RegisterForCourseMutation = {
  registerForCourse: { accepted: boolean; receiptId: string };
};

export type RegisterForEventMutationVariables = Exact<{
  input: RegisterForEventInput;
}>;

export type RegisterForEventMutation = {
  registerForEvent: { accepted: boolean; receiptId: string };
};

export type SubmitExamRegistrationMutationVariables = Exact<{
  input: SubmitExamRegistrationInput;
}>;

export type SubmitExamRegistrationMutation = {
  submitExamRegistration: { accepted: boolean; receiptId: string };
};

export type SubmitContactRequestMutationVariables = Exact<{
  input: SubmitContactRequestInput;
}>;

export type SubmitContactRequestMutation = {
  submitContactRequest: { accepted: boolean; receiptId: string };
};

export type StudentLibraryBooksQueryVariables = Exact<{
  language: Language;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type StudentLibraryBooksQuery = {
  studentLibraryItems: {
    edges: Array<{
      cursor: string;
      node: {
        id: string;
        title: string;
        description: string | null;
        category: { name: string };
        attachments: Array<{
          mediaObject: {
            id: string;
            mimeType: string;
            originalName: string;
            sizeBytes: number | null;
          };
        }>;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type StudentLibraryBookDownloadMutationVariables = Exact<{
  input: CreateLibraryDownloadIntentInput;
}>;

export type StudentLibraryBookDownloadMutation = {
  createStudentLibraryDownloadIntent: { downloadIntent: { url: string; expiresAt: string } };
};

export type StudentSettingsProfileQueryVariables = Exact<{ [key: string]: never }>;

export type StudentSettingsProfileQuery = {
  myProfile: {
    displayName: string;
    email: string | null;
    phone: string | null;
    preferredLanguage: Language;
    avatarMediaObjectId: string | null;
  };
};

export type StudentUpdateSettingsProfileMutationVariables = Exact<{
  input: UpdateMyProfileInput;
}>;

export type StudentUpdateSettingsProfileMutation = {
  updateMyProfile: {
    profile: {
      displayName: string;
      email: string | null;
      phone: string | null;
      preferredLanguage: Language;
      avatarMediaObjectId: string | null;
    };
  };
};

export type StudentTestPapersQueryVariables = Exact<{
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type StudentTestPapersQuery = {
  studentTestPapers: {
    edges: Array<{
      cursor: string;
      node: {
        id: string;
        isSaved: boolean;
        slug: string;
        academicYear: number;
        title: string;
        sourceLabel: string;
        skills: Array<{
          testId: string;
          testVersionId: string;
          skill: TestSkill;
          title: string;
          description: string | null;
          durationMinutes: number | null;
          questionCount: number;
          attemptId: string | null;
          attemptStatus: AttemptStatus | null;
        }>;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type StudentTestPaperQueryVariables = Exact<{
  paperId: string | number;
}>;

export type StudentTestPaperQuery = {
  studentTestPaper: {
    id: string;
    isSaved: boolean;
    slug: string;
    academicYear: number;
    title: string;
    sourceLabel: string;
    skills: Array<{
      testId: string;
      testVersionId: string;
      skill: TestSkill;
      title: string;
      description: string | null;
      durationMinutes: number | null;
      questionCount: number;
      attemptId: string | null;
      attemptStatus: AttemptStatus | null;
    }>;
  };
};

export type StartStudentTestAttemptMutationVariables = Exact<{
  input: StartTestAttemptInput;
}>;

export type StartStudentTestAttemptMutation = {
  startTestAttempt: {
    attempt: { " $fragmentRefs"?: { StudentAttemptFieldsFragment: StudentAttemptFieldsFragment } };
  };
};

export type StudentTestAttemptQueryVariables = Exact<{
  attemptId: string | number;
}>;

export type StudentTestAttemptQuery = {
  studentAttempt: {
    " $fragmentRefs"?: { StudentAttemptFieldsFragment: StudentAttemptFieldsFragment };
  };
};

export type StudentAttemptMediaDownloadQueryVariables = Exact<{
  attemptId: string | number;
  mediaObjectId: string | number;
}>;

export type StudentAttemptMediaDownloadQuery = {
  studentAttemptMediaDownload: { url: string; expiresAt: string };
};

export type StudentReleasedAttemptResultQueryVariables = Exact<{
  attemptId: string | number;
}>;

export type StudentReleasedAttemptResultQuery = {
  studentReleasedAttemptResult: {
    attemptId: string;
    testId: string;
    title: string;
    skill: TestSkill;
    correctAnswerCount: number;
    totalQuestionCount: number;
    percentage: number;
    sections: Array<{ id: string; position: number; title: string; content: string }>;
    answers: Array<{
      questionId: string;
      sectionId: string | null;
      position: number;
      prompt: string;
      studentAnswer: Array<string>;
      correctAnswer: Array<string>;
      isCorrect: boolean;
      evidenceStartOffset: number | null;
      evidenceEndOffset: number | null;
    }>;
  };
};

export type StudentSpeakingResultQueryVariables = Exact<{
  attemptId: string | number;
}>;

export type StudentSpeakingResultQuery = {
  studentSpeakingResult: {
    attemptId: string;
    title: string;
    fluencyCoherence: number;
    lexicalResource: number;
    grammaticalRangeAccuracy: number;
    pronunciation: number;
    practiceBand: number;
    feedback: string | null;
    releasedAt: string;
  } | null;
};

export type StudentResultsQueryVariables = Exact<{
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type StudentResultsQuery = {
  studentResults: {
    edges: Array<{
      cursor: string;
      node: {
        attemptId: string;
        testId: string;
        title: string;
        skill: TestSkill | null;
        attemptNumber: number;
        correctAnswerCount: number;
        totalQuestionCount: number;
        percentage: number;
        practiceBand: number | null;
        highestPercentage: number;
        passed: boolean;
        submittedAt: string;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type SaveStudentTestAnswerMutationVariables = Exact<{
  input: SaveAttemptAnswerInput;
}>;

export type SaveStudentTestAnswerMutation = {
  saveAttemptAnswer: {
    attempt: {
      id: string;
      status: AttemptStatus;
      serverTime: string;
      answers: Array<{
        questionId: string;
        selectedOptionId: string | null;
        selectedOptionIds: Array<string>;
        textValue: string | null;
        responseMediaObjectId: string | null;
        savedAt: string;
      }>;
    };
  };
};

export type SaveStudentAttemptNoteMutationVariables = Exact<{
  input: SaveAttemptSectionNoteInput;
}>;

export type SaveStudentAttemptNoteMutation = {
  saveAttemptSectionNote: {
    attempt: { id: string; notes: Array<{ sectionId: string; text: string; savedAt: string }> };
  };
};

export type CreateStudentAttemptAudioUploadMutationVariables = Exact<{
  input: CreateAttemptAudioUploadInput;
}>;

export type CreateStudentAttemptAudioUploadMutation = {
  createAttemptAudioUploadIntent: {
    uploadIntent: {
      mediaObjectId: string;
      method: string;
      url: string;
      sizeBytes: number;
      expiresAt: string;
      requiredHeaders: Array<{ name: string; value: string }>;
    };
  };
};

export type ConfirmStudentAttemptAudioUploadMutationVariables = Exact<{
  input: ConfirmAttemptAudioUploadInput;
}>;

export type ConfirmStudentAttemptAudioUploadMutation = {
  confirmAttemptAudioUpload: {
    mediaObject: {
      id: string;
      mediaType: MediaType;
      status: MediaObjectStatus;
      malwareStatus: MediaMalwareStatus;
    };
  };
};

export type SubmitStudentTestAttemptMutationVariables = Exact<{
  input: SubmitTestAttemptInput;
}>;

export type SubmitStudentTestAttemptMutation = {
  submitTestAttempt: {
    attempt: { " $fragmentRefs"?: { StudentAttemptFieldsFragment: StudentAttemptFieldsFragment } };
  };
};

export type StudentAttemptFieldsFragment = {
  id: string;
  testId: string;
  testVersionId: string;
  title: string;
  skill: TestSkill | null;
  status: AttemptStatus;
  attemptNumber: number;
  startedAt: string;
  expiresAt: string | null;
  submittedAt: string | null;
  serverTime: string;
  sections: Array<{
    id: string;
    position: number;
    title: string;
    instructions: string;
    content: string | null;
    mediaObjectId: string | null;
    blocks: Array<{
      id: string;
      position: number;
      kind: TestSectionBlockKind;
      caption: string | null;
      questionIds: Array<string>;
      tableHeaderRows: Array<{ cells: Array<string> }>;
      tableRows: Array<{ cells: Array<string> }>;
    }>;
  }>;
  questions: Array<{
    id: string;
    sectionId: string | null;
    kind: QuestionKind;
    position: number;
    prompt: string;
    answerLimit: number | null;
    maxSelections: number | null;
    options: Array<{ id: string; position: number; text: string }>;
  }>;
  answers: Array<{
    questionId: string;
    selectedOptionId: string | null;
    selectedOptionIds: Array<string>;
    textValue: string | null;
    responseMediaObjectId: string | null;
    savedAt: string;
  }>;
  notes: Array<{ sectionId: string; text: string; savedAt: string }>;
  result: {
    correctAnswerCount: number;
    totalQuestionCount: number;
    percentage: number;
    passed: boolean;
  } | null;
} & { " $fragmentName"?: "StudentAttemptFieldsFragment" };

export type StudentWritingResultQueryVariables = Exact<{
  attemptId: string | number;
}>;

export type StudentWritingResultQuery = {
  studentWritingResult: {
    attemptId: string;
    title: string;
    practiceBand: number;
    feedback: string | null;
    releasedAt: string;
    task1: {
      taskAchievement: number;
      coherenceCohesion: number;
      lexicalResource: number;
      grammaticalRangeAccuracy: number;
      feedback: string | null;
      band: number;
    };
    task2: {
      taskAchievement: number;
      coherenceCohesion: number;
      lexicalResource: number;
      grammaticalRangeAccuracy: number;
      feedback: string | null;
      band: number;
    };
    answers: Array<{ sectionPosition: number; prompt: string; textValue: string | null }>;
  } | null;
};

export type TeacherFinanceSnapshotsQueryVariables = Exact<{
  year: number;
}>;

export type TeacherFinanceSnapshotsQuery = {
  teacherFinanceSnapshots: {
    year: number;
    snapshots: Array<{
      year: number;
      month: number;
      incomeUzs: string;
      expectedAmountUzs: string;
      debtUzs: string;
      expensesUzs: string;
      penaltiesUzs: string;
      activeLearners: number;
      activeGroups: number;
      attendanceRate: number;
      paymentRate: number;
    }>;
  };
};

export type TeacherGroupsQueryVariables = Exact<{
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type TeacherGroupsQuery = {
  teacherGroups: {
    edges: Array<{
      node: {
        id: string;
        createdAt: string;
        name: string;
        slug: string;
        category: GroupCategory | null;
        room: string | null;
        scheduleDays: Array<number>;
        startsAtMinutes: number | null;
        endsAtMinutes: number | null;
        activeStudentCount: number;
        monthlyTuitionUzs: string | null;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type TeacherGroupQueryVariables = Exact<{
  groupId: string | number;
}>;

export type TeacherGroupQuery = {
  teacherGroup: {
    id: string;
    name: string;
    slug: string;
    category: GroupCategory | null;
    room: string | null;
    scheduleDays: Array<number>;
    startsAtMinutes: number | null;
    endsAtMinutes: number | null;
    activeStudentCount: number;
    monthlyTuitionUzs: string | null;
  };
};

export type TeacherGroupOverviewDataQueryVariables = Exact<{
  groupId: string | number;
}>;

export type TeacherGroupOverviewDataQuery = {
  teacherGroupOverview: {
    activeAssignmentCount: number;
    scheduledTestCount: number;
    materialCount: number;
    currentStudentCount: number;
  };
  teacherGroupRosterSummary: {
    currentTotal: number;
    historicalTotal: number;
    active: number;
    paused: number;
    debtors: number;
    departed: number;
  };
};

export type TeacherGroupRosterDataQueryVariables = Exact<{
  groupId: string | number;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type TeacherGroupRosterDataQuery = {
  teacherGroupRosterSummary: {
    currentTotal: number;
    historicalTotal: number;
    active: number;
    paused: number;
    debtors: number;
    departed: number;
  };
  teacherGroupRoster: {
    edges: Array<{
      node: {
        membershipId: string;
        studentId: string;
        displayName: string;
        email: string | null;
        phone: string | null;
        rosterStatus: GroupRosterStatus;
        outstandingBalanceUzs: string;
        paidAmountUzs: string;
        startedAt: string;
        endedAt: string | null;
        recentPayments: Array<{ id: string; amountUzs: string; paidAt: string }>;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type TeacherGroupTestPapersQueryVariables = Exact<{
  groupId: string | number;
  page?: number;
}>;

export type TeacherGroupTestPapersQuery = {
  teacherTestPapers: {
    items: Array<{
      id: string;
      practiceNumber: number;
      slug: string;
      academicYear: number;
      createdAt: string;
      completedStudentCount: number;
      title: string;
      sourceLabel: string;
      skills: Array<{
        testId: string;
        testVersionId: string;
        skill: TestSkill;
        title: string;
        description: string | null;
        durationMinutes: number | null;
        questionCount: number;
        status: TestVersionStatus;
      }>;
    }>;
    pageInfo: {
      currentPage: number;
      pageSize: number;
      totalItems: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
};

export type TeacherPracticeTestQueryVariables = Exact<{
  groupId: string | number;
  practiceNumber: number;
}>;

export type TeacherPracticeTestQuery = {
  teacherTestPaper: {
    id: string;
    practiceNumber: number;
    slug: string;
    academicYear: number;
    createdAt: string;
    completedStudentCount: number;
    title: string;
    sourceLabel: string;
    skills: Array<{
      testId: string;
      testVersionId: string;
      skill: TestSkill;
      title: string;
      description: string | null;
      durationMinutes: number | null;
      questionCount: number;
      status: TestVersionStatus;
    }>;
  };
};

export type TeacherCreatePracticeTestMutationVariables = Exact<{
  input: CreateTeacherPracticeTestInput;
}>;

export type TeacherCreatePracticeTestMutation = {
  createTeacherPracticeTest: { testPaper: { id: string; practiceNumber: number } };
};

export type TeacherDeletePracticeTestMutationVariables = Exact<{
  testPaperId: string | number;
}>;

export type TeacherDeletePracticeTestMutation = {
  deleteTeacherPracticeTest: {
    testPaperId: string;
    status: ContentStatus;
    deletedSkillCount: number;
  };
};

export type TeacherSpeakingPracticeQueryVariables = Exact<{
  testVersionId: string | number;
}>;

export type TeacherSpeakingPracticeQuery = {
  teacherTestVersion: {
    id: string;
    durationMinutes: number | null;
    primaryLanguage: Language;
    publishedAt: string | null;
    status: TestVersionStatus;
    translations: Array<{ language: Language; title: string; description: string | null }>;
    questions: Array<{
      id: string;
      position: number;
      sectionPosition: number | null;
      translations: Array<{ language: Language; prompt: string }>;
    }>;
  };
};

export type TeacherWritingPracticeQueryVariables = Exact<{
  testVersionId: string | number;
}>;

export type TeacherWritingPracticeQuery = {
  teacherTestVersion: {
    id: string;
    durationMinutes: number | null;
    primaryLanguage: Language;
    publishedAt: string | null;
    status: TestVersionStatus;
    translations: Array<{ language: Language; title: string; description: string | null }>;
    sections: Array<{
      id: string;
      position: number;
      mediaObjectId: string | null;
      translations: Array<{
        language: Language;
        title: string;
        instructions: string;
        content: string | null;
      }>;
    }>;
    questions: Array<{
      id: string;
      position: number;
      sectionPosition: number | null;
      translations: Array<{ language: Language; prompt: string }>;
    }>;
  };
};

export type TeacherObjectivePracticeQueryVariables = Exact<{
  testVersionId: string | number;
}>;

export type TeacherObjectivePracticeQuery = {
  teacherTestVersion: {
    id: string;
    durationMinutes: number | null;
    primaryLanguage: Language;
    publishedAt: string | null;
    status: TestVersionStatus;
    translations: Array<{ language: Language; title: string; description: string | null }>;
    sections: Array<{
      id: string;
      position: number;
      mediaObjectId: string | null;
      translations: Array<{
        language: Language;
        title: string;
        instructions: string;
        content: string | null;
      }>;
    }>;
    questions: Array<{
      id: string;
      position: number;
      sectionPosition: number | null;
      translations: Array<{ language: Language; prompt: string }>;
      options: Array<{
        id: string;
        position: number;
        translations: Array<{ language: Language; text: string }>;
      }>;
    }>;
  };
};

export type TeacherStudentAttemptsQueryVariables = Exact<{
  groupId: string | number;
  studentId: string | number;
  language: Language;
}>;

export type TeacherStudentAttemptsQuery = {
  teacherStudentAttempts: {
    edges: Array<{
      node: {
        attemptId: string;
        testId: string;
        title: string;
        skill: TestSkill | null;
        attemptNumber: number;
        status: AttemptStatus;
        submittedAt: string | null;
        percentage: number | null;
      };
    }>;
  };
};

export type TeacherSpeakingAttemptReviewQueryVariables = Exact<{
  attemptId: string | number;
  language: Language;
}>;

export type TeacherSpeakingAttemptReviewQuery = {
  teacherSpeakingAttemptReview: {
    attemptId: string;
    studentDisplayName: string;
    title: string;
    status: AttemptStatus;
    answers: Array<{
      questionId: string;
      position: number;
      sectionPosition: number;
      prompt: string;
      audioUrl: string | null;
      audioUrlExpiresAt: string | null;
    }>;
    review: {
      fluencyCoherence: number;
      lexicalResource: number;
      grammaticalRangeAccuracy: number;
      pronunciation: number;
      practiceBand: number;
      feedback: string | null;
      reviewedAt: string;
      releasedAt: string | null;
    } | null;
  };
};

export type TeacherSaveSpeakingAttemptReviewMutationVariables = Exact<{
  input: SaveSpeakingAttemptReviewInput;
  language: Language;
}>;

export type TeacherSaveSpeakingAttemptReviewMutation = {
  saveSpeakingAttemptReview: {
    attemptId: string;
    status: AttemptStatus;
    review: { practiceBand: number; releasedAt: string | null } | null;
  };
};

export type TeacherCreateGroupMutationVariables = Exact<{
  input: CreateTeacherGroupInput;
}>;

export type TeacherCreateGroupMutation = {
  createTeacherGroup: { group: { id: string; name: string; category: GroupCategory | null } };
};

export type TeacherUpdateGroupMutationVariables = Exact<{
  input: UpdateTeacherGroupInput;
}>;

export type TeacherUpdateGroupMutation = {
  updateTeacherGroup: {
    group: {
      id: string;
      name: string;
      slug: string;
      category: GroupCategory | null;
      room: string | null;
      scheduleDays: Array<number>;
      startsAtMinutes: number | null;
      endsAtMinutes: number | null;
      activeStudentCount: number;
      monthlyTuitionUzs: string | null;
    };
  };
};

export type TeacherDeleteGroupMutationVariables = Exact<{
  groupId: string | number;
}>;

export type TeacherDeleteGroupMutation = {
  deleteTeacherGroup: { group: { id: string; status: ContentStatus } };
};

export type TeacherCreateStudentInGroupMutationVariables = Exact<{
  input: TeacherCreateStudentInGroupInput;
}>;

export type TeacherCreateStudentInGroupMutation = {
  teacherCreateStudentInGroup: {
    membership: {
      membershipId: string;
      studentId: string;
      displayName: string;
      rosterStatus: GroupRosterStatus;
    };
  };
};

export type TeacherDeleteStudentMutationVariables = Exact<{
  input: TeacherDeleteStudentInput;
}>;

export type TeacherDeleteStudentMutation = {
  teacherDeleteStudent: {
    membership: {
      membershipId: string;
      studentId: string;
      status: UserStatus;
      endedAt: string | null;
    };
  };
};

export type TeacherSetStudentParticipationStatusMutationVariables = Exact<{
  input: SetGroupMembershipParticipationStatusInput;
}>;

export type TeacherSetStudentParticipationStatusMutation = {
  setGroupMembershipParticipationStatus: {
    membership: { membershipId: string; rosterStatus: GroupRosterStatus };
  };
};

export type TeacherLessonWorkspaceQueryVariables = Exact<{
  groupId: string | number;
  language: Language;
}>;

export type TeacherLessonWorkspaceQuery = {
  teacherGroupLessons: {
    edges: Array<{
      node: {
        id: string;
        groupId: string;
        lessonNumber: number;
        status: LessonStatus;
        startsAt: string;
        endsAt: string;
        room: string | null;
        createdAt: string;
        translations: Array<{ language: Language; title: string; summary: string | null }>;
      };
    }>;
  };
  teacherGroupMaterials: {
    edges: Array<{
      node: {
        id: string;
        groupId: string;
        lessonId: string | null;
        libraryItemId: string;
        kind: LessonMaterialKind;
        title: string;
        description: string | null;
        position: number;
        createdAt: string;
        mediaObject: {
          id: string;
          originalName: string;
          mimeType: string;
          sizeBytes: number | null;
          status: MediaObjectStatus;
          malwareStatus: MediaMalwareStatus;
        };
      };
    }>;
  };
  teacherLibraryCategories: Array<{ id: string; name: string }>;
};

export type TeacherCreateLessonMutationVariables = Exact<{
  input: CreateLessonInput;
}>;

export type TeacherCreateLessonMutation = {
  createLesson: {
    lesson: {
      id: string;
      groupId: string;
      lessonNumber: number;
      status: LessonStatus;
      startsAt: string;
      endsAt: string;
      room: string | null;
      createdAt: string;
      translations: Array<{ language: Language; title: string; summary: string | null }>;
    };
  };
};

export type TeacherUpdateLessonMutationVariables = Exact<{
  input: UpdateLessonInput;
}>;

export type TeacherUpdateLessonMutation = {
  updateLesson: {
    lesson: {
      id: string;
      lessonNumber: number;
      startsAt: string;
      endsAt: string;
      room: string | null;
      translations: Array<{ language: Language; title: string; summary: string | null }>;
    };
  };
};

export type TeacherSetLessonArchivedMutationVariables = Exact<{
  input: SetLessonArchivedInput;
}>;

export type TeacherSetLessonArchivedMutation = {
  setLessonArchived: { lesson: { id: string; archivedAt: string | null } };
};

export type TeacherLessonUploadIntentMutationVariables = Exact<{
  input: CreateMediaUploadIntentInput;
}>;

export type TeacherLessonUploadIntentMutation = {
  createMediaUploadIntent: {
    uploadIntent: {
      mediaObjectId: string;
      method: string;
      url: string;
      sizeBytes: number;
      expiresAt: string;
      requiredHeaders: Array<{ name: string; value: string }>;
    };
  };
};

export type TeacherConfirmLessonUploadMutationVariables = Exact<{
  input: MediaObjectReferenceInput;
}>;

export type TeacherConfirmLessonUploadMutation = {
  confirmMediaUpload: {
    mediaObject: {
      id: string;
      originalName: string;
      mimeType: string;
      sizeBytes: number | null;
      status: MediaObjectStatus;
      malwareStatus: MediaMalwareStatus;
    };
  };
};

export type TeacherCreateLessonResourceCategoryMutationVariables = Exact<{
  input: CreateLibraryCategoryInput;
}>;

export type TeacherCreateLessonResourceCategoryMutation = {
  createLibraryCategory: { category: { id: string; name: string } };
};

export type TeacherCreateLessonResourceItemMutationVariables = Exact<{
  input: CreateLibraryItemInput;
}>;

export type TeacherCreateLessonResourceItemMutation = {
  createLibraryItem: { item: { id: string; attachments: Array<{ mediaObject: { id: string } }> } };
};

export type TeacherCreateLessonResourceMutationVariables = Exact<{
  input: CreateLessonMaterialInput;
}>;

export type TeacherCreateLessonResourceMutation = {
  createLessonMaterial: {
    material: { id: string; lessonId: string | null; kind: LessonMaterialKind };
  };
};

export type TeacherArchiveLessonResourceMutationVariables = Exact<{
  input: SetLessonMaterialArchivedInput;
}>;

export type TeacherArchiveLessonResourceMutation = {
  setLessonMaterialArchived: { material: { id: string; archivedAt: string | null } };
};

export type TeacherLessonFileDownloadMutationVariables = Exact<{
  input: MediaObjectReferenceInput;
}>;

export type TeacherLessonFileDownloadMutation = {
  createMediaDownloadIntent: { downloadIntent: { url: string; expiresAt: string } };
};

export type TeacherLibraryCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type TeacherLibraryCategoriesQuery = {
  teacherLibraryCategories: Array<{ id: string; name: string }>;
};

export type TeacherLibraryItemsQueryVariables = Exact<{
  first?: number | null | undefined;
  after?: string | null | undefined;
  categoryId?: string | number | null | undefined;
}>;

export type TeacherLibraryItemsQuery = {
  teacherLibraryItems: {
    edges: Array<{
      cursor: string;
      node: {
        id: string;
        createdAt: string;
        primaryLanguage: Language;
        category: { id: string; name: string };
        translations: Array<{ language: Language; title: string; description: string | null }>;
        attachments: Array<{
          id: string;
          mediaObject: {
            id: string;
            originalName: string;
            mimeType: string;
            sizeBytes: number | null;
            status: MediaObjectStatus;
            malwareStatus: MediaMalwareStatus;
          };
        }>;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type TeacherLibraryCreateCategoryMutationVariables = Exact<{
  input: CreateLibraryCategoryInput;
}>;

export type TeacherLibraryCreateCategoryMutation = {
  createLibraryCategory: { category: { id: string; name: string } };
};

export type TeacherLibraryCreateItemMutationVariables = Exact<{
  input: CreateLibraryItemInput;
}>;

export type TeacherLibraryCreateItemMutation = { createLibraryItem: { item: { id: string } } };

export type TeacherLibraryArchiveItemMutationVariables = Exact<{
  input: SetLibraryItemArchivedInput;
}>;

export type TeacherLibraryArchiveItemMutation = {
  setLibraryItemArchived: { item: { id: string; archivedAt: string | null } };
};

export type TeacherDashboardMetricsQueryVariables = Exact<{ [key: string]: never }>;

export type TeacherDashboardMetricsQuery = {
  teacherDashboard: {
    newLearnersThisMonth: number;
    totalActiveLearners: number;
    departedThisMonth: number;
    monthsWithBest: number;
  };
};

export type TeacherHeaderQueryVariables = Exact<{ [key: string]: never }>;

export type TeacherHeaderQuery = {
  myUnreadNotificationCount: number;
  myProfile: { displayName: string; avatarMediaObjectId: string | null };
  myNotifications: {
    edges: Array<{
      node: {
        id: string;
        kind: string;
        taskId: string | null;
        attemptId: string | null;
        groupId: string | null;
        studentId: string | null;
        title: string;
        body: string | null;
        readAt: string | null;
        createdAt: string;
      };
    }>;
  };
};

export type TeacherNotificationUpdatesQueryVariables = Exact<{ [key: string]: never }>;

export type TeacherNotificationUpdatesQuery = {
  myUnreadNotificationCount: number;
  myNotifications: {
    edges: Array<{
      node: {
        id: string;
        kind: string;
        taskId: string | null;
        attemptId: string | null;
        groupId: string | null;
        studentId: string | null;
        title: string;
        body: string | null;
        readAt: string | null;
        createdAt: string;
      };
    }>;
  };
};

export type TeacherMarkNotificationReadMutationVariables = Exact<{
  input: MarkNotificationReadInput;
}>;

export type TeacherMarkNotificationReadMutation = {
  markNotificationRead: { notification: { id: string; readAt: string | null } };
};

export type TeacherAvatarIntentMutationVariables = Exact<{
  input: MediaObjectReferenceInput;
}>;

export type TeacherAvatarIntentMutation = {
  createMediaDownloadIntent: { downloadIntent: { url: string } };
};

export type TeacherTasksQueryVariables = Exact<{
  after?: string | null | undefined;
  first?: number | null | undefined;
}>;

export type TeacherTasksQuery = {
  teacherTasks: {
    edges: Array<{
      node: {
        id: string;
        groupId: string | null;
        kind: TeacherTaskKind;
        status: TeacherTaskStatus;
        title: string;
        dueAt: string | null;
        createdAt: string;
        completedAt: string | null;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type TeacherCompleteTaskMutationVariables = Exact<{
  input: CompleteTeacherTaskInput;
}>;

export type TeacherCompleteTaskMutation = {
  completeTeacherTask: {
    task: { id: string; status: TeacherTaskStatus; completedAt: string | null };
  };
};

export type AdminAssignTeacherTaskMutationVariables = Exact<{
  input: AdminAssignTeacherTaskInput;
}>;

export type AdminAssignTeacherTaskMutation = {
  adminAssignTeacherTask: { task: { id: string; title: string } };
};

export type TeacherProfileQueryVariables = Exact<{ [key: string]: never }>;

export type TeacherProfileQuery = {
  myProfile: {
    displayName: string;
    email: string | null;
    phone: string | null;
    teacherSubject: string | null;
    branchName: string | null;
    preferredLanguage: Language;
    avatarMediaObjectId: string | null;
  };
};

export type TeacherUpdateProfileMutationVariables = Exact<{
  input: UpdateMyProfileInput;
}>;

export type TeacherUpdateProfileMutation = {
  updateMyProfile: {
    profile: {
      displayName: string;
      email: string | null;
      phone: string | null;
      teacherSubject: string | null;
      branchName: string | null;
      preferredLanguage: Language;
      avatarMediaObjectId: string | null;
    };
  };
};

export type TeacherResultAttemptSkillQueryVariables = Exact<{
  attemptId: string | number;
}>;

export type TeacherResultAttemptSkillQuery = { teacherResultAttemptSkill: TestSkill };

export type TeacherObjectiveAttemptResultQueryVariables = Exact<{
  attemptId: string | number;
}>;

export type TeacherObjectiveAttemptResultQuery = {
  teacherObjectiveAttemptResult: {
    attemptId: string;
    studentDisplayName: string;
    title: string;
    skill: TestSkill;
    correctAnswerCount: number;
    totalQuestionCount: number;
    percentage: number;
    answers: Array<{
      position: number;
      prompt: string;
      studentAnswer: Array<string>;
      correctAnswer: Array<string>;
      isCorrect: boolean;
    }>;
  };
};

export type TeacherResultInboxQueryVariables = Exact<{
  groupId?: string | number | null | undefined;
  paperId?: string | number | null | undefined;
  skill?: TestSkill | null | undefined;
  status?: AttemptStatus | null | undefined;
  search?: string | null | undefined;
  first?: number | null | undefined;
  after?: string | null | undefined;
}>;

export type TeacherResultInboxQuery = {
  teacherResultInbox: {
    edges: Array<{
      cursor: string;
      node: {
        attemptId: string;
        studentId: string;
        studentDisplayName: string;
        groupId: string;
        groupName: string;
        paperId: string | null;
        practiceNumber: number | null;
        title: string;
        skill: TestSkill | null;
        status: AttemptStatus;
        attemptNumber: number;
        submittedAt: string;
        percentage: number | null;
        practiceBand: number | null;
        releasedAt: string | null;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type TeacherWritingAttemptReviewQueryVariables = Exact<{
  attemptId: string | number;
}>;

export type TeacherWritingAttemptReviewQuery = {
  teacherWritingAttemptReview: {
    attemptId: string;
    studentDisplayName: string;
    title: string;
    status: AttemptStatus;
    answers: Array<{
      questionId: string;
      sectionPosition: number;
      prompt: string;
      textValue: string | null;
    }>;
    review: {
      practiceBand: number;
      feedback: string | null;
      reviewedAt: string;
      updatedAt: string;
      releasedAt: string | null;
      task1: {
        taskAchievement: number;
        coherenceCohesion: number;
        lexicalResource: number;
        grammaticalRangeAccuracy: number;
        feedback: string | null;
        band: number;
      };
      task2: {
        taskAchievement: number;
        coherenceCohesion: number;
        lexicalResource: number;
        grammaticalRangeAccuracy: number;
        feedback: string | null;
        band: number;
      };
    } | null;
  };
};

export type TeacherSaveWritingAttemptReviewMutationVariables = Exact<{
  input: SaveWritingAttemptReviewInput;
}>;

export type TeacherSaveWritingAttemptReviewMutation = {
  saveWritingAttemptReview: {
    attemptId: string;
    status: AttemptStatus;
    review: { practiceBand: number; updatedAt: string; releasedAt: string | null } | null;
  };
};

export type TeacherTestAuthoringVersionFieldsFragment = {
  id: string;
  testId: string;
  version: number;
  status: TestVersionStatus;
  primaryLanguage: Language;
  availabilityStartsAt: string | null;
  availabilityEndsAt: string | null;
  durationMinutes: number | null;
  attemptLimit: number;
  passingPercentage: number;
  scoringRuleVersion: string;
  publishedAt: string | null;
  translations: Array<{ language: Language; title: string; description: string | null }>;
  sections: Array<{
    id: string;
    position: number;
    mediaObjectId: string | null;
    suggestedMinutes: number | null;
    minimumWords: number | null;
    preparationSeconds: number | null;
    responseSeconds: number | null;
    translations: Array<{
      language: Language;
      title: string;
      instructions: string;
      content: string | null;
    }>;
    blocks: Array<{
      id: string;
      position: number;
      kind: TestSectionBlockKind;
      mediaObjectId: string | null;
      mediaWidthPixels: number | null;
      mediaHeightPixels: number | null;
      mediaDurationSeconds: number | null;
      headingLevel: number | null;
      questionIds: Array<string>;
      tableHeaderRows: Array<{ cells: Array<string> }>;
      tableRows: Array<{ cells: Array<string> }>;
      translations: Array<{
        language: Language;
        text: string | null;
        altText: string | null;
        caption: string | null;
      }>;
    }>;
  }>;
  questions: Array<{
    id: string;
    position: number;
    sectionId: string | null;
    sectionPosition: number | null;
    kind: QuestionKind;
    answerLimit: number | null;
    maxSelections: number | null;
    acceptedAnswers: Array<string>;
    translations: Array<{ language: Language; prompt: string; rationale: string | null }>;
    options: Array<{
      id: string;
      position: number;
      isCorrect: boolean;
      translations: Array<{ language: Language; text: string }>;
    }>;
  }>;
} & { " $fragmentName"?: "TeacherTestAuthoringVersionFieldsFragment" };

export type TeacherTestAuthoringDraftQueryVariables = Exact<{
  testVersionId: string | number;
}>;

export type TeacherTestAuthoringDraftQuery = {
  teacherTestVersion: {
    " $fragmentRefs"?: {
      TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
    };
  };
};

export type TeacherTestAuthoringCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type TeacherTestAuthoringCategoriesQuery = {
  teacherTestCategories: Array<{ id: string; name: string }>;
};

export type TeacherValidateTestDraftQueryVariables = Exact<{
  testVersionId: string | number;
}>;

export type TeacherValidateTestDraftQuery = {
  validateTeacherTestDraft: {
    isPublishable: boolean;
    issues: Array<{ code: string; severity: string; path: string; message: string }>;
  };
};

export type TeacherCreateTestSectionMutationVariables = Exact<{
  input: CreateTestSectionInput;
}>;

export type TeacherCreateTestSectionMutation = {
  createTestSection: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherUpdateTestSectionMutationVariables = Exact<{
  input: UpdateTestSectionInput;
}>;

export type TeacherUpdateTestSectionMutation = {
  updateTestSection: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherReorderTestSectionsMutationVariables = Exact<{
  input: ReorderTestSectionsInput;
}>;

export type TeacherReorderTestSectionsMutation = {
  reorderTestSections: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherDeleteTestSectionMutationVariables = Exact<{
  input: TestVersionIdInput;
  testSectionId: string | number;
}>;

export type TeacherDeleteTestSectionMutation = {
  deleteTestDraftSection: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherCreateTestSectionBlockMutationVariables = Exact<{
  input: CreateTestSectionBlockInput;
}>;

export type TeacherCreateTestSectionBlockMutation = {
  createTestSectionBlock: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherUpdateTestSectionBlockMutationVariables = Exact<{
  input: UpdateTestSectionBlockInput;
}>;

export type TeacherUpdateTestSectionBlockMutation = {
  updateTestSectionBlock: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherReorderTestSectionBlocksMutationVariables = Exact<{
  input: ReorderTestSectionBlocksInput;
}>;

export type TeacherReorderTestSectionBlocksMutation = {
  reorderTestSectionBlocks: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherDeleteTestSectionBlockMutationVariables = Exact<{
  testSectionId: string | number;
  testSectionBlockId: string | number;
}>;

export type TeacherDeleteTestSectionBlockMutation = {
  deleteTestSectionBlock: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherCreateTestQuestionMutationVariables = Exact<{
  input: CreateTestQuestionInput;
}>;

export type TeacherCreateTestQuestionMutation = {
  createTestQuestion: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherUpdateTestQuestionMutationVariables = Exact<{
  input: UpdateTestQuestionInput;
}>;

export type TeacherUpdateTestQuestionMutation = {
  updateTestQuestion: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherReorderTestQuestionsMutationVariables = Exact<{
  input: ReorderTestQuestionsInput;
}>;

export type TeacherReorderTestQuestionsMutation = {
  reorderTestQuestions: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherDeleteTestQuestionMutationVariables = Exact<{
  input: TestVersionIdInput;
  questionId: string | number;
}>;

export type TeacherDeleteTestQuestionMutation = {
  deleteTestDraftQuestion: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherUpdateTestDraftSettingsMutationVariables = Exact<{
  input: UpdateTestDraftSettingsInput;
}>;

export type TeacherUpdateTestDraftSettingsMutation = {
  updateTestDraftSettings: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherReplaceTestDraftTranslationsMutationVariables = Exact<{
  input: ReplaceTestDraftTranslationsInput;
}>;

export type TeacherReplaceTestDraftTranslationsMutation = {
  replaceTestDraftTranslations: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherGenerateListeningAudioMutationVariables = Exact<{
  input: GenerateListeningAudioInput;
}>;

export type TeacherGenerateListeningAudioMutation = {
  generateListeningAudio: {
    audio: { mediaObjectId: string; url: string; expiresAt: string; durationSeconds: number };
  };
};

export type TeacherListeningAudioDownloadMutationVariables = Exact<{
  input: MediaObjectReferenceInput;
}>;

export type TeacherListeningAudioDownloadMutation = {
  createMediaDownloadIntent: { downloadIntent: { url: string; expiresAt: string } };
};

export type TeacherPublishTestVersionMutationVariables = Exact<{
  input: TestVersionIdInput;
}>;

export type TeacherPublishTestVersionMutation = {
  publishTestVersion: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type TeacherCreateNextTestVersionMutationVariables = Exact<{
  input: CreateNextTestVersionInput;
}>;

export type TeacherCreateNextTestVersionMutation = {
  createNextTestVersion: {
    testVersion: {
      " $fragmentRefs"?: {
        TeacherTestAuthoringVersionFieldsFragment: TeacherTestAuthoringVersionFieldsFragment;
      };
    };
  };
};

export type WorkspaceNotificationFeedQueryVariables = Exact<{
  first?: number | null | undefined;
  after?: string | null | undefined;
  unreadOnly?: boolean | null | undefined;
}>;

export type WorkspaceNotificationFeedQuery = {
  myUnreadNotificationCount: number;
  myNotifications: {
    edges: Array<{
      cursor: string;
      node: {
        id: string;
        kind: string;
        taskId: string | null;
        attemptId: string | null;
        groupId: string | null;
        studentId: string | null;
        title: string;
        body: string | null;
        readAt: string | null;
        createdAt: string;
      };
    }>;
    pageInfo: { endCursor: string | null; hasNextPage: boolean };
  };
};

export type WorkspaceMarkNotificationReadMutationVariables = Exact<{
  input: MarkNotificationReadInput;
}>;

export type WorkspaceMarkNotificationReadMutation = {
  markNotificationRead: { notification: { id: string; readAt: string | null } };
};

export type WorkspaceMarkAllNotificationsReadMutationVariables = Exact<{ [key: string]: never }>;

export type WorkspaceMarkAllNotificationsReadMutation = {
  markAllNotificationsRead: { updatedCount: number };
};

export const StudentAttemptFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentAttemptFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "StudentAttempt" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "skill" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "attemptNumber" } },
          { kind: "Field", name: { kind: "Name", value: "startedAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
          { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
          { kind: "Field", name: { kind: "Name", value: "serverTime" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "instructions" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "caption" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "prompt" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "text" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "answers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "questionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionIds" } },
                { kind: "Field", name: { kind: "Name", value: "textValue" } },
                { kind: "Field", name: { kind: "Name", value: "responseMediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "result" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "correctAnswerCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalQuestionCount" } },
                { kind: "Field", name: { kind: "Name", value: "percentage" } },
                { kind: "Field", name: { kind: "Name", value: "passed" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentAttemptFieldsFragment, unknown>;
export const TeacherTestAuthoringVersionFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherTestAuthoringVersionFieldsFragment, unknown>;
export const AdminOperationalOverviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminOperationalOverview" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminOperationalOverview" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "activeGroups" } },
                { kind: "Field", name: { kind: "Name", value: "activeUsers" } },
                { kind: "Field", name: { kind: "Name", value: "pendingIntakes" } },
                { kind: "Field", name: { kind: "Name", value: "pendingMedia" } },
                { kind: "Field", name: { kind: "Name", value: "unreadNotifications" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAcademicOverview" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "activeStudentCount" } },
                { kind: "Field", name: { kind: "Name", value: "activeTeacherCount" } },
                { kind: "Field", name: { kind: "Name", value: "assignedTestCount" } },
                { kind: "Field", name: { kind: "Name", value: "completionPercentage" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminOperationalOverviewQuery, AdminOperationalOverviewQueryVariables>;
export const AdminContactRequestsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminContactRequests" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminContactRequests" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            { kind: "Field", name: { kind: "Name", value: "email" } },
                            { kind: "Field", name: { kind: "Name", value: "phone" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminContactRequestsQuery, AdminContactRequestsQueryVariables>;
export const AdminEventRegistrationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminEventRegistrations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminEventRegistrations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            { kind: "Field", name: { kind: "Name", value: "email" } },
                            { kind: "Field", name: { kind: "Name", value: "phone" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>;
export const AdminExamRegistrationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminExamRegistrations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminExamRegistrations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            { kind: "Field", name: { kind: "Name", value: "email" } },
                            { kind: "Field", name: { kind: "Name", value: "phone" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminExamRegistrationsQuery, AdminExamRegistrationsQueryVariables>;
export const AdminStudentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminStudents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminStudents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "studentId" } },
                            { kind: "Field", name: { kind: "Name", value: "displayName" } },
                            { kind: "Field", name: { kind: "Name", value: "currentGroupName" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "averagePercentage" } },
                            { kind: "Field", name: { kind: "Name", value: "scoredTestCount" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminStudentsQuery, AdminStudentsQueryVariables>;
export const AdminUsersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminUsers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "role" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "UserRole" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminUsers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "role" },
                value: { kind: "Variable", name: { kind: "Name", value: "role" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "displayName" } },
                            { kind: "Field", name: { kind: "Name", value: "email" } },
                            { kind: "Field", name: { kind: "Name", value: "branchName" } },
                            { kind: "Field", name: { kind: "Name", value: "teacherSubject" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "role" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminUsersQuery, AdminUsersQueryVariables>;
export const AdminGroupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminGroups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminGroups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "room" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminGroupsQuery, AdminGroupsQueryVariables>;
export const AdminCoursesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminCourses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminCourses" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "level" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "duration" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminCoursesQuery, AdminCoursesQueryVariables>;
export const AdminEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "location" } },
                            { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminEventsQuery, AdminEventsQueryVariables>;
export const AdminLocationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminLocations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminLocations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "room" } },
                { kind: "Field", name: { kind: "Name", value: "activeGroupCount" } },
                { kind: "Field", name: { kind: "Name", value: "scheduledLessonCount" } },
                { kind: "Field", name: { kind: "Name", value: "nextLessonAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminLocationsQuery, AdminLocationsQueryVariables>;
export const AdminScheduleDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminSchedule" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "from" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "to" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "DateTime" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminSchedule" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "from" },
                value: { kind: "Variable", name: { kind: "Name", value: "from" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "to" },
                value: { kind: "Variable", name: { kind: "Name", value: "to" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "groupId" } },
                { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                { kind: "Field", name: { kind: "Name", value: "endsAt" } },
                { kind: "Field", name: { kind: "Name", value: "room" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminScheduleQuery, AdminScheduleQueryVariables>;
export const AdminAttendanceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminAttendance" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "lessonId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAttendance" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "lessonId" },
                value: { kind: "Variable", name: { kind: "Name", value: "lessonId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "studentId" } },
                { kind: "Field", name: { kind: "Name", value: "studentName" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "note" } },
                { kind: "Field", name: { kind: "Name", value: "recordedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminAttendanceQuery, AdminAttendanceQueryVariables>;
export const AdminTuitionLedgerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminTuitionLedger" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminTuitionLedger" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "chargeId" } },
                            { kind: "Field", name: { kind: "Name", value: "studentDisplayName" } },
                            { kind: "Field", name: { kind: "Name", value: "groupName" } },
                            { kind: "Field", name: { kind: "Name", value: "billingMonth" } },
                            { kind: "Field", name: { kind: "Name", value: "dueDate" } },
                            { kind: "Field", name: { kind: "Name", value: "amountUzs" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "outstandingAmountUzs" },
                            },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminTuitionLedgerQuery, AdminTuitionLedgerQueryVariables>;
export const AdminTestsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminTests" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminTests" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "groupName" } },
                            { kind: "Field", name: { kind: "Name", value: "teacherDisplayName" } },
                            { kind: "Field", name: { kind: "Name", value: "questionCount" } },
                            { kind: "Field", name: { kind: "Name", value: "attemptCount" } },
                            { kind: "Field", name: { kind: "Name", value: "awaitingReviewCount" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminTestsQuery, AdminTestsQueryVariables>;
export const AdminGroupProgressesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminGroupProgresses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminGroupProgresses" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "groupName" } },
                            { kind: "Field", name: { kind: "Name", value: "teacherDisplayName" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "completionPercentage" },
                            },
                            { kind: "Field", name: { kind: "Name", value: "averagePercentage" } },
                            { kind: "Field", name: { kind: "Name", value: "groupStatus" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminGroupProgressesQuery, AdminGroupProgressesQueryVariables>;
export const AdminLibraryItemsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminLibraryItems" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminLibraryItems" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "ownerName" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminLibraryItemsQuery, AdminLibraryItemsQueryVariables>;
export const AdminMediaObjectsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminMediaObjects" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminMediaObjects" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "originalName" } },
                            { kind: "Field", name: { kind: "Name", value: "mimeType" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "malwareStatus" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminMediaObjectsQuery, AdminMediaObjectsQueryVariables>;
export const AdminNotificationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminNotifications" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myNotifications" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "body" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "readAt" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminNotificationsQuery, AdminNotificationsQueryVariables>;
export const AdminAuditLogsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminAuditLogs" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAuditLogs" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "action" } },
                            { kind: "Field", name: { kind: "Name", value: "actorId" } },
                            { kind: "Field", name: { kind: "Name", value: "targetId" } },
                            { kind: "Field", name: { kind: "Name", value: "targetType" } },
                            { kind: "Field", name: { kind: "Name", value: "reason" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminAuditLogsQuery, AdminAuditLogsQueryVariables>;
export const AdminProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "AdminProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "branchName" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "preferredLanguage" } },
                { kind: "Field", name: { kind: "Name", value: "avatarMediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "role" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminProfileQuery, AdminProfileQueryVariables>;
export const AdminUpdateProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AdminUpdateProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateMyProfileInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMyProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "profile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "displayName" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      { kind: "Field", name: { kind: "Name", value: "preferredLanguage" } },
                      { kind: "Field", name: { kind: "Name", value: "avatarMediaObjectId" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminUpdateProfileMutation, AdminUpdateProfileMutationVariables>;
export const BeginCredentialLoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "BeginCredentialLogin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "BeginCredentialLoginInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "beginCredentialLogin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "challengeId" } },
                { kind: "Field", name: { kind: "Name", value: "maskedEmail" } },
                { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                { kind: "Field", name: { kind: "Name", value: "resendAvailableAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<BeginCredentialLoginMutation, BeginCredentialLoginMutationVariables>;
export const ResendCredentialLoginCodeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResendCredentialLoginCode" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ResendCredentialLoginCodeInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resendCredentialLoginCode" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "challengeId" } },
                { kind: "Field", name: { kind: "Name", value: "maskedEmail" } },
                { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                { kind: "Field", name: { kind: "Name", value: "resendAvailableAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResendCredentialLoginCodeMutation,
  ResendCredentialLoginCodeMutationVariables
>;
export const VerifyCredentialLoginDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "VerifyCredentialLogin" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "VerifyCredentialLoginInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "verifyCredentialLogin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                { kind: "Field", name: { kind: "Name", value: "expiresInSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "refreshToken" } },
                { kind: "Field", name: { kind: "Name", value: "refreshExpiresAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "displayName" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VerifyCredentialLoginMutation, VerifyCredentialLoginMutationVariables>;
export const RefreshCredentialSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RefreshCredentialSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RefreshCredentialSessionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "refreshCredentialSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accessToken" } },
                { kind: "Field", name: { kind: "Name", value: "expiresInSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "refreshToken" } },
                { kind: "Field", name: { kind: "Name", value: "refreshExpiresAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "displayName" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RefreshCredentialSessionMutation,
  RefreshCredentialSessionMutationVariables
>;
export const RevokeCredentialSessionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RevokeCredentialSession" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RevokeCredentialSessionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "revokeCredentialSession" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  RevokeCredentialSessionMutation,
  RevokeCredentialSessionMutationVariables
>;
export const AdminProvisionUserDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AdminProvisionUser" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "AdminProvisionUserInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminProvisionUser" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "user" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "displayName" } },
                      { kind: "Field", name: { kind: "Name", value: "role" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AdminProvisionUserMutation, AdminProvisionUserMutationVariables>;
export const PublicCoursesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicCourses" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "50" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicCourses" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "category" } },
                            { kind: "Field", name: { kind: "Name", value: "accent" } },
                            { kind: "Field", name: { kind: "Name", value: "symbol" } },
                            { kind: "Field", name: { kind: "Name", value: "featured" } },
                            { kind: "Field", name: { kind: "Name", value: "position" } },
                            { kind: "Field", name: { kind: "Name", value: "heroVariant" } },
                            { kind: "Field", name: { kind: "Name", value: "imagePath" } },
                            { kind: "Field", name: { kind: "Name", value: "posterImagePath" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "description" } },
                            { kind: "Field", name: { kind: "Name", value: "audience" } },
                            { kind: "Field", name: { kind: "Name", value: "comparisonTitle" } },
                            { kind: "Field", name: { kind: "Name", value: "duration" } },
                            { kind: "Field", name: { kind: "Name", value: "focus" } },
                            { kind: "Field", name: { kind: "Name", value: "formatLabel" } },
                            { kind: "Field", name: { kind: "Name", value: "imageAlt" } },
                            { kind: "Field", name: { kind: "Name", value: "level" } },
                            { kind: "Field", name: { kind: "Name", value: "posterAlt" } },
                            { kind: "Field", name: { kind: "Name", value: "posterTitle" } },
                            { kind: "Field", name: { kind: "Name", value: "prerequisites" } },
                            { kind: "Field", name: { kind: "Name", value: "schedule" } },
                            { kind: "Field", name: { kind: "Name", value: "overview" } },
                            { kind: "Field", name: { kind: "Name", value: "highlights" } },
                            { kind: "Field", name: { kind: "Name", value: "outcomes" } },
                            { kind: "Field", name: { kind: "Name", value: "curriculum" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tracks" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "position" } },
                                  { kind: "Field", name: { kind: "Name", value: "title" } },
                                  { kind: "Field", name: { kind: "Name", value: "level" } },
                                  { kind: "Field", name: { kind: "Name", value: "summary" } },
                                  { kind: "Field", name: { kind: "Name", value: "highlights" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicCoursesQuery, PublicCoursesQueryVariables>;
export const PublicCourseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicCourse" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicCourse" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "accent" } },
                { kind: "Field", name: { kind: "Name", value: "symbol" } },
                { kind: "Field", name: { kind: "Name", value: "featured" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "heroVariant" } },
                { kind: "Field", name: { kind: "Name", value: "imagePath" } },
                { kind: "Field", name: { kind: "Name", value: "posterImagePath" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "audience" } },
                { kind: "Field", name: { kind: "Name", value: "comparisonTitle" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                { kind: "Field", name: { kind: "Name", value: "focus" } },
                { kind: "Field", name: { kind: "Name", value: "formatLabel" } },
                { kind: "Field", name: { kind: "Name", value: "imageAlt" } },
                { kind: "Field", name: { kind: "Name", value: "level" } },
                { kind: "Field", name: { kind: "Name", value: "posterAlt" } },
                { kind: "Field", name: { kind: "Name", value: "posterTitle" } },
                { kind: "Field", name: { kind: "Name", value: "prerequisites" } },
                { kind: "Field", name: { kind: "Name", value: "schedule" } },
                { kind: "Field", name: { kind: "Name", value: "overview" } },
                { kind: "Field", name: { kind: "Name", value: "highlights" } },
                { kind: "Field", name: { kind: "Name", value: "outcomes" } },
                { kind: "Field", name: { kind: "Name", value: "curriculum" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "tracks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "level" } },
                      { kind: "Field", name: { kind: "Name", value: "summary" } },
                      { kind: "Field", name: { kind: "Name", value: "highlights" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicCourseQuery, PublicCourseQueryVariables>;
export const PublicEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicEvents" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          defaultValue: { kind: "IntValue", value: "50" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicEvents" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "timelineStatus" } },
                            { kind: "Field", name: { kind: "Name", value: "position" } },
                            { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                            { kind: "Field", name: { kind: "Name", value: "endsAt" } },
                            { kind: "Field", name: { kind: "Name", value: "capacity" } },
                            { kind: "Field", name: { kind: "Name", value: "location" } },
                            { kind: "Field", name: { kind: "Name", value: "imagePath" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "description" } },
                            { kind: "Field", name: { kind: "Name", value: "imageAlt" } },
                            { kind: "Field", name: { kind: "Name", value: "formatLabel" } },
                            { kind: "Field", name: { kind: "Name", value: "dateLabel" } },
                            { kind: "Field", name: { kind: "Name", value: "timeLabel" } },
                            { kind: "Field", name: { kind: "Name", value: "durationLabel" } },
                            { kind: "Field", name: { kind: "Name", value: "locationLabel" } },
                            { kind: "Field", name: { kind: "Name", value: "topics" } },
                            { kind: "Field", name: { kind: "Name", value: "overview" } },
                            { kind: "Field", name: { kind: "Name", value: "audience" } },
                            { kind: "Field", name: { kind: "Name", value: "takeaways" } },
                            { kind: "Field", name: { kind: "Name", value: "practicalInfo" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "programme" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "position" } },
                                  { kind: "Field", name: { kind: "Name", value: "timeLabel" } },
                                  { kind: "Field", name: { kind: "Name", value: "title" } },
                                  { kind: "Field", name: { kind: "Name", value: "description" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "faq" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "position" } },
                                  { kind: "Field", name: { kind: "Name", value: "question" } },
                                  { kind: "Field", name: { kind: "Name", value: "answer" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicEventsQuery, PublicEventsQueryVariables>;
export const PublicEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "slug" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "slug" },
                value: { kind: "Variable", name: { kind: "Name", value: "slug" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "timelineStatus" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                { kind: "Field", name: { kind: "Name", value: "endsAt" } },
                { kind: "Field", name: { kind: "Name", value: "capacity" } },
                { kind: "Field", name: { kind: "Name", value: "location" } },
                { kind: "Field", name: { kind: "Name", value: "imagePath" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "imageAlt" } },
                { kind: "Field", name: { kind: "Name", value: "formatLabel" } },
                { kind: "Field", name: { kind: "Name", value: "dateLabel" } },
                { kind: "Field", name: { kind: "Name", value: "timeLabel" } },
                { kind: "Field", name: { kind: "Name", value: "durationLabel" } },
                { kind: "Field", name: { kind: "Name", value: "locationLabel" } },
                { kind: "Field", name: { kind: "Name", value: "topics" } },
                { kind: "Field", name: { kind: "Name", value: "overview" } },
                { kind: "Field", name: { kind: "Name", value: "audience" } },
                { kind: "Field", name: { kind: "Name", value: "takeaways" } },
                { kind: "Field", name: { kind: "Name", value: "practicalInfo" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "programme" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "timeLabel" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "faq" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "question" } },
                      { kind: "Field", name: { kind: "Name", value: "answer" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicEventQuery, PublicEventQueryVariables>;
export const PublicFaqDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicFaq" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicFaq" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "key" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "question" } },
                { kind: "Field", name: { kind: "Name", value: "answer" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicFaqQuery, PublicFaqQueryVariables>;
export const PublicExamOfferingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicExamOfferings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicExamOfferings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "key" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "level" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                { kind: "Field", name: { kind: "Name", value: "formatLabel" } },
                { kind: "Field", name: { kind: "Name", value: "highlights" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sessions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                      { kind: "Field", name: { kind: "Name", value: "capacity" } },
                      { kind: "Field", name: { kind: "Name", value: "availablePlaces" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicExamOfferingsQuery, PublicExamOfferingsQueryVariables>;
export const PublicResultVideosDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PublicResultVideos" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publicResultVideos" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "key" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                { kind: "Field", name: { kind: "Name", value: "videoPath" } },
                { kind: "Field", name: { kind: "Name", value: "posterPath" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "source" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "provider" } },
                      { kind: "Field", name: { kind: "Name", value: "creator" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "licenseUrl" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PublicResultVideosQuery, PublicResultVideosQueryVariables>;
export const RegisterForCourseDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RegisterForCourse" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "RegisterForCourseInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "registerForCourse" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accepted" } },
                { kind: "Field", name: { kind: "Name", value: "receiptId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterForCourseMutation, RegisterForCourseMutationVariables>;
export const RegisterForEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "RegisterForEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "RegisterForEventInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "registerForEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accepted" } },
                { kind: "Field", name: { kind: "Name", value: "receiptId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegisterForEventMutation, RegisterForEventMutationVariables>;
export const SubmitExamRegistrationDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubmitExamRegistration" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SubmitExamRegistrationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitExamRegistration" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accepted" } },
                { kind: "Field", name: { kind: "Name", value: "receiptId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubmitExamRegistrationMutation,
  SubmitExamRegistrationMutationVariables
>;
export const SubmitContactRequestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubmitContactRequest" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SubmitContactRequestInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitContactRequest" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "accepted" } },
                { kind: "Field", name: { kind: "Name", value: "receiptId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubmitContactRequestMutation, SubmitContactRequestMutationVariables>;
export const StudentLibraryBooksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentLibraryBooks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentLibraryItems" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "description" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "attachments" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mediaObject" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "mimeType" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "originalName" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "sizeBytes" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentLibraryBooksQuery, StudentLibraryBooksQueryVariables>;
export const StudentLibraryBookDownloadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StudentLibraryBookDownload" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateLibraryDownloadIntentInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createStudentLibraryDownloadIntent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "downloadIntent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentLibraryBookDownloadMutation,
  StudentLibraryBookDownloadMutationVariables
>;
export const StudentSettingsProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentSettingsProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "preferredLanguage" } },
                { kind: "Field", name: { kind: "Name", value: "avatarMediaObjectId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentSettingsProfileQuery, StudentSettingsProfileQueryVariables>;
export const StudentUpdateSettingsProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StudentUpdateSettingsProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateMyProfileInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMyProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "profile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "displayName" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      { kind: "Field", name: { kind: "Name", value: "preferredLanguage" } },
                      { kind: "Field", name: { kind: "Name", value: "avatarMediaObjectId" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentUpdateSettingsProfileMutation,
  StudentUpdateSettingsProfileMutationVariables
>;
export const StudentTestPapersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentTestPapers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentTestPapers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "isSaved" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "academicYear" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "sourceLabel" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "skills" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "testId" } },
                                  { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
                                  { kind: "Field", name: { kind: "Name", value: "skill" } },
                                  { kind: "Field", name: { kind: "Name", value: "title" } },
                                  { kind: "Field", name: { kind: "Name", value: "description" } },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "durationMinutes" },
                                  },
                                  { kind: "Field", name: { kind: "Name", value: "questionCount" } },
                                  { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                                  { kind: "Field", name: { kind: "Name", value: "attemptStatus" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentTestPapersQuery, StudentTestPapersQueryVariables>;
export const StudentTestPaperDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentTestPaper" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "paperId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentTestPaper" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "paperId" },
                value: { kind: "Variable", name: { kind: "Name", value: "paperId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "isSaved" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "academicYear" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "sourceLabel" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "testId" } },
                      { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
                      { kind: "Field", name: { kind: "Name", value: "skill" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
                      { kind: "Field", name: { kind: "Name", value: "questionCount" } },
                      { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                      { kind: "Field", name: { kind: "Name", value: "attemptStatus" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentTestPaperQuery, StudentTestPaperQueryVariables>;
export const StartStudentTestAttemptDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "StartStudentTestAttempt" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "StartTestAttemptInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "startTestAttempt" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attempt" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "StudentAttemptFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentAttemptFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "StudentAttempt" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "skill" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "attemptNumber" } },
          { kind: "Field", name: { kind: "Name", value: "startedAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
          { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
          { kind: "Field", name: { kind: "Name", value: "serverTime" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "instructions" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "caption" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "prompt" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "text" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "answers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "questionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionIds" } },
                { kind: "Field", name: { kind: "Name", value: "textValue" } },
                { kind: "Field", name: { kind: "Name", value: "responseMediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "result" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "correctAnswerCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalQuestionCount" } },
                { kind: "Field", name: { kind: "Name", value: "percentage" } },
                { kind: "Field", name: { kind: "Name", value: "passed" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StartStudentTestAttemptMutation,
  StartStudentTestAttemptMutationVariables
>;
export const StudentTestAttemptDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentTestAttempt" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentAttempt" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "StudentAttemptFields" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentAttemptFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "StudentAttempt" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "skill" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "attemptNumber" } },
          { kind: "Field", name: { kind: "Name", value: "startedAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
          { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
          { kind: "Field", name: { kind: "Name", value: "serverTime" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "instructions" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "caption" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "prompt" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "text" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "answers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "questionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionIds" } },
                { kind: "Field", name: { kind: "Name", value: "textValue" } },
                { kind: "Field", name: { kind: "Name", value: "responseMediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "result" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "correctAnswerCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalQuestionCount" } },
                { kind: "Field", name: { kind: "Name", value: "percentage" } },
                { kind: "Field", name: { kind: "Name", value: "passed" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentTestAttemptQuery, StudentTestAttemptQueryVariables>;
export const StudentAttemptMediaDownloadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentAttemptMediaDownload" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "mediaObjectId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentAttemptMediaDownload" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "mediaObjectId" },
                value: { kind: "Variable", name: { kind: "Name", value: "mediaObjectId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "url" } },
                { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentAttemptMediaDownloadQuery,
  StudentAttemptMediaDownloadQueryVariables
>;
export const StudentReleasedAttemptResultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentReleasedAttemptResult" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentReleasedAttemptResult" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "testId" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "skill" } },
                { kind: "Field", name: { kind: "Name", value: "correctAnswerCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalQuestionCount" } },
                { kind: "Field", name: { kind: "Name", value: "percentage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sections" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "answers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "questionId" } },
                      { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "studentAnswer" } },
                      { kind: "Field", name: { kind: "Name", value: "correctAnswer" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      { kind: "Field", name: { kind: "Name", value: "evidenceStartOffset" } },
                      { kind: "Field", name: { kind: "Name", value: "evidenceEndOffset" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  StudentReleasedAttemptResultQuery,
  StudentReleasedAttemptResultQueryVariables
>;
export const StudentSpeakingResultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentSpeakingResult" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentSpeakingResult" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "fluencyCoherence" } },
                { kind: "Field", name: { kind: "Name", value: "lexicalResource" } },
                { kind: "Field", name: { kind: "Name", value: "grammaticalRangeAccuracy" } },
                { kind: "Field", name: { kind: "Name", value: "pronunciation" } },
                { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                { kind: "Field", name: { kind: "Name", value: "feedback" } },
                { kind: "Field", name: { kind: "Name", value: "releasedAt" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentSpeakingResultQuery, StudentSpeakingResultQueryVariables>;
export const StudentResultsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentResults" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentResults" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                            { kind: "Field", name: { kind: "Name", value: "testId" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "skill" } },
                            { kind: "Field", name: { kind: "Name", value: "attemptNumber" } },
                            { kind: "Field", name: { kind: "Name", value: "correctAnswerCount" } },
                            { kind: "Field", name: { kind: "Name", value: "totalQuestionCount" } },
                            { kind: "Field", name: { kind: "Name", value: "percentage" } },
                            { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                            { kind: "Field", name: { kind: "Name", value: "highestPercentage" } },
                            { kind: "Field", name: { kind: "Name", value: "passed" } },
                            { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentResultsQuery, StudentResultsQueryVariables>;
export const SaveStudentTestAnswerDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SaveStudentTestAnswer" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SaveAttemptAnswerInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveAttemptAnswer" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attempt" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                      { kind: "Field", name: { kind: "Name", value: "serverTime" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "answers" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "questionId" } },
                            { kind: "Field", name: { kind: "Name", value: "selectedOptionId" } },
                            { kind: "Field", name: { kind: "Name", value: "selectedOptionIds" } },
                            { kind: "Field", name: { kind: "Name", value: "textValue" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "responseMediaObjectId" },
                            },
                            { kind: "Field", name: { kind: "Name", value: "savedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SaveStudentTestAnswerMutation, SaveStudentTestAnswerMutationVariables>;
export const SaveStudentAttemptNoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SaveStudentAttemptNote" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SaveAttemptSectionNoteInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveAttemptSectionNote" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attempt" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "notes" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "savedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SaveStudentAttemptNoteMutation,
  SaveStudentAttemptNoteMutationVariables
>;
export const CreateStudentAttemptAudioUploadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateStudentAttemptAudioUpload" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateAttemptAudioUploadInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createAttemptAudioUploadIntent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "uploadIntent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "method" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "requiredHeaders" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "value" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "sizeBytes" } },
                      { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateStudentAttemptAudioUploadMutation,
  CreateStudentAttemptAudioUploadMutationVariables
>;
export const ConfirmStudentAttemptAudioUploadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ConfirmStudentAttemptAudioUpload" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ConfirmAttemptAudioUploadInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "confirmAttemptAudioUpload" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "mediaObject" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaType" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                      { kind: "Field", name: { kind: "Name", value: "malwareStatus" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ConfirmStudentAttemptAudioUploadMutation,
  ConfirmStudentAttemptAudioUploadMutationVariables
>;
export const SubmitStudentTestAttemptDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubmitStudentTestAttempt" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SubmitTestAttemptInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitTestAttempt" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attempt" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "StudentAttemptFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "StudentAttemptFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "StudentAttempt" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "skill" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "attemptNumber" } },
          { kind: "Field", name: { kind: "Name", value: "startedAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
          { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
          { kind: "Field", name: { kind: "Name", value: "serverTime" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "instructions" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "caption" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "prompt" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "text" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "answers" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "questionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionId" } },
                { kind: "Field", name: { kind: "Name", value: "selectedOptionIds" } },
                { kind: "Field", name: { kind: "Name", value: "textValue" } },
                { kind: "Field", name: { kind: "Name", value: "responseMediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "notes" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
                { kind: "Field", name: { kind: "Name", value: "savedAt" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "result" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "correctAnswerCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalQuestionCount" } },
                { kind: "Field", name: { kind: "Name", value: "percentage" } },
                { kind: "Field", name: { kind: "Name", value: "passed" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubmitStudentTestAttemptMutation,
  SubmitStudentTestAttemptMutationVariables
>;
export const StudentWritingResultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "StudentWritingResult" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "studentWritingResult" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                { kind: "Field", name: { kind: "Name", value: "feedback" } },
                { kind: "Field", name: { kind: "Name", value: "releasedAt" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "task1" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "taskAchievement" } },
                      { kind: "Field", name: { kind: "Name", value: "coherenceCohesion" } },
                      { kind: "Field", name: { kind: "Name", value: "lexicalResource" } },
                      { kind: "Field", name: { kind: "Name", value: "grammaticalRangeAccuracy" } },
                      { kind: "Field", name: { kind: "Name", value: "feedback" } },
                      { kind: "Field", name: { kind: "Name", value: "band" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "task2" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "taskAchievement" } },
                      { kind: "Field", name: { kind: "Name", value: "coherenceCohesion" } },
                      { kind: "Field", name: { kind: "Name", value: "lexicalResource" } },
                      { kind: "Field", name: { kind: "Name", value: "grammaticalRangeAccuracy" } },
                      { kind: "Field", name: { kind: "Name", value: "feedback" } },
                      { kind: "Field", name: { kind: "Name", value: "band" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "answers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "textValue" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<StudentWritingResultQuery, StudentWritingResultQueryVariables>;
export const TeacherFinanceSnapshotsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherFinanceSnapshots" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "year" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherFinanceSnapshots" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "year" },
                value: { kind: "Variable", name: { kind: "Name", value: "year" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "year" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "snapshots" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "year" } },
                      { kind: "Field", name: { kind: "Name", value: "month" } },
                      { kind: "Field", name: { kind: "Name", value: "incomeUzs" } },
                      { kind: "Field", name: { kind: "Name", value: "expectedAmountUzs" } },
                      { kind: "Field", name: { kind: "Name", value: "debtUzs" } },
                      { kind: "Field", name: { kind: "Name", value: "expensesUzs" } },
                      { kind: "Field", name: { kind: "Name", value: "penaltiesUzs" } },
                      { kind: "Field", name: { kind: "Name", value: "activeLearners" } },
                      { kind: "Field", name: { kind: "Name", value: "activeGroups" } },
                      { kind: "Field", name: { kind: "Name", value: "attendanceRate" } },
                      { kind: "Field", name: { kind: "Name", value: "paymentRate" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherFinanceSnapshotsQuery, TeacherFinanceSnapshotsQueryVariables>;
export const TeacherGroupsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherGroups" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroups" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: { kind: "EnumValue", value: "ACTIVE" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "slug" } },
                            { kind: "Field", name: { kind: "Name", value: "category" } },
                            { kind: "Field", name: { kind: "Name", value: "room" } },
                            { kind: "Field", name: { kind: "Name", value: "scheduleDays" } },
                            { kind: "Field", name: { kind: "Name", value: "startsAtMinutes" } },
                            { kind: "Field", name: { kind: "Name", value: "endsAtMinutes" } },
                            { kind: "Field", name: { kind: "Name", value: "activeStudentCount" } },
                            { kind: "Field", name: { kind: "Name", value: "monthlyTuitionUzs" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherGroupsQuery, TeacherGroupsQueryVariables>;
export const TeacherGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "category" } },
                { kind: "Field", name: { kind: "Name", value: "room" } },
                { kind: "Field", name: { kind: "Name", value: "scheduleDays" } },
                { kind: "Field", name: { kind: "Name", value: "startsAtMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "endsAtMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "activeStudentCount" } },
                { kind: "Field", name: { kind: "Name", value: "monthlyTuitionUzs" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherGroupQuery, TeacherGroupQueryVariables>;
export const TeacherGroupOverviewDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherGroupOverviewData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroupOverview" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "activeAssignmentCount" } },
                { kind: "Field", name: { kind: "Name", value: "scheduledTestCount" } },
                { kind: "Field", name: { kind: "Name", value: "materialCount" } },
                { kind: "Field", name: { kind: "Name", value: "currentStudentCount" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroupRosterSummary" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "currentTotal" } },
                { kind: "Field", name: { kind: "Name", value: "historicalTotal" } },
                { kind: "Field", name: { kind: "Name", value: "active" } },
                { kind: "Field", name: { kind: "Name", value: "paused" } },
                { kind: "Field", name: { kind: "Name", value: "debtors" } },
                { kind: "Field", name: { kind: "Name", value: "departed" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherGroupOverviewDataQuery, TeacherGroupOverviewDataQueryVariables>;
export const TeacherGroupRosterDataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherGroupRosterData" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroupRosterSummary" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "currentTotal" } },
                { kind: "Field", name: { kind: "Name", value: "historicalTotal" } },
                { kind: "Field", name: { kind: "Name", value: "active" } },
                { kind: "Field", name: { kind: "Name", value: "paused" } },
                { kind: "Field", name: { kind: "Name", value: "debtors" } },
                { kind: "Field", name: { kind: "Name", value: "departed" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroupRoster" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "includeEnded" },
                value: { kind: "BooleanValue", value: true },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "membershipId" } },
                            { kind: "Field", name: { kind: "Name", value: "studentId" } },
                            { kind: "Field", name: { kind: "Name", value: "displayName" } },
                            { kind: "Field", name: { kind: "Name", value: "email" } },
                            { kind: "Field", name: { kind: "Name", value: "phone" } },
                            { kind: "Field", name: { kind: "Name", value: "rosterStatus" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "outstandingBalanceUzs" },
                            },
                            { kind: "Field", name: { kind: "Name", value: "paidAmountUzs" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "recentPayments" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  { kind: "Field", name: { kind: "Name", value: "amountUzs" } },
                                  { kind: "Field", name: { kind: "Name", value: "paidAt" } },
                                ],
                              },
                            },
                            { kind: "Field", name: { kind: "Name", value: "startedAt" } },
                            { kind: "Field", name: { kind: "Name", value: "endedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherGroupRosterDataQuery, TeacherGroupRosterDataQueryVariables>;
export const TeacherGroupTestPapersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherGroupTestPapers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "page" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
          defaultValue: { kind: "IntValue", value: "1" },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTestPapers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "page" },
                value: { kind: "Variable", name: { kind: "Name", value: "page" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "practiceNumber" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "academicYear" } },
                      { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                      { kind: "Field", name: { kind: "Name", value: "completedStudentCount" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "sourceLabel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "skills" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "testId" } },
                            { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
                            { kind: "Field", name: { kind: "Name", value: "skill" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "description" } },
                            { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
                            { kind: "Field", name: { kind: "Name", value: "questionCount" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "currentPage" } },
                      { kind: "Field", name: { kind: "Name", value: "pageSize" } },
                      { kind: "Field", name: { kind: "Name", value: "totalItems" } },
                      { kind: "Field", name: { kind: "Name", value: "totalPages" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                      { kind: "Field", name: { kind: "Name", value: "hasPreviousPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherGroupTestPapersQuery, TeacherGroupTestPapersQueryVariables>;
export const TeacherPracticeTestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherPracticeTest" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "practiceNumber" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTestPaper" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "practiceNumber" },
                value: { kind: "Variable", name: { kind: "Name", value: "practiceNumber" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "practiceNumber" } },
                { kind: "Field", name: { kind: "Name", value: "slug" } },
                { kind: "Field", name: { kind: "Name", value: "academicYear" } },
                { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                { kind: "Field", name: { kind: "Name", value: "completedStudentCount" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "sourceLabel" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "skills" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "testId" } },
                      { kind: "Field", name: { kind: "Name", value: "testVersionId" } },
                      { kind: "Field", name: { kind: "Name", value: "skill" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                      { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
                      { kind: "Field", name: { kind: "Name", value: "questionCount" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherPracticeTestQuery, TeacherPracticeTestQueryVariables>;
export const TeacherCreatePracticeTestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreatePracticeTest" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTeacherPracticeTestInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTeacherPracticeTest" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testPaper" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "practiceNumber" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreatePracticeTestMutation,
  TeacherCreatePracticeTestMutationVariables
>;
export const TeacherDeletePracticeTestDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherDeletePracticeTest" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testPaperId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTeacherPracticeTest" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "testPaperId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testPaperId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "testPaperId" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                { kind: "Field", name: { kind: "Name", value: "deletedSkillCount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherDeletePracticeTestMutation,
  TeacherDeletePracticeTestMutationVariables
>;
export const TeacherSpeakingPracticeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherSpeakingPractice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTestVersion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "testVersionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
                { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "questions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "prompt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherSpeakingPracticeQuery, TeacherSpeakingPracticeQueryVariables>;
export const TeacherWritingPracticeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherWritingPractice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTestVersion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "testVersionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
                { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sections" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "instructions" } },
                            { kind: "Field", name: { kind: "Name", value: "content" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "questions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "prompt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherWritingPracticeQuery, TeacherWritingPracticeQueryVariables>;
export const TeacherObjectivePracticeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherObjectivePractice" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTestVersion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "testVersionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
                { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "description" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "sections" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "instructions" } },
                            { kind: "Field", name: { kind: "Name", value: "content" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "questions" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "prompt" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "options" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "position" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "translations" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "language" } },
                                  { kind: "Field", name: { kind: "Name", value: "text" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherObjectivePracticeQuery, TeacherObjectivePracticeQueryVariables>;
export const TeacherStudentAttemptsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherStudentAttempts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "studentId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherStudentAttempts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "studentId" },
                value: { kind: "Variable", name: { kind: "Name", value: "studentId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "50" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                            { kind: "Field", name: { kind: "Name", value: "testId" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "skill" } },
                            { kind: "Field", name: { kind: "Name", value: "attemptNumber" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
                            { kind: "Field", name: { kind: "Name", value: "percentage" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherStudentAttemptsQuery, TeacherStudentAttemptsQueryVariables>;
export const TeacherSpeakingAttemptReviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherSpeakingAttemptReview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherSpeakingAttemptReview" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "studentDisplayName" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "answers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "questionId" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "audioUrl" } },
                      { kind: "Field", name: { kind: "Name", value: "audioUrlExpiresAt" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "review" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "fluencyCoherence" } },
                      { kind: "Field", name: { kind: "Name", value: "lexicalResource" } },
                      { kind: "Field", name: { kind: "Name", value: "grammaticalRangeAccuracy" } },
                      { kind: "Field", name: { kind: "Name", value: "pronunciation" } },
                      { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                      { kind: "Field", name: { kind: "Name", value: "feedback" } },
                      { kind: "Field", name: { kind: "Name", value: "reviewedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "releasedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherSpeakingAttemptReviewQuery,
  TeacherSpeakingAttemptReviewQueryVariables
>;
export const TeacherSaveSpeakingAttemptReviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherSaveSpeakingAttemptReview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SaveSpeakingAttemptReviewInput" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveSpeakingAttemptReview" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "review" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                      { kind: "Field", name: { kind: "Name", value: "releasedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherSaveSpeakingAttemptReviewMutation,
  TeacherSaveSpeakingAttemptReviewMutationVariables
>;
export const TeacherCreateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateTeacherGroupInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTeacherGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "category" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherCreateGroupMutation, TeacherCreateGroupMutationVariables>;
export const TeacherUpdateGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherUpdateGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateTeacherGroupInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTeacherGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "slug" } },
                      { kind: "Field", name: { kind: "Name", value: "category" } },
                      { kind: "Field", name: { kind: "Name", value: "room" } },
                      { kind: "Field", name: { kind: "Name", value: "scheduleDays" } },
                      { kind: "Field", name: { kind: "Name", value: "startsAtMinutes" } },
                      { kind: "Field", name: { kind: "Name", value: "endsAtMinutes" } },
                      { kind: "Field", name: { kind: "Name", value: "activeStudentCount" } },
                      { kind: "Field", name: { kind: "Name", value: "monthlyTuitionUzs" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherUpdateGroupMutation, TeacherUpdateGroupMutationVariables>;
export const TeacherDeleteGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherDeleteGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTeacherGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "group" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherDeleteGroupMutation, TeacherDeleteGroupMutationVariables>;
export const TeacherCreateStudentInGroupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateStudentInGroup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TeacherCreateStudentInGroupInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherCreateStudentInGroup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "membership" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "membershipId" } },
                      { kind: "Field", name: { kind: "Name", value: "studentId" } },
                      { kind: "Field", name: { kind: "Name", value: "displayName" } },
                      { kind: "Field", name: { kind: "Name", value: "rosterStatus" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateStudentInGroupMutation,
  TeacherCreateStudentInGroupMutationVariables
>;
export const TeacherDeleteStudentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherDeleteStudent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "TeacherDeleteStudentInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherDeleteStudent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "membership" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "membershipId" } },
                      { kind: "Field", name: { kind: "Name", value: "studentId" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                      { kind: "Field", name: { kind: "Name", value: "endedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherDeleteStudentMutation, TeacherDeleteStudentMutationVariables>;
export const TeacherSetStudentParticipationStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherSetStudentParticipationStatus" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SetGroupMembershipParticipationStatusInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setGroupMembershipParticipationStatus" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "membership" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "membershipId" } },
                      { kind: "Field", name: { kind: "Name", value: "rosterStatus" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherSetStudentParticipationStatusMutation,
  TeacherSetStudentParticipationStatusMutationVariables
>;
export const TeacherLessonWorkspaceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherLessonWorkspace" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "language" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Language" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroupLessons" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "50" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "lessonNumber" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                            { kind: "Field", name: { kind: "Name", value: "endsAt" } },
                            { kind: "Field", name: { kind: "Name", value: "room" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "translations" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "language" } },
                                  { kind: "Field", name: { kind: "Name", value: "title" } },
                                  { kind: "Field", name: { kind: "Name", value: "summary" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherGroupMaterials" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "Variable", name: { kind: "Name", value: "language" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "100" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "lessonId" } },
                            { kind: "Field", name: { kind: "Name", value: "libraryItemId" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "description" } },
                            { kind: "Field", name: { kind: "Name", value: "position" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "mediaObject" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  { kind: "Field", name: { kind: "Name", value: "originalName" } },
                                  { kind: "Field", name: { kind: "Name", value: "mimeType" } },
                                  { kind: "Field", name: { kind: "Name", value: "sizeBytes" } },
                                  { kind: "Field", name: { kind: "Name", value: "status" } },
                                  { kind: "Field", name: { kind: "Name", value: "malwareStatus" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherLibraryCategories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherLessonWorkspaceQuery, TeacherLessonWorkspaceQueryVariables>;
export const TeacherCreateLessonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateLesson" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateLessonInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLesson" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lesson" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "groupId" } },
                      { kind: "Field", name: { kind: "Name", value: "lessonNumber" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                      { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                      { kind: "Field", name: { kind: "Name", value: "endsAt" } },
                      { kind: "Field", name: { kind: "Name", value: "room" } },
                      { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "summary" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherCreateLessonMutation, TeacherCreateLessonMutationVariables>;
export const TeacherUpdateLessonDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherUpdateLesson" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateLessonInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateLesson" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lesson" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "lessonNumber" } },
                      { kind: "Field", name: { kind: "Name", value: "startsAt" } },
                      { kind: "Field", name: { kind: "Name", value: "endsAt" } },
                      { kind: "Field", name: { kind: "Name", value: "room" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "summary" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherUpdateLessonMutation, TeacherUpdateLessonMutationVariables>;
export const TeacherSetLessonArchivedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherSetLessonArchived" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "SetLessonArchivedInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setLessonArchived" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "lesson" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "archivedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherSetLessonArchivedMutation,
  TeacherSetLessonArchivedMutationVariables
>;
export const TeacherLessonUploadIntentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherLessonUploadIntent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateMediaUploadIntentInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createMediaUploadIntent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "uploadIntent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "method" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "sizeBytes" } },
                      { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "requiredHeaders" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "value" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherLessonUploadIntentMutation,
  TeacherLessonUploadIntentMutationVariables
>;
export const TeacherConfirmLessonUploadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherConfirmLessonUpload" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "MediaObjectReferenceInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "confirmMediaUpload" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "mediaObject" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "originalName" } },
                      { kind: "Field", name: { kind: "Name", value: "mimeType" } },
                      { kind: "Field", name: { kind: "Name", value: "sizeBytes" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                      { kind: "Field", name: { kind: "Name", value: "malwareStatus" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherConfirmLessonUploadMutation,
  TeacherConfirmLessonUploadMutationVariables
>;
export const TeacherCreateLessonResourceCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateLessonResourceCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateLibraryCategoryInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLibraryCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateLessonResourceCategoryMutation,
  TeacherCreateLessonResourceCategoryMutationVariables
>;
export const TeacherCreateLessonResourceItemDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateLessonResourceItem" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateLibraryItemInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLibraryItem" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "item" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "attachments" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "mediaObject" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateLessonResourceItemMutation,
  TeacherCreateLessonResourceItemMutationVariables
>;
export const TeacherCreateLessonResourceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateLessonResource" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateLessonMaterialInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLessonMaterial" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "material" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "lessonId" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateLessonResourceMutation,
  TeacherCreateLessonResourceMutationVariables
>;
export const TeacherArchiveLessonResourceDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherArchiveLessonResource" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SetLessonMaterialArchivedInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setLessonMaterialArchived" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "material" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "archivedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherArchiveLessonResourceMutation,
  TeacherArchiveLessonResourceMutationVariables
>;
export const TeacherLessonFileDownloadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherLessonFileDownload" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "MediaObjectReferenceInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createMediaDownloadIntent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "downloadIntent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherLessonFileDownloadMutation,
  TeacherLessonFileDownloadMutationVariables
>;
export const TeacherLibraryCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherLibraryCategories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherLibraryCategories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherLibraryCategoriesQuery, TeacherLibraryCategoriesQueryVariables>;
export const TeacherLibraryItemsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherLibraryItems" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "categoryId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherLibraryItems" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "categoryId" },
                value: { kind: "Variable", name: { kind: "Name", value: "categoryId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "category" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "translations" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "language" } },
                                  { kind: "Field", name: { kind: "Name", value: "title" } },
                                  { kind: "Field", name: { kind: "Name", value: "description" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "attachments" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "mediaObject" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "originalName" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "mimeType" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "sizeBytes" },
                                        },
                                        { kind: "Field", name: { kind: "Name", value: "status" } },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "malwareStatus" },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherLibraryItemsQuery, TeacherLibraryItemsQueryVariables>;
export const TeacherLibraryCreateCategoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherLibraryCreateCategory" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateLibraryCategoryInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLibraryCategory" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "category" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherLibraryCreateCategoryMutation,
  TeacherLibraryCreateCategoryMutationVariables
>;
export const TeacherLibraryCreateItemDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherLibraryCreateItem" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateLibraryItemInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createLibraryItem" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "item" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherLibraryCreateItemMutation,
  TeacherLibraryCreateItemMutationVariables
>;
export const TeacherLibraryArchiveItemDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherLibraryArchiveItem" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SetLibraryItemArchivedInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "setLibraryItemArchived" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "item" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "archivedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherLibraryArchiveItemMutation,
  TeacherLibraryArchiveItemMutationVariables
>;
export const TeacherDashboardMetricsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherDashboardMetrics" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherDashboard" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "newLearnersThisMonth" } },
                { kind: "Field", name: { kind: "Name", value: "totalActiveLearners" } },
                { kind: "Field", name: { kind: "Name", value: "departedThisMonth" } },
                { kind: "Field", name: { kind: "Name", value: "monthsWithBest" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherDashboardMetricsQuery, TeacherDashboardMetricsQueryVariables>;
export const TeacherHeaderDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherHeader" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "avatarMediaObjectId" } },
              ],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "myUnreadNotificationCount" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "myNotifications" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "8" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "taskId" } },
                            { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "studentId" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "body" } },
                            { kind: "Field", name: { kind: "Name", value: "readAt" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherHeaderQuery, TeacherHeaderQueryVariables>;
export const TeacherNotificationUpdatesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherNotificationUpdates" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "myUnreadNotificationCount" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "myNotifications" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "8" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "taskId" } },
                            { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "studentId" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "body" } },
                            { kind: "Field", name: { kind: "Name", value: "readAt" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherNotificationUpdatesQuery,
  TeacherNotificationUpdatesQueryVariables
>;
export const TeacherMarkNotificationReadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherMarkNotificationRead" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "MarkNotificationReadInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "markNotificationRead" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notification" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "readAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherMarkNotificationReadMutation,
  TeacherMarkNotificationReadMutationVariables
>;
export const TeacherAvatarIntentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherAvatarIntent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "MediaObjectReferenceInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createMediaDownloadIntent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "downloadIntent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "url" } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherAvatarIntentMutation, TeacherAvatarIntentMutationVariables>;
export const TeacherTasksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherTasks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTasks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "dueAt" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                            { kind: "Field", name: { kind: "Name", value: "completedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherTasksQuery, TeacherTasksQueryVariables>;
export const TeacherCompleteTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCompleteTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CompleteTeacherTaskInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "completeTeacherTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "task" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "status" } },
                      { kind: "Field", name: { kind: "Name", value: "completedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherCompleteTaskMutation, TeacherCompleteTaskMutationVariables>;
export const AdminAssignTeacherTaskDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "AdminAssignTeacherTask" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AdminAssignTeacherTaskInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "adminAssignTeacherTask" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "task" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  AdminAssignTeacherTaskMutation,
  AdminAssignTeacherTaskMutationVariables
>;
export const TeacherProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "displayName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "phone" } },
                { kind: "Field", name: { kind: "Name", value: "teacherSubject" } },
                { kind: "Field", name: { kind: "Name", value: "branchName" } },
                { kind: "Field", name: { kind: "Name", value: "preferredLanguage" } },
                { kind: "Field", name: { kind: "Name", value: "avatarMediaObjectId" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherProfileQuery, TeacherProfileQueryVariables>;
export const TeacherUpdateProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherUpdateProfile" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateMyProfileInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateMyProfile" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "profile" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "displayName" } },
                      { kind: "Field", name: { kind: "Name", value: "email" } },
                      { kind: "Field", name: { kind: "Name", value: "phone" } },
                      { kind: "Field", name: { kind: "Name", value: "teacherSubject" } },
                      { kind: "Field", name: { kind: "Name", value: "branchName" } },
                      { kind: "Field", name: { kind: "Name", value: "preferredLanguage" } },
                      { kind: "Field", name: { kind: "Name", value: "avatarMediaObjectId" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherUpdateProfileMutation, TeacherUpdateProfileMutationVariables>;
export const TeacherResultAttemptSkillDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherResultAttemptSkill" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherResultAttemptSkill" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherResultAttemptSkillQuery,
  TeacherResultAttemptSkillQueryVariables
>;
export const TeacherObjectiveAttemptResultDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherObjectiveAttemptResult" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherObjectiveAttemptResult" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "studentDisplayName" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "skill" } },
                { kind: "Field", name: { kind: "Name", value: "correctAnswerCount" } },
                { kind: "Field", name: { kind: "Name", value: "totalQuestionCount" } },
                { kind: "Field", name: { kind: "Name", value: "percentage" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "answers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "studentAnswer" } },
                      { kind: "Field", name: { kind: "Name", value: "correctAnswer" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherObjectiveAttemptResultQuery,
  TeacherObjectiveAttemptResultQueryVariables
>;
export const TeacherResultInboxDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherResultInbox" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "paperId" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skill" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "TestSkill" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "status" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "AttemptStatus" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "search" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherResultInbox" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "groupId" },
                value: { kind: "Variable", name: { kind: "Name", value: "groupId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "paperId" },
                value: { kind: "Variable", name: { kind: "Name", value: "paperId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "skill" },
                value: { kind: "Variable", name: { kind: "Name", value: "skill" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "status" },
                value: { kind: "Variable", name: { kind: "Name", value: "status" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "search" },
                value: { kind: "Variable", name: { kind: "Name", value: "search" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                            { kind: "Field", name: { kind: "Name", value: "studentId" } },
                            { kind: "Field", name: { kind: "Name", value: "studentDisplayName" } },
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "groupName" } },
                            { kind: "Field", name: { kind: "Name", value: "paperId" } },
                            { kind: "Field", name: { kind: "Name", value: "practiceNumber" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "skill" } },
                            { kind: "Field", name: { kind: "Name", value: "status" } },
                            { kind: "Field", name: { kind: "Name", value: "attemptNumber" } },
                            { kind: "Field", name: { kind: "Name", value: "submittedAt" } },
                            { kind: "Field", name: { kind: "Name", value: "percentage" } },
                            { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                            { kind: "Field", name: { kind: "Name", value: "releasedAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherResultInboxQuery, TeacherResultInboxQueryVariables>;
export const TeacherWritingAttemptReviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherWritingAttemptReview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherWritingAttemptReview" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "attemptId" },
                value: { kind: "Variable", name: { kind: "Name", value: "attemptId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "studentDisplayName" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "answers" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "questionId" } },
                      { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "textValue" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "review" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "task1" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "taskAchievement" } },
                            { kind: "Field", name: { kind: "Name", value: "coherenceCohesion" } },
                            { kind: "Field", name: { kind: "Name", value: "lexicalResource" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "grammaticalRangeAccuracy" },
                            },
                            { kind: "Field", name: { kind: "Name", value: "feedback" } },
                            { kind: "Field", name: { kind: "Name", value: "band" } },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "task2" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "taskAchievement" } },
                            { kind: "Field", name: { kind: "Name", value: "coherenceCohesion" } },
                            { kind: "Field", name: { kind: "Name", value: "lexicalResource" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "grammaticalRangeAccuracy" },
                            },
                            { kind: "Field", name: { kind: "Name", value: "feedback" } },
                            { kind: "Field", name: { kind: "Name", value: "band" } },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                      { kind: "Field", name: { kind: "Name", value: "feedback" } },
                      { kind: "Field", name: { kind: "Name", value: "reviewedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "releasedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherWritingAttemptReviewQuery,
  TeacherWritingAttemptReviewQueryVariables
>;
export const TeacherSaveWritingAttemptReviewDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherSaveWritingAttemptReview" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SaveWritingAttemptReviewInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "saveWritingAttemptReview" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "language" },
                value: { kind: "EnumValue", value: "EN" },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                { kind: "Field", name: { kind: "Name", value: "status" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "review" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "practiceBand" } },
                      { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
                      { kind: "Field", name: { kind: "Name", value: "releasedAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherSaveWritingAttemptReviewMutation,
  TeacherSaveWritingAttemptReviewMutationVariables
>;
export const TeacherTestAuthoringDraftDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherTestAuthoringDraft" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTestVersion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "testVersionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherTestAuthoringDraftQuery,
  TeacherTestAuthoringDraftQueryVariables
>;
export const TeacherTestAuthoringCategoriesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherTestAuthoringCategories" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "teacherTestCategories" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherTestAuthoringCategoriesQuery,
  TeacherTestAuthoringCategoriesQueryVariables
>;
export const TeacherValidateTestDraftDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "TeacherValidateTestDraft" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "validateTeacherTestDraft" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "testVersionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testVersionId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "isPublishable" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "issues" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "code" } },
                      { kind: "Field", name: { kind: "Name", value: "severity" } },
                      { kind: "Field", name: { kind: "Name", value: "path" } },
                      { kind: "Field", name: { kind: "Name", value: "message" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<TeacherValidateTestDraftQuery, TeacherValidateTestDraftQueryVariables>;
export const TeacherCreateTestSectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateTestSection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateTestSectionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTestSection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateTestSectionMutation,
  TeacherCreateTestSectionMutationVariables
>;
export const TeacherUpdateTestSectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherUpdateTestSection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateTestSectionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTestSection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherUpdateTestSectionMutation,
  TeacherUpdateTestSectionMutationVariables
>;
export const TeacherReorderTestSectionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherReorderTestSections" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ReorderTestSectionsInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reorderTestSections" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherReorderTestSectionsMutation,
  TeacherReorderTestSectionsMutationVariables
>;
export const TeacherDeleteTestSectionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherDeleteTestSection" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "TestVersionIdInput" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testSectionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTestDraftSection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "testSectionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testSectionId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherDeleteTestSectionMutation,
  TeacherDeleteTestSectionMutationVariables
>;
export const TeacherCreateTestSectionBlockDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateTestSectionBlock" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateTestSectionBlockInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTestSectionBlock" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateTestSectionBlockMutation,
  TeacherCreateTestSectionBlockMutationVariables
>;
export const TeacherUpdateTestSectionBlockDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherUpdateTestSectionBlock" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTestSectionBlockInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTestSectionBlock" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherUpdateTestSectionBlockMutation,
  TeacherUpdateTestSectionBlockMutationVariables
>;
export const TeacherReorderTestSectionBlocksDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherReorderTestSectionBlocks" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReorderTestSectionBlocksInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reorderTestSectionBlocks" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherReorderTestSectionBlocksMutation,
  TeacherReorderTestSectionBlocksMutationVariables
>;
export const TeacherDeleteTestSectionBlockDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherDeleteTestSectionBlock" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testSectionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "testSectionBlockId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTestSectionBlock" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "testSectionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testSectionId" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "testSectionBlockId" },
                value: { kind: "Variable", name: { kind: "Name", value: "testSectionBlockId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherDeleteTestSectionBlockMutation,
  TeacherDeleteTestSectionBlockMutationVariables
>;
export const TeacherCreateTestQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateTestQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "CreateTestQuestionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createTestQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateTestQuestionMutation,
  TeacherCreateTestQuestionMutationVariables
>;
export const TeacherUpdateTestQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherUpdateTestQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "UpdateTestQuestionInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTestQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherUpdateTestQuestionMutation,
  TeacherUpdateTestQuestionMutationVariables
>;
export const TeacherReorderTestQuestionsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherReorderTestQuestions" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ReorderTestQuestionsInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "reorderTestQuestions" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherReorderTestQuestionsMutation,
  TeacherReorderTestQuestionsMutationVariables
>;
export const TeacherDeleteTestQuestionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherDeleteTestQuestion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "TestVersionIdInput" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "questionId" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteTestDraftQuestion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "questionId" },
                value: { kind: "Variable", name: { kind: "Name", value: "questionId" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherDeleteTestQuestionMutation,
  TeacherDeleteTestQuestionMutationVariables
>;
export const TeacherUpdateTestDraftSettingsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherUpdateTestDraftSettings" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "UpdateTestDraftSettingsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateTestDraftSettings" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherUpdateTestDraftSettingsMutation,
  TeacherUpdateTestDraftSettingsMutationVariables
>;
export const TeacherReplaceTestDraftTranslationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherReplaceTestDraftTranslations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "ReplaceTestDraftTranslationsInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "replaceTestDraftTranslations" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherReplaceTestDraftTranslationsMutation,
  TeacherReplaceTestDraftTranslationsMutationVariables
>;
export const TeacherGenerateListeningAudioDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherGenerateListeningAudio" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GenerateListeningAudioInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "generateListeningAudio" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "audio" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                      { kind: "Field", name: { kind: "Name", value: "durationSeconds" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherGenerateListeningAudioMutation,
  TeacherGenerateListeningAudioMutationVariables
>;
export const TeacherListeningAudioDownloadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherListeningAudioDownload" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "MediaObjectReferenceInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createMediaDownloadIntent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "downloadIntent" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "url" } },
                      { kind: "Field", name: { kind: "Name", value: "expiresAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherListeningAudioDownloadMutation,
  TeacherListeningAudioDownloadMutationVariables
>;
export const TeacherPublishTestVersionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherPublishTestVersion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "TestVersionIdInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "publishTestVersion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherPublishTestVersionMutation,
  TeacherPublishTestVersionMutationVariables
>;
export const TeacherCreateNextTestVersionDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "TeacherCreateNextTestVersion" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateNextTestVersionInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createNextTestVersion" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "testVersion" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "FragmentSpread",
                        name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "TeacherTestAuthoringVersionFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "TeacherTestVersion" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "testId" } },
          { kind: "Field", name: { kind: "Name", value: "version" } },
          { kind: "Field", name: { kind: "Name", value: "status" } },
          { kind: "Field", name: { kind: "Name", value: "primaryLanguage" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityStartsAt" } },
          { kind: "Field", name: { kind: "Name", value: "availabilityEndsAt" } },
          { kind: "Field", name: { kind: "Name", value: "durationMinutes" } },
          { kind: "Field", name: { kind: "Name", value: "attemptLimit" } },
          { kind: "Field", name: { kind: "Name", value: "passingPercentage" } },
          { kind: "Field", name: { kind: "Name", value: "scoringRuleVersion" } },
          { kind: "Field", name: { kind: "Name", value: "publishedAt" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "translations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "language" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "sections" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                { kind: "Field", name: { kind: "Name", value: "suggestedMinutes" } },
                { kind: "Field", name: { kind: "Name", value: "minimumWords" } },
                { kind: "Field", name: { kind: "Name", value: "preparationSeconds" } },
                { kind: "Field", name: { kind: "Name", value: "responseSeconds" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      { kind: "Field", name: { kind: "Name", value: "instructions" } },
                      { kind: "Field", name: { kind: "Name", value: "content" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "blocks" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "kind" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaObjectId" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaWidthPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaHeightPixels" } },
                      { kind: "Field", name: { kind: "Name", value: "mediaDurationSeconds" } },
                      { kind: "Field", name: { kind: "Name", value: "headingLevel" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableHeaderRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "tableRows" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "cells" } }],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "questionIds" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                            { kind: "Field", name: { kind: "Name", value: "altText" } },
                            { kind: "Field", name: { kind: "Name", value: "caption" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "questions" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "position" } },
                { kind: "Field", name: { kind: "Name", value: "sectionId" } },
                { kind: "Field", name: { kind: "Name", value: "sectionPosition" } },
                { kind: "Field", name: { kind: "Name", value: "kind" } },
                { kind: "Field", name: { kind: "Name", value: "answerLimit" } },
                { kind: "Field", name: { kind: "Name", value: "maxSelections" } },
                { kind: "Field", name: { kind: "Name", value: "acceptedAnswers" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "translations" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "language" } },
                      { kind: "Field", name: { kind: "Name", value: "prompt" } },
                      { kind: "Field", name: { kind: "Name", value: "rationale" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "options" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "position" } },
                      { kind: "Field", name: { kind: "Name", value: "isCorrect" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "translations" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "language" } },
                            { kind: "Field", name: { kind: "Name", value: "text" } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  TeacherCreateNextTestVersionMutation,
  TeacherCreateNextTestVersionMutationVariables
>;
export const WorkspaceNotificationFeedDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "WorkspaceNotificationFeed" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "unreadOnly" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "myUnreadNotificationCount" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "myNotifications" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "unreadOnly" },
                value: { kind: "Variable", name: { kind: "Name", value: "unreadOnly" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "kind" } },
                            { kind: "Field", name: { kind: "Name", value: "taskId" } },
                            { kind: "Field", name: { kind: "Name", value: "attemptId" } },
                            { kind: "Field", name: { kind: "Name", value: "groupId" } },
                            { kind: "Field", name: { kind: "Name", value: "studentId" } },
                            { kind: "Field", name: { kind: "Name", value: "title" } },
                            { kind: "Field", name: { kind: "Name", value: "body" } },
                            { kind: "Field", name: { kind: "Name", value: "readAt" } },
                            { kind: "Field", name: { kind: "Name", value: "createdAt" } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  WorkspaceNotificationFeedQuery,
  WorkspaceNotificationFeedQueryVariables
>;
export const WorkspaceMarkNotificationReadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "WorkspaceMarkNotificationRead" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "input" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "MarkNotificationReadInput" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "markNotificationRead" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: { kind: "Variable", name: { kind: "Name", value: "input" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "notification" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "readAt" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  WorkspaceMarkNotificationReadMutation,
  WorkspaceMarkNotificationReadMutationVariables
>;
export const WorkspaceMarkAllNotificationsReadDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "WorkspaceMarkAllNotificationsRead" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "markAllNotificationsRead" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "updatedCount" } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  WorkspaceMarkAllNotificationsReadMutation,
  WorkspaceMarkAllNotificationsReadMutationVariables
>;
