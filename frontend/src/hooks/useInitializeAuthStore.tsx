import { authStore } from "@/states/auth";
import type { initStoreProps, user } from "@/types/auth.types";

export const initializeAuthStore = (): initStoreProps => {
  const user: user | null = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token");
  const classroomId = localStorage.getItem("classroomId");
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  
  authStore.getState().setTheme(savedTheme || "light");
  
  if (user) {
    authStore.getState().setUser(user);
    authStore.getState().setToken(token);
    authStore.getState().setClassroomId(classroomId || "");
    return {
      user,
      token: token || null,
      classroomId: classroomId || "",
    };
  } else {
    authStore.getState().setUser(null);
    authStore.getState().setToken(null);
    authStore.getState().setClassroomId("");
    return {
      user: null,
      token: null,
      classroomId: "",
    };
  }
};
