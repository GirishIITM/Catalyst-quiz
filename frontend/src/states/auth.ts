import type { AuthState, user } from '@/types/auth.types';
import { create } from 'zustand';


export const authStore = create<AuthState>((set) => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const initialTheme = savedTheme || 'light';
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(initialTheme);

  return {
    isAuthenticated: false,
    user: null,
    token: null,
    theme: initialTheme,
    setTheme: (theme: 'light' | 'dark') => {
      set({ theme });
      localStorage.setItem('theme', theme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    },
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

