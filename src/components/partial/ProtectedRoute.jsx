import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({component: Comp})
{
    let isLoggedIn = Cookies.get("token")
    return isLoggedIn? <Comp /> : <Navigate to="/login" />
}