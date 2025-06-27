import type { AuthState, user } from '@/types/auth.types';
import { create } from 'zustand';

const authStore = create<AuthState>((set) => {
  return {
    isAuthenticated: false,
    user: null,
    token: null,
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

export const initializeAuthStore = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  if (user) {
    authStore.getState().setUser(JSON.parse(user) as user);
    authStore.getState().setToken(token);
  } else {
    authStore.getState().setUser(null);
    authStore.getState().setToken(null);
  }
}

