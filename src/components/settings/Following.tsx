import { MagnifyingGlass, Trash } from "phosphor-react";

export default function Following() {
    return (
        <div className="shadow-lg flex-grow rounded-xl px-8 py-5 mb-12">
            <div className="w-full">
                <h1 className="text-3xl font-semibold text-[#2D3436] mb-8 border-b border-b-[#ddd] pb-3">Instituições que sigo</h1>
                <h2 className="font-medium">Pesquisar nova instituição</h2>

                <div className="flex items-center bg-[#EFEFEF] rounded-2xl pr-4 mt-2">
                    <input
                        type="search"
                        name="pesquisarInstituicao"
                        id="pesquisarInstituicao"
                        className="px-3 w-full h-10 rounded-xl bg-[#EFEFEF] items-center placeholder-[#636E72] border border-none outline-none"
                        placeholder="Pesquisar Instituições..."
                    />
                    <button className="flex" onClick={() => null}><MagnifyingGlass size={20} color={"#444"} weight={"bold"} /></button>
                </div>

                <div className="mt-6">

                    <div className="flex justify-between items-center px-7 py-4 border-b ">
                        <div>
                            <h2 className="text-lg font-bold text-[#333]">Escola Saga - Santo André</h2>
                            <p className="text-[#333]">R. Luís Pinto Fláquer, 519 - Centro, Santo André - SP</p>
                        </div>
                        <button className="flex items-center justify-center"><Trash size={24} weight={"bold"}/></button>
                    </div>

                    <div className="flex justify-between items-center px-7 py-4 border-b ">
                        <div>
                            <h2 className="text-lg font-bold text-[#333]">Escola Saga - Santo André</h2>
                            <p className="text-[#333]">R. Luís Pinto Fláquer, 519 - Centro, Santo André - SP</p>
                        </div>
                        <button className="flex items-center justify-center"><Trash size={24} weight={"bold"}/></button>
                    </div>

                    <div className="flex justify-between items-center px-7 py-4 border-b ">
                        <div>
                            <h2 className="text-lg font-bold text-[#333]">Escola Saga - Santo André</h2>
                            <p className="text-[#333]">R. Luís Pinto Fláquer, 519 - Centro, Santo André - SP</p>
                        </div>
                        <button className="flex items-center justify-center"><Trash size={24} weight={"bold"}/></button>
                    </div>


                </div>

            </div>

        </div>
    )
}