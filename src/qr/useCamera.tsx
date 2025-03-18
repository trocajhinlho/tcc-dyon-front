import { useRef, useState } from "react";

import { ScanResult } from "../types/types";
import cameraErrors from "./cameraErrors";
import scanVideoStream from "./scanVideoStream";

const useCamera = (modalMsg: (value: string | null) => void) => {

    const [cameraVisible, setCameraVisible] = useState(false);
    const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
    const cameraRef = useRef<HTMLVideoElement>(null);
    const [scanResult, setScanResult] = useState<ScanResult>(null);

    const handleCloseCamera = () => {
        setCameraVisible(false);
        videoStream?.getTracks().forEach((track) => {
            track.stop();
        })
    }

    const handleOpenCamera = () => {
            modalMsg("Por favor, conceda acesso à câmera do seu dispositivo para poder realizar a leitura do QR Code");
            navigator.mediaDevices.getUserMedia({ video:true })
            .then(stream => {
                modalMsg(null);
                setVideoStream(stream);
                setCameraVisible(true);
                if(cameraRef.current) {
                    cameraRef.current.srcObject = stream as MediaStream;
                    cameraRef.current.play();
                }
            })
            .catch((error: unknown) => {
                cameraErrors.forEach(([key, msg]) => {
                    if(error?.toString().match(key))
                        modalMsg(msg as string)
                });
            });
    };

    const handleTakeSnapshot = () => {
        return scanVideoStream(videoStream!, cameraRef);
    }

    const handleScanResult = (res: string, error: boolean, delay: number) => {
        setScanResult({ msg: res, error });
        setTimeout(() => setScanResult(null), delay);
    }

    const scanResultList = {
        success: (res: string, delay: number = 1000) => handleScanResult(res, false, delay),
        error: (res: string, delay: number = 1000) => handleScanResult(res, true, delay),
    }

    return { cameraRef, handleOpenCamera, cameraVisible, handleCloseCamera, handleTakeSnapshot, scanResult, scanResultList };
}

export default useCamera;