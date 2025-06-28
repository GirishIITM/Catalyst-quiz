import { Button } from "@/components/ui/button";
import { authStore } from "@/states/auth";
import { routes } from "@/types/routes";
import { generateRoute } from "@/utils/routeUtils";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setClassroomId, setUser } = authStore((state) => state);
  const navigate = useNavigate();

  const handleLogin = (role: "teacher" | "student") => {
    const classroomId = "math-101";
    setClassroomId(classroomId);

    const user = {
      id: `${role}-123`,
      name: `Test ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role,
    };

    setUser(user);

    const route = generateRoute(routes[role].dashboard, {
      classroom: classroomId,
    });
    navigate(route);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold mb-8">Choose Your Role</h1>
      <Button onClick={() => handleLogin("student")}>Login as Student</Button>
      <Button onClick={() => handleLogin("teacher")}>Login as Teacher</Button>
    </div>
  );
}

export default Login;
