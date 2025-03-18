import { EnvelopeSimple, Lock, User } from "phosphor-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { ParticipantBasicStepFormData } from "../../../types/types";
import passwordValidation from "../../../utils/passwordValidation";

interface props {
    getData: (basicData: ParticipantBasicStepFormData) => void
    data: ParticipantBasicStepFormData
}

export function BasicDataStep(props: props) {

    const { register, handleSubmit, formState: { errors } } = useForm<ParticipantBasicStepFormData>();
    const onSubmit: SubmitHandler<ParticipantBasicStepFormData> = data => props.getData(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center font-bold text-4xl mb-4 text-[#333333]">Dados Básicos</h1>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="name">Qual o seu CPF?</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <input {...register("cpf", { required: true, minLength: 14, maxLength: 18 })} type="text" name="cpf" id="cpf" placeholder="CPF" className="bg-[#EEEEEE] rounded-xl w-full outline-none font-medium py-2 text-typo-2" />
                    <User className="ml-4" size={30} weight={"bold"} color="#555555" />
                </div>
                {
                    errors.cpf && <p className="text-red-500">Preencha o seu CPF!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="name">Qual o seu nome?</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <input {...register("name", { required: true, minLength: 10, maxLength: 60 })} type="text" name="name" id="name" placeholder="Nome completo" className="bg-[#EEEEEE] rounded-xl w-full outline-none font-medium py-2 text-typo-2" />
                    <User className="ml-4" size={30} weight={"bold"} color="#555555" />
                </div>
                {
                    errors.name && <p className="text-red-500">Preencha o seu nome completo!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="email">Qual o seu email?</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} type="email" name="email" id="email" placeholder="dyon@email" className="bg-[#EEEEEE] rounded-xl w-full outline-none font-medium py-2 text-typo-2" />
                    <EnvelopeSimple className="ml-4" size={30} weight={"bold"} color="#555555" />
                </div>
                {
                    errors.email && <p className="text-red-500">Preencha o seu email!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="genero">Qual o seu Gênero?</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <select {...register("genero")} name="genero" id="genero" className="bg-[#EEEEEE] rounded-xl outline-none w-full font-medium py-2 text-typo-2" >
                        <option value="0">Gênero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                {
                    errors.genero && <p className="text-red-500">Escolha o seu gênero!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="senha">Crie uma senha:</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <input {...register("senha", { required: true, validate: (value) => passwordValidation(value) })} type="password" name="senha" id="senha" placeholder="Digite uma senha" className="bg-[#EEEEEE] outline-none rounded-xl w-full font-medium py-2 text-typo-2" />
                    <Lock className="ml-4" size={30} weight={"bold"} color="#555555" />
                </div>
                {
                    errors.senha && <p className="text-red-500">Digite a sua senha!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="dateBirth">Data de nascimento:</label>
                <input {...register("dateBirth", { required: true })} type="date" name="dateBirth" id="dateBirth" className="bg-[#EEEEEE] rounded-xl w-full font-medium py-3 text-typo-2 outline-none px-4 " />
                {
                    errors.dateBirth && <p className="text-red-500">Preencha sua data de nascimento!</p>
                }
            </div>

            <div className="flex gap-8 mt-8 justify-center">
                <Link to={'/'}>
                    <div className="bg-[#ddd] px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-[#29274C] font-bold text-base items-center justify-center flex">Cancelar</div>
                </Link>
                <button type="submit" className="bg-dyon-light px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-white font-bold text-base">Proximo</button>
            </div>
        </form >
    )
}