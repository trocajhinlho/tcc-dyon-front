import { Warning } from "phosphor-react";
import { Link } from "react-router-dom";

import setBgColor from "../../utils/setBgColor";

export default function NaoAutorizado() {
    setBgColor("gray");

    return (
        <div className="pt-20 flex flex-col items-center text-center">
            <Warning size={64} weight="fill" fill="#F15F45" />
            <h2 className="text-xl font-bold text-typo-title mt-4 mb-8">Você não possui permissão para acessar esta página</h2>
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