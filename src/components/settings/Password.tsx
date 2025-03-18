import { Check, X } from "phosphor-react";

export default function Password() {
    return (
        <div className="shadow-lg flex-grow rounded-xl px-8 py-5 mb-12">

            <form action="#" method="post" className="flex justify-between gap-10 pb-2 px-3 flex-col">
                <div className="w-full">
                    <h1 className="text-3xl font-semibold text-[#2D3436] mb-8 border-b border-b-[#ddd] pb-3">Senha</h1>
                    <div className="flex flex-col w-full px-3">
                        <label htmlFor="currentPass" className="text-base font-semibold mb-1">Senha Atual</label>
                        <input type="password" name="currentPass" id="currentPass" placeholder="Senha atual" value={"coxinha123"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-[420px]" />
                    </div>
                    <div className="flex flex-col w-full px-3 mt-3">
                        <label htmlFor="newPassword" className="text-base font-semibold mb-1">Nova Senha</label>
                        <input type="password" name="newPassword" id="newPassword" placeholder="Nova Senha" value={"coxinha321"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-[420px]" />
                    </div>
                    <div className="flex flex-col w-full px-3 mt-3">
                        <label htmlFor="confirmPass" className="text-base font-semibold mb-1">Confirmar Nova Senha</label>
                        <input type="password" name="confirmPass" id="confirmPass" placeholder="Confirmar Nova senha" value={"coxinha321"} className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-[420px]" />
                    </div>
                </div>
                
                <div className="w-full">
                    <h2 className="mb-2">A senha deve conter:</h2>
                    <p className="flex items-center mt-1"><Check color="#00ff00" size={18} weight={'bold'} className="mr-2"/> No mínimo 8 caracteres</p>
                    <p className="flex items-center mt-1"><X color="#ff0000" size={18} weight={'bold'} className="mr-2"/> Ao menos um número</p>
                    <p className="flex items-center mt-1"><X color="#ff0000" size={18} weight={'bold'} className="mr-2"/> Ao menos uma letra maiúscula</p>
                </div>
                <div className="flex gap-3 justify-end">
                    <button className="bg-[#EFEFEF] w-24 py-2 px-4 rounded-lg  text-[#333333] font-bold text-base items-center justify-center flex">Cancelar</button>
                    <button className="bg-[#7F529F] w-24 py-2 px-4 rounded-lg  text-white font-bold text-base items-center justify-center flex">Salvar</button>
                </div>
            </form>
        </div>
    )
}