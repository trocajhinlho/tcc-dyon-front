import { Navigate } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageUserInfo } from "../../types/interface";
import setBgColor from "../../utils/setBgColor";
import PerfilInstituicao from "./PerfilInstituicao";
import PerfilParticipante from "./PerfilParticipante";

export default function Perfil() {
    setBgColor("gray");

    const [getInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const userType = getInfo()?.type;

    switch (userType) {
        case "Instituicao":
            return <PerfilInstituicao />
        case "Participante":
            return <PerfilParticipante />
        default:
            return <Navigate to="/" />
    }
}