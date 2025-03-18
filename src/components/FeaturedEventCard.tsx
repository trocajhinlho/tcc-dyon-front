import { Link } from "react-router-dom"
import { Address } from "../types/interface";
import dayjs from "dayjs";

interface Props {
    banner?: string;
    title: string;
    url: string;
    organizationName: string;
    dates: Date[];
    address: RequiredAddressInfo;
}

type RequiredAddressInfo = Pick<Address, "cidade" | "uf">;

export function FeaturedEventCard(props: Props) {

    const formatDisplayDates = (dates: Date[]): string => {
        const format = (date: Date): string => dayjs(date).format("DD MMM[.]");
        dates = dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());

        if (dates.length > 3)
            return `${format(dates[0])} > ${format(dates[dates.length - 1])}`;
        else
            return dates.map(date => format(date)).join(" / ");
    }

    const formatDisplayAddres = (address: RequiredAddressInfo): string => {
        return `${address.cidade}, ${address.uf.toUpperCase()}`;
    }


    return (
        <div className="lg:flex lg:w-3/5 w-min[50%] w-max-[50%] shadow-md lg:rounded-xl flex-row rounded-xl">
            <div className="w-full select-none">
                <img
                    src={props.banner ? `data:image/png;base64,${props.banner}` : "https://placehold.co/1280x720"}
                    className="w-full lg:h-[324px] h-[164px] object-cover rounded-xl"
                />
            </div>
            <div className="p-6 w-full flex flex-col items-start justify-between gap-3">
                <div className="flex flex-col gap-3">
                    <h3 className="text-typo-2 lg:text-2xl text-lg font-bold ">{props.title}</h3>
                    <span className="text-dyon-light lg:text-xl text-base block font-semibold leading-3">Realizado por: {props.organizationName}</span>
                    <span className="block text-dyon-default lg:text-xl text-base font-medium mb-1">{formatDisplayDates(props.dates)}</span>
                    <span className="block lg:text-xl text-base text-[#555555]">{formatDisplayAddres(props.address)}</span>
                </div>
                
                <Link to={"/evento/" + props.url} className="fill-dyon-light lg:text-2xl text-lg px-2 py-1 border rounded-lg border-dyon-light text-dyon-light hover:bg-dyon-light hover:text-white transition-colors">Saiba mais</Link>
            </div>
        </div>

    )
}




