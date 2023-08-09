import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('token');
    const [validated, setValidated] = useState(false)
    if (isAuthenticated === undefined || isAuthenticated === null) {
        setValidated(false)
    } else {
        setValidated(true)
    }
    return validated ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute