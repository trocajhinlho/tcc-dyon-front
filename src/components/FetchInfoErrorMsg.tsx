import { CloudSlash } from "phosphor-react";

interface Props {
    msg: string;
}

export default function FetchInfoErrorMsg(props: Props) {
    return (
        <div className="p-10 flex flex-col items-center text-center">
            <CloudSlash size={64} weight="fill" fill="#F15F45" />
            <h3 className="text-2xl font-bold text-typo-2 mt-4 mb-2">Falha ao conectar-se com o servidor</h3>
            <p className="max-w-[600px] font-semibold text-typo-2">
                {props.msg}
            </p>
        </div>
    )
}