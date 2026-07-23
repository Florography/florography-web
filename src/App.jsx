import { css, Global } from "@emotion/react";
import { Route, Routes } from "react-router";
import InformationPage from "./pages/Information/InformationPage";
import LoginPage from "./pages/Login/LoginPage";
import OAuthCallbackPage from "./pages/CallbackPage/OAuthCallbackPage";
import MyPage from "./pages/MyPage/MyPage";
import HomePage from "./pages/HomePage/HomePage";
import FlowerDirectory from "./pages/FlowerDirectoryPage/FlowerDirectory";
import ShareBoardPage from "./pages/ShareBoardPage/ShareBoardPage";
import HeartLetter from "./pages/HeartLetterPage/HeartLetterPage";
import SeedRecordPage from "./pages/SeedRecordPage/SeedRecordPage";
import GardenListPage from "./pages/Garden/GardenListPage";
import GardenCreatePage from "./pages/Garden/GardenCreatePage";
import GardenDetailPage from "./pages/Garden/GardenDetailPage";
import WriteHeartLetter from "./pages/WriteHeartLetter/WriteHeartLetter";
import Layout from "./Layout.jsx";

const globalStyles = css`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css");
    @import url("https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        font-family: "Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif;
        background: #F8F7F4;
        color: #4E5A50;
        min-height: 100vh;
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        text-decoration: none;
        color: inherit;
        transition: color 0.2s ease;
    }

    a:hover {
        color: #9ABF88;
    }

    button {
        border: 1px solid #dbdbdb;
        font-family: inherit;
    }

    input,
    textarea,
    select {
        font-family: inherit;
    }

    ::selection {
        background: #D7E8C5;
    }
`;


function App() {
    return (
        <>
            <Global styles={globalStyles} />
            <Routes>
                {/* 레이아웃이 없는 페이지 */}
                <Route path="/" element={<InformationPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/auth/oauth2/callback" element={<OAuthCallbackPage />} />

                {/* 레이아웃이 있는 페이지 */}
                <Route element={<Layout />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/flowers" element={<FlowerDirectory />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/write" element={<WriteHeartLetter />} />
                    <Route path="/heartletter/letters" element={<HeartLetter />} />
                    <Route path="/heartletter/write" element={<WriteHeartLetter />} />
                    <Route path="/heartletter/seedrecord" element={<SeedRecordPage />} />
                    <Route path="/shareboard" element={<ShareBoardPage />} />
                    <Route path="/garden" element={<GardenListPage />} />
                    <Route path="/garden/new" element={<GardenCreatePage />} />
                    <Route path="/garden/:gardenId" element={<GardenDetailPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App; 