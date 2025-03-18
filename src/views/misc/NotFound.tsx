import { Warning } from "phosphor-react";
import { Link } from "react-router-dom";

import setBgColor from "../../utils/setBgColor";

export default function NotFound() {
    setBgColor("gray");

    return (
        <div className="pt-20 flex flex-col items-center text-center">
            <Warning size={64} weight="fill" fill="#7f529f" />
            <h2 className="text-xl font-bold text-typo-title mt-4 mb-8">Oops! Parece que você tentou acessar uma página que não existe!</h2>
            <Link
                to="/"
                replace={true}
                className="select-none font-semibold text-lg py-3 px-5 text-white bg-dyon-default hover:bg-dyon-light rounded-xl"
            >
                Voltar à home
            </Link>
        </div>
    )
}