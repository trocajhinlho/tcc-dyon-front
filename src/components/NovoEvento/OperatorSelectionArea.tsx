import { X } from "phosphor-react";

import ExpandableGroup from "../../ExpandableGroup";
import { OperatorSelectInfo } from "../../types/interface";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { APIResponse } from "../../types/types";

interface Props {
    selectedOperators: OperatorSelectInfo[];
    setSelectedOperators: React.Dispatch<React.SetStateAction<OperatorSelectInfo[]>>
}
        
export default function OperatorSelectionArea({ selectedOperators, setSelectedOperators }: Props) {
    selectedOperators.push()
    const [operatorList, setOperatorList] = useState<OperatorSelectInfo[]>([]);
    const privateFetch = useAxiosPrivate();

    useEffect(() => {
        privateFetch<APIResponse<OperatorSelectInfo[]>>("/operadores/", { method: "GET" })
            .then(res => {
                if(res.data.dados)
                    setOperatorList(res.data.dados);
            });
    }, []);

    const addOperator = (id: string) => {
        if(selectedOperators.filter(o => o._id === id).length === 0) {
            const oper = operatorList.filter(o => o._id === id)[0];
            setSelectedOperators([ ...selectedOperators, { _id: id, nomeCompleto: oper.nomeCompleto } ]);
        }
    }

    const removeOperator = (id: string) => {
        const ops = operatorList.filter(o => o._id !== id);
        setSelectedOperators(ops);
    }


    return (
        <ExpandableGroup title="Operadores atribuídos">
            <div className="w-full rounded-xl">
                <select name="operators" id="operators" 
                    defaultValue="0"
                    className="rounded-xl w-full h-10 outline-[#7F529F] bg-[#ddd] font-bold px-4 py-1 text-[#555] mb-4"
                    onChange={(e) => {
                        addOperator(e.target.value);
                        e.target.value = "0";
                    }}
                >
                    <option disabled value="0">Selecione um operador</option>
                    {
                        operatorList.map((o) => <option key={o._id} value={o._id}>{o.nomeCompleto}</option>)
                    }
                </select>
            </div>
                
            <div className="w-full px-2">
                {
                    selectedOperators.map(op => (
                        <div key={op._id} className="flex justify-between items-center bg-white border-[#ccc] rounded-lg border-2 px-2 mb-2">
                            <div className="font-semibold tex-typo-2 p-2">
                                {op.nomeCompleto}
                            </div>
                            <div
                                title="Desatribuir Operadores"
                                className="cursor-pointer p-2"
                                onClick={() => removeOperator(op._id)}
                            >
                                <X />
                            </div>
                        </div>
                    ))
                }
            </div>
        </ExpandableGroup>
    )
}