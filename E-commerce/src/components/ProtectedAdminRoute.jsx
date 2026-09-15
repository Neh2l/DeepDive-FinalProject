
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedAdminRoute() {
  const { isLoggedIn, user } = useSelector(
    (state) => state.auth
  );

  const isAdmin =
    isLoggedIn &&
    user?.role === "admin";

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
