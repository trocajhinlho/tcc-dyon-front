import { ReactNode, useState } from "react";

interface Props {
    children: ReactNode;
    title?: string;
}

export default function ExpandableGroup(props: Props) {
    const [visible, setVisible] = useState(true);
    const toggleVisibility = () => setVisible(!visible);

    return (
        <div className="rounded-lg overflow-hidden">
            {
                props.title &&
                <h2 
                    onClick={toggleVisibility}
                    className="text-2xl font-bold bg-[#A479C3] hover:bg-dyon-light
                        text-white p-5 rounded-t-lg cursor-pointer transition-colors select-none"
                >
                    {props.title}
                </h2>
            }
            {
                visible &&
                <div className="bg-[#eee] p-5">
                    {props.children}
                </div>
            }
        </div>
    )
}