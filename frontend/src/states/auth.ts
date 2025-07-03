import type { AuthState, user } from '@/types/auth.types';
import { create } from 'zustand';


export const authStore = create<AuthState>((set) => {
  const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
  const initialTheme = savedTheme || 'light';
  
  const savedUser = localStorage.getItem('user');
  const savedToken = localStorage.getItem('token');
  const isInitiallyAuthenticated = !!(savedUser && savedToken && savedUser !== 'null' && savedToken !== '');
  
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(initialTheme);

  return {
    isAuthenticated: isInitiallyAuthenticated,
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken || null,
    theme: initialTheme,
    setTheme: (theme: 'light' | 'dark') => {
      set({ theme });
      localStorage.setItem('theme', theme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    },
    classroomId: localStorage.getItem('classroomId') || undefined,
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
      localStorage.removeItem('classroomId');
    },
    setToken: (token: string | null) => {
      set({ token });
      localStorage.setItem('token', token || '');
    },
    checkAuthStatus: () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      return !!(user && token && user !== 'null' && token !== '');
    }
  };
})

