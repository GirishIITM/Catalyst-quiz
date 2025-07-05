type classRoom = {
  id: string;
  name: string;
  students: Array<{
    id: string;
    name: string;
  }>;
};

export type classroomState = {
    classrooms: Array<{ id: string; name: string }>;
    classroomsStudents: Array<classRoom>;
    fetchClassroomsStudents: () => Promise<void>;
    fetchClassrooms: (classroomId: string) => Promise<void>;
    deleteClassroom: (classroomId: string) => Promise<void>;
    inviteStudent: (classroomId: string, email: string) => Promise<void>;
}

export interface CreateClassroomForm {
  name: string;
}

export interface InviteStudentForm {
  email: string;
}

export interface StudentSuggestion {
  id: string;
  username: string;
  email: string;
}
