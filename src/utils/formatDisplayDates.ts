import dayjs from "dayjs";

/**
 * Formats dates display for Event cards
 */
export default function formatDisplayDates(dates: Date[]): string {
    const format = (date: Date): string => dayjs(date).format("DD MMM[.]");
    dates = dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());

    if(dates.length > 3)
        return `${format(dates[0])} > ${format(dates[dates.length - 1])}`;
    else
        return dates.map(date => format(date)).join(" / ");
}