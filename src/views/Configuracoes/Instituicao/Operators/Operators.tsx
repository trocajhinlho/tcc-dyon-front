import { Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

import { Modal } from "../../../../components/Modal";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { OperatorInfo } from "../../../../types/interface";
import { APIResponse } from "../../../../types/types";
import setBgColor from "../../../../utils/setBgColor";
import OperatorForm from "./OperatorForm";
import OperatorRow from "./OperatorRow";

export interface confirmationModal {
    msg: string | JSX.Element;
    visible: boolean;
    callback: Function;
}
export default function Operators() {
    setBgColor("gray");

    const [operatorList, setOperatorList] = useState<OperatorInfo[]>([]);
    const [openForm, setOpenForm] = useState(false);
    const privateFetch = useAxiosPrivate();
    const [modal, setModal] = useState<{ title: string, msg: string } | null>(null);
    const [confirmationModal, setConfirmationModal] = useState<confirmationModal | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedOperator, setSelectedOperator] = useState<OperatorInfo | undefined>(undefined);

    useEffect(() => {
        fetchOperators();
    }, []);

    const fetchOperators = () => {
        setLoading(true);
        privateFetch<APIResponse<OperatorInfo[]>>("/operadores")
            .then(({ data }) => {
                setLoading(false);
                setOperatorList(data.dados!);
            })
            .catch(err => {
                setLoading(false);
                setModal(err.response.data.msg);
            });
    }

    const onDelete = (operatorId: string) => {
        setConfirmationModal({
            visible: true,
            msg: "Deseja realmente excluir este operador?",
            callback: () => deleteOperator(operatorId)
        });
    }

    const onEdit = (operatorInfo: OperatorInfo) => {
        setSelectedOperator(operatorInfo);
        setOpenForm(true);
    }

    const onToggle = (operatorId: string) => {
        setLoading(true);
        privateFetch<APIResponse<{}>>(`/operadores/${operatorId}/alternar-estado`, { method: "POST" })
        .then(({ data }) => {
            setLoading(false);
            setModal({
                title: "Aviso",
                msg: data.msg
            });
        })
        .catch(err => {
            setLoading(false);
            let msg = "";
            if(err.response.data.msg) 
                msg = err.response.data.msg;
            else if(err.code = "ERR_NETWORK")
                msg = "Não foi possível conectar ao servidor, verifique sua conexão com a internet.";
            else
                msg = "Ocorreu um erro desconhecido";

            setModal({
                title: "Erro",
                msg: msg
            });
        });
    }

    const deleteOperator = (operatorId: string) => {
        setLoading(true);
        setConfirmationModal(null);
        privateFetch<APIResponse<{}>>(`/operadores/${operatorId}`, { method: "DELETE" })
        .then(({ data }) => {
            fetchOperators();
            setLoading(false);
            setModal({
                title: "Aviso",
                msg: data.msg
            });
        })
        .catch(err => {
            setLoading(false);
            let msg = "";
            if(err.response.data.msg) 
                msg = err.response.data.msg;
            else if(err.code = "ERR_NETWORK")
                msg = "Não foi possível conectar ao servidor, verifique sua conexão com a internet.";
            else
                msg = "Ocorreu um erro desconhecido";

            setModal({
                title: "Erro",
                msg: msg
            });
        });
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
                        <h1 className="text-3xl font-semibold text-[#2D3436]  pb-3">Lista de Operadores</h1>
                        <button
                            onClick={() => setOpenForm(true)}
                            className="flex items-center justify-between px-4 py-2 bg-dyon-light text-white rounded-lg font-semibold"
                        >
                            <span>Novo</span> <Plus className="ml-3" size={20} weight={"bold"} />
                        </button>
                    </div>
                    <h2 className="font-medium">Os operadores são aqueles que confirmam a participação dos participantes dos seus eventos.</h2>
                    <div className="mt-6">
                        {/* Operator List */}
                        {
                            operatorList.map(o => (
                                <OperatorRow
                                    key={o._id}
                                    info={o}
                                    onEdit={() => onEdit(o)}
                                    onDelete={() => onDelete(o._id)}
                                    onToggle={() => onToggle(o._id)}
                                />
                            ))
                        }
                    </div>
                </div>

                : <OperatorForm
                        onExit={() => {
                            setOpenForm(false);
                            setSelectedOperator(undefined);
                            fetchOperators();
                        }}
                        setModal={setModal}
                        setLoading={setLoading}
                        operatorInfo={selectedOperator}
                        setConfirmationModal={setConfirmationModal}
                />
            }
        </div>
        </>
    )
}