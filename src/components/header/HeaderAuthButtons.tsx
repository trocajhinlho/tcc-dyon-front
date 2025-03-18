import { MagnifyingGlass, User } from "phosphor-react";
import { Link } from "react-router-dom";

export function HeaderAuthButtons() {
    return (
        <div>
            <nav className="flex justify-between md:gap-4 lg:gap-6 items-center">
                <Link to={"/eventos"}>
                    <MagnifyingGlass
                        size={20}
                        weight={"bold"}
                        className="cursor-pointer justify-center items-center mr-6 sm:hidden inline-block "
                    />
                </Link>
                <Link to="/login" className="flex items-center justify-center">
                    <span className="flex items-center gap-2">
                        <User size={20} weight={"bold"} />
                        <p className="md:inline-block hidden font-semibold md:text-sm lg:text-base text-[#333]">Entrar</p>
                    </span>
                </Link>
                <span>
                    <Link to="/cadastro"
                        className="bg-[#7F529F] px-[15px] py-[10px] rounded-xl text-white font-semibold md:text-sm lg:text-base whitespace-nowrap md:inline-block hidden"
                    >
                        Cadastrar-se
                    </Link>
                </span>
            </nav>
        </div>
    )
}