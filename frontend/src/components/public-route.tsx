import { authStore } from "@/states/auth";
import { routes } from "@/types/routes";
import { generateRoute } from "@/utils/routeUtils";
import { Navigate } from "react-router-dom";

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { checkAuthStatus, user, classroomId } = authStore();
  
  if (checkAuthStatus() && user) {
    const route = generateRoute(routes[user.role].dashboard, {
      classroom: classroomId || `default-classroom-${user.id}`,
    });
    return <Navigate to={route} replace />;
  }
  
  return <>{children}</>;
}

export default PublicRoute;
