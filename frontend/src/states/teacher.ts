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
}));
