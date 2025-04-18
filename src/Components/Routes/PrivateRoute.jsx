import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
const PrivateRoute = ({ allowedRoles }) => {
    const { state } = useContext(AuthContext);

    if (state.isAuthenticate === null) {
        // Aún cargando, no decidas nada todavía
        return null; // o un spinner de carga si prefieres
    }

    if (!state.isAuthenticate) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(state.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};


export default PrivateRoute;
