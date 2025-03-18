import { createBrowserRouter, Navigate } from "react-router-dom";

import { DefaultLayout } from "../layout/DefaultLayout";
import { CadastroEscolha } from "../views/Cadastro/Cadastro";
import { CadastroInstituicao } from "../views/Cadastro/CadastroInstituicao";
import { CadastroParticipante } from "../views/Cadastro/CadastroParticipante";
import { Checkout } from "../views/Checkout";
import Configuracoes from "../views/Configuracoes/Configuracoes";
import { Evento } from "../views/Evento";
import Eventos from "../views/Eventos";
import { Home } from "../views/Home";
import { Login } from "../views/Login";
import PoliticaPrivacidade from "../views/misc/PoliticaPrivacidade";
import SobreDyon from "../views/misc/SobreDyon";
import TermosServico from "../views/misc/TermosServico";
import { Inscricao } from "../views/NovaInscricao";
import Perfil from "../views/Perfil/Perfil";
import errorPages from "./error-pages";
import operatorPages from "./operator-pages";
import organizationPages from "./organization-pages";
import { EmailConfirmacao } from "../views/EmailConfirmacao";

export const router = createBrowserRouter([
    {
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/evento/:eventId/:slug?",
                element: <Evento />
            },
            {
                path: "/perfil",
                element: <Perfil />
            },
            {
                path: "/configuracoes",
                element: <Configuracoes />
            },
            
            {
                path: "/inscrever/:idPublico",
                element: <Inscricao />
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/eventos",
                element: <Eventos />
            },
            {
                path: "/politica-de-privacidade",
                element: <PoliticaPrivacidade />
            },
            {
                path: "/termos-de-servico",
                element: <TermosServico />
            },
            {
                path: "/sobre",
                element: <SobreDyon />
            },
            organizationPages,
            ...errorPages
        ]
    },
    ...operatorPages,
    {
        path: "/cadastro",
        element: <CadastroEscolha />
    },
    {
        path: "/cadastro-participante",
        element: <CadastroParticipante />
    },
    {
        path: "/cadastro-instituicao",
        element: <CadastroInstituicao />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/inscrever/:idPublico?",
        element: <Navigate to="/" />
    },
    {
        path: "/email/:emailToken",
        element: <EmailConfirmacao />
    },
    {
        path: "*",
        element: <Navigate to ="/404" replace={true} />
    }
]);
