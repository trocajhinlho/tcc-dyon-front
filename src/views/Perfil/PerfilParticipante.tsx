import dayjs from "dayjs";
import { Gear, Star, Ticket } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import userPicture from "../../assets/foto-perfil.svg";
import ListEventCard, { EventTab } from "../../components/ListEventCard";
import { Modal } from "../../components/Modal";
import ProfileEventCard, { EventCardButton } from "../../components/ProfileEventCard";
import { useAddress } from "../../hooks/useAdress";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageUserInfo, ParticipantProfileInfo } from "../../types/interface";
import { APIResponse } from "../../types/types";

type ListTab = "todos" | "acompanhando" | "inscritos";

const isListTab = (t: ListTab | string): t is ListTab => ["todos", "acompanhando", "inscritos"].includes(t);

interface confirmationModal {
    msg: string | JSX.Element;
    visible: boolean;
    callback: Function;
}

type Modal = {
    title?: string;
    body?: string | JSX.Element;
} | null;

export default function PerfilParticipante() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<Modal>(null);
    const [confirmationModal, setConfirmationModal] = useState<confirmationModal | null>(null);
    const [selectedTab, setSelectedTab] = useState<ListTab>("todos");
    const [profileInfo, setProfileInfo] = useState<ParticipantProfileInfo | null>(null);
    const [getAuthInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const userInfo = getAuthInfo();
    const privateFetch = useAxiosPrivate();

    useEffect(() => {
        setLoading(true);
        fetchProfileInfo();

        const urlQuery = new URLSearchParams(location.search);
        const tab: ListTab | string | null = urlQuery.get("tab");
        if(tab && isListTab(tab))
            setSelectedTab(tab as ListTab);
    }, []);

    const fetchProfileInfo = () => {
        if(!userInfo)
            return setModal({ body: "Ocorreu um erro inesperado ao tentar carregar as informações do perfil", title: "Erro" });
        privateFetch<ParticipantProfileInfo>("/participantes/" + userInfo.username + "/perfil")
            .then(res => {
                setProfileInfo({
                    ...res.data,
                    inscricoes: res.data.inscricoes.sort((a, b) => new Date(a.periodo.inicio).getTime() - new Date(b.periodo.inicio).getTime())
                });
                setLoading(false);
            })
            .catch(err => setModal({ body: "Não foi possível carregar as informações do perfil", title: "Erro" }));
    }

    const handleSubscriptionInfo = (subscriptionId: string) => {
        setLoading(true);
        navigate("/checkout", { state: { subscriptionId, pageTitle: "Dados da Inscrição" } });
    };

    const handleSubscriptionCancel = (subscriptionId: string, eventTitle: string) => {
        setConfirmationModal({
            visible: true,
            msg: `Deseja realmente cancelar sua inscrição no Evento "${eventTitle}"?`,
            callback: () => cancelSubscription(subscriptionId)
        })
    }

    const handleFollowCancel = (eventId: string) => {
        setLoading(true);
        privateFetch<APIResponse<{}>>("/eventos/" + eventId + "/acompanhar", { method: "PUT" })
        .then((res) => {
            if(res.data.msg) {
                fetchProfileInfo();
            }
            else throw { msg: "Ocorreu um erro ao tentar deixar de acompanhar este evento" };
        })
        .catch((err) => {
            let msg = "";
            if(err.msg)
                msg = err.msg;
            else if(err.response?.data?.msg)
                msg = err.response?.data?.msg;
            setModal({ body: msg, title: "Erro" });
        })
    }

    const cancelSubscription = (subscriptionId: string) => {
        setLoading(true);
        setConfirmationModal(null);
        privateFetch<APIResponse<{}>>(`/inscricoes/${subscriptionId}/cancelar`, { method: "DELETE" })
        .then(res => {
            fetchProfileInfo();
            const title = res.data.erro ? "Aviso" : "Sucesso";
            setModal({ body: res.data.msg!, title });
        })
        .catch(err => {
            if(err.response?.data?.msg)
                setModal({ body: err.response.data.msg, title: "Erro" });
        })
        .finally(() => setLoading(false));
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
                title="Aviso"
                visible={confirmationModal ? confirmationModal.visible : false}
                onClose={() => setConfirmationModal(null)}
                secondaryButtonText="Cancelar"
                primaryButton={{
                    text: "Sim",
                    onClick: () => confirmationModal && confirmationModal.callback()
                }}
            >
                {confirmationModal?.msg}
            </Modal>
            
            <Modal
                visible={!!modal}
                onClose={() => setModal(null)}
                title={modal?.title ?? "Aviso"}
            >
                <div className="min-w-[150px]">
                    {modal?.body}
                </div>
            </Modal>

            <h1 className="text-4xl font-bold text-[#2D3436] mb-8 border-b border-b-[#aaaaaa] pb-3">Perfil</h1>
            <div className="flex gap-12 lg:gap-8 flex-col-reverse lg:flex-row">
                <ListEventCard tabs={[
                    <EventTab
                        key="todos" textLg="Todos Eventos" textSm={"Todos"}
                        onClick={() => setSelectedTab("todos")} selected={selectedTab === "todos"}
                    />,
                    <EventTab
                        key="acompanhando" textLg="Eventos Acompanhando" textSm={"Acompanhando"}
                        onClick={() => setSelectedTab("acompanhando")} selected={selectedTab === "acompanhando"}
                    />,
                    <EventTab
                        key="inscritos" textLg="Eventos Inscritos" textSm={"Inscritos"}
                        onClick={() => setSelectedTab("inscritos")} selected={selectedTab === "inscritos"}
                    />
                ]}>
                    {
                        (selectedTab === "todos" || selectedTab === "inscritos") &&
                        profileInfo?.inscricoes.map(e => (
                            <ProfileEventCard
                                key={e._id}
                                banner={e.evento.banner}
                                url={e.evento.rotaPublica}
                                title={e.evento.titulo}
                                organization={e.evento.instituicao}
                                period={{
                                    start: e.periodo.inicio,
                                    end: e.periodo.termino
                                }}
                                address={useAddress(e.evento.endereco!)}
                                options={[
                                    {
                                        label: "Cancelar Inscrição",
                                        color: "text-dyon-red",
                                        onClick: () => handleSubscriptionCancel(e._id, e.evento.titulo)
                                    }
                                ]}
                                share
                                label={e.confirmada ? "Confirmada" : undefined}
                            >
                                <EventCardButton
                                    icon={<Ticket size={20} color="#333333" weight="bold"/>}
                                    text="Inscrição"
                                    onClick={() => handleSubscriptionInfo(e._id)}
                                />
                            </ProfileEventCard>
                        ))
                    }
                    {
                        (selectedTab === "todos" || selectedTab === "acompanhando") &&
                        profileInfo?.acompanhando.map(e => (
                            <ProfileEventCard
                                key={e._publicId}
                                banner={e.banner}
                                url={e._publicId + "/" + e.slug}
                                title={e.titulo}
                                period={e.periodosOcorrencia.map(p => new Date(p.inicio))}
                                organization={e.instituicao}
                                address={useAddress(e.endereco)}
                                options={[
                                    {
                                        label: "Deixar de Acompanhar",
                                        color: "text-dyon-red",
                                        onClick: () => handleFollowCancel(e._id)
                                    },
                                ]}
                                share
                            />
                        ))
                    }
                </ListEventCard>

                {/* Sidebar Infos */}
                <div className="h-max-[600px] items-center flex flex-col rounded-xl shadow-md relative z-0 py-10 px-9 bg-white">
                    <Link title="Configurações" to="/configuracoes" className=" absolute top-4 right-4"><Gear color="#fff" size={32} /></Link>
                    <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-[#6A458F] z-[-1] to-[#29274C] rounded-t-lg"></div>

                    <div className="flex flex-col items-center justify-center rounded-lg">
                        <img
                            src={userInfo?.picture ? `data:image/png;base64,${userInfo.picture}` : userPicture}
                            alt="Foto de Perfil"
                            className="rounded-full w-32 h-32 border-[4px] border-white"
                            />
                        <h1 className="text-2xl font-semibold flex text-[#333333] mt-1">{userInfo?.name ?? "Instituição Dyon"}</h1>
                        <p className="font-semibold text-sm text-[#666666]">
                            No Dyon há {profileInfo?.createdAt ? dayjs(new Date()).diff(profileInfo.createdAt, "days") : 0} dias
                        </p>
                        <div className="flex justify-center items-center gap-1 mt-2">
                            <Star />
                            <p className="font-semibold text-sm text-[#333333]">Participou de {profileInfo?.quantiaEventos ?? 0} eventos</p>
                        </div>

                    </div>

                    <div className="flex flex-col mt-8 items-center justify-center gap-1 mb-3">
                        <p className="font-semibold text-[#000000] text-base mb-4">Categorias Favoritas ({profileInfo?.categoriasFavoritas.length ?? 0})</p>
                        <div>
                            {
                                profileInfo?.categoriasFavoritas.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        className="bg-[#6A458F] w-full px-8 py-2 rounded-xl text-white font-bold text-center mt-4 block"
                                        to={"/eventos?category=" + cat.slug}
                                    >
                                        {cat.titulo}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}