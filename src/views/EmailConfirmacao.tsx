import { ReactNode, useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import axios from "../api/axios";
import vectorBottom from "../assets/vetores-bg/vetor-login-3.svg";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { APIResponse } from "../types/types";
import { Modal } from "../components/Modal";


interface Modal {
    title: string;
    msg: string;
    clickCallback: () => void;
    buttonLabel: string;
}

export function EmailConfirmacao() {
    const { auth } = useAuth();
    const fetchAccessToken = useRefreshToken();
    const { emailToken } = useParams();
    const navigate = useNavigate();

    const [modal, setModal] = useState<Modal | null>(null);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState<string | undefined>();


    useEffect(() => {
        fetchAccessToken();
        setLoading(true);
        axios.get<APIResponse<{ nomeUsuario: string }>>("/email/token-valido/" + emailToken)
        .then(({ data }) => {
            if(data.erro)
                throw new Error();
            setUsername(data.dados!.nomeUsuario);
        })
        .catch(err => {
            if(err.response.data.msg)
                setModal({
                    title: "Aviso",
                    buttonLabel: "Voltar à home",
                    msg: err.response.data.msg,
                    clickCallback: () => navigate("/home"),
                })
        })
        .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if(auth?.accessToken)
            navigate("/", { replace: true });
    }, [fetchAccessToken]);

    const submitConfirmation = () => {
        setLoading(true);

        axios.post<APIResponse<{}>>("/email/confirmar", {
            token: emailToken,
        }, {
            headers: { "Content-Type": "application/json" }
        })
        .then(({ data }) => {
            setModal({
                title: "Sucesso",
                buttonLabel: "Ir para o login",
                msg: data.msg,
                clickCallback: () => navigate("/login", { replace: true }),
            })
        })
        .catch(err => {
            if(err.code === "ERR_NETWORK")
                redirect("/503");
            else {
                setModal({
                    title: "Erro",
                    buttonLabel: "Ok",
                    msg: err.response.data.msg,
                    clickCallback: () => setModal(null),
                })
            }
        })
        .finally(() => setLoading(false));
    }

    return (
        <>
            {
                loading &&
                <div className="fixed left-0 right-0 bottom-0 top-0 z-[2] flex items-center justify-center bg-neutral-600/60">
                    <BounceLoader
                        color="#5e2a82"
                        loading={loading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            }

            <Modal
                title={modal?.title}
                visible={!!modal}
                onClose={() => modal?.clickCallback()}
                secondaryButtonText={modal?.buttonLabel}
            >
                {modal?.msg}
            </Modal>

            <div className="fixed bottom-0 left-0 right-0 z-[-1] border-b-dyon-light border-b-[200px] md:border-b-[50px]">
                <img src={vectorBottom} className="w-screen" />
            </div>
            
            <div className="flex flex-col w-screen items-center pt-28 justify-around px-4">
                <div className="mb-20 text-center">
                    <h1 className="mb-2 font-bold text-7xl text-typo">Confirme o e-mail</h1>
                    <h2 className="text-2xl font-semibold text-typo-2">
                        {username ? `${username}, e` : "E"}sta é uma medida de segurança para sua proteção
                    </h2>
                </div>
                
                <div className="text-center mt-6 mb-20">
                    <button
                        type="submit"
                        className="bg-[#29274C] px-[15px] p-4 rounded-xl w-full md:w-[300px] text-white font-bold text-base"
                        onClick={submitConfirmation}
                    >
                        Confirmar e-mail
                    </button>
                </div>
            </div>
        </>
    )
}