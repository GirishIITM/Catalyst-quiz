import { create } from "zustand";
import { type classroomState } from "@/types/teacher.types";
import { loadingStore } from "./loading";
import toast from "react-hot-toast";
import { teacherApi } from "@/api";

export const classroomStore = create<classroomState>((set) => ({
  classrooms: [],
  fetchClassrooms: async (): Promise<void> => {
    try {
        loadingStore.getState().setLoading(true);
        const response = await teacherApi.getClassroomsAndStudents(); 
        set({ classrooms: response });
        loadingStore.getState().setLoading(false);
    } catch (error) {
       loadingStore.getState().setLoading(false);
       console.error("Failed to fetch classrooms:", error);
       toast.error("Failed to fetch classrooms. Please try again later.");
    }
  },
  deleteClassroom: async (classroomId: string): Promise<void> => {
    try {
        loadingStore.getState().setLoading(true);
        await teacherApi.deleteClassroom(classroomId);
        toast.success("Classroom deleted successfully");
        const response = await teacherApi.getClassroomsAndStudents();
        set({ classrooms: response });
        loadingStore.getState().setLoading(false);
    } catch (error) {
       loadingStore.getState().setLoading(false);
       console.error("Failed to delete classroom:", error);
       toast.error("Failed to delete classroom. Please try again later.");
    }
  },
  inviteStudent: async (classroomId: string, email: string): Promise<void> => {
    try {
        loadingStore.getState().setLoading(true);
        await teacherApi.addStudent(classroomId, { email });
        toast.success("Student invitation sent successfully");
        const response = await teacherApi.getClassroomsAndStudents();
        set({ classrooms: response });
        loadingStore.getState().setLoading(false);
    } catch (error) {
       loadingStore.getState().setLoading(false);
       console.error("Failed to invite student:", error);
       toast.error("Failed to invite student. Please try again later.");
    }
  },
}));
