import { useState } from "react";
import ExpandableGroup from "../../ExpandableGroup";
import { Input } from "../Input";
import { CreatedPeriod } from "../../views/NovoEvento";
import dayjs from "dayjs";
import { Plus } from "phosphor-react";
import PeriodLine from "./PeriodLine";

interface PeriodInput {
    start: string;
    end: string;
    limit: string;
}

interface Props {
    onError: (msg: string) => void;
    periods: CreatedPeriod[];
    setPeriods: React.Dispatch<React.SetStateAction<CreatedPeriod[]>>
}

const MAXSUBS = 1000;

export default function PeriodCreationArea({ onError, periods, setPeriods }: Props) {
    const [periodDates, setPeriodDates] = useState<PeriodInput>({ start: "", end: "", limit: "0" });
    const [limitPeriodSubs, setLimiPeriodSubs] = useState(false);

    const handleNewPeriod = (e: React.SyntheticEvent) => {
        e.preventDefault();
        let subLimit: undefined | number = undefined;
        if(limitPeriodSubs) {
            subLimit = Math.trunc(periodDates.limit as unknown as number);
            if(isNaN(subLimit) || subLimit < 0) {
                return onError("Valor inválido para número de inscrições");
            } else if(subLimit > MAXSUBS) {
                return onError("O máximo permitido de inscrições por período é " + MAXSUBS);
            } else if(subLimit === 0)
                subLimit = undefined;
        }
        if(periodDates.start === "" || periodDates.end === "")
            return onError("A data de início e de término são obrigatórias");
        else if(dayjs(periodDates.start).isAfter(periodDates.end))
            return onError("A data de término não pode preceder a de início");
        else if(dayjs(periodDates.start).isSame(periodDates.end))
            return onError("A data de início não pode ser a mesma que a de término");
        
        const period: CreatedPeriod = {
            start: new Date(periodDates.start),
            end: new Date(periodDates.end),
            limit: subLimit
        }
        periodDates.start = "";
        periodDates.end = "";
        periodDates.limit = "";
        setLimiPeriodSubs(false);
        setPeriods([...periods, period]);
    }
    
    return (
        <ExpandableGroup title="Período(s) em que o evento ocorre">
            <div>
                <div className="mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex sm:items-center sm:flex-row flex-col w-full sm:w-auto">
                            <p className="text-lg font-bold mr-2">De</p>
                            <Input
                                value={periodDates.start} onChange={(e) => setPeriodDates({ ...periodDates, start: e.target.value })}
                                type="datetime-local" name="date" id="date" fontWeight="bold" bgClass="bg-white" widthClass={"w-full sm:w-auto"}
                            />
                        </div>
                        <div className="flex sm:items-center sm:flex-row flex-col w-full sm:w-auto">
                            <p className="text-lg font-bold mr-2">até</p>
                            <Input
                                value={periodDates.end} onChange={(e) => setPeriodDates({ ...periodDates, end: e.target.value })}
                                type="datetime-local" name="date" id="date" fontWeight="bold" bgClass="bg-white" widthClass={"w-auto"}
                            />
                        </div>
                        <div className="flex items-center w-full sm:w-auto">
                            <input type="checkbox" checked={limitPeriodSubs} onChange={() => setLimiPeriodSubs(!limitPeriodSubs)} />
                            <span className="mx-2">Inscrições limitadas {limitPeriodSubs && "em"}</span>
                            <Input
                                type="number" name="subslimit"
                                value={periodDates.limit} onChange={e => setPeriodDates({ ...periodDates, limit: e.target.value})}
                                bgClass="bg-white" max={1000} min={0} widthClass="w-[90px]"
                                disabled={!limitPeriodSubs} disabledClass="invisible"
                            />
                        </div>
                   </div>
                </div>
                <div className="flex justify-end w-full">
                    <button
                        onClick={handleNewPeriod}
                        className="bg-[#7F529F] font-semibold text-white py-2 px-4 rounded-lg items-center justify-center flex gap-2"
                        title="Adicionar período"
                    >
                        <Plus color="#fff" weight="bold" />
                        <span>Adicionar</span>
                    </button>
                </div>
            </div>
            <div className="border-t-2 mt-4">
                {
                    periods.map((p, i) => <PeriodLine
                        start={p.start} end={p.end} limit={p.limit} key={i}
                        onClickRemove={() => setPeriods(periods.filter((pe, ind) => ind !== i)) } />)
                }
            </div>
        </ExpandableGroup>
    )
}