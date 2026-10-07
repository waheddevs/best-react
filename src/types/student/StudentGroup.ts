export type StudentGroupResource = {
  id: string;
  libraryItemId: string;
  mediaObjectId: string;
  name: string;
};

export type StudentGroupLesson = {
  id: string;
  name: string;
  number: number;
  material: StudentGroupResource | null;
  task: StudentGroupResource | null;
};

export type StudentGroupView = {
  category: string | null;
  days: number[];
  endMinutes: number | null;
  lessons: StudentGroupLesson[];
  memberCount: number;
  name: string;
  room: string | null;
  startMinutes: number | null;
};
