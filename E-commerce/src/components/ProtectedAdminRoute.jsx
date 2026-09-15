
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedAdminRoute() {
  const { isLoggedIn, user } = useSelector(
    (state) => state.auth
  );

  const userRole = user?.role?.toLowerCase();

  const isAdmin =
    isLoggedIn && userRole === "admin";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
