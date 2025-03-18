import { ReactNode } from "react";

import { Button } from "./Button";

interface Props {
    visible: boolean;
    title?: string;
    children: ReactNode;
    secondaryButtonText?: string;
    onClose: () => void;
    primaryButton?: {
        text: string;
        onClick: () => void;
    }

}

export function Modal(props: Props) {
    if(!props.visible)
        return <></>;

    return (
        <div className="w-screen h-screen bg-neutral-600/60 fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center">
            <div className="bg-white px-3 sm:px-8 py-10 rounded-xl w-[95%] sm:w-auto">
                <section className="mb-8">
                    { props.title && <h1 className="text-2xl font-bold mb-4 text-center text-typo-2">{ props.title }</h1> }
                    { props.children }
                </section>
                <footer className="flex gap-2 justify-end">
                    {
                        props.primaryButton &&
                        <Button onClick={props.primaryButton.onClick}>{props.primaryButton.text}</Button>
                    }
                    <Button bg="bg-zinc-300" textColor="#333" onClick={props.onClose}>{ props.secondaryButtonText ?? "Ok" }</Button>
                </footer>
            </div>
        </div>
    )
}