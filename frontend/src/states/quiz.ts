import { create } from "zustand";
import { loadingStore } from "./loading";
import toast from "react-hot-toast";
import { teacherApi } from "@/api";

export type Quiz = {
  id: string;
  title: string;
  description?: string;
  difficulty: string;
  deadline?: string;
  is_published: boolean;
  created_at: string;
  question_count: number;
  classroom_name: string;
};

export type QuizState = {
  quizzes: Array<Quiz>;
  fetchQuizzes: () => Promise<void>;
  deleteQuiz: (quizId: string) => Promise<void>;
  publishQuiz: (quizId: string) => Promise<void>;
};

export const quizStore = create<QuizState>((set) => ({
  quizzes: [],
  fetchQuizzes: async (): Promise<void> => {
    try {
      loadingStore.getState().setLoading(true);
      const response = await teacherApi.getMyQuizzes();
      set({ quizzes: response.data || [] });
      loadingStore.getState().setLoading(false);
    } catch (error) {
      loadingStore.getState().setLoading(false);
      console.error("Failed to fetch quizzes:", error);
      toast.error("Failed to fetch quizzes. Please try again later.");
    }
  },
  deleteQuiz: async (quizId: string): Promise<void> => {
    try {
      loadingStore.getState().setLoading(true);
      await teacherApi.deleteQuiz(quizId);
      toast.success("Quiz deleted successfully");
      const response = await teacherApi.getMyQuizzes();
      set({ quizzes: response.data || [] });
      loadingStore.getState().setLoading(false);
    } catch (error) {
      loadingStore.getState().setLoading(false);
      console.error("Failed to delete quiz:", error);
      toast.error("Failed to delete quiz. Please try again later.");
    }
  },
  publishQuiz: async (quizId: string): Promise<void> => {
    try {
      loadingStore.getState().setLoading(true);
      await teacherApi.editQuiz(quizId, { is_published: true });
      toast.success("Quiz published successfully");
      const response = await teacherApi.getMyQuizzes();
      set({ quizzes: response.data || [] });
      loadingStore.getState().setLoading(false);
    } catch (error) {
      loadingStore.getState().setLoading(false);
      console.error("Failed to publish quiz:", error);
      toast.error("Failed to publish quiz. Please try again later.");
    }
  },
}));
