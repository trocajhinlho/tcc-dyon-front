import { OperatorHomeInfo } from "../../types/interface";

export default function OperatorViewInfo(props: OperatorHomeInfo) {
    return (
        <div className="bg-white rounded-md px-5 py-10 text-center text-typo-2 mb-6">
            <h3 className="font-semibold text-2xl mb-1">{props.name}</h3>
            <h4 className="font-bold">{props.organization}</h4>
        </div>
    )
}