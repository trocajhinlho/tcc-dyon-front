import "../styles/quill.css";

import clsx from "clsx";
import dayjs from "dayjs";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { fetchCities } from "../api/location";
import { Input } from "../components/Input";
import { Modal } from "../components/Modal";
import CategorySelectionArea from "../components/NovoEvento/CategorySelectionArea";
import DropFile from "../components/NovoEvento/DropFile";
import ErrorWrapper from "../components/NovoEvento/ErrorWrapper";
import InputAlt, { inputClass } from "../components/NovoEvento/InputAlt";
import OperatorSelectionArea from "../components/NovoEvento/OperatorSelectionArea";
import PeriodCreationArea from "../components/NovoEvento/PeriodCreationArea";
import RichTextEdtor from "../components/NovoEvento/RichTextEditor";
import SubmitAcceptButton from "../components/NovoEvento/SubmitAcceptButton";
import ExpandableGroup from "../ExpandableGroup";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useCep from "../hooks/useCep";
import useLoading from "../hooks/useloading";
import useRefreshToken from "../hooks/useRefreshToken";
import { IBGECity, isIBGEError, ViaCEP } from "../types/external";
import { CategoryVM, OperatorSelectInfo } from "../types/interface";
import { statesList } from "../types/statesEnum";
import { APIResponse } from "../types/types";
import scrollTop from "../utils/scrollTop";
import setBgColor from "../utils/setBgColor";


export interface CreatedPeriod {
    start: Date;
    end: Date;
    limit?: number;
}


