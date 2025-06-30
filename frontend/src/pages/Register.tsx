import { authApi } from "@/api";
import { boysingin } from "@/assets";
import { Header } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadingStore } from "@/states/loading";
import { type registerFormData } from "@/types/auth.types";
import { routes } from "@/types/routes";
import { validateForm } from "@/utils/validator";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState<registerFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const { setLoading } = loadingStore();

  const [error, setError] = useState<{ [key in "email" | "password" | "name" | "confirmPassword" | "username"]: string }>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [allowWeakPassword, setAllowWeakPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
    });

  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm({ formData, allowWeakPassword });

    if (errors.hasError) {
      setError(errors.errors);
      return;
    }
    setLoading(true);
    authApi.register(formData)
      .then(() => {
        toast.success("Registration successful! Please log in.");
        navigate(routes.login);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Registration failed. Please try again.");
        console.error("Registration error:", err);
      }).finally(() => {
        setLoading(false);
      }
      );

  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex justify-center items-center p-5 pt-24">
        <div className="flex max-w-4xl w-full h-[600px] rounded-2xl shadow-lg bg-card">
          <div className="lex-1 flex justify-center items-center p-8 bg-card md:flex sm:hidden max-sm:hidden">
            <img
              src={boysingin}
              alt="Student Image"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="flex-1 p-10 flex flex-col justify-center items-center bg-card md:p-8">
            <form
              onSubmit={handleRegister}
              className="w-full max-w-sm space-y-6"
            >
              <h2 className="text-3xl font-semibold text-card-foreground text-center">
                Create Your Account
              </h2>

              <div className="mb-3">
                <Input type="text" name="name" placeholder="Name" value={formData.name}
                  onChange={handleInputChange} className="w-full"
                />
                {error.name && <p className="text-red-500 text-[12px]">{error.name}</p>}
              </div>

              <div className="mb-3">
                <Input type="text" name="username" placeholder="Username" value={formData.username}
                  onChange={handleInputChange} className="w-full"
                />
                {error.username && <p className="text-red-500 text-[12px]">{error.username}</p>}
              </div>

              <div className="mb-3">
                <Input type="text" name="email" placeholder="Email"
                  value={formData.email} onChange={handleInputChange}
                  className="w-full"
                />
                {error.email && <p className="text-red-500 text-[12px]">{error.email}</p>}
              </div>

              <div className="mb-3">
                <Input type="password" name="password" placeholder="Password"
                  value={formData.password} onChange={handleInputChange}
                  className="w-full"
                />
                {error.password && <p className="text-red-500 text-[12px]">{error.password}</p>}
              </div>

              <div className="mb-3">
                <Input type="password" name="confirmPassword" placeholder="Confirm Password"
                  value={formData.confirmPassword} onChange={handleInputChange}
                  className="w-full"
                />
                {error.confirmPassword && <p className="text-red-500 text-[12px]">{error.confirmPassword}</p>}
              </div>

              <div className="mb-3 flex items-center space-x-2 ">
                <Checkbox checked={allowWeakPassword} id="weak-password"
                  className="data-[state=checked]:text-red-600"
                  onCheckedChange={e => setAllowWeakPassword(e as boolean)} />
                <label htmlFor="weak-password" className="text-sm">Allow weak password</label>
              </div>

              <Select onValueChange={(value) => setFormData({ ...formData, role: value as 'teacher' | 'student' })} value={formData.role} >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>

              <Button
                type="submit"
                className="w-full bg-auth-primary hover:bg-auth-primary-hover text-black font-bold mt-4"
              >
                Sign Up
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Already have an account?{" "}
                <Link
                  to={routes.login}
                  className="text-primary hover:underline"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
