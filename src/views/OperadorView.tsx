import { CheckCircle, ListBullets, Scan, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

import { Modal } from "../components/Modal";
import OperatorViewInfo from "../components/operator/OperatorViewInfo";
import ProfileEventCard, { EventCardButton } from "../components/ProfileEventCard";
import { useAddress } from "../hooks/useAdress";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { EventOperatorCardInfo, OperatorHomeInfo } from "../types/interface";
import { APIResponse } from "../types/types";
import Camera from "../qr/Camera";
import useCamera from "../qr/useCamera";
import SubscriptionList from "../components/SubscriptionList";

export default function OperadorView() {
    const privateFetch = useAxiosPrivate();
    const protectedRequest = useAxiosPrivate();

    const [loading, setLoading] = useState(true);
    const [modalMsg, setModalMsg] = useState<string | JSX.Element | null>(null);
    const [info, setInfo] = useState<OperatorHomeInfo | null>(null);
    const [events, setEvents] = useState<EventOperatorCardInfo[] | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
    const [subListId, setSubListId] = useState<string | null>(null);

    const { cameraRef, handleOpenCamera, cameraVisible,
        handleCloseCamera, handleTakeSnapshot,
        scanResultList, scanResult: scanErrorMsg } = useCamera(setModalMsg);

    useEffect(() => {
        protectedRequest<APIResponse<{ nome: string; instituicao: string }>>("/usuarios/dados-cabecalho", { method: "GET" })
        .then(res => {
            const { dados: data } = res.data;

            if(data) {
                setInfo({
                    name: data.nome,
                    organization: data.instituicao
                });
            }

            protectedRequest<APIResponse<EventOperatorCardInfo[]>>("/operadores/pagina-inicial", { method: "GET" })
            .then(res => {
                setLoading(false);
                if(res.data?.dados) {
                    setEvents(res.data.dados);
                } else {
                    throw new Error();
                }
            })
        });
    }, []);

    const handleScanQrCode = () => {
        handleTakeSnapshot()
        .then(res => {
            setLoading(true);
            if(res === null)
                throw { msg: "QR Code não encontrado" };

            privateFetch<APIResponse<{}>>("/inscricoes/" + res.data + "/confirmar",
                { "method": "POST", data: { idEvento: selectedEvent }
            })
            .then(res => {
                setLoading(false);
                scanResultList.success(res.data.msg, 3000);
            })
            .catch(err => {
                setLoading(false);
                let msg = "";
                if(err.code === "ERR_NETWORK")
                    msg = "Erro: verifique sua conexão com a internet"
                else if(err.response.data.msg)
                    msg = err.response.data.msg;
                else
                    msg = "Ocorreu um erro inesperado, tente novamente";
                scanResultList.error(msg, 2000);
            })
        })
        .catch(err => {
            setLoading(false);
            if(err.msg)
                scanResultList.error(err.msg);
        });
    }

    return (
        <>
            <Camera
                visible={cameraVisible}
                videoRef={cameraRef}
                onClose={handleCloseCamera}
                onSnapshot={handleScanQrCode}
                scanResult={scanErrorMsg}
            />
            { loading &&
            <div className="fixed left-0 right-0 bottom-0 top-0 z-[12] flex items-center justify-center bg-neutral-600/60">
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
                type={"period"}
            />

        {
            info &&
            <OperatorViewInfo name={info.name} organization={info.organization} />
        }
        {
            events?.map(e => (
                <ProfileEventCard
                    banner={e.banner}
                    key={e.id + e.periodo.inicio}
                    title={e.titulo}
                    period={{
                        start: new Date(e.periodo.inicio),
                        end: new Date(e.periodo.termino)
                    }}
                    address={useAddress(e.endereco!)}
                >
                    <EventCardButton
                        icon={<Scan size={20} color="#333333" weight="bold"/>}
                        text="Escanear QR Code"
                        onClick={() => {
                            setSelectedEvent(e.id);
                            handleOpenCamera();
                        }}
                    />
                    <EventCardButton
                        icon={<ListBullets size={20} color="#333333" weight="bold"/>}
                        text="Inscrições"
                        onClick={() => setSubListId(e.periodo.id)}
                    />
                </ProfileEventCard>
            ))
        }
        </>
    )
}

function setAuth(arg0: { accessToken: any; nome?: string | undefined; username?: string | undefined; fotoPerfil?: string | null | undefined; id?: string | undefined; tipo?: import("../types/types").UserType | undefined; }) {
    throw new Error("Function not implemented.");
}
