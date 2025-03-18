import { RefObject, useState } from "react";
import { useDropzone } from "react-dropzone";

import { ImageFile } from "../../types/types";


interface DropFileProps {
    file?: File;
    setFile(file: File): void;
    onRejectCallback(msg: null | string | JSX.Element): void;
    inputRef: RefObject<HTMLInputElement>;
}

export default function DropFile({ file, setFile, onRejectCallback, inputRef }: DropFileProps) {
    // variable for image file preview
    const [imgFile, setImgFile] = useState<ImageFile | undefined>();

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        maxFiles: 1,
        maxSize: 1048576, // bytes
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpeg"]
        },
        multiple: false,
        onDrop: files => {
            if(files.length === 0)
                return;

            if(imgFile)
                URL.revokeObjectURL(imgFile.preview)

            setFile(files[0]);
            const previewedFile = Object.assign(files[0], { preview: URL.createObjectURL(files[0]) });
            setImgFile(previewedFile);
        },
        onDropRejected: files => {
            let msg: string[] = [];
            files[0].errors.forEach(err => {
                if(err.code === "file-invalid-type")
                    msg.push("Formato inválido de arquivo");
                else if(err.code === "file-too-large")
                    msg.push("Arquivo muito grande");
            });
            onRejectCallback(msg.join(", "));
        }
    });

    return (
        <section
            className="container w-full h-48 rounded-2xl flex justify-center items-center flex-col text-center bg-center bg-cover"
            style={{ backgroundImage: imgFile ? `url('${imgFile.preview}')` : "", backgroundColor: "#eee" }}
        >
            <div {...getRootProps({ className: "dropzone p-4 rounded-lg cursor-pointer bg-[#7f529f]/80" })} style={{ border: "dashed #fff 2px" }}>
                <input {...getInputProps()} ref={inputRef} />
                <p className="font-bold text-white text-xl">{imgFile ? "Alterar" : "Selecionar"} Banner</p>
                <aside className="text-sm text-white">
                    <h4>Formatos aceitos: PNG, JPEG</h4>
                    <h4>Limite de 1 MB</h4>
                </aside>
            </div>
        </section>
    );
}