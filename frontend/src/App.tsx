import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { initializeAuthStore } from "./hooks/useInitializeAuthStore";
import AllRoutes from "./routes/AllRoutes";
import { routes } from "./types/routes";
import { generateRoute } from "./utils/routeUtils";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const { classroomId, user } = initializeAuthStore();
    if (user) {
      const route = generateRoute(routes[user.role].dashboard, { classroomId });
      navigate(route);
    }
  }, []);

  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
