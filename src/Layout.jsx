import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import LeftBar from "./components/SideBar/LeftBar/LeftBar";
import RightBar from "./components/SideBar/RightBar/RightBar";
import * as s from "./LayoutStyles";

function Layout() {
    return (
        <div css={s.shell}>
            <Header />
            <div css={s.body}>
                <LeftBar />
                <main css={s.main}>
                    <Outlet />
                </main>
                <RightBar />
            </div>
        </div>
    );
}

export default Layout;