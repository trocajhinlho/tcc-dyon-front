import dayjs from "dayjs";

import { formatDateFull } from "./useFormatDate";


export const useFormatPeriod = (startDate: Date, endDate: Date, abbreviate = false): string[] | string => {
    if(dayjs(startDate).isSame(endDate, "day")) {
        return formatDateFull(startDate, abbreviate) + " até " +
            dayjs(endDate).format("kk:mm");
    }
    else return [
        formatDateFull(startDate, abbreviate),
        formatDateFull(endDate, abbreviate)
    ];
}