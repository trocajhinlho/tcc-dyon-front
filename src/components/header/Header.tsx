import dayjs from "dayjs";
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoDyon from "../../assets/logos/logo_default.png";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AuthInfo, LocalStorageUserInfo } from "../../types/interface";
import { APIResponse } from "../../types/types";
import { HeaderAuthButtons } from "./HeaderAuthButtons";
import { HeaderUserIdentification } from "./HeaderUserIdentification";
import { HeaderUserMenu } from "./HeaderUserMenu";
import { categoriesList } from "../../types/categoriesEnum";
import clsx from "clsx";

export function Header() {
    const navigate = useNavigate();
    const [getInfo, setInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const { setAuth, auth } = useAuth();
    const protectedRequest = useAxiosPrivate();

    const [menuVisible, setMenuVisible] = useState(false);
    const [search, setSearch] = useState("");
    const [categoriesVisible, setCategoriesVisible] = useState(false);

    useEffect(() => {
        protectedRequest<APIResponse<AuthInfo>>("/usuarios/dados-cabecalho", { method: "GET" })
        .then(res => {
            setAuth({ ...res.data.dados, accessToken: auth?.accessToken });
            const { dados } = res.data;
            const storage = getInfo();

            if(storage && dayjs(storage.lastUpdated).diff(dayjs(), "minute") < 5)
                return;

            if(dados) {
                setInfo({
                    lastUpdated: new Date().toISOString(),
                    name: dados.nome,
                    type: dados.tipo,
                    picture: dados.fotoPerfil,
                    username: dados.username
                });
            }
        })
        .catch();
    }, []);

    const handleSearch = (e?: FormEvent<HTMLFormElement>) => {
        if(e)
            e.preventDefault();
        if(search)
            navigate(`/eventos?search=${search}`);
        else
            navigate("/eventos");
    }

    return (
        <header className="min-w-full h-16 flex items-center px-4 md:px-4 lg:px-10 shadow-md justify-between gap-4 fixed bg-white z-10 select-none">
            <div className="flex items-center gap-2 md:gap-6 lg:gap-12 max-w-7xl">
                <Link to="/">
                    <img src={logoDyon} className="w-[128px] hover:cursor-pointer" />
                </Link>

                <nav className="lg:inline-block hidden">
                    <ul className="flex justify-between md:gap-4 lg:gap-6">
                        <li>
                            <Link to="/eventos" className="font-semibold text-base text-typo-2">Eventos</Link>
                        </li>
                        <li>
                            <div
                                className="flex items-center space-x-1 mx-1 text-justify font-semibold text-base text-typo-2 cursor-pointer relative"
                                onClick={() => setCategoriesVisible(!categoriesVisible)}
                            >
                                <div>
                                    Categorias
                                </div>
                                <div className={clsx(categoriesVisible ? "absolute" : "hidden",
                                    "top-11 left-[-10px] bg-white shadow-lg rounded-lg")}>
                                    <ul>
                                        {
                                            categoriesList.map(([slug, title]) => (
                                                <li key={slug} className="py-1 px-5 bg-white hover:bg-[#eee] transition-colors">
                                                    <Link to={`/eventos?category=${slug}`} className="w-100 h-100 inline-block">
                                                        {title}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                                <CaretDown
                                    size={18} weight={"bold"}
                                    className={clsx(categoriesVisible ? "rotate-180" : "rotate-0", "transition-transform")}
                                />
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="items-end justify-end hidden sm:inline-block ml-2">
                    <form
                        className="flex flex-1 h-10 rounded-xl bg-[#EFEFEF]  space-x-2 justify-between pr-3 items-center placeholder-[#636E72]"
                        onSubmit={handleSearch}
                    >
                        <input
                            type="search"
                            name="pesquisar"
                            id="pesquisar"
                            className="pl-3 w-full h-10 rounded-xl bg-[#EFEFEF]  items-center placeholder-[#636E72] border border-none outline-none"
                            placeholder="Pesquisar eventos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <MagnifyingGlass
                            size={24}
                            color={"#7F529F"}
                            weight={"bold"}
                            className="cursor-pointer"
                            onClick={() => handleSearch()}
                        />
                    </form>
                </div>

            </div>
            {
                auth 
                    ? <HeaderUserIdentification
                        toggle={() => setMenuVisible(!menuVisible)}
                    />
                    : <HeaderAuthButtons />
            }
            {
                auth && menuVisible && <HeaderUserMenu />
            }
        </header>

    )
}