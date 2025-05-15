import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.tsx";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
