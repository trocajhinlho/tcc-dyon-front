import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";

import { categories } from "../utils/categoryListValues";
import scrollTop from "../utils/scrollTop";


export default function EventCategorySlider() {

    const carousel = React.useRef<HTMLInputElement>(null);
    const [width, setWidth] = useState(0)

    useEffect(() => {
        scrollTop();

        if (carousel.current?.offsetWidth)
            setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);


    }, []);

    return (
        <div className="w-full">
            <motion.div ref={carousel} whileTap={{ cursor: "grabbing", scale: 0.98 }} className=" overflow-hidden" >
                <motion.div className="flex"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                >
                    {categories.map(cat => (
                        <motion.div key={cat._id} className="min-h-[160px] min-w-[320px] p-3 relative inline-block cursor-pointer">
                            <Link to={`/eventos/?category=${cat._id}`}>
                                <p className="absolute flex font-bold text-white text-4xl bottom-8 right-8">{cat.titulo}</p>
                                <img src={cat.image} alt="category" className="w-full h-40 rounded-lg" />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>

        </div>
    )
}