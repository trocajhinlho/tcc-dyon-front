import dayjs from "dayjs";

export const formatDateFull = (date: Date | string, abbreviate = false): string => {
    const monthFormat = abbreviate ? "MMM" : "MMMM";
    return dayjs(date).format(`DD [de] ${monthFormat} [de] YYYY [às] kk:mm`);
}
