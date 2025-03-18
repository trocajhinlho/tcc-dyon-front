import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

import { Modal } from "../../../../components/Modal";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { SubscriptionHistoryInfo } from "../../../../types/interface";
import { APIResponse } from "../../../../types/types";
import HistoryRow from "./HistoryRow";

export interface confirmationModal {
    msg: string | JSX.Element;
    visible: boolean;
    callback: Function;
}

export default function SubscriptionHistory() {
    const [subsList, setSubsList] = useState<SubscriptionHistoryInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const privateFetch = useAxiosPrivate();
    const [modal, setModal] = useState<{ title: string, msg: string } | null>(null);
    const [openForm, setOpenForm] = useState(false);
    
    const [confirmationModal, setConfirmationModal] = useState<confirmationModal | null>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = () => {
        setLoading(true);
        privateFetch<APIResponse<SubscriptionHistoryInfo[]>>("/participantes/historico")
            .then(({ data }) => {
                setLoading(false);
                setSubsList(data.dados!);
            })
            .catch(err => {
                setLoading(false);
                setModal(err.response.data.msg);
            });
    }

    const onClickNewReview = (eventId: string) => {
        alert(eventId);
    }

    return (
        <>
            <Modal
                title={modal?.title}
                visible={!!modal}
                onClose={() => setModal(null)}
            >
                {modal?.msg}
            </Modal>

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

            {
                loading &&
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

        <div className="flex-1 rounded-xl px-8 py-5 mb-12 bg-white">
            {
                !openForm
                ? <div className="w-full">
                    <div className="flex mb-8 border-b border-b-[#ddd] justify-between items-center">
                        <h1 className="text-3xl font-semibold text-[#2D3436]  pb-3">Histórico de Participações</h1>
                    </div>

                    <h2 className="font-medium">Aqui estão listadas as suas participações nos eventos em que você se inscreveu</h2>

                    <div className="mt-6">
                        {/* Subscription History List */}
                        {
                            subsList.map(o => (
                                <HistoryRow
                                    key={o.dataParticipacao}
                                    info={o}
                                    onClick={() => onClickNewReview(o._id)}
                                />
                            ))
                        }
                    </div>
                </div>

                : <div>eaweaw</div>
            }
        </div>
        </>
    )
}