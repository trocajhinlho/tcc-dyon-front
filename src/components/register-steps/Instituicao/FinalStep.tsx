import { Link } from "react-router-dom";

export function FinalStep() {
    return (
        <div>
            <h1 className="text-center font-bold text-4xl text-[#29274C] mb-4">Cadastro concluído!</h1>
            <div className="text-black font-medium text-2xl text-center">
                <p>Bem-vindo a sua plataforma de eventos favorita! </p>
                <p>Antes de poder acessar sua conta, verifique sua caixa de entrada do e-mail para permitir seu acesso</p>
                <div className="flex justify-center items-center mt-6">
                    <Link to="/">
                        <div className="bg-dyon-light px-[15px] py-[10px] rounded-xl w-full md:w-[160px] text-white font-bold text-base">
                            Ir à home
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    )
}