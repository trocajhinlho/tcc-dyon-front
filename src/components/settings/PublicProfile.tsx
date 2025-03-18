import { X } from "phosphor-react";

export default function PublicProfile() {
    return (
        <div className="shadow-lg flex-grow rounded-xl px-8 py-5">
            <h1 className="text-3xl font-semibold text-[#2D3436] mb-8 border-b border-b-[#ddd] pb-3">Perfil Público</h1>
            <form action="#" method="post" className="flex items-center justify-between gap-10 pb-2 px-3">
                <div className="flex flex-col w-full ">
                    <div className="flex flex-col gap-6 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-base font-semibold mb-1">Nome Completo</label>
                            <input type="text" name="name" id="name" placeholder="Gabriela Dossie" className="bg-[#EFEFEF] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                        </div>

                        <div className="flex flex-col ">
                            <label htmlFor="socialName" className="text-base font-semibold mb-1">Nome Social</label>
                            <input type="text" name="sociaName" id="sociaName" placeholder="Lucas do pinto" className="bg-[#EFEFEF] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="date" className="text-base font-semibold mb-1">Data de cadastro</label>
                            <input type="text" name="date" id="date" placeholder="19/12/2002" className="bg-[#DDDDDD] text-[#333333] text-lg px-2 py-1 rounded border w-full" />
                        </div>
                    </div>

                    <div>
                        <p className="text-base font-semibold mb-1">Categorias Favoritas</p>
                        <div className="flex gap-2">
                            <div>
                                <input type="checkbox" id="Esportivo" value="Esportivo" className="hidden peer  items-center" />
                                <label htmlFor="Esportivo" className="inline-flex items-center justify-center  bg-[#EEEEEE] rounded-lg cursor-pointer hover:bg-[#dddddd] peer-checked:bg-red-300">
                                    <div className="flex py-1 px-2 items-center justify-center gap-2">
                                        <p className="align-middle">Esportivo</p>
                                        <X />
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-lg font-semibold mb-1">Foto de Perfil</p>
                    <img src="./src/assets/foto_perfil.svg" alt="Foto de perfil" className="w-32 h-32 rounded-full mb-3" />
                    <div className="flex gap-3">
                        <button className="bg-[#EFEFEF] w-24 py-2 px-4 rounded-lg  text-[#333333] font-bold text-base items-center justify-center flex">Cancelar</button>
                        <button className="bg-[#7F529F] w-24 py-2 px-4 rounded-lg  text-white font-bold text-base items-center justify-center flex">Salvar</button>
                    </div>
                </div>

            </form>
        </div>
    )
}