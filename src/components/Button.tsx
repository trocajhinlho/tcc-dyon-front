import clsx from "clsx";
import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    textSize?: string;
    bg?: string;
    textColor?: string;
    children: ReactNode;
    width?: "full";
    padding?: string;
}

export function Button({textSize, bg, textColor, width, children, onClick, disabled, padding}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                "select-none",
                "font-semibold",
                `text-${textSize ?? "[16px]"}`,
                padding ?? "px-6 py-3",
                textColor ? `text-[${textColor}]` : "text-white",
                bg ?? (!disabled && "bg-dyon-default"),
                "rounded-xl",
                width && `w-${width}`,
                disabled && "bg-disabled"
            )}
        >
            {children}
        </button>
    )
}