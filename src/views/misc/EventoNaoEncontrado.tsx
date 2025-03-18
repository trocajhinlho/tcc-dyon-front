import { Warning } from "phosphor-react";
import setBgColor from "../../utils/setBgColor";
import logoDyon from "../../assets/logos/logo_text.svg";
import { Link } from "react-router-dom";

export default function EventoNaoEncontrado() {
    setBgColor("gray");

    return (
        <div className="pt-20 flex flex-col items-center text-center">
            <Warning size={64} weight="fill" fill="#7f529f" />
            <h2 className="text-xl font-bold text-typo-title mt-4">Oops! Este evento que você tentou acessar não existe,</h2>
            <span
                className="mb-10 text-typo-2 text-lg"
            >
                Mas existem muitos outros eventos aqui no <img className="inline" src={logoDyon} width={50} /> !
            </span>
            <Link
                to="/eventos"
                className="select-none font-semibold text-lg py-3 px-5 text-white bg-dyon-default hover:bg-dyon-light rounded-xl"
            >
                Ver Eventos
            </Link>
        </div>
    )
}