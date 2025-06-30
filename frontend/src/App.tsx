import { useEffect } from "react";
import "./App.css";
import { initializeAuthStore } from "./hooks/useInitializeAuthStore";
import AllRoutes from "./routes/AllRoutes";

function App() {

  useEffect(() => {
    const { user } = initializeAuthStore();
    if (user) {
    }
  }, []);

  return (
    <>
      <AllRoutes />
    </>
  );
}

export default App;
