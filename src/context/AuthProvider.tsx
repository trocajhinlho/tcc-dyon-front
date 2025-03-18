import { ReactNode, createContext, useState } from "react";
import { AuthInfo } from "../types/interface";
import { AuthInfoContext } from "../types/types";

interface Props {
    children: ReactNode;
}

const AuthContext = createContext<AuthInfoContext | null>(null);

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState<AuthInfo | null>(null);

    const setAccessToken = (token: string) => {
        // setAuth({ accessToken: token });
        console.log("Auth info set");
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, setAccessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;