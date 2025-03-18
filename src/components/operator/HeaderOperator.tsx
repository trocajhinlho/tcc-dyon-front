import { SignOut } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logoDyon from "../../assets/logos/logo_default.png";
import useLogout from "../../hooks/useLogout";
import { Modal } from "../Modal";

export function HeaderOperator() {
    const navigate = useNavigate();
    
    const logout = useLogout();
    const [confirmLogout, setConfirmLogout] = useState(false);

    const handleLogout = async () => {
        logout().then(() => {
            navigate("/");
        });
    }

    return (
        <>
            <Modal
                visible={confirmLogout}
                onClose={() => setConfirmLogout(false)}
                primaryButton={{
                    text: "Sim",
                    onClick: handleLogout
                }}
                secondaryButtonText="Cancelar"
                title="Aviso"
            >
                <span className="min-w-[150x]">Deseja mesmo deslogar?</span>
            </Modal>

            <header className="min-w-full h-16 flex items-center px-4 md:px-4 lg:px-10 shadow-md justify-between gap-4 fixed bg-white z-10 select-none">
                    <img src={logoDyon} className="w-[128px] hover:cursor-pointer" />

                    <div className="flex items-center gap-2 py-5 cursor-pointer" onClick={() => setConfirmLogout(true)}>
                        <SignOut className="text-[#555555] mx-2" size={20} weight={"bold"} />
                        <span className="text-[#555555] text-base font-semibold">Sair</span>
                    </div>
            </header>
        </>

    )
}