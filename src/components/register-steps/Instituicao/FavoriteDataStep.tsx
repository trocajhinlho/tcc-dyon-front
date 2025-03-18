import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import axios from "../../../api/axios";
import { CategoryVM, OrganizationRegistrationData } from "../../../types/interface";
import { AccessTokenResponse, OrganizationBasicStepFormData, LocationStepFormData } from "../../../types/types";
import useAuth from "../../../hooks/useAuth";
import { categoriesList } from "../../../types/categoriesEnum";


interface props {
    prev: () => void
    nextStep: () => void
    basicData?: OrganizationBasicStepFormData,
    locationData?: LocationStepFormData
}

export function FavoriteDataStep(props: props) {

    const { setAuth } = useAuth();
    const { handleSubmit } = useForm<OrganizationRegistrationData>();
    
    const [selected, setSelected] = useState<CategoryVM[]>([]);

    const onSelectCategory = (newValue: CategoryVM) => {
        if (selected.find(value => value._id == newValue._id)) {
            selected.map(e => {
                if (e._id === newValue._id) {
                    const index: number = selected.indexOf(e)
                    selected.splice(index, 1)
                    setSelected(selected)    
                }
            })
        } else {
            selected.push(newValue)
            setSelected(selected)
        }

    }

    const createData = (basicData?: OrganizationBasicStepFormData, locationData?: LocationStepFormData) => {

        if (basicData && locationData) {
            const data: OrganizationRegistrationData = {
                email: basicData.email,
                senha: basicData.senha,
                nomeFantasia: basicData.nomeFantasia,
                documento: basicData.documento,
                endereco: {
                    cep: locationData.cep,
                    uf: locationData.uf,
                    cidade: locationData.cidade,
                    bairro: locationData.bairro,
                    logradouro: locationData.logradouro
                },
                categoriasFavoritas: selected
            }
            return data
        }

    }

    const onSubmit: SubmitHandler<OrganizationRegistrationData> = () => {
        axios.post<AccessTokenResponse>('/instituicoes/cadastro', createData(props.basicData, props.locationData), { withCredentials: true })
            .then((res) => {
                props.nextStep();
                const accessToken = res?.data.dados!.accessToken;
                setAuth({ accessToken });
            })
            .catch((err) => {
                if(err.code === "ERR_NETWORK")
                    alert("Não foi possível conectar ao servidor, verifique sua conexão com a internet e tente novamente");
                else if(err.response?.data?.msg)
                    alert(err.response.data.msg);
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center font-bold text-4xl mb-4 text-[#333333]">Selecione o(s) ramo(s) da sua organização</h1>
            <ul className="flex gap-3 flex-wrap justify-center">
                {
                    categoriesList.map(([slug, title]) => (
                        <li>
                            <input onClick={() => onSelectCategory({ '_id': slug, titulo: title })} type="checkbox" id={slug} value={slug} className="hidden peer items-center" />
                            <label htmlFor={slug} className="py-4 px-6 text-lg text-[#555] bg-[#eee] rounded-lg block cursor-pointer peer-checked:bg-[#ccc] peer-checked:text-typo-2 font-medium select-none">
                                {title}
                            </label>
                        </li>
                    ))
                }
            </ul>
            <div className="flex gap-8 mt-8 justify-center">
                <button onClick={() => props.prev()}>
                    <div className="bg-[#ddd] px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-[#29274C] font-bold text-base items-center justify-center flex">Voltar</div>
                </button>
                <button type="submit" className="bg-dyon-light px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-white font-bold text-base">Finalizar</button>
            </div>
        </form>
    )
}