import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, children }) => {
  const { state } = useContext(AuthContext);

  if (state.isAuthenticated === null) return null;
  if (!state.isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(state.role)) return <Navigate to="/" replace />;

  // Si tiene permiso, renderiza el layout y sus rutas hijas
  return children ? children : <Outlet />;
};

export default PrivateRoute;
