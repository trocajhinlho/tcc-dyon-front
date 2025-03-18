import "react-quill/dist/quill.snow.css";

import ReactQuill from "react-quill";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}


const modules = {
    toolbar: [
        [{ "header": [1, 2, 3, false] }],
        ["bold", "italic", "underline", "link"],
        [{"list": "ordered"}, {"list": "bullet"}],
        ["clean"]
    ],
};

const formats = [
    "header",
    "bold", "italic", "underline", "link",
    "list", "bullet",
];


export default function RichTextEdtor({ value, onChange }: RichTextEditorProps) {

    return (
        <div className="bg-[#eee] rounded-lg overflow-hidden flex">
            <ReactQuill
                placeholder="Descrição"
                value={value}
                onChange={onChange}
                theme="snow"
                className="min-h-[300px] max-h-[500px] flex-1 border-0 border-none"
                modules={modules}
                formats={formats}
            />
        </div>
    )
}