import { useEffect, useState } from "react";

import { Input } from "../../../../components/Input";
import ErrorWrapper from "../../../../components/NovoEvento/ErrorWrapper";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { OperatorInfo } from "../../../../types/interface";
import { APIResponse } from "../../../../types/types";
import { confirmationModal } from "./Operators";
import { emailValidation } from "../../../../utils/emailValidation";

interface Props {
    onExit: () => void;
    setModal: (params: { title: string, msg: string }) => void;
    setConfirmationModal: React.Dispatch<React.SetStateAction<confirmationModal | null>>;
    operatorInfo?: OperatorInfo;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function OperatorForm(props: Props) {
    const privateFetch = useAxiosPrivate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    
    useEffect(() => {
        if(props.operatorInfo) {
            const { nomeCompleto, email, telefone } = props.operatorInfo;
            setName(nomeCompleto);
            setEmail(email);
            setPhone(telefone);
        }
    }, []);

    const modalRegistration = () => {
        props.setConfirmationModal({
            msg: <div>
                <p>Deseja realmente cadastrar este operador?</p>
                <p>Será enviado um email para <b>{name}</b> para que ele defina sua senha.</p>
            </div>,
            visible: true,
            callback: () => submitOperatorInfo("POST")
        });
    }

    const modalEdit = () => {
        props.setConfirmationModal({
            msg: <div>
                <p>Deseja realmente alterar os dados deste operador?</p>
            </div>,
            visible: true,
            callback: () => submitOperatorInfo("PUT", props.operatorInfo!._id)
        });
    }

    const modalNewPassword = () => {
        props.setConfirmationModal({
            msg: <div>
                <p>Deseja realmente solicitar um link de troca de senha para operador?</p>
            </div>,
            visible: true,
            callback: () => requestNewPassword(props.operatorInfo!._id)
        });
    }

    const handleFormValidation = () => {
        const errorList: Record<string, string> = {};
        if(name.trim() === "")
            errorList.name = "Campo obrigatório";
        else if(name.trim().length < 10 || name.trim().length > 50)
            errorList.name = "O nome deve possuir entre 10 e 50 caracteres";
        if(email.trim() === "")
            errorList.email = "Campo obrigatório";
        else if(!emailValidation(email.trim()))
            errorList.email = "E-mail inválido";
        if(phone.trim() === "")
            errorList.phone = "Campo obrigatório";
        else if(phone.trim().length < 9 || phone.trim().length > 15)
            errorList.phone = "O telefone deve possuir entre 9 e 15 caracteres";
        setErrors(errorList);

        if(Object.keys(errorList).length > 0)
            return;

        if(props.operatorInfo)
            modalEdit();
        else
            modalRegistration();
    }

    const submitOperatorInfo = (httpMethod: "POST" | "PUT", operatorId?: string) => {
        props.setLoading(true);
        props.setConfirmationModal(null);
        const url = operatorId ? `/operadores/${operatorId}` : "/operadores";
        privateFetch<APIResponse<{}>>(url, {
            method: httpMethod,
            data: {
                nomeCompleto: name.trim(),
                telefone: phone.trim(),
                email: email.trim()
            }
        })
            .then(res => {
                props.setLoading(false);
                props.setModal({
                    title: "Sucesso",
                    msg: res.data.msg
                });
                props.onExit();
            })
            .catch(err => {
                props.setLoading(false);
                if(err.response.data.msg)
                    props.setModal({
                        title: "Erro",
                        msg: err.response.data.msg
                    });
            })
    }

    const requestNewPassword = (operatorId: string) => {
        props.setLoading(true);
        props.setConfirmationModal(null);
        const url = `/operadores/${operatorId}/solicitar-troca-senha`;
        privateFetch<APIResponse<{}>>(url, {
            method: "POST",
            data: {
                nomeCompleto: name.trim(),
                telefone: phone.trim(),
                email: email.trim()
            }
        })
            .then(res => {
                props.setLoading(false);
                props.setModal({
                    title: "Aviso",
                    msg: res.data.msg
                });
                props.onExit();
            })
            .catch(err => {
                props.setLoading(false);
                if(err.response.data.msg)
                    props.setModal({
                        title: "Erro",
                        msg: err.response.data.msg
                    });
            })
    }

    return (
        <>  
            <form className="">
                <h1 className="text-3xl font-semibold text-[#2D3436] pb-3 border-b border-b-[#ddd] mb-4">
                    {props.operatorInfo ? "Edição de Dados do Operador" : "Cadastro de Novo Operador" }
                </h1>
                {
                    props.operatorInfo?.confirmado === false &&
                    <p className="text-dyon-red font-semibold italic mb-4">Conta não confirmada</p>
                }
                <div className="mb-3">
                    <label className="font-bold block text-lg text-typo-2" htmlFor="nome">Nome</label>
                    <ErrorWrapper msg={errors.name} error={!!errors.name}>
                        <Input
                            id="name" name="name" type="text" placeholder="Ex: Operador Dyon" border
                            value={name} onChange={e => setName(e.target.value)}
                        />
                    </ErrorWrapper>
                </div>
                <div className="mb-3">
                    <label className="font-bold block text-lg text-typo-2" htmlFor="email">E-mail</label>
                    <ErrorWrapper msg={errors.email} error={!!errors.email}>
                        <Input
                            id="email" name="email" type="email" placeholder="Ex: exemplo@exemplo.com" border
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                    </ErrorWrapper>
                </div>
                <div className="mb-10">
                    <label className="font-bold block text-lg text-typo-2" htmlFor="tel">Telefone Celular</label>
                    <ErrorWrapper msg={errors.phone} error={!!errors.phone}>
                        <Input
                            id="phone-number" name="phone-number" type="text" placeholder="Ex: (00) 90000-0000" border
                            value={phone} onChange={e => setPhone(e.target.value)}
                        />
                    </ErrorWrapper>
                </div>

                <div className="flex justify-between gap-2 flex-wrap">
                    {
                        props.operatorInfo &&
                        <button
                            type="button" className="bg-dyon-light rounded-lg py-2 px-6 text-white font-semibold"
                            onClick={e => {
                                modalNewPassword();
                            }}
                        >
                            Solicitar Troca de Senha
                        </button>
                    }
                    <div className="flex gap-2 ml-auto">
                        <button
                            type="submit"
                            className="bg-dyon-light rounded-lg py-2 px-6 text-white font-semibold"
                            onClick={e => {
                                e.preventDefault();
                                handleFormValidation();
                            }}
                        >
                            Salvar
                        </button>

                            

                        <button
                            type="reset" className="bg-[#eee] rounded-lg py-2 px-6 text-typo-2 font-semibold"
                            onClick={e => {
                                e.preventDefault();
                                props.onExit();
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}