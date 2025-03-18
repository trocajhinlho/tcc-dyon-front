import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";
import { AuthInfoContext } from "../types/types";

const useAuth = () => {
    const context = useContext(AuthContext) as AuthInfoContext;
    //... intercept
    return context;
}

export default useAuth;