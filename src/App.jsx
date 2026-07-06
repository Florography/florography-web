import { css, Global } from "@emotion/react";
import { Route, Routes } from "react-router";
import InformationPage from "./pages/Information/InformationPage";
import LoginPage from "./pages/Login/LoginPage";
import OAuthCallbackPage from "./pages/CallbackPage/OAuthCallbackPage";
import MyPage from "./pages/MyPage/MyPage";
import FlowerDirectory from "./pages/FlowerDirectoryPage/FlowerDirectory";

const globalStyles = css`
    @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        background: #0a0a0f;
        color: #e4e4e7;
        min-height: 100vh;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;


function App() {
    return (
        <>
            <Global styles={globalStyles} />
                <Routes>
                    <Route path="/" element={<InformationPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/auth/oauth2/callback"
                        element={<OAuthCallbackPage />}
                    />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/flowers" element={<FlowerDirectory />} />
                </Routes>
        </>
    );
}

export default App;