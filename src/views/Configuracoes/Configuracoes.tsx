import { Navigate } from "react-router-dom";

import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageUserInfo } from "../../types/interface";
import setBgColor from "../../utils/setBgColor";
import ConfiguracoesInstituicao from "./ConfiguracoesInstituicao";
import ConfiguracoesParticipante from "./ConfiguracoesParticipante";

export default function Configuracoes() {
    setBgColor("gray");

    const [getInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const userType = getInfo()?.type;

    switch (userType) {
        case "Instituicao":
            return <ConfiguracoesInstituicao />
        case "Participante":
            return <ConfiguracoesParticipante />
        default:
            return <Navigate to="/" />
    }
}