import { Outlet } from "react-router-dom";

import { Main } from "../components/Main";
import { HeaderOperator } from "../components/operator/HeaderOperator";
import setBgColor from "../utils/setBgColor";

export function OperatorLayout() {
    setBgColor("gray");

    return (
        <>
            <HeaderOperator />
            <Main>
                <Outlet />
            </Main>
        </>
    )
}