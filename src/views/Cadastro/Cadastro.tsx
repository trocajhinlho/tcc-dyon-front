import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import { LocalStorageUserInfo } from "../../types/interface";
import useLocalStorage from "../../hooks/useLocalStorage";

export function CadastroEscolha() {
    const fetchAccessToken = useRefreshToken();
    const [getInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const navigate = useNavigate();

    useEffect(() => {
        const info = getInfo();
        if(info?.username)
            navigate("/", { replace: true });
        else
            fetchAccessToken();
    }, []);

    const { auth } = useAuth();
    useEffect(() => {
        if(auth?.accessToken)
            navigate("/", { replace: true });
    }, [fetchAccessToken]);

    return (
        <div className="flex min-w-full min-h-screen items-center justify-around">
            <Link
                to="/cadastro-instituicao"
                className="bg-[#734C8F] w-1/2 min-h-screen flex items-center justify-center hover:w-2/3 transition-all px-12"
            >
                <div className="space-y-3 w-[600px]">
                    <h1 className="text-white font-bold text-8xl">Instituição</h1>
                    <p className="text-white text-4xl">Se é uma instituição que planeja realizar um evento.</p>
                </div>
            </Link>
            <Link
                to="/cadastro-participante"
                className="bg-white w-1/2 min-h-screen flex items-center justify-center hover:w-2/3 transition-all px-12"
            >
                <div className="space-y-3">
                    <h1 className="text-[#7F529F] font-bold text-8xl">Participante</h1>
                    <p className="text-[#7F529F] text-4xl">Se planeja se aventurar em eventos.</p>
                </div>
            </Link>
        </div>

    )
}