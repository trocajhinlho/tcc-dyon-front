import { CheckCircle, Circle } from "phosphor-react";
import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import { fetchEventData } from "../api/api";
import { Button } from "../components/Button";
import { EventPeriodSmall } from "../components/event/EventPeriodSmall";
import { Modal } from "../components/Modal";
import { useAddress } from "../hooks/useAdress";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useFormatPeriod } from "../hooks/useFormatPeriod";
import { EventInfo, EventPeriod, SubscriptionInfo } from "../types/interface";
import { APIResponse, SubscriptionPageState } from "../types/types";
import scrollTop from "../utils/scrollTop";
import setBgColor from "../utils/setBgColor";

const Subtitle = ({children}: {children: ReactNode}) => (
    <div className="pb-6 border-[#ccc] border-b mb-4">
        <h2 className="text-typo-title font-bold text-2xl text-center sm:text-left">{children}</h2>
    </div>
)

export function Inscricao() {
    setBgColor("gray");

    const { idPublico: publicId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const privateFetch = useAxiosPrivate();
    const state = location.state as SubscriptionPageState;

    const [subscribedPeriods, setSubscribedPeriods] = useState<string[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<EventPeriod | null>();
    const [showAllPeriods, setshowAllPeriods] = useState(true);
    const [loading, setLoading] = useState(false);
    const [modalMsg, setModalMsg] = useState<JSX.Element | string | null>(null);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [eventId, setEventId] = useState<string | null>(null);

    useEffect(() => {
        scrollTop();

        if(!state) {
            if(publicId)
                return navigate("/evento/" + publicId, { replace: true });
            else
                return navigate("/", { replace: true });
        }
        setLoading(true);
        fetchEventData(publicId!).then(({ data }) => setEventId(data._id));
        privateFetch<APIResponse<string[]>>("/participantes/inscricoes/" + publicId, { method: "GET" })
        .then(({ data }) => {
            setSubscribedPeriods(data.dados!);
            setLoading(false);
        })
        .catch(err => {
            navigate("/503");
        })
    }, []);

    const handleSubscriptionConfirmation = () => {
        // Ask if the user really wants to subscribe to the event
        setConfirmationModal(true);
    }
    
    const verifySubscriptionSelection = () => {
        // Verify if theres a selected period
        setConfirmationModal(false);
        if(!selectedPeriod)
            setModalMsg("Selecione um período");
        else
            subscribeInPeriod();
    }

    const subscribeInPeriod = () => {
        // Try to subscribe the user in the period's event
        setLoading(true);
        privateFetch<APIResponse<SubscriptionInfo>>("/inscricoes",
            { method: "POST", data: { idEvento: eventId, idPeriodo: selectedPeriod!._id } })
            .then(({ data }) => {
                if(data.dados) {
                    return navigate("/checkout/", { replace: true, state: {
                        subscriptionId: data.dados._id,
                        pageTitle: "Inscrição Efetuada com sucesso"
                    } });
                } else
                    throw new Error();
            })
            .catch((err) => {
                setLoading(false);
                let msg = "";
                if(err.code === "ERR_NETWORK")
                    msg = "Erro: verifique sua conexão com a internet"
                else if(err.response.data.msg)
                    msg = err.response.data.msg;
                else
                    msg = "Ocorreu um erro inesperado, tente novamente";
                setModalMsg(msg);
            });
    }

    const periods = showAllPeriods ? state?.periods : state?.periods.filter(p => {
        if(!p.inscricoesMaximo)
            return true;
        return p.inscricoesMaximo - p.inscricoes > 0;
    });

    let selectedLabel = "";
    if(selectedPeriod) {
        const formatted = useFormatPeriod(selectedPeriod.inicio, selectedPeriod.termino);
        selectedLabel = typeof formatted === "string" ? formatted : formatted.join(" até ");
    }

    return (
        <>
            { (loading) &&
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
                visible={!!confirmationModal}
                title="Aviso"
                primaryButton={{
                    text: "Sim",
                    onClick: verifySubscriptionSelection
                }}
                onClose={() => setConfirmationModal(false)}
                secondaryButtonText="Cancelar"
            >
                Deseja realmente se inscrever neste evento no período selecionado?
            </Modal>

            <Modal
                visible={!!modalMsg}
                title="Erro"
                onClose={() => setModalMsg(null)}
            >
                {modalMsg}
            </Modal>

            <h1 className="text-typo-title font-bold text-3xl mb-8 text-center sm:text-left">Finalizar Inscrição</h1>
            <div className="grid sm:grid-cols-3 sm:gap-4 md:gap-10">
                <div className="pt-6 col-span-2 mb-14">
                    <Subtitle>Escolha seu horário</Subtitle>
                    <div className="flex gap-2 items-center mb-4 cursor-pointer select-none" onClick={() => setshowAllPeriods(!showAllPeriods)}>
                        {
                           !showAllPeriods
                            ? <CheckCircle size={20} />
                            : <Circle size={20} />
                        }
                        <span>Exibir apenas períodos com vagas disponíveis</span>
                    </div>
                    <div>
                        {
                            periods?.map((p) => {
                                const subscribed = subscribedPeriods.includes(p._id);
                                return <EventPeriodSmall
                                    eventPeriod={p}
                                    key={p._id}
                                    onClick={() => setSelectedPeriod(p)}
                                    selectable={!subscribed}
                                    subscribed={subscribed}
                                    bg="bg-white"
                                    className="px-8 border-[#CDCDCD] border-2"
                                    selected={selectedPeriod?._id == p._id}
                                />
                            })
                        }
                    </div>
                </div>
                <div className="bg-white rounded-xl p-6 w-full">
                    <Subtitle>Resumo</Subtitle>
                    <div className="text-center mb-10">
                        <img src={state?.banner ? `data:image/png;base64,${state.banner}` : "https://placehold.co/1280x720"} className="w-full max-h-[150px] object-cover align bg-center rounded-xl mb-4" />
                        <h3 className="text-xl font-bold mb-4">{state?.eventInfo.titulo}</h3>
                        {
                            selectedPeriod &&
                            <span className="font-medium mb-4 block">
                                {selectedLabel}
                            </span>
                        }
                        <span className="block text-typo-2">{state && useAddress(state.eventInfo.endereco)}</span>
                    </div>
                    <div>
                        <Button
                            onClick={handleSubscriptionConfirmation}
                            width="full"
                            bg="bg-dyon-light"
                            padding="p-6"
                        >
                            Confirmar
                        </Button>
                        <span className="text-sm text-typo-2">Ao confirmar sua inscrição, você afirma que concorda com os <Link
                            to="/termos-de-servico" className="text-dyon-light underline">Termos de Serviço</Link> do Dyon.
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}