import { User } from "phosphor-react";
import { ReactElement, ReactNode } from "react"

interface Props {
    icon: ReactElement;
    title: string;
    children: ReactNode;
    
}

export function HeaderMenuSection({ icon, title, children }: Props) {
    return (
        <div className="border-b-2  py-5">
            <div className="flex items-center gap-2">
                {icon}
                <h1 className="text-[#555555] text-base font-semibold">{title}</h1>
            </div>
            <ul className="mt-1 px-3">
                {children}
            </ul>
        </div>
    )
}