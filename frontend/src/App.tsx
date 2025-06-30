import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./App.css";
import LoadingIndicator from "./components/loading-indicator";
import { initializeAuthStore } from "./hooks/useInitializeAuthStore";
import AllRoutes from "./routes/AllRoutes";
import { loadingStore } from "./states/loading";
import { routes } from "./types/routes";
import { generateRoute } from "./utils/routeUtils";

function App() {
  const navigate = useNavigate();
  const { isLoading } = loadingStore();

  useEffect(() => {
    const { classroomId, user } = initializeAuthStore();
    if (user) {
      const route = generateRoute(routes[user.role].dashboard, { classroom: classroomId });
      navigate(route);
    }
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
