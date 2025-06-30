import { boysingin } from "@/assets";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { authStore } from "@/states/auth";
import { routes } from "@/types/routes";
import { generateRoute } from "@/utils/routeUtils";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { setClassroomId, setUser } = authStore((state) => state);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock registration logic
    const classroomId = "math-101";
    setClassroomId(classroomId);

    const user = {
      id: "student-123",
      name: formData.name,
      role: "student" as const,
    };

    setUser(user);

    const route = generateRoute(routes.student.dashboard, {
      classroom: classroomId,
    });
    navigate(route);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background flex justify-center items-center p-5 pt-24">
        <div className="flex max-w-4xl w-full h-[600px] rounded-2xl shadow-lg bg-card">
          <div className="lex-1 flex justify-center items-center p-8 bg-card md:flex hidden">
            <img 
              src={boysingin} 
              alt="Student Image"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="flex-1 p-10 flex flex-col justify-center items-center bg-card md:p-8">
            <form onSubmit={handleRegister} className="w-full max-w-sm space-y-6">
              <h2 className="text-3xl font-semibold text-card-foreground text-center mb-6">
                Create Your Account
              </h2>
              
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full"
              />
              
              <Button 
                type="submit" 
                className="w-full bg-auth-primary hover:bg-auth-primary-hover text-black font-bold mt-4"
              >
                Sign Up
              </Button>
              
              <p className="text-sm text-muted-foreground text-center mt-4">
                Already have an account?{" "}
                <Link to={routes.login} className="text-primary hover:underline">
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>

        <div className="md:hidden flex flex-col h-screen w-full pt-20">
          <div className="flex-[3] flex justify-center items-center p-3 -mt-5">
            <img 
              src={boysingin} 
              alt="Student Image"
              className="max-w-[55%] h-auto object-contain"
            />
          </div>
          
          <div className="flex-[7] p-5 -mt-11">
            <form onSubmit={handleRegister} className="w-full space-y-4">
              <h2 className="text-2xl font-semibold text-foreground text-center mb-6">
                Create Your Account
              </h2>
              
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              
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
              
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              
              <Button 
                type="submit" 
                className="w-full bg-auth-primary hover:bg-auth-primary-hover text-black font-bold"
              >
                Sign Up
              </Button>
              
              <p className="text-sm text-muted-foreground text-center">
                Already have an account?{" "}
                <Link to={routes.login} className="text-primary hover:underline">
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
