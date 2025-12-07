import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute: simple client-side protection.
 * role: the role required to view the page (string)
 */
export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("accessToken");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" replace />;

  if (role && userRole !== role) return <Navigate to="/" replace />;

  return children;
}
