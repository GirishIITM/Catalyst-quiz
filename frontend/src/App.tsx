import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import "./App.css";
import LoadingIndicator from "./components/loading-indicator";
import { initializeAuthStore } from "./hooks/useInitializeAuthStore";
import AllRoutes from "./routes/AllRoutes";
import { loadingStore } from "./states/loading";
import { authStore } from "./states/auth";

function App() {
  const { isLoading } = loadingStore();
  const { checkAuthStatus } = authStore();

  useEffect(() => {
    const initializeApp = async () => {
      const { user, token, classroomId } = initializeAuthStore();
      
      if (user && token && checkAuthStatus()) {
        authStore.getState().setUser(user);
        authStore.getState().setToken(token);
        if (classroomId) {
          authStore.getState().setClassroomId(classroomId);
        }
      }
    };

    initializeApp();
  }, [checkAuthStatus]);

  return (
    <>
      <Toaster />
      <LoadingIndicator show={isLoading} />
      <AllRoutes />
    </>
  );
}

export default App;
