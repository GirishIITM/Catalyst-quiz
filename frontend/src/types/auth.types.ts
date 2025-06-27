export type user =  null | { id: string; name: string, role: "teacher" | "student" };

export interface AuthState {
  isAuthenticated: boolean;
  user: user
  token: string | null;
  setUser: (user: user) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}