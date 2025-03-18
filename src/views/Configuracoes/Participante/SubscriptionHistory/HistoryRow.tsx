import "react-toggle/style.css";

import { PencilSimple } from "phosphor-react";

import { SubscriptionHistoryInfo } from "../../../../types/interface";
import dayjs from "dayjs";
import { formatDateFull } from "../../../../hooks/useFormatDate";
import { Link } from "react-router-dom";

interface Props {
    onClick: () => void;
    info: SubscriptionHistoryInfo;
}

export default function HistoryRow(props: Props) {
    return (
        <div className="px-7 py-4 border-b min-h-[110px]">
            <div className="mb-4 text-typo-2">
                <h2 className="text-lg font-bold text-[#333]">{props.info.evento.titulo}</h2>
                <h2 className="mb-1">{props.info.evento.instituicao?.nome}</h2>
                <p className="font-medium">Participou em <b>{formatDateFull(props.info.dataParticipacao)}</b></p>
            </div>
            
            {
                !props.info.avaliado &&
                <div className="flex">
                    <div className="flex items-center cursor-pointer px-2 py-1 gap-2">
                            <PencilSimple size={16} weight={"bold"} color="#333" />
                            <span>Avaliar</span>
                    </div>
                </div>
            }
        </div>
    )
}