import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const { state } = useContext(AuthContext);

    if (!state.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
