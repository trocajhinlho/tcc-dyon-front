import clsx from "clsx";
import { useState } from "react";
import React from "react";

import SubscriptionHistory from "./Participante/SubscriptionHistory/SubscriptionHistory";

type menuTabs = "subsHistory";


interface TabButtonProps {
    label: string;
    tab: menuTabs;
    selected: boolean;
    onClick: () => void;
}
const TabButton = (props: TabButtonProps) => (
    <div
        onClick={props.onClick}
        className={clsx("text-base font-bold text-[#2D3436] p-2 rounded-lg w-full cursor-pointer", props.selected && "bg-[#E0B5FF]")}
    >
        {props.label}
    </div>
)

const tabList: Record<menuTabs, JSX.Element> = {
    subsHistory: <SubscriptionHistory />,
}

export default function ConfiguracoesParticipante() {
    const [selectedTab, setSelectedTab] = useState<menuTabs>("subsHistory");

    const handleTabChange = (tab: menuTabs) => {
        setSelectedTab(tab);
    }

    const currentTab = tabList[selectedTab];

    return (
        <>
            <div>
                <h1 className="text-4xl font-bold text-[#2D3436] border-b border-b-[##aaaaaa] pb-4 mb-8">Configurações</h1>
                <div className="flex gap-6">
                    <div className="flex flex-col items-start gap-3 sm:min-w-[140px]">
                        <TabButton
                            label="Histórico" tab="subsHistory"
                            selected={selectedTab === "subsHistory"} onClick={() => handleTabChange("subsHistory")}
                        />
                    </div>
                    {currentTab}
                </div>
            </div>
        </>
    )
}