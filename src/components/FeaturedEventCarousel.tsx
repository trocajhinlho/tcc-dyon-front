import { useEffect, useState } from "react";

import { fetchEventSearch } from "../api/api";
import { EventCardInfo } from "../types/interface";
import { FeaturedEventCard } from "./FeaturedEventCard";
import FetchInfoErrorMsg from "./FetchInfoErrorMsg";


export function FeaturedEventCarousel() {

    const [events, setEvents] = useState<EventCardInfo[]>([]);
    const [error, setError] = useState(false);

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
    }, []);

    if(error) {
        return (
            <FetchInfoErrorMsg msg="Não foi possível buscar os eventos em destaque" />
        )
    }


    return (
        <div className=" relative ">
            <div className="my-0 w-full flex flex-col justify-center lg:h-96 min-h-[500px] overflow-hidden relative ">
                <div className="lg:w-[500%] h-96 w-[400%] flex justify-center lg:pl-40 2xl:pl-48">

                    <input className="hidden peer/radio1" type="radio" name="radioBtn" id="radio1" />
                    <input className="hidden peer/radio2" type="radio" name="radioBtn" id="radio2" />
                    <input className="hidden peer/radio3" type="radio" name="radioBtn" id="radio3" />
                    <input className="hidden peer/radio4" type="radio" name="radioBtn" id="radio4" />
                    {
                        events.slice(0, 4).map(e => (
                            <div className="w-[25%]  relative peer-checked/radio1:ml-[0px] peer-checked/radio2:ml-[-50%] peer-checked/radio3:ml-[-100%] peer-checked/radio4:ml-[-150%] transition-all items-center ">
                                <FeaturedEventCard
                                    banner={e.banner}
                                    address={e.endereco}
                                    dates={e.periodosOcorrencia.map(p => new Date(p.inicio))}
                                    title={e.titulo}
                                    organizationName={e.criador.nome}
                                    url={e._publicId + "/" + e.slug}
                                    key={e._publicId}
                                />
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className="absolute w-full flex lg:bottom-20 bottom-[0px] items-center justify-center gap-1 rounded-full p-1">
                <RadioButton htmlFor="radio1" />
                <RadioButton htmlFor="radio2" />
                <RadioButton htmlFor="radio3" />
                <RadioButton htmlFor="radio4" />
            </div>

        </div>
    )
}

function RadioButton({ htmlFor }: { htmlFor: string } ) {
    return (
        <label
            className="border p-1 rounded-xl cursor-pointer transition-colors hover:bg-dyon-light border-dyon-light w-3 h-3"
            htmlFor={htmlFor}
        />
    )
}