import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../../store/auth.selectors";

/**
 * LandingRoute — renders the landing page for unauthenticated visitors.
 * Authenticated users are redirected to /chat.
 * Auth logic is never modified here.
 */
export function LandingRoute() {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? <Navigate to="/chat" replace /> : <Outlet />;
}
