import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: any) => state.data);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
