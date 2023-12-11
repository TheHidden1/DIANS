import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import React from "react";

interface ProtectedRouteProps {
    component: React.ComponentType;
}

export default function ProtectedRoute({ component: Comp }: ProtectedRouteProps) {
    const isLoggedIn = Cookies.get("token");
    return isLoggedIn ? <Comp /> : <Navigate to="/login" />;
}
