import animaisImg from "../assets/categorias/categoria_animais.jpg";
import educacaoImg from "../assets/categorias/categoria_educacao.jpg";
import esporteImg from "../assets/categorias/categoria_esporte.jpg";
import infantilImg from "../assets/categorias/categoria_infantil.jpg";
import lazerImg from "../assets/categorias/categoria_lazer.jpg";
import negocioImg from "../assets/categorias/categoria_negocio.jpg";
import palestraImg from "../assets/categorias/categoria_palestra.jpg";
import showsImg from "../assets/categorias/categoria_shows.jpg";
import tecnologiaImg from "../assets/categorias/categoria_tecnologia.jpg";
import { CategoryPicture } from "../types/interface";


export const categories: CategoryPicture[] = [
    { titulo: "Animais", image: animaisImg, _id: "animais" },
    { titulo: "Educação", image: educacaoImg, _id: "educacao" },
    { titulo: "Esportes", image: esporteImg, _id: "esportes" },
    { titulo: "Infantil", image: infantilImg, _id: "infantil" },
    { titulo: "Lazer", image: lazerImg, _id: "lazer" },
    { titulo: "Negócios", image: negocioImg, _id: "negocios" },
    { titulo: "Palestra", image: palestraImg, _id: "palestra" },
    { titulo: "Shows", image: showsImg, _id: "shows" },
    { titulo: "Tecnologia", image: tecnologiaImg, _id: "tecnologia" }
];