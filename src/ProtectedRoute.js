import { useEffect, useState } from "react";
import isLoggedIn from "./isLoggedIn";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, admin = false}){
    const [loading, setLoading] = useState(true);
    const [isUserSignedIn, setIsUserSignedIn ] = useState(false);

    useEffect(()=> { isLoggedIn(admin).then((isSigned)=> { 
        console.log('testing protected route',  isSigned, admin )
        setIsUserSignedIn(isSigned);
        setLoading(false); 
    } ) },[]);

    if(loading) return <div>Loading ...</div>;

    return isUserSignedIn ? children : <Navigate to={admin ? '/admin/login' : '/login'} />
}