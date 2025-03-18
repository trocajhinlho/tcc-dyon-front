import clsx from "clsx";
import { InputHTMLAttributes, RefObject } from "react";


type fontWeight = "extrabold" | "bold" | "semibold" | "medium" | "normal" | "thin";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    widthClass?: string;
    border?: boolean;
    bgClass?: string;
    fontWeight?: fontWeight;
    fontSize?: "lg" | "xl" | `[${number}px]`;
    reff?: RefObject<HTMLInputElement>;
    disabledClass?: string;
}

export function Input(props: Props) {
    return (
        <input
            type={props.type}
            name={props.name}
            id={props.id}
            ref={props.reff}
            placeholder={props.placeholder}
            className={clsx(
                "rounded-lg h-[38px] outline-[#7F529F] px-4 text-typo-2 placeholder:text-typo-2 placeholder:font-semibold",
                props.widthClass ?? "w-full",
                props.border ? "border-[#CDCDCD] border" : "",
                props.bgClass ?? "bg-[#EEE]",
                props.fontWeight ? "font-" + props.fontWeight : "font-medium",
                props.className,
                props.fontSize && "text-" + props.fontSize,
                props.disabled && props.disabledClass
            )}
            value={props.value}
            onChange={props.onChange}
            max={props.max}
            min={props.min}
            disabled={props.disabled}
        />
    )
}