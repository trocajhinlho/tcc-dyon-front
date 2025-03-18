import { ReactNode, useState } from "react";

enum colors {
    "dyon-default" = "text-dyon-default",
    "dyon-light" = "text-dyon-light",
    "dyon-red" = "text-dyon-red",
    "dyon-yellow" = "text-dyon-yellow"
}

interface Props {
    dismissOnClick?: boolean;
    icon?: ReactNode;
    text: string;
    color: "dyon-default" | "dyon-yellow" | "dyon-red" | "dyon-light";
}

export function Callout({ dismissOnClick, text, icon, color}: Props) {
    const [visible, setVisible] = useState(true);

    const clickDismiss = () => {
        if(!dismissOnClick) return;
        setVisible(false);
    }

    return (
        visible
        ? <div className={`font-bold flex items-center gap-1 mb-2 ${colors[color]}`} onClick={clickDismiss}>
            {icon}
            <span className="text-lg">{text}</span>
        </div>
        : <></>
    )
}