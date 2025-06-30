export type user =  null | { id: string; name: string, role: "teacher" | "student" };

export interface AuthState {
  isAuthenticated: boolean;
  user: user
  token: string | null;
  classroomId?: string;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  setClassroomId: (classroomId: string) => void;
  setUser: (user: user) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}

export type initStoreProps = {
  user: user | null;
  token: string | null;
  classroomId: string;
}