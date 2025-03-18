import clsx from "clsx";
import dayjs from "dayjs";
import { DotsThreeOutline, Share } from "phosphor-react";
import { ReactElement, ReactNode, useState } from "react";
import { Link } from "react-router-dom";

import { formatDateFull } from "../hooks/useFormatDate";
import { UserIdentification } from "../types/interface";
import formatDisplayDates from "../utils/formatDisplayDates";
import { Modal } from "./Modal";

interface EventCardProps {
    banner?: string;
    url?: string
    title: string;
    organization?: UserIdentification;
    period: Date[] | { start: Date, end: Date };
    address: string;
    children?: ReactElement<EventCardButtonProps> | ReactElement<EventCardButtonProps>[];
    options?: {
        label: string;
        color: "text-dyon-red" | "text-typo-2"
        onClick?: () => void;
    }[];
    label?: string | JSX.Element;
    share?: boolean;
}

const isDateArray = (value: Date[] | Object): value is Date[] => (value as Date[]).length !== undefined;

export default function ProfileEventCard(props: EventCardProps) {
    const [shareModalVisible, setShareModalVisible] = useState(false);

    return (
        <>
            <Modal
                visible={shareModalVisible}
                title="Compartilhe o Evento"
                onClose={() => setShareModalVisible(false)}
                secondaryButtonText="Fechar"
            >
                <div className="w-full sm:w-[400px]">
                    <p>Copie o link abaixo e envie-o para outras pessoas!</p>
                    <p className="text-center bg-purple-200 p-2 rounded-sm font-semibold mt-2">{location.hostname + "/evento/" + props.url}</p>
                </div>
            </Modal>

            <div className="px-2 sm:px-4 py-5 flex flex-col sm:flex-row items-center gap-3 border-b border-b-[#ddd] bg-white w-full">
                <img
                    src={props.banner ? `data:image/png;base64,${props.banner}` : "https://placehold.co/1280x720"}
                    className="w-full h-40 sm:w-44 sm:h-28 object-cover rounded-lg"
                    alt="Imagem do evento"
                />
                <div className="flex flex-col justify-center w-full">
                    {/* Details */}
                    <section>
                        {
                            props.url !== undefined
                            ? <Link to={"/evento/" + props.url}>
                                <h2 className="text-xl font-bold text-dyon-light">{props.title}
                                {
                                    props.label &&
                                    <span className="text-[16px] ml-2">({props.label})</span>
                                }
                                </h2>
                            </Link>
                            : <h2 className="text-xl font-bold text-dyon-light">{props.title}</h2>
                        }
                        {
                            props.organization &&
                            <Link to={"/perfil/" + props.organization.username} className="font-normal text-[#333333] leading-4 block">
                               {props.organization.nome}
                            </Link>
                        }
                        {
                            !isDateArray(props.period)
                            ? dayjs().isAfter(props.period.start)
                                ? dayjs().isBefore(props.period.end)
                                    ? <span className="text-base block font-bold italic text-dyon-red">ACONTECENDO AGORA!</span>
                                    : <span className="text-base block font-bold italic text-dyon-red">Este Evento já acabou</span>
                                : <span className="text-base block font-semibold italic text-dyon-light">Início: {formatDateFull(props.period.start)}</span>
                            : <span className="block text-dyon-default font-medium mb-1">{formatDisplayDates(props.period)}</span>
                        }
                        <p className="text-base font-normal text-[#555555] mb-2">{props.address}</p>
                    </section>

                    {/* Buttons */}
                    <footer className="flex items-center gap-4 justify-between sm:justify-start px-2 sm:px-0">
                        <div className="gap-4 flex items-center">
                        {props.children}
                        {
                            props.share &&
                            <EventCardButton
                                key={"Compartilhar"}
                                icon={<Share size={20} color="#333333" weight="bold"/>}
                                text="Compartilhar"
                                onClick={() => setShareModalVisible(true)}
                            />
                        }
                        </div>
                        {
                            props.options &&
                            <EventCardButton
                                key={"Opções"}
                                icon={<DotsThreeOutline size={20} color="#333333" weight="bold"/>}
                                text="Opções"
                                hideOnShrink={true}
                            >
                                {
                                    props.options.map(o => (
                                        <div
                                            key={o.label}
                                            className={`font-semibold p-1 ${o.color} hover:bg-gray-200 cursor-pointer`}
                                            onClick={o.onClick}
                                        >
                                            {o.label}
                                        </div>
                                    ))
                                
                                }

                            </EventCardButton>
                        }
                    </footer>
                </div>
            </div>
        </>
    )
}

interface EventCardButtonProps {
    icon: ReactElement;
    text: string
    hideOnShrink?: boolean;
    onClick?: (e?: any) => void;
    children?: ReactNode;
}

/**
 * ProfileEventCard Button that triggers a function on click.
 * If children (options) are passed, when clicked it will toggle a submenu visibility with its children
 */
export function EventCardButton({ icon, text, hideOnShrink, onClick, children }: EventCardButtonProps) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative select-none cursor-pointer">
            <div className="flex items-center justify-center gap-1 relative" onClick={(e) => {
                if(children)
                    setVisible(!visible);
                if(onClick)
                    onClick(e);
            }}>
                {icon}
                <span className={clsx(
                    "font-semibold text-[#333333]",
                    hideOnShrink && "hidden sm:block"
                )}>{text}</span>
            </div>

            <div className="absolute bg-white rounded shadow-md w-[180px] right-0 bottom-8 sm:bottom-auto sm:right-auto">
                { visible && children }
            </div>
        </div>
    )
}