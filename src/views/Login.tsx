import { MutableRefObject, useEffect, useRef, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

import axios from "../api/axios";
import loginImage from "../assets/imagem-login.svg";
import vectorBottom from "../assets/vetores-bg/vetor-login-3.svg";
import { Modal } from "../components/Modal";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import { AccessTokenResponse, APIResponse } from "../types/types";

const LOGIN_URL = "/auth/login";

export function Login() {
    const { auth } = useAuth();
    const emailRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState<string | null>(null);
    const fetchAccessToken = useRefreshToken();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccessToken();
        (emailRef.current as unknown as HTMLElement)!.focus();
    },[]);

    useEffect(() => {
        if(auth?.accessToken)
            navigate("/", { replace: true });
    }, [fetchAccessToken]);

    useEffect(() => {
        setErrMsg(null);
    }, [email, pwd]);

    const handleSubmit = async (e?: React.SyntheticEvent) => {
        if(e)
            e.preventDefault();
        if(!email)
            return setErrMsg("Informe seu e-mail");
        if(!pwd)
            return setErrMsg("Informe sua senha");
        
        try {
            const resp = await axios.post<AccessTokenResponse>(LOGIN_URL,
                { email, senha: pwd },
                {
                    headers: { "Content-Type": "application/json", "Accept": "application/json" },
                    withCredentials: true
                });
            setPwd("");
            navigate("/", { replace: true });
        } catch (err: any) {
            console.clear();
            if(err.code === "ERR_NETWORK")
                redirect("/503");

            const error = err.response?.data as APIResponse<{}> | undefined;
              if(error?.msg) {
                setErrMsg(error.msg);
            } else if(error?.detalhes && error.detalhes.length > 0) {
                setErrMsg(error.detalhes[0].msg);
            } else {
                setErrMsg("Ocorreu um erro inesperado, tente novamente");
            }
        }
    }
    
    return (
        <>
            <Modal visible={!!errMsg} onClose={() => setErrMsg(null)}>
                <div className="mini:min-w-[200px]">
                    {errMsg}
                </div>
            </Modal>

            <div className="fixed bottom-0 left-0 right-0 z-[-1] border-b-dyon-light border-b-[200px] md:border-b-[50px]">
                <img src={vectorBottom} className="w-screen" />
            </div>
            
            <div className="flex flex-col md:flex-row w-screen h-screen items-center justify-around px-4">
                    <form onSubmit={handleSubmit} className="text-center">
                        <h1 className="flex justify-center mb-24 font-bold text-7xl text-typo">LOGIN</h1>
                        <div className="space-y-8">
                            <input
                                ref={emailRef}
                                value={email}
                                onChange={(e) => setEmail(e.target.value.trim())}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="bg-[#ddd] focus:bg-[#eee] transition-colors font-bold rounded-xl
                                    p-4 placeholder:text-mute outline-dyon-light block w-full text-typo-2"
                            />
                            <input
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value.trim())}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Senha"
                                className="bg-[#ddd] focus:bg-[#eee] transition-colors font-bold rounded-xl
                                    p-4 placeholder:text-mute outline-dyon-light block w-full text-typo-2"
                            />
                        </div>

                        <Link to="/esqueci-minha-senha" className="text-typo-2 ml-1 block mt-2 underline font-bold">Esqueci minha senha</Link>

                        <div className="flex flex-col md:flex-row gap-4 mt-12 text-center items-center">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="bg-[#29274C] px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-white font-bold text-base"
                            >
                                Entrar
                            </button>
                            <Link to="/cadastro" className="bg-[#E6C225] px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-[#29274C] font-bold text-base items-center justify-center flex">Criar Conta</Link>
                        </div>
                    </form>
                <img src={loginImage} alt="Imagem de login" className="w-[400px] hidden md:block" />
            </div>
        </>
    )
}