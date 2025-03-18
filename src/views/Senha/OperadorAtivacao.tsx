import { ReactNode, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import axios from "../../api/axios";
import vectorBottom from "../../assets/vetores-bg/vetor-login-3.svg";
import { APIResponse } from "../../types/types";
import passwordValidation from "../../utils/passwordValidation";
import { Modal } from "../../components/Modal";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";


interface Modal {
    title: string;
    msg: string;
    clickCallback: () => void;
    buttonLabel: string;
}

export interface ConfirmationModal {
    visible: boolean;
    callback: Function;
}

interface FormInputs {
    password: string;
    confirmPassword: string;
}

const ErrorLabel = ({ children }: { children: ReactNode }) => {
    return (
        <span className="font-bold text-typo text-lg">
            {children}
        </span>
    )
}

export function OperadorAtivacao() {
    const { auth } = useAuth();
    const fetchAccessToken = useRefreshToken();
    const { passwordToken } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();

    const [confirmationModal, setConfirmationModal] = useState<ConfirmationModal | null>(null);
    const [modal, setModal] = useState<Modal | null>(null);
    const [loading, setLoading] = useState(false);
    const [operatorName, setOperatorName] = useState<string | undefined>();


    useEffect(() => {
        fetchAccessToken();
        setLoading(false);
        axios.get<APIResponse<{ nomeOperador: string }>>("/senha/token-valido/" + passwordToken)
        .then(({ data }) => {
            if(data.erro)
                throw new Error();
            setOperatorName(data.dados!.nomeOperador);
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
    }, []);

    useEffect(() => {
        if(auth?.accessToken)
            navigate("/", { replace: true });
    }, [fetchAccessToken]);
    
    const onSubmit: SubmitHandler<FormInputs> = (values) => {
        setConfirmationModal({
            visible: true,
            callback: () => submitNewPassword(values.password, values.confirmPassword)
        });
    }

    const submitNewPassword = (password: string, confirmPassword: string) => {
        setLoading(true);

        axios.post<APIResponse<{}>>("/operadores/ativacao", {
            token: passwordToken,
            senha: password,
            confirmarSenha: confirmPassword,
        }, {
            headers: { "Content-Type": "application/json" }
        })
        .then(({ data }) => {
            setConfirmationModal(null);
            setModal({
                title: "Sucesso",
                buttonLabel: "Ir para o login",
                msg: data.msg,
                clickCallback: () => navigate("/login", { replace: true }),
            })
        })
        .catch(err => {
            setConfirmationModal(null);
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

    const headerMsg = `${operatorName ? `${operatorName}, d` : "D"}efina a senha da sua conta de operador`;
    
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

            <Modal
                title="Aviso"
                visible={!!confirmationModal}
                onClose={() => setConfirmationModal(null)}
                secondaryButtonText="Cancelar"
                primaryButton={{
                    text: "Sim",
                    onClick: () => confirmationModal?.callback()
                }}
            >
                <span>Deseja realmente definir sua senha e ativar sua conta?</span>
            </Modal>

            <div className="fixed bottom-0 left-0 right-0 z-[-1] border-b-dyon-light border-b-[200px] md:border-b-[50px]">
                <img src={vectorBottom} className="w-screen" />
            </div>
            
            <div className="flex flex-col w-screen items-center pt-28 justify-around px-4">
                <div className="mb-20 text-center">
                    <h1 className="mb-2 font-bold text-7xl text-typo">Ativar Conta</h1>
                    {

                    <h2 className="text-2xl font-semibold text-typo-2">{headerMsg}</h2>
                    }
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="text-center max-w-[400px] w-full">
                    <div className="space-y-8">
                        <div>
                            <input
                                {...register("password", {
                                    required: true,
                                    validate: (value) => passwordValidation(value)
                                })}
                                type="password"
                                placeholder="Nova Senha"
                                className="bg-[#ddd] focus:bg-[#eee] transition-colors font-bold rounded-xl
                                    p-4 placeholder:text-mute outline-dyon-light block w-full text-typo-2 mb-1"
                            />
                            {errors.password?.type === "required" && <ErrorLabel>Campo Obrigatório</ErrorLabel>}
                            {errors.password?.type === "validate" && <ErrorLabel>A senha não possui a força necessária</ErrorLabel>}
                        </div>
                        <div>
                            <input
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value, formValues) => value === formValues.password
                                })}
                                type="password"
                                placeholder="Confirmar Nova Senha"
                                className="bg-[#ddd] focus:bg-[#eee] transition-colors font-bold rounded-xl
                                    p-4 placeholder:text-mute outline-dyon-light block w-full text-typo-2 mb-1"
                            />
                            {errors.confirmPassword?.type === "required" && <ErrorLabel>Campo Obrigatório</ErrorLabel>}
                            {errors.confirmPassword?.type === "validate" && <ErrorLabel>Senhas não conferem</ErrorLabel>}
                        </div>
                    </div>
                
                    <div className="text-center mt-12">
                        <button
                            type="submit"
                            className="bg-[#29274C] px-[15px] p-4 rounded-xl w-full md:w-[300px] text-white font-bold text-base"
                        >
                            Alterar Senha
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}