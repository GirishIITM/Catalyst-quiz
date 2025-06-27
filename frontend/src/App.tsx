import { useEffect } from "react";
import "./App.css";
import { AppSidebar } from "./components/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import AllRoutes from "./routes/AllRoutes";
import { initializeAuthStore } from "./states/auth";

function App() {
  useEffect(() => {
    initializeAuthStore();
  }, []);

  return (
    <>
      <SidebarProvider>
        <AppSidebar>
          <AllRoutes />
        </AppSidebar>
      </SidebarProvider>
    </>
  );
}

export default App;
