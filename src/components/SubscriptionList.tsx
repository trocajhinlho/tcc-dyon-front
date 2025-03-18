import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Check, CheckCircle, X, XCircle } from "phosphor-react";
import setScrollMode from "../utils/setScrollMode";

interface Props {
    id: string | null;
    visible: boolean;
    onClose: () => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    type: "event" | "period";
}

interface SubListInfo {
    confirmada: boolean;
    nomeUsuario: string;
}

export default function SubscriptionList(props: Props) {
    const privateFetch = useAxiosPrivate();
    const [error, setError] = useState(false);
    const [subList, setSubList] = useState<SubListInfo[]>([]);

    useEffect(() => {
        if(props.id) {
            setScrollMode("hidden");
            fetchSubscriptions(props.id);
        }
    }, [props.id]);

    const fetchSubscriptions = (id: string) => {   
        const baseUrl = props.type === "event" ? "/eventos/" : "/eventos/periodo/";
        props.setLoading(true);
        setError(false);
        privateFetch<SubListInfo[]>(baseUrl + id + "/inscritos")
            .then(res => {
                props.setLoading(false);
                setSubList(res.data)
            })
            .catch(err => {
                setError(true);
            })
    }

    const onClose = () => {
        setScrollMode("initial");
        setSubList([]);
        setError(false);
        props.onClose();
    }

    if(!props.visible)
        return <></>;
    else
        return (
            <div className="fixed top-0 left-0 z-[1] bg-white w-screen h-screen py-20 sm:py-32 px-4 sm:px-32">
                <div className="flex justify-end">
                    <div
                        className="p-2 flex items-center gap-1 text-typo-2 cursor-pointer hover:bg-[#ddd] rounded"
                        onClick={onClose}
                    >
                        <X color="#333" height={18} width={18} weight="bold" />
                        <span className="font-medium">Fechar</span>
                    </div>
                </div>
                <h1 className="text-xl sm:text-4xl font-bold text-[#2D3436] border-b border-b-[##aaaaaa] pb-4 mb-4">Participantes do Evento</h1>
                <p className="mb-8 font-medium text-lg">
                    {subList.length > 0 ? `${subList.length} inscritos` : "Nenhum inscrito"} atualmente
                </p>
                <div>
                    {
                        error
                        ? <div className="font-medium text-lg">Não foi possível buscar as inscrições</div>
                        : subList.length === 0
                            ? <div className="text-typo-2 flex items-center text-center flex-col">
                                <CheckCircle weight="fill" width={36} height={36} color="#7f529f" />
                                <h3 className="font-bold py-2 text-lg">Não há nenhuma inscrição neste evento ainda!</h3>
                                <p className="font-medium">As inscrições no seu evento aparecerão aqui</p>
                            </div>
                            : subList.map((u, i) => (
                                <li key={i} className="text-xl flex gap-2 items-center mb-3">
                                    {
                                        u.confirmada
                                        ? <CheckCircle color="#5e2a82" weight="fill" size={30} />
                                        : <XCircle color="#F15F45" weight="fill" size={30} />
                                    }
                                    {u.nomeUsuario}
                                </li>
                            ))
                    }
                </div>
            </div>
        )
}