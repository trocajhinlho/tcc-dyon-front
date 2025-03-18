import clsx from "clsx";
import { ReactNode } from "react";

export const EventTab = ({ textLg, textSm, onClick, selected }: { textLg: string, textSm: string, selected: boolean, onClick?: () => void }) => (
    <div
        onClick={onClick}
        className={clsx("text-center p-4 flex-1 hover:bg-dyon-default select-none",
            "transition-colors sm:text-md md:text-lg font-bold text-white cursor-pointer",
            selected ? "bg-dyon-default" : "bg-dyon-light")}
    >
        <span className="hidden md:block">
            {textLg}
        </span>
        <span className="block md:hidden text-[14px] sm:text-[16px]">
            {textSm}
        </span>
    </div>
)

export default function ListEventCard({ children, tabs }: { children: ReactNode, tabs: JSX.Element[] }) {
    return(
        <div className="flex flex-1 flex-col rounded-lg shadow-lg w-full bg-white">
            {/* Event filtering tabs */}
            <div className="flex items-center gap-[1px] rounded-t-lg overflow-hidden">
                {tabs}
            </div>
            {/* Event List */}
            <div className="sm:px-4 pt-5 pb-2">
                {children}
                
            </div>
        </div>
    )
}