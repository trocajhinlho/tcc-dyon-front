import { CloudSlash } from "phosphor-react";
import { Link } from "react-router-dom";

import setBgColor from "../../utils/setBgColor";

export default function FalhaConexao() {
    setBgColor("gray");

    return (
        <div className="pt-20 flex flex-col items-center text-center">
            <CloudSlash size={64} weight="fill" fill="#F15F45" />
            <h3 className="text-4xl font-bold text-typo-2 mt-4 mb-8">503</h3>
            <h2 className="text-xl font-bold text-typo-2 mb-4">Serviço temporariamente indisponível, tente novamente</h2>
            <p className="max-w-[600px] mb-8">
                Não foi possível estabelecer uma conexão com o servidor. Ele pode estar sobrecarregado ou desligado. Tente novamente mais tarde
            </p>
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