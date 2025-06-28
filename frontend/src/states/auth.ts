import type { AuthState, user } from '@/types/auth.types';
import { create } from 'zustand';


export const authStore = create<AuthState>((set) => {
  return {
    isAuthenticated: false,
    user: null,
    token: null,
    classroomId: undefined,
    setClassroomId: (classroomId: string) => {
      set({ classroomId });
      localStorage.setItem('classroomId', classroomId);
    },
    setUser: (user: user) => {
      set({ user, isAuthenticated: !!user })
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: () => {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem('user');
    },
    setToken: (token: string | null) => {
      set({ token });
      localStorage.setItem('token', token || '');
    },
  };
})

