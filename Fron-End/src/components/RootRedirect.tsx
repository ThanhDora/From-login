import { Navigate } from "react-router-dom";
import { getAuth } from "@/Utils/auth";

export default function RootRedirect() {
  const user = getAuth();
  return <Navigate to={user ? "/profile" : "/login"} replace />;
}
