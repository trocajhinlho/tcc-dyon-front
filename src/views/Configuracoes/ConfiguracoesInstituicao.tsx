import clsx from "clsx";
import { useState } from "react";
import React from "react";

import Password from "../../components/settings/Password";
import Operators from "./Instituicao/Operators/Operators";

type menuTabs = "operators" | "password";


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
    operators: <Operators />,
    password: <Password />,
}

export default function ConfiguracoesInstituicao() {
    const [selectedTab, setSelectedTab] = useState<menuTabs>("operators");

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
                            label="Operadores" tab="operators"
                            selected={selectedTab === "operators"} onClick={() => handleTabChange("operators")}
                        />
                        <TabButton
                            label="Senha" tab="password"
                            selected={selectedTab === "password"} onClick={() => handleTabChange("password")}
                        />
                    </div>
                    {currentTab}
                </div>
            </div>
        </>
    )
}