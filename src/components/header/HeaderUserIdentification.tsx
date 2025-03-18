import { CaretDown } from "phosphor-react";

import userPicture from "../../assets/foto-perfil.svg";
import useLocalStorage from "../../hooks/useLocalStorage";
import { LocalStorageUserInfo } from "../../types/interface";

interface Props {
    toggle: () => void;
}

export function HeaderUserIdentification(props: Props) {
    const [getInfo] = useLocalStorage<LocalStorageUserInfo>("last_auth_info", true);
    const info = getInfo();

    return (
        <div className="flex items-center justify-between gap-3 hover:cursor-pointer" onClick={props.toggle}>
            <img
                className="rounded-full w-[42px] object-cover"
                src={info?.picture ? `data:image/png;base64,${info.picture}` : userPicture}
                alt="Foto de Perfil"
            />
            <p className="font-bold text-[#555555]">{info?.name ?? "Usuário Dyon"}</p>
            <CaretDown className="text-[#555555]" size={20} weight={"bold"} />
        </div>
    )
}