import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useContext(AuthContext);

    // Not logged in? Kick to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Wrong role? Kick to their respective home page
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to={user.role === 'Manager' ? '/dashboard' : '/my-reports'} replace />;
    }

    // If they pass the checks, render the child route
    return <Outlet />;
};

export default ProtectedRoute;