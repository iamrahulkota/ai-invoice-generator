import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector(
    (state: any) => state.data,
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