export default function NovoEvento() {
    setBgColor("white");
    const navigate = useNavigate();
    const newAccessToken = useRefreshToken();
    const privateFetch = useAxiosPrivate();
    const [modal, setModal] = useState<null | string | JSX.Element>(null);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [successModal, setSuccessModal] = useState<{ visible: true, callback: () => void } | null>(null);
    const [cities, setCities] = useState<IBGECity>([]);
    const [loading, setLoading] = useLoading(false);
    const addressRef = {
        cep: useRef<HTMLInputElement>(null),
        logradouro: useRef<HTMLInputElement>(null),
        uf: useRef<HTMLSelectElement>(null),
        cidade: useRef<HTMLSelectElement>(null),
        bairro: useRef<HTMLInputElement>(null),
        num: useRef<HTMLInputElement>(null)
    };
    const [cep, setCep] = useCep(
        (e: ViaCEP) => {
            onChangeUF(e.uf);
            setLocalizationInputs(e.cep, e.logradouro, e.uf, e.bairro, e.localidade);
        },
        () => {
            setLoading(false)
            setCep("");
            setModal("Não foi possível buscar as cidades do estado selecionado, tente novamente");
            setLocalizationInputs("", "", "0", "", "0");
        }
    );

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [subsDates, setSubsDates] = useState<{ start: string, end: string }>({ start: "", end: "" });
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<CategoryVM[]>([]);
    const [createdPeriods, setCreatedPeriods] = useState<CreatedPeriod[]>([]);
    const [selectedOperators, setSelectedOperators] = useState<OperatorSelectInfo[]>([]);
    const [banner, setBanner] = useState<File>();
    const bannerRef = useRef<HTMLInputElement>(null);

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

    const setLocalizationInputs = (cep: string, logra: string, uf: string, bairro: string, cidade: string) => {
        addressRef.cep.current!.value = cep;
        addressRef.logradouro.current!.value = logra;
        addressRef.uf.current!.value = uf;
        addressRef.cidade.current!.value = cidade;
        addressRef.bairro.current!.value = bairro;
    }

    const handleErrors = (): boolean => {
        const errorList: Record<string, string> = {};
        setErrors({});
        if(title.trim().length < 10 || title.trim().length > 50 )
            errorList.title = "O título deve possuir entre 10 e 50 caracteres";
        if(!banner)
            errorList.banner = "É obrigatório selecionar um arquivo para banner";
        if(subsDates.start === "" || subsDates.end === "")
            errorList.subsDates = "É obrigatório informar a data de início e término das inscrições";
        else if(dayjs(subsDates.start).isAfter(subsDates.end))
            errorList.subsDates = "A data de término das inscrições não deve preceder a de início";
        if(description.length === 0 || description === "<p><br></p>")
            errorList.description = "É obrigatório informar uma descrição para o evento";
        if(createdPeriods.length === 0)
            errorList.createdPeriods = "Deve haver ao menos um (1) período para o evento";
        if(selectedCategories.length === 0)
            errorList.selectedCategories = "Selecione ao menos uma (1) categoria";
        if(selectedOperators.length === 0)
            errorList.selectedOperators = "Selecione ao menos um (1) operador";
        if(addressRef.cep.current!.value === "" || addressRef.uf.current!.value === "0" || addressRef.cidade.current!.value === "0")
            errorList.address = "Preencha todos os campos de endereço";
        
        setErrors(errorList);
        return Object.keys(errorList).length === 0;
    }

    const generateFormData = (): FormData => {
        const formData = new FormData();
        formData.append("titulo", title.trim());
        formData.append("descricao", description.trim());
        formData.append("banner", banner!);
        formData.append("inscricoesInicio", subsDates.start);
        formData.append("inscricoesTermino", subsDates.end);

        formData.append("endereco[cep]", addressRef.cep.current!.value.trim());
        formData.append("endereco[uf]", addressRef.uf.current!.value.trim());
        formData.append("endereco[cidade]", addressRef.cidade.current!.value.trim());
        formData.append("endereco[bairro]", addressRef.bairro.current!.value.trim());
        formData.append("endereco[logradouro]", addressRef.logradouro.current!.value.trim());
        formData.append("endereco[numero]", addressRef.num.current!.value.trim());
        selectedCategories.forEach(c => formData.append("categorias[]", c._id));
        selectedOperators.forEach(o => formData.append("operadores[]", o._id));
        const periods = createdPeriods.map(p => ({ inicio: p.start, termino: p.end, inscricoesMaximo: p.limit }));
        formData.append("periodos", JSON.stringify(periods));

        return formData;
    }
    const handleSubmitForm = async () => {
        const success = handleErrors();
        if(!success) {
            setModal("Preencha todos os campos obrigatórios");
            scrollTop();
            return;
        }

        setLoading(true);
        const formData = generateFormData();
        // setTimeout and new access token manually fetching are absolutely neccessary
        // because, i dunno, the content type is not sent correctly without both.
        await newAccessToken();
        setTimeout(() => {
            privateFetch<APIResponse<unknown>>("/eventos", {
                method: "POST",
                data: formData,
                headers: {
                    "content-type": "multipart/form-data"
                }
            })
            .then((res) => {
                setLoading(false);
                if(res.data.erro)
                    throw new Error();

                setSuccessModal({
                    visible: true,
                    callback: () => navigate(res.data.redirect!)
                })
            })
            .catch((err) => {
                setLoading(false);
                if(err.response.data.msg)
                    setModal(err.response.data.msg);
                if(err.code === "ERR_NETWORK")
                    setModal("Houve um problema na conexão, tente novamente.");
            });
        }, 100);

    }
    
    return (
        <>
            { loading }

            {/* Generic modal */}
            <Modal
                visible={!!modal}
                title="Erro"
                onClose={() => setModal(null)}
            >
                {modal}
            </Modal>

            {/* Confirmation modal */}
            <Modal
                visible={!!confirmationModal}
                title="Aviso"
                primaryButton={{
                    text: "Sim",
                    onClick: () => {
                        setConfirmationModal(false);
                        handleSubmitForm();
                    }
                }}
                onClose={() => setConfirmationModal(false)}
                secondaryButtonText="Cancel"
            >
                Deseja realmente criar um evento com os dados inseridos?
            </Modal>

            {/* Success modal */}
            <Modal
                visible={!!successModal?.visible}
                title="Sucesso"
                primaryButton={{
                    text: "Ver Página do Evento",
                    onClick: () => {
                        setConfirmationModal(false);
                        successModal?.callback();
                    }
                }}
                onClose={() => {
                    setConfirmationModal(false);
                    navigate("/");
                }}
                secondaryButtonText="Voltar à home"
            >
                O evento {title.trim()} foi criado com sucesso!
            </Modal>



            <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-6">
                <div className="w-full flex flex-col gap-6">
                    <ErrorWrapper msg={errors.banner} error={!!errors.banner}>
                        <DropFile inputRef={bannerRef} file={banner} setFile={setBanner} onRejectCallback={setModal} />
                    </ErrorWrapper>

                    <ErrorWrapper msg={errors.title} error={!!errors.title}>
                        <Input
                            type="text" name="title" id="title" placeholder="Titulo"
                            value={title} onChange={e => setTitle(e.target.value)}
                            fontWeight="bold" fontSize="xl"
                        />
                    </ErrorWrapper>
                    
                    <ErrorWrapper msg={errors.description} error={!!errors.description}>
                        <RichTextEdtor value={description} onChange={setDescription} />
                    </ErrorWrapper>

                    <ErrorWrapper msg={errors.createdPeriods} error={!!errors.createdPeriods}>
                        <PeriodCreationArea onError={setModal} periods={createdPeriods} setPeriods={setCreatedPeriods} />
                    </ErrorWrapper>

                </div>

                <div className="w-full flex flex-col gap-6">
                    <ErrorWrapper msg={errors.subsDates} error={!!errors.subsDates}>
                        <div className="px-4 flex py-3 flex-col gap-2 bg-[#eee] rounded-xl">
                            <p className="text-xl font-bold">Período das Inscrições</p>
                            <div className="flex justify-start sm:items-center gap-2 sm:gap-5 py-2 flex-col sm:flex-row">
                                <input
                                    value={subsDates.start} onChange={(e) => { setSubsDates({ end: subsDates.end, start: e.target.value }) }}
                                    type="datetime-local" name="subscription_start"
                                    className="rounded-lg text-[#555] font-bold px-2 py-1"
                                />
                                
                                <p className="text-lg font-bold">Até</p>
                                <input
                                    value={subsDates.end} onChange={(e) => { setSubsDates({ start: subsDates.start, end: e.target.value }) }}
                                    type="datetime-local" name="subscription_end"
                                    className="rounded-lg text-[#555] font-bold px-2 py-1"
                                />
                            </div>
                        </div>
                    </ErrorWrapper>

                    <ErrorWrapper msg={errors.address} error={!!errors.address}>
                        <ExpandableGroup title="Localização do seu Evento">
                            <div className="flex gap-2 sm:gap-6 mb-5 w-full flex-wrap">
                                <InputAlt name="cep" reff={addressRef.cep} placeholder="CEP" className="w-full sm:w-auto min-w-[140px] sm:max-w-[150px]" value={cep} onChange={(e) => setCep(e.target.value.trim())} />
                                <InputAlt reff={addressRef.logradouro} name="logradouro" id="logradouro" placeholder="Logradouro" className="flex-1 w-full" />
                            </div>
                            <div className="flex gap-2 sm:gap-6 mb-5 flex-wrap">
                                <select name="UF" id="UF" defaultValue="0" className={clsx(inputClass, "w-full sm:flex-1")} onChange={e => onChangeUF(e.target.value)} ref={addressRef.uf}>
                                    <option value="0" disabled>Estado</option>
                                    {
                                        statesList.map(([key, value]) => <option key={key} value={key}>{value}</option>)
                                    }
                                </select>
                                <select name="cidade" id="cidade" defaultValue="0" className={clsx(inputClass, "w-full sm:flex-1")} ref={addressRef.cidade} >
                                    <option value="0" disabled>Cidade</option>
                                    {
                                        !isIBGEError(cities) && cities.map(c => <option key={c.id} value={c.nome}>{c.nome}</option>)
                                    }
                                </select>
                            </div>
                            <div className="flex gap-2 sm:gap-6 mb-5 flex-wrap">
                                <InputAlt reff={addressRef.bairro} type="text" name="bairro" id="bairro" placeholder="Bairro" className="w-full sm:flex-1" />
                                <InputAlt reff={addressRef.num} name="numero" id="numero" placeholder="Número" className="w-full sm:w-28" />
                            </div>
                        </ExpandableGroup>
                    </ErrorWrapper>

                    <ErrorWrapper msg={errors.selectedCategories} error={!!errors.selectedCategories}>
                        <CategorySelectionArea categories={selectedCategories} setCategories={setSelectedCategories} />
                    </ErrorWrapper>

                    <ErrorWrapper msg={errors.selectedOperators} error={!!errors.selectedOperators}>
                        <OperatorSelectionArea
                            selectedOperators={selectedOperators}
                            setSelectedOperators={setSelectedOperators}
                        />                    
                    </ErrorWrapper>

                    <SubmitAcceptButton
                        onSubmit={() => setConfirmationModal(true)}
                        onError={setModal}
                    />
                </div>
            </div>
        </>
    )
}