import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "@/Utils/auth";

export default function ProtectedRoute() {
  const user = getAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
