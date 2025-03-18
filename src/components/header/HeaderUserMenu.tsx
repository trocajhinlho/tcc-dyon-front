import { BookBookmark, MegaphoneSimple, SignOut, User } from "phosphor-react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMenuSection } from "./HeaderMenuSection";
import useLogout from "../../hooks/useLogout";
import axios from "../../api/axios";
import { APIResponse } from "../../types/types";

interface SubmenuLinkProps {
    to: string;
    text: string;
}

function SubmenuLink(props: SubmenuLinkProps) {
    return (
        <li>
            <Link to={props.to} className="text-[#222] font-normal hover:font-medium">{props.text}</Link>
        </li>
    )
}

export function HeaderUserMenu() {
    const logout = useLogout();
    const navigate = useNavigate();

    const handleLogout = async () => {
        logout().then(() => {
            navigate("/");
        });
    }

    return (
        <div className="top-16 right-5 absolute bg-white z-1 min-w-[180px]">
            <nav className="shadow-md px-5">
                <HeaderMenuSection title="Minhas coisas" icon={<User className="text-[#555555]" size={20} weight={"bold"} />}>
                    <SubmenuLink text="Perfil" to="/perfil" />
                    <SubmenuLink text="Configurações" to="/configuracoes" />
                </HeaderMenuSection>
                <HeaderMenuSection title="Eventos" icon={<MegaphoneSimple className="text-[#555555]" size={20} weight={"bold"} />}>
                    <SubmenuLink text="Inscritos" to="/perfil/?tab=inscritos" />
                    <SubmenuLink text="Acompanhando" to="/perfil/?tab=acompanhando" />
                </HeaderMenuSection>
                <HeaderMenuSection title="Instituição" icon={<BookBookmark className="text-[#555555]" size={20} weight={"bold"} />}>
                    <SubmenuLink text="Seguindo" to="/configuracoes?tab=seguindo" />
                </HeaderMenuSection>
                <div className="flex items-center gap-2 py-5 cursor-pointer" onClick={() => handleLogout()}>
                    <SignOut className="text-[#555555] mx-2" size={20} weight={"bold"} />
                    <span className="text-[#555555] text-base font-semibold">Sair</span>
                </div>

            </nav>
        </div>
    )
}