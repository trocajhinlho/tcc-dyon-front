import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Modal } from "../components/Modal";
import SubscriptionTicket from "../components/SubscriptionTicket";
import { useAddress } from "../hooks/useAdress";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FullSubscriptionInfo } from "../types/interface";
import { APIResponse, CheckoutPageState } from "../types/types";
import setBgColor from "../utils/setBgColor";

export function Checkout() {
    setBgColor("gray");
    const [subscriptionInfo, setSubscriptionInfo] = useState<FullSubscriptionInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const privateFetch = useAxiosPrivate();
    const [modalMsg, setModalMsg] = useState<string | null>(null);
    const state = location.state as CheckoutPageState;

    useEffect(() => {
        if(!state)
            return navigate("/", { replace: true });
        else
            handleSubscriptionInfo(state.subscriptionId);
    }, []);

    const handleSubscriptionInfo = (subscriptionId: string) => {
        setLoading(true);

        privateFetch<APIResponse<FullSubscriptionInfo>>("/inscricoes/" + subscriptionId)
            .then(res => {
                const sub = res.data.dados;
                if(!sub)
                    throw new Error();
                
                setSubscriptionInfo(sub);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                if(err.code === "ERR_NETWORK")
                    navigate("/503");
                const errorMsg = err.response.data?.msg as string | undefined;
                setModalMsg(errorMsg ?? "Um erro inesperado ocorreu ao buscar as informações da inscrição, tente novamente");
            })
    };

    return (
        <>

        <Modal
            visible={!!modalMsg}
            title="Erro ao buscar as informações"
            onClose={() => navigate("/")}
            secondaryButtonText="Voltar à home"
        >
            {modalMsg}
        </Modal>
        <h1 className="text-typo-title font-bold text-3xl mb-8 text-center sm:text-left">{state?.pageTitle}</h1>
        {
            subscriptionInfo &&
            <SubscriptionTicket
                address={useAddress(subscriptionInfo.evento.endereco!)}
                startDate={subscriptionInfo.periodo.inicio}
                endDate={subscriptionInfo.periodo.termino}
                eventInfo={{
                    title: subscriptionInfo.evento.titulo,
                    url: subscriptionInfo.evento.rotaPublica
                }}
                qrCode={subscriptionInfo.qrCode}
                confirmed={subscriptionInfo.confirmada}
            />
        }
        </>
    )
}