import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Homepage } from "../Homepage.js";
import useAuth from "../../hooks/useAuth.js";

export const RequireAuth = ({ allowedRole }) => {
  const { auth } = useAuth();

  const location = useLocation();

  return (
    auth?.userRole === allowedRole
      ? <Outlet />
      : auth?.accessToken //changed from user to accessToken to persist login after refresh
        ? <Navigate to="/" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  );
}
