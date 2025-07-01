type classRoom = {
  id: string;
  name: string;
};

export type classroomState = {
    classrooms: Array<classRoom>;
    fetchClassrooms: () => Promise<void>;
}