import { useState } from "react";
import { Button } from "../Button";
import LinkNewTab from "../LinkNewTab";

interface Props {
    onSubmit: () => void;
    onError: (msg: string) => void;
}

export default function SubmitAcceptButton({ onSubmit, onError }: Props) {
    const [acceptCreation, setAcceptCreation] = useState(false);

    const handleSubmit = () => {
        if(!acceptCreation)
            onError("Você precisa aceitar os termos de uso do Dyon");
        else
            onSubmit();
    }

    return (
        <div className="flex flex-col">
            <Button
                padding="py-6"
                textSize="xl"
                onClick={handleSubmit}
            >Criar Evento</Button>
        
            <div className="p-2 text-typo-2 mt-2 flex items-center gap-2">
                <input type="checkbox" checked={acceptCreation} onChange={() => setAcceptCreation(!acceptCreation)} />
                <span>Afirmo que concordo com os <LinkNewTab
                    to="/termos-de-servico" className="text-dyon-light underline">Termos de Serviço</LinkNewTab> do Dyon.
                </span>
            </div>
        </div>
    )
}