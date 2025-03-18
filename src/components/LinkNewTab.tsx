import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function LinkNewTab({ to, children, className }: { to:string, children: ReactNode, className: string }) {
    return (
        <Link
            to={to}
            className={className}
            onClick={(e) => {
                e.preventDefault();
                window.open(to,"_blank")
            }}
        >
            {children}
        </Link>
    )
}