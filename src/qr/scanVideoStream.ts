import jsQR from 'jsqr';

/**
 * Parses <video> element's data and checks if theres a QR code
 */
export default async function scanVideoStream(stream: MediaStream, videoRef: React.RefObject<HTMLVideoElement>) {
    // get width and height from video
    const { width, height } = stream.getTracks()[0].getSettings();
    // create canvas to convert video's data into Uint8ClampedArray for jsQr
    const canvas = document.createElement("canvas");
    canvas.width = width!;
    canvas.height = height!;
    const ctx = canvas.getContext("2d");
    ctx!.drawImage(videoRef.current!, 0, 0);
    const data = ctx!.getImageData(0, 0, width!, height!).data;
    return jsQR(data, width!, height!);
}