import EventoNaoEncontrado from "../views/misc/EventoNaoEncontrado";
import NaoAutorizado from "../views/misc/NaoAutorizado";
import FalhaConexao from "../views/misc/FalhaConexao";
import NotFound from "../views/misc/NotFound";

const errorPages = [
    {
        path: "/evento-nao-encontrado",
        element: <EventoNaoEncontrado />
    },
    {
        path: "/404",
        element: <NotFound />
    },
    {
        path: "/503",
        element: <FalhaConexao />
    },
    {
        path: "/nao-autorizado",
        element: <NaoAutorizado />
    }
    
]

export default errorPages;