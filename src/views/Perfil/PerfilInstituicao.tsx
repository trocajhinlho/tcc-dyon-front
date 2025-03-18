import dayjs from "dayjs";
import { CheckCircle, Gear, ListBullets, Plus, Star, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

import userPicture from "../../assets/foto-perfil.svg";
import ListEventCard, { EventTab } from "../../components/ListEventCard";
import { Modal } from "../../components/Modal";
import ProfileEventCard, { EventCardButton } from "../../components/ProfileEventCard";
import { useAddress } from "../../hooks/useAdress";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLocalStorage from "../../hooks/useLocalStorage";
import { EventInfo, LocalStorageUserInfo, OrganizationProfileInfo } from "../../types/interface";
import SubscriptionList from "../../components/SubscriptionList";

type ListTab = "todos" | "andamento" | "proximos";

export default function PerfilInstituicao() {
    const [getAuthInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const userInfo = getAuthInfo();
    const privateFetch = useAxiosPrivate();

    const [subListId, setSubListId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [modalMsg, setModalMsg] = useState<string | JSX.Element | null>(null);
    const [selectedTab, setSelectedTab] = useState<ListTab>("todos");
    const [profileInfo, setProfileInfo] = useState<OrganizationProfileInfo | null>(null);

    let eventList: EventInfo[] = [];
    if(profileInfo) {
        switch (selectedTab) {
            case "andamento":
                eventList = profileInfo.eventos.filter(e => (
                    e.periodosOcorrencia.filter(p => dayjs().isAfter(p.inicio) && dayjs().isBefore(p.termino)).length > 0
                ));
                break;
            case "proximos":
                eventList = profileInfo.eventos.filter(e => (
                    e.periodosOcorrencia.filter(p => dayjs().isBefore(p.inicio)).length > 0
                ));
                break;
            default:
                eventList = profileInfo?.eventos;
                break;
        }
    }

    useEffect(() => {
        if(!userInfo)
            return setModalMsg("Ocorreu um erro inesperado ao tentar carregar as informações do perfil");

        privateFetch<OrganizationProfileInfo>("/instituicoes/" + userInfo.username + "/perfil")
            .then(res => {
                setProfileInfo({
                    ...res.data,
                    eventos: res.data.eventos.map(e => {
                        e.periodosOcorrencia = e.periodosOcorrencia.sort((a, b) => new Date(a.inicio).getTime() - new Date(b.inicio).getTime());
                        return e;
                    })
                });
            })
            .catch(err => setModalMsg("Não foi possível carregar as informações do perfil"));
        
    }, []);

    return (
        <>
            { loading &&
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
                visible={!!modalMsg}
                onClose={() => setModalMsg(null)}
            >
                <div className="min-w-[150px]">
                    {modalMsg}
                </div>
            </Modal>

            <SubscriptionList
                setLoading={setLoading}
                id={subListId}
                visible={!!subListId}
                onClose={() => setSubListId(null)}
                type={"event"}
            />

            <h1 className="text-4xl font-bold text-[#2D3436] mb-8 border-b border-b-[#aaaaaa] pb-3">Perfil</h1>
            <div className="flex gap-12 lg:gap-8 flex-col-reverse lg:flex-row">
                <ListEventCard tabs={[
                    <EventTab
                        key="todos" textLg="Todos Eventos" textSm={"Todos"}
                        onClick={() => setSelectedTab("todos")} selected={selectedTab === "todos"}
                    />,
                    <EventTab
                        key="andamento" textLg="Em Andamento" textSm={"Andamento"}
                        onClick={() => setSelectedTab("andamento")} selected={selectedTab === "andamento"}
                    />,
                    <EventTab
                        key="proximos" textLg="Próximos Eventos" textSm={"Próximos"}
                        onClick={() => setSelectedTab("proximos")} selected={selectedTab === "proximos"}
                    />
                ]}>
                    {
                        eventList.map(e => (
                            <ProfileEventCard
                                key={e._publicId}
                                banner={e.banner}
                                url={e._publicId + "/" + e.slug}
                                title={e.titulo}
                                period={e.periodosOcorrencia.map(p => new Date(p.inicio))}
                                address={useAddress(e.endereco)}
                                options={[
                                    { // TODO: Add popup to these click events
                                        label: "Cancelar Evento",
                                        color: "text-dyon-red",
                                        onClick: () => alert(e._id)
                                    },
                                    {
                                        label: "Cancelar um Período",
                                        color: "text-typo-2",
                                        onClick: () => alert()
                                    }
                                ]}
                                share
                            >
                                <EventCardButton
                                    icon={<ListBullets size={20} color="#333333" weight="bold"/>}
                                    text="Inscrições"
                                    onClick={() => setSubListId(e._id)}
                                />
                            </ProfileEventCard>
                        ))
                    }
                </ListEventCard>

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
                        <div className="flex justify-center items-center gap-1 mt-2 mb-4">
                            <Star />
                            <p className="font-semibold text-sm text-[#333333]">Realizando {profileInfo?.quantiaEventos ?? 0} eventos</p>
                        </div>
                        <Link to="/novo-evento" className="bg-dyon-yellow p-2 w-full flex items-center gap-4 rounded-lg justify-center">
                            <Plus color="#333" weight="bold" />
                            <span className="text-typo-2 font-bold text-sm">Novo Evento</span>
                        </Link>

                    </div>

                    <div className="flex flex-col mt-8 items-center justify-center gap-1 mb-3">
                        <p className="font-semibold text-[#000000] text-base mb-4">Categorias do Ramo ({profileInfo?.categoriasRamo.length ?? 0})</p>
                        <div>
                            {
                                profileInfo?.categoriasRamo.map((cat) => (
                                    <Link
                                        key={cat.slug}
                                        className="bg-[#6A458F] w-full px-8 py-2 rounded-xl text-white font-bold text-center mt-4"
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