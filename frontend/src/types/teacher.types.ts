type classRoom = {
  id: string;
  name: string;
  students: Array<{
    id: string;
    name: string;
  }>;
};

export type classroomState = {
    classrooms: Array<classRoom>;
    fetchClassrooms: () => Promise<void>;
    deleteClassroom: (classroomId: string) => Promise<void>;
    inviteStudent: (classroomId: string, email: string) => Promise<void>;
}