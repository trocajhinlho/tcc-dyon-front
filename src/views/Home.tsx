import setBgColor from "../utils/setBgColor"; import { FeaturedEventCarousel } from "../components/FeaturedEventCarousel";
import EventCategorySlider from "../components/EventCategorySlider";
import * as React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react"
import { EventCard } from "../components/EventCard";
import { fetchEventSearch } from "../api/api";
import { EventCardInfo } from "../types/interface";
import scrollTop from "../utils/scrollTop";
import FetchInfoErrorMsg from "../components/FetchInfoErrorMsg";
export function Home() {

    const carousel = React.useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const [width, setWidth] = useState(0)
    const [events, setEvents] = useState<EventCardInfo[]>([]);
    
    useEffect(() => {

        fetchEventSearch("")
            .then(({ data }) => {
                setEvents(data);
            })
            .catch(err => {
                if (err.code === "ERR_NETWORK") {
                    setError(true);
                }
            });

        if (carousel.current?.offsetWidth){
            setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
        }
        scrollTop();
    }, []);

    setBgColor("white");

    return (
        <div className="w-max-[screen] ">
            <div>
                <FeaturedEventCarousel />
            </div>
            <div className="md:mt-1 mt-12">
                <h1 className="text-xl font-bold mb-3">Categorias que talvez você goste</h1>
                <EventCategorySlider />
            </div>
            <div className="md:mt-12 mt-20">
                <h1 className="text-xl font-bold mb-3">Eventos que você pode gostar</h1>
                {
                error
                ? <FetchInfoErrorMsg msg="Não foi possível buscar os eventos" />
                : <div className="w-full">
                    <motion.div ref={carousel} whileTap={{ cursor: "grabbing", scale: 0.98 }} className=" overflow-hidden" >
                        <motion.div className="flex"
                            drag="x"
                            dragConstraints={{ right: 0, left: -width }}
                        >

                            {events.slice(0, 8).map(event => (
                                <motion.div key={event._publicId} className="min-h-[160px] min-w-[320px] p-3 relative inline-block cursor-pointer">
                                    {
                                        <EventCard
                                            banner={event.banner}
                                            key={event._publicId}
                                            address={{
                                                cidade: event.endereco.cidade,
                                                uf: event.endereco.uf
                                            }}
                                            dates={event.periodosOcorrencia.map(p => new Date(p.inicio))}
                                            title={event.titulo}
                                            organizationName={event.criador.nome}
                                            url={event._publicId + "/" + event.slug}
                                        />
                                    }
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
                }
            </div>

        </div>
    )
}