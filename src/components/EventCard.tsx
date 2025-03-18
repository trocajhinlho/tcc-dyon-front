import { Link } from "react-router-dom";

import { Address } from "../types/interface";
import formatDisplayDates from "../utils/formatDisplayDates";

type RequiredAddressInfo = Pick<Address, "cidade" | "uf">;

interface Props {
    banner?: string;
    title: string;
    url: string;
    organizationName: string;
    dates: Date[];
    address: RequiredAddressInfo;
}

export function EventCard(props: Props) {
    const formatDisplayAddres = (address: RequiredAddressInfo): string => {
        return `${address.cidade}, ${address.uf.toUpperCase()}`;
    }

    return (
        <div className="rounded-md shadow-lg overflow-hidden w-[300px] hover:scale-105 transition-transform text-left">
            <Link to ={"/evento/" + props.url}>
                <div className="w-full select-none">
                    <img src={props.banner ? `data:image/png;base64,${props.banner}` : "https://placehold.co/1280x720"}
                    className="w-full h-[160px] object-cover" />
                </div>
                <div className="p-4">
                    <h3 className="text-typo-2 text-lg font-medium truncate">{props.title}</h3>
                    <span className="text-dyon-light block font-semibold leading-3">{props.organizationName}</span>
                    <span className="block text-dyon-default font-medium mb-1">{formatDisplayDates(props.dates)}</span>
                    <span className="block text-[#555555]">{formatDisplayAddres(props.address)}</span>
                </div>
            </Link>
        </div>
    )
}