import React, { useContext } from "react";
import { AuthContext } from "./contexts/Users/authContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const { signed } = useContext(AuthContext);
    
    const userData = localStorage.getItem("userData");

    return signed && userData ? <Outlet /> : <Navigate to="/login" />
};

