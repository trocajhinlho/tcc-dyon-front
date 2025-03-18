import { HouseLine, MapPin } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { fetchCities } from "../../../api/location";
import useLoading from "../../../hooks/useloading";
import { IBGECity, isIBGEError } from "../../../types/external";
import { statesList } from "../../../types/statesEnum";
import { LocationStepFormData } from "../../../types/types";


interface props {
    getData: (basicData: LocationStepFormData) => void
    prev: () => void
}

export function LocationDataStep(props: props) {

    const { register, handleSubmit, formState: { errors } } = useForm<LocationStepFormData>();
    const onSubmit: SubmitHandler<LocationStepFormData> = data => props.getData(data);

    const [loading, setLoading] = useLoading(false);
    const [cities, setCities] = useState<IBGECity>([]);
    
    const [modal, setModal] = useState<null | string | JSX.Element>(null);

    const onChangeUF = (uf: string) => {
        setLoading(true);
        fetchCities(uf).then(({ data }) => {
            setCities(data);
            setLoading(false);
        })
            .catch(err => {
                setLoading(false)
                setModal("Não foi possível buscar as cidades do estado selecionado, tente novamente");
            });
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-center font-bold text-4xl mb-4 text-[#333333]">Localização</h1>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="cep">Digite o seu CEP</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <input {...register("cep", { required: true })} type="text" name="cep" id="cep" placeholder="99999-999" className="bg-[#EEEEEE] rounded-xl outline-none w-full font-medium py-2 text-typo-2" />
                    <MapPin className="ml-4" size={30} weight={"bold"} color="#555555" />
                </div>
                {
                    errors.cep && <p className="text-red-500">O campo CEP do endereço é obrigatório!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="uf">Informe o seu Estado</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <select {...register("uf", { required: true })} onChange={e => onChangeUF(e.target.value)} name="uf" id="uf" className="bg-[#EEEEEE] rounded-xl outline-none w-full font-medium py-2 text-typo-2" >
                        {
                            statesList.map(state => <option key={state[0]} value={state[0]}>{state[1]}</option>)
                        }
                    </select>
                </div>
                {
                    errors.uf && <p className="text-red-500">O campo Estado (UF) do endereço é obrigatório</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="cidade">Informe a sua Cidade</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <select {...register("cidade", { required: true })} name="cidade" id="cidade" className="bg-[#EEEEEE] rounded-xl outline-none w-full font-medium py-2 text-typo-2" >
                        {
                            !isIBGEError(cities) && cities.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)
                        }
                    </select>
                </div>
                {
                    errors.cidade && <p className="text-red-500">O campo Cidade do endereço é obrigatório!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="bairro">Digite o seu Bairro</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <input {...register("bairro", { required: true })} type="text" name="bairro" id="bairro" placeholder="Bairro" className="bg-[#EEEEEE] rounded-xl outline-none w-full font-medium py-2 text-typo-2" />
                    <HouseLine className="ml-4" size={30} weight={"bold"} color="#555555" />
                </div>
                {
                    errors.bairro && <p className="text-red-500">O campo Bairro do endereço é obrigatório!</p>
                }
            </div>
            <div className="mb-3">
                <label className="text-[#29274C] text-xl block mb-1" htmlFor="logradouro">Digite o seu Logradouro</label>
                <div className="flex items-center w-full bg-[#EEEEEE] rounded-xl px-4 py-1">
                    <input {...register("logradouro", { required: true })} type="text" name="logradouro" id="logradouro" placeholder="Logradouro" className="bg-[#EEEEEE] rounded-xl outline-none w-full font-medium py-2 text-typo-2" />
                    <HouseLine className="ml-4" size={30} weight={"bold"} color="#555555" />
                </div>
                {
                    errors.logradouro && <p className="text-red-500">O campo Logradouro do endereço é obrigatório!</p>
                }
            </div>
            <div className="flex gap-8 mt-8 justify-center">
                <button onClick={() => props.prev()}>
                    <div className="bg-[#ddd] px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-[#29274C] font-bold text-base items-center justify-center flex">Voltar</div>
                </button>
                <button type="submit" className="bg-dyon-light px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-white font-bold text-base">Proximo</button>
            </div>
        </form>


    )
}