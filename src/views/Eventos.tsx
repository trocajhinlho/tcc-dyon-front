import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";

import { fetchEventSearch } from "../api/api";
import { EventCard } from "../components/EventCard";
import FetchInfoErrorMsg from "../components/FetchInfoErrorMsg";
import { EventCardInfo, EventSearchQuery } from "../types/interface";
import { statesList } from "../types/statesEnum";
import { categories } from "../utils/categoryListValues";
import scrollTop from "../utils/scrollTop";
import setBgColor from "../utils/setBgColor";


export default function Eventos() {
    const carousel = React.useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const [search, setSearch] = useState("");
    const [width, setWidth] = useState(0)
    const [events, setEvents] = useState<EventCardInfo[]>([]);

    useEffect(() => {
        setBgColor("white");
        scrollTop();

        if (carousel.current?.offsetWidth)
            setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
        
        const urlQuery = new URLSearchParams(location.search);
        handleSearchQuery({
            category: urlQuery.get("category") ?? undefined,
            search: urlQuery.get("search") ?? undefined,
            uf: urlQuery.get("uf") ?? undefined,
        });
    }, []);

    const handleSearchQuery = (update: EventSearchQuery) => {
        const searchParams = new URLSearchParams(location.search);
        for (const [key, value] of Object.entries(update)) {
            if(typeof value === "string" && value.length > 0) 
                searchParams.set(key, value);
            else
                searchParams.delete(key);
        }
        const params = searchParams.toString();
        history.pushState({}, "", `?${params}`);
        handleEventsSearch(params);
    }

    const handleEventsSearch = (query: string) => {
        setError(false);
        fetchEventSearch(query)
            .then(({data}) => {
                setEvents(data);
            })
            .catch(err => {
                if(err.code === "ERR_NETWORK") {
                    setError(true);
                }
            });
    }

    

    return (
        <div>
            <div className="mb-10">
                <h2 className="font-bold text-2xl text-[#333]">Categorias</h2>
                <div className="w-full">
                    <motion.div ref={carousel} whileTap={{ cursor: "grabbing", scale: 0.98 }} className=" overflow-hidden" >
                        <motion.div className="flex"
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                        >
                            {categories.map(cat => (
                                <motion.div key={cat._id} className="min-h-[160px] min-w-[320px] p-3 relative inline-block cursor-pointer">
                                    <div onClick={() => handleSearchQuery({ category: cat._id })}>
                                        <p className="absolute flex font-bold text-white text-4xl bottom-8 right-8">{cat.titulo}</p>
                                        <img src={cat.image} alt="category" className="w-full h-40 rounded-lg" />
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                </div>
            </div>
            
            <div className="mb-4 flex justify-center">
                <div className="flex flex-1 justify-center gap-3 max-w-[500px]">
                    <form className="flex-1" onSubmit={(e) => {
                        e.preventDefault();
                        handleSearchQuery({ search: search });
                    }}>
                        <input
                            type="search"
                            name="pesquisar"
                            id="pesquisar"
                            className="pl-3 w-full h-10 rounded-xl bg-[#EFEFEF] items-center placeholder-[#636E72] border border-none outline-none"
                            placeholder="Pesquisar eventos pelo título, instituição..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                    <select
                        onChange={(e) => handleSearchQuery({ uf: e.target.value })}
                        name="UF"
                        id="UF"
                        defaultValue=""
                        className="bg-[#EEEEEE] rounded-xl outline-none font-medium px-3 py-2 text-typo-2 w-[60px] mini:w-[100px]"
                    >
                        <option value="">Nenhum</option>
                        {
                            statesList.map(state => <option key={state[0]} value={state[0]}>{state[1]}</option>)
                        }
                    </select>
                </div>
            </div>

            <div>
                <h2 className="font-bold text-2xl text-[#333] mb-4">Todos os eventos</h2>
                {
                    error
                    ? <FetchInfoErrorMsg msg="Não foi possível buscar os eventos" />
                    : <div className="flex flex-wrap gap-14 justify-center">
                        {
                        events.map(e => (
                            <EventCard
                                banner={e.banner}
                                key={e._publicId}
                                    address={{
                                    cidade: e.endereco.cidade,
                                    uf: e.endereco.uf
                                }}
                                dates={e.periodosOcorrencia.map(p => new Date(p.inicio))}
                                title={e.titulo}
                                organizationName={e.criador.nome}
                                url={e._publicId + "/" + e.slug}
                            />
                        ))
                        }
                    </div>
                }
            </div>
        </div>

    )
}