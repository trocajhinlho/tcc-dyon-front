import { PencilSimple, Trash } from "phosphor-react";
import { confirmationModal } from "./Operators";
import { OperatorInfo } from "../../../../types/interface";
import Toggle from "react-toggle";
import "react-toggle/style.css";

interface Props {
    onEdit: () => void;
    onDelete: () => void;
    onToggle: () => void;
    info: OperatorInfo;
}

export default function OperatorRow(props: Props) {
    return (
        <div className="flex justify-between items-center px-7 py-4 border-b min-h-[110px]">
            <div>
                <h2 className="text-lg font-bold text-[#333]">{props.info.nomeCompleto}</h2>
                {
                    props.info.email &&
                    <p className="text-[#333]">{props.info.email}</p>
                }
                {
                    !props.info.confirmado &&
                    <p className="text-dyon-red font-semibold italic">Conta não confirmada</p>
                }
            </div>
            <div className="flex gap-3 items-center">
                <button className="flex items-center justify-center p-2" title="Editar Operador" onClick={props.onEdit}>
                    <PencilSimple size={24} weight={"bold"} color="#333" />
                </button>
                <button className="flex items-center justify-center p-2" title="Excluir Operador" onClick={props.onDelete}>
                    <Trash size={24} weight={"bold"} color="#333" />
                </button>
                <Toggle
                    onChange={props.onToggle}
                    defaultChecked={props.info.ativo}
                    className="text-dyon-default"
                />
            </div>
        </div>
    )
}