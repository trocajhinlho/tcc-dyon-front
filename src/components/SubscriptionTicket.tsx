import { Link } from "react-router-dom";

import { formatDateFull } from "../hooks/useFormatDate";
import { Check } from "phosphor-react";

function TicketInfo(props: { label: string, value: string; }) {
    return (
        <div className="text-[#333]">
            <h2 className="text-lg">{props.label}</h2>
            <p className="font-semibold text-xl">{props.value}</p>
        </div>
    )
}


interface Props {
    eventInfo: {
        title: string;
        url: string;
    };
    address: string;
    startDate: Date | string;
    endDate: Date | string;
    qrCode: string;
    confirmed: boolean;
}

export default function SubscriptionTicket(props: Props) {

    return (
        <div className="flex flex-col gap-1 rounded-2xl shadow-md min-w-min sm:flex-row bg-white overflow-hidden items-center">
            <div className="flex flex-1 flex-col justify-center items-stretch sm:border-r sm:border-dashed sm:border-b-0 border-b border-dashed border-typo-2">
                <div className="bg-dyon-light sm:bg-white self-stretch p-6">
                    <h1 className="font-bold sm:text-dyon-light text-3xl text-white rounded-t-lg">
                        <Link to={"/evento/" + props.eventInfo.url}>
                            {props.eventInfo.title}
                        </Link>
                    </h1>
                </div>
                <div className="flex flex-col gap-3 p-6">
                {
                        props.confirmed &&
                        <div className="text-[#2ecc71] flex items-center text-2xl font-bold">
                            <Check color="#2ecc71" weight="bold" />
                            <h2 className="ml-2">Inscrição confirmada</h2>
                        </div>
                    }
                    <TicketInfo
                        label="Endereço"
                        value={props.address}
                    />
                    <TicketInfo
                        label="Início"
                        value={formatDateFull(props.startDate)}
                    />
                    <TicketInfo
                        label="Término"
                        value={formatDateFull(props.endDate)}
                    />
                </div>
            </div>
            <div className="flex items-center justify-center p-4 sm:p-4 max-w-[350px] box-border">
                <img src={props.qrCode} className="max-w-full w-[200px] md:max-w-[300px]" />
            </div>
        </div>
    )
} 