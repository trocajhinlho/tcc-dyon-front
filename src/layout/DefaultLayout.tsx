import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/header/Header";
import { Main } from "../components/Main";

export function DefaultLayout() {

    return (
        <>
            <Header />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </>
    )
}