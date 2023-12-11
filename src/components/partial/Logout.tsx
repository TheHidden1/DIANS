import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Logout() {
    useEffect(()=>{
        Cookies.remove("token")
    },[])
  return <Navigate to="/login" />;
}
