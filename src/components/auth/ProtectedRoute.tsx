import { Navigate, Outlet } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageUserInfo } from "../../types/interface";
import { UserType } from "../../types/types";

export function ProtectedRoute({ userType }: { userType: UserType | UserType[] }): JSX.Element {
    const [getInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const auth = getInfo();

    let authorized = false;
    if(auth) {
        authorized = typeof userType === "string"
            ? auth.type === userType
            : userType.includes(auth.type);
    }

    if(authorized)
        return <Outlet />;
    else
        return <Navigate to="/nao-autorizado" />;

}