import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import SimpleBackdrop from '../SimpleBackDrop';
const PrivateRoute = ({ allowedRoles }) => {
    const { state } = useContext(AuthContext);

    if (state.isAuthenticated === null) {
        return null; 
    }

    if (!state.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(state.role)) {
      
        return <Navigate to="/" replace />;
    } 
   

    return <Outlet />;
};


export default PrivateRoute;
