import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./App.css";
import LoadingIndicator from "./components/loading-indicator";
import { initializeAuthStore } from "./hooks/useInitializeAuthStore";
import AllRoutes from "./routes/AllRoutes";
import { loadingStore } from "./states/loading";
import { classroomStore } from "./states/teacher";
import { routes } from "./types/routes";
import { generateRoute } from "./utils/routeUtils";

function App() {
  const navigate = useNavigate();
  const { isLoading } = loadingStore();
  const { fetchClassrooms } = classroomStore();

  useEffect(() => {
    const initializeApp = async () => {
      const { classroomId, user } = initializeAuthStore();
      if (user) {
        if (user.role === "teacher") {
          await fetchClassrooms();
          const { classrooms } = classroomStore.getState();
          if (classrooms.length === 0) {
            navigate(routes.teacher.classrooms.replace(":classroom", ""));
          } else {
            const route = generateRoute(routes.teacher.dashboard, { classroom: classroomId });
            navigate(route);
          }
        } else {
          const route = generateRoute(routes[user.role].dashboard, { classroom: classroomId });
          navigate(route);
        }
      }
    };

    initializeApp();
  }, []);

  return (
    <>
      <Toaster />
      <LoadingIndicator show={isLoading} />
      <AllRoutes />
    </>
  );
}

export default App;
