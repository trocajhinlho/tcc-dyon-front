import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { AddressBook, CheckCircle, MapPin, WarningCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import { fetchEventData, fetchEventPeriodsData } from "../api/api";
import { Button } from "../components/Button";
import { Callout } from "../components/Callout";
import { EventPeriodSmall } from "../components/event/EventPeriodSmall";
import { Modal } from "../components/Modal";
import { useAddress } from "../hooks/useAdress";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { formatDateFull } from "../hooks/useFormatDate";
import useLocalStorage from "../hooks/useLocalStorage";
import { EventInfo, EventPeriod, LocalStorageUserInfo } from "../types/interface";
import { APIResponse } from "../types/types";
import scrollTop from "../utils/scrollTop";
import setBgColor from "../utils/setBgColor";



export function Evento() {
    const [getInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    setBgColor("white");
    
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [loading, setLoading] = useState(false);
    const [eventInfo, setEventInfo] = useState<EventInfo | null>(null);
    const [periods, setPeriods] = useState<EventPeriod[] | null>(null);
    const [modalMsg, setModalMsg] = useState<string | null>(null);
    const privateFetch = useAxiosPrivate();
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        scrollTop();
        setLoading(true);
        fetchEventFollowStatus();
        fetchEventData(eventId!)
            .then(({ data }) => {
                setEventInfo(data);
                window.history.replaceState("", "", `/evento/${data._publicId}/${data.slug}`);
                fetchEventPeriodsData(data._id)
                    .then(({ data }) => {
                        setFollowing(false);
                        data = data.sort((a, b) => new Date(a.inicio).getTime() - new Date(b.inicio).getTime());
                        setPeriods(data);
                    })
                    .catch(err => alert("Falha ao buscar os períodos deste evento. Tente novamente"));
            })
            .catch(err => {
                setLoading(false);
                if(err.code === "ERR_NETWORK")
                    navigate("/503");
                const errorMsg = err.response.data?.msg;
                if(errorMsg) {
                    navigate("/evento-nao-encontrado");
                }
            });
    }, []);

    const address = eventInfo ? useAddress(eventInfo.endereco) : "";

    const subscriptionStart = eventInfo ? new Date(eventInfo.inscricoesInicio) : new Date();
    const subscriptionEnd = eventInfo ? new Date(eventInfo.inscricoesTermino) : new Date();;
    const subsEnded = dayjs().isAfter(subscriptionEnd);

    const subscriptionPeriodMessage = (function () {
        const today = new Date();
        if(today < subscriptionStart) {
            return <Callout
                color="dyon-yellow"
                icon={<AddressBook weight="bold" size={24} />}
                text={"As inscrições começam " + formatDateFull(subscriptionStart)}
            />
        } else if(today >= subscriptionStart && today < subscriptionEnd) {
            return <Callout
                color="dyon-red"
                icon={<CheckCircle weight="bold" size={24} />}
                text={"As inscrições acabam em " + formatDateFull(subscriptionEnd)}
            />
        } else {
            return <Callout
                color="dyon-default"
                icon={<WarningCircle weight="bold" size={24} />}
                text={"As inscrições acabaram " + formatDateFull(subscriptionEnd)}
            /> 
        }
    })();

    const fetchEventFollowStatus = () => {
        privateFetch<APIResponse<{ acompanhando: boolean }>>(`/eventos/${eventId}/acompanhando`)
          .then(({ data }) => {
            setFollowing(data.dados!.acompanhando);
            })
          .catch(err => {
                if(err.code === "ERR_NETWORK") {
                    navigate("/503");
                }
            });
    }
    
    const handleClickFollowEvent = () => {
        setLoading(true);
        privateFetch<APIResponse<{ acompanhando: boolean }>>("/eventos/" + eventInfo!._id + "/acompanhar", { method: "PUT" })
            .then((res) => {
                if(res.data.msg && res.data.dados) {
                    setFollowing(res.data.dados.acompanhando);
                    setModalMsg(res.data.msg);
                }
                else throw { msg: "Ocorreu um erro ao tentar acompanhar este evento" };
            })
            .catch((err) => {
                if(err.msg)
                    setModalMsg(err.msg);
                else if(err.response?.data?.msg)
                    setModalMsg(err.response.data.msg)
            })
    }

    const onClickIsUserAuthorized = (callback: () => void) => {
        const userType = getInfo()?.type;
        if(!userType)
            navigate("/login");
        else if(userType !== "Participante")
            return;
        else
            callback();
    }

    const onClickSubscribe = () => {
        if(subsEnded)
            setModalMsg("O período de inscrições para este evento já acabou");
        else {
            onClickIsUserAuthorized(() => navigate("/inscrever/" +  eventId, { 
                state: {
                    periods,
                    banner: eventInfo?.banner,
                    eventInfo: {
                        titulo: eventInfo?.titulo,
                        banner: eventInfo?.banner,
                        endereco: eventInfo?.endereco
                    }
                }
            }));
        }
    }

    // ------------------

    if(!eventInfo) {
        return (
            <div>
                <BounceLoader
                    color="#5e2a82"
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    cssOverride={{
                        display: "block",
                        margin: "0 auto",
                        marginTop: "200px"
                    }}
                />
            </div>
        )
    }

    const cleanDescription = eventInfo.descricao ? DOMPurify.sanitize(eventInfo.descricao, { USE_PROFILES: { html: true } }) : "";

    return (
        <>

            <Modal
                visible={!!modalMsg}
                onClose={() => setModalMsg(null)}
            >
                {modalMsg}
            </Modal>

            <img
                src={eventInfo.banner ? `data:image/png;base64,${eventInfo.banner}` : "https://placehold.co/1280x720"}
                className="w-full h-[500px] object-cover align object-center rounded-xl mb-12"
                alt="Banner do Evento"
            />
            <h2 className="text-4xl text-typo font-bold mb-4">{eventInfo?.titulo}</h2>
            <div className="mb-8">
                Criado por&nbsp;
                <Link to={`/instituicao/${"#"}`} className="text-dyon-default font-bold hover:underline">{eventInfo?.instituicao.nome}</Link>
            </div>

            <div className="grid gap-10 text-red-typo mb-4 md:grid-cols-3 sm:grid-cols-1">
                <div className="md:col-span-2 sm:col-span-1">
                    {/* Subscription period */}
                        {subscriptionPeriodMessage}
                    {/* Address */}
                    <div className="text-dyon-light text-xl font-medium flex gap-1 items-center mb-4">
                        <MapPin weight="bold" size="20px" />
                        <span>
                            {address}
                        </span>
                    </div>
                    {/* Description */}
                    <div className="mb-4" dangerouslySetInnerHTML={{ __html: cleanDescription }}>
                    </div>
                    {/* Categories */}
                    <div>
                        <span className="font-semibold text-typo">Categorias: </span>
                        {
                            eventInfo?.categorias.map((c, i) => (
                                <span key={c._id}>
                                    <Link to={`/eventos?category=${c._id}`} className="text-mute italic hover:underline">{c.titulo}</Link>
                                    {i < eventInfo.categorias.length - 1 && <span>, </span>}
                                </span>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {/* Periodos */}
                    <div className="mb-8">
                        {
                            periods?.map((p) => <EventPeriodSmall eventPeriod={p} key={p._id} />)
                        }
                    </div>

                    {
                    eventInfo && dayjs().isAfter(eventInfo.inscricoesInicio)
                    ? <Button
                        textSize="xl"
                        width="full"
                        padding="p-6"
                        bg={subsEnded ? "bg-mute" : undefined}
                        onClick={onClickSubscribe}
                            >
                        Inscrever-se
                    </Button>

                    : <Button
                        textSize="xl"
                        width="full"
                        bg="bg-dyon-yellow"
                        padding="p-6"
                        onClick={() => onClickIsUserAuthorized(handleClickFollowEvent)}
                            >
                        {following ? "Deixar de Acompanhar Evento" : "Acompanhar Evento"}
                    </Button>
                    }
                </div>
            </div>
        </>
    )
}