/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Language =
  | 'EN'
  | 'RU'
  | 'UZ';

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