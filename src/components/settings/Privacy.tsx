export default function Privacy (){
    return(
        <div className="shadow-lg flex-grow rounded-xl px-8 py-5 mb-12">

            <form action="#" method="post" className="flex justify-between gap-10 pb-2 px-3 flex-col">
                <div className="w-full">
                    <h1 className="text-3xl font-semibold text-[#2D3436] mb-8 border-b border-b-[#ddd] pb-3">Privacidade</h1>
                    <h2 className="font-medium">Exibir publicamente:</h2>
                    <div className="flex items-center mr-4 mt-2 ml-2">
                        <input id="my-inscription" type="checkbox" value="showMyInscription" checked className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 rounded-2xl focus:ring-gray-300"/>
                        <label htmlFor="my-inscription" className="ml-2 font-normal">Minhas inscrições</label>
                    </div>
                    <div className="flex items-center mr-4 mt-2 ml-2">
                        <input id="my-favorite" type="checkbox" value="showMyFavorite" checked className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 rounded-2xl focus:ring-gray-300"/>
                        <label htmlFor="my-favorite" className="ml-2 font-normal">Minhas categorias favoritas</label>
                    </div>
                    <div className="flex items-center mr-4 mt-2 ml-2">
                        <input id="following-institution" type="checkbox" value="showFollowingInstitution" checked className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 rounded-2xl focus:ring-gray-300"/>
                        <label htmlFor="following-institution" className="ml-2 font-normal">Quais instituições eu estou seguindo</label>
                    </div>
                    <div className="flex items-center mr-4 mt-2 ml-2">
                        <input id="event-history" type="checkbox" value="showEventHistory" checked className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 rounded-2xl focus:ring-gray-300"/>
                        <label htmlFor="event-history" className="ml-2 font-normal">Meu histórico de eventos</label>
                    </div>
                </div>
                <div className="flex gap-3 justify-end">
                    <button className="bg-[#EFEFEF] w-24 py-2 px-4 rounded-lg  text-[#333333] font-bold text-base items-center justify-center flex">Cancelar</button>
                    <button className="bg-[#7F529F] w-24 py-2 px-4 rounded-lg  text-white font-bold text-base items-center justify-center flex">Salvar</button>
                </div>
            </form>
        </div>
    )
}