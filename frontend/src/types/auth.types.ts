export type user = null | { id: string; name: string, role: "teacher" | "student" };

export interface AuthState {
  isAuthenticated: boolean;
  user: user
  theme: 'light' | 'dark';
  token: string | null;
  classroomId?: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setUser: (user: user) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
  setClassroomId: (classroomId: string) => void;
}

export type initStoreProps = {
  user: user | null;
  token: string | null;
  classroomId: string;
}

export type registerFormData = {
  username: string; email: string;
  password: string; name: string; confirmPassword: string
  role: 'teacher' | 'student';
  metadata?: Record<string, any>;
}