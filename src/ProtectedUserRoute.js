import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

export function ProtectedUserRoute({children}){
    const auth = getAuth();
    return auth.currentUser ? children : <Navigate to="/login" />;
}