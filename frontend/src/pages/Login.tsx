import { authApi } from "@/api";
import { boysingin } from "@/assets";
import { Header } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authStore } from "@/states/auth";
import { loadingStore } from "@/states/loading";
import { routes } from "@/types/routes";
import { generateRoute } from "@/utils/routeUtils";
import { validateLoginForm } from "@/utils/validator";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const { setClassroomId, setUser, setToken } = authStore((state) => state);
  const { setLoading } = loadingStore();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const { hasError, errors, isEmail } = validateLoginForm(formData);
    
    if (hasError) {
      setError(
        errors.email || errors.username || errors.password || null
      );
      return;
    }

    setError(null);

    const loginPayload = isEmail 
      ? { email: formData.email, password: formData.password }
      : { username: formData.email, password: formData.password };

    setLoading(true);
    authApi
      .login(loginPayload)
      .then((response) => {
        setToken(response.access_token);

        const user = {
          id: response.username,
          name: response.username,
          role: response.role,
        };

        setUser(user);

        const classroomId = "default-classroom-" + user.id;
        setClassroomId(classroomId);

        toast.success("Login successful!");

        const route = generateRoute(routes[response.role].dashboard, {
          classroom: classroomId,
        });
        navigate(route);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Login failed. Please try again."
        );
        console.error("Login error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex justify-center items-center p-5 pt-24">
        <div className="flex max-w-4xl w-full h-[600px] rounded-2xl shadow-lg bg-card">
          <div className="flex-1 justify-center items-center p-8 bg-card md:flex hidden">
            <img
              src={boysingin}
              alt="Student Image"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="flex-1 p-10 flex flex-col justify-center items-center bg-card md:p-8">
            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
              <h2 className="text-3xl font-semibold text-card-foreground text-center mb-6">
                Welcome Back
              </h2>

              <div className="mb-3">
                <Input
                  name="email"
                  placeholder="Email or Username"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
                {error && <p className="text-red-500 text-[12px]">{error}</p>}
              </div>

              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full"
              />

              <Button
                type="submit"
                className="w-full bg-auth-primary hover:bg-auth-primary-hover text-black font-bold mt-4"
              >
                Sign In
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to={routes.register}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="md:hidden flex flex-col h-screen w-full pt-20">
          <div className="flex-1 flex flex-col justify-center items-center">
            <h2 className="text-3xl font-semibold text-card-foreground text-center mb-6">
              Welcome Back
            </h2>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />

              <Button
                type="submit"
                className="w-full bg-auth-primary hover:bg-auth-primary-hover text-black font-bold"
              >
                Sign In
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to={routes.register}
                  className="text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
