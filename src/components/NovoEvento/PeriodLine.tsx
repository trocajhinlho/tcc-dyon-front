import dayjs from "dayjs";
import { formatDateFull } from "../../hooks/useFormatDate";
import formatDisplayDates from "../../utils/formatDisplayDates";
import { useFormatPeriod } from "../../hooks/useFormatPeriod";
import { X } from "phosphor-react";

interface Props {
    start: Date;
    end: Date;
    limit?: number;
    onClickRemove: () => void;
}

export default function PeriodLine(props: Props) {
    const dates = useFormatPeriod(new Date(props.start), new Date(props.end));
    const isSameDate = typeof dates === "string";

    return (
        <div className="flex justify-between items-center bg-white border-dyon-light rounded-lg border-2 p-2 mb-2">
            <div className="text-typo-2">
                <div className="text-lg font-semibold">
                    {
                        isSameDate
                        ? <span>{dates}</span>
                        : <>
                            <div>De {dates[0]}</div>
                            <div>Até {dates[1]}</div>
                            </>
                    }
                </div>
                {
                props.limit &&
                <span>Máximo de <b>{props.limit} inscrições</b></span>
                }
            </div>
            <div
                title="Remover Período"
                className="cursor-pointer p-1"
                onClick={props.onClickRemove}
            >
                <X />
            </div>
        </div>
    )
}