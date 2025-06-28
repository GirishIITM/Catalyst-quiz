import { authStore } from "@/states/auth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = authStore();
  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate
          to="/login"
          replace
          state={{ from: window.location.pathname }}
        />
      )}
    </>
  );
}

export default PrivateRoute;
