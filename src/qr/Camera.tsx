import clsx from "clsx";
import { ArrowUUpLeft, Scan } from "phosphor-react";
import { RefObject } from "react";

import { ScanResult } from "../types/types";
import setScrollMode from "../utils/setScrollMode";

interface CameraProps {
    visible: boolean;
    videoRef: RefObject<HTMLVideoElement>;
    onClose: () => void;
    onSnapshot: () => void;
    scanResult: ScanResult;
}

export default function Camera({ visible, videoRef, onClose, onSnapshot, scanResult }: CameraProps) {
    setScrollMode(visible ? "hidden" : "initial");

    return (
        <div className={clsx("z-[11] w-screen h-screen bg-black top-0 left-0 bottom-0 right-0", visible ? "fixed" : "hidden")}>
            {/* scanResult message */}
            <div
                className={clsx("rounded-lg px-4 absolute z-[11] py-2",
                    "items-center font-semibold text-white transition-all left-4 right-4",
                    scanResult !== null ? "opacity-100 top-[88px]" : "opacity-0 top-[80px]",
                    scanResult?.error ? "bg-dyon-red" : "bg-[#2ecc71]")}
            >
                {scanResult?.msg}
            </div>

            <div className="flex absolute h-full w-full flex-col justify-between z-10">
                {/* Camera Header */}
                <section className="py-10 px-4 bg-gray-500/70">
                    <div className="bg-white p-2 text-center relative rounded-lg">
                        <div
                            className="cursor-pointer bottom-0 top-0 my-auto items-center flex absolute left-4"
                            onClick={() => onClose()}
                        >
                            <ArrowUUpLeft color="#7f529f" size={20} weight="bold" />
                        </div>
                        <span className="text-typo-2 font-bold">Escaneando QR code</span>
                    </div>
                </section>

                {/* Scan Button */}
                <section className="py-10 px-4 bg-gray-500/70">
                    <div
                        className="flex text-white font-semibold bg-dyon-light transition-colors
                        target:bg-dyon-default hover:bg-dyon-default px- py-4 rounded-lg justify-center items-center"
                        onClick={onSnapshot}
                    >
                        <Scan color="#fff" className="mr-2" size={20} />
                        <span>Escanear</span>
                    </div>
                </section>
            </div>
            <video className="h-screen w-screen left-0 right-0 absolute" ref={videoRef}></video>
        </div>
    )
}