import type { AuthState, user } from '@/types/auth.types';
import { create } from 'zustand';


export const authStore = create<AuthState>((set) => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const initialTheme = savedTheme || 'light';
  
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(initialTheme);

  return {
    isAuthenticated: false,
    user: null,
    token: null,
    theme: initialTheme,
    classroomId: undefined,
    setTheme: (theme: 'light' | 'dark') => {
      set({ theme });
      localStorage.setItem('theme', theme);
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    },
    setClassroomId: (classroomId: string) => {
      set({ classroomId });
      localStorage.setItem('classroomId', classroomId);
    },
    setUser: (user: user) => {
      set({ user, isAuthenticated: !!user })
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: () => {
      set({ user: null, isAuthenticated: false, token: null });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    setToken: (token: string | null) => {
      set({ token });
      localStorage.setItem('token', token || '');
    },
  };
})

