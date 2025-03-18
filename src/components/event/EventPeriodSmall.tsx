import clsx from "clsx";
import { CalendarBlank, Check, WarningCircle } from "phosphor-react";
import { HtmlHTMLAttributes } from "react";

import { useFormatPeriod } from "../../hooks/useFormatPeriod";
import { EventPeriod } from "../../types/interface";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    eventPeriod: EventPeriod;
    selectable?: boolean;
    selected?: boolean;
    bg?: string;
    subscribed?: boolean;
}

export function EventPeriodSmall({ eventPeriod, selectable, onClick, selected, bg, className, subscribed }: Props) {
    const period = useFormatPeriod(eventPeriod.inicio, eventPeriod.termino, true);
    const isSameDate = typeof period === "string";
    const remainingSubscriptions = eventPeriod.inscricoesMaximo && eventPeriod.inscricoesMaximo - eventPeriod.inscricoes;
    const subsSoldOff = eventPeriod.inscricoesMaximo && eventPeriod.inscricoesMaximo - eventPeriod.inscricoes === 0;
    if(subsSoldOff || subscribed === true)
        selectable = false;

    return (
        <div onClick={(e) => { if(selectable && onClick) onClick(e) }} className={clsx(
            "text-typo-2", "border", "rounded-sm", "mb-2", "p-2",
            "flex", "justify-between", "items-center",
            selectable === false && "opacity-70 bg-[#ddd]",
            selected && "bg-[#ddd] border-dyon-light",
            !selected && !subsSoldOff && bg,
            selectable ? "cursor-pointer" : "cursor-not-allowed",
            className
        )}>
            <div>
                <div className="text-[18px] font-bold flex items-center">
                        <CalendarBlank weight="bold" className="mr-1" />
                        {isSameDate ? period : period[0]}
                </div>
                {
                    !isSameDate &&
                    <div>até {period[1]}</div>
                }
                <div className="ml-2 mt-4"><b>{eventPeriod.inscricoes}</b> inscrições agora</div>
                {
                    eventPeriod.inscricoesMaximo && <div className="text-red-500 font-bold">
                        {
                            subsSoldOff
                            ? <span className="flex items-center gap-1"><WarningCircle weight="bold" /> Inscrições esgotadas</span>
                            : !subscribed && <span>{remainingSubscriptions} inscrições restantes</span>
                        }
                    </div>
                }
                {
                    subscribed &&
                    <div className="text-dyon-default font-bold italic">
                        Você já está inscrito neste período
                    </div>
                }
            </div>
            {
                selectable &&
                <div className={clsx(
                    selected ? "visible" : "invisible"
                )}>
                    <Check size={24} weight="bold" />
                </div>
            }
        </div>
    )
}