import { ReactNode } from "react";

interface Props {
    msg: string;
    error?: boolean;
    children: ReactNode;
}

export default function ErrorWrapper({ msg, children, error }: Props) {
    return (
        <div>
            {children}
            {
                error &&
                <div className="mt-2 px-2 text-dyon-red font-semibold text-[15px]">*{msg}</div>
            }
        </div>
    )
}