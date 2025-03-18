import clsx from "clsx";
import { InputHTMLAttributes, RefObject } from "react";

export type InputAltProps = InputHTMLAttributes<HTMLInputElement> & { reff?: RefObject<HTMLInputElement> };

export const inputClass = "border-b-dyon-light bg-white px-4 py-1 text-typo-2 placeholder:text-[#555] " +
"border-b rounded text-lg font-bold outline-dyon-default h-10";

export default function InputAlt({ type, name, id, placeholder, className, onChange, value, reff }: InputAltProps) {
    return (
        <input
            type={type} name={name} id={id}
            placeholder={placeholder}
            className={clsx(inputClass, className)}
            onChange={(e) => onChange && onChange(e)}
            value={value}
            ref={reff}
        />
    )
}