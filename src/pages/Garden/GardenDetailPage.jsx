import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMe } from "../../hooks/queries/useUser";
import { useGardenById } from "../../hooks/queries/useGarden";
import GardenPreview from "../../components/GardenPreview";
import * as s from "./styles";

function GardenDetailPage() {
    const navigate = useNavigate();
    const { gardenId } = useParams();
    const meQuery = useMe();
    const gardenQuery = useGardenById(Number(gardenId));

    const [toast, setToast] = useState("");
    const [toastExiting, setToastExiting] = useState(false);
    const [gardenName, setGardenName] = useState("");

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!accessToken) {
            navigate("/", { replace: true });
        }
    }, [accessToken, navigate]);

    useEffect(() => {
        if (gardenQuery.data?.body) {
            const garden = gardenQuery.data.body;
            setGardenName(garden.name || "제목없음");
        }
    }, [gardenQuery.data]);


    if (gardenQuery.isLoading) {
        return <div css={s.emptyState}>로딩 중...</div>;
    }

    return (
        <div>

            <header css={s.pageHeader}>
                <div css={s.headerLeft}>
                    <button
                        css={s.backButton}
                        aria-label="돌아가기"
                        onClick={() => navigate("/garden")}
                    >
                        ←
                    </button>
                    <div css={s.headerTitleGroup}>
                        <span css={s.headerTitle}>{gardenName}</span>
                        <span css={s.headerSubtitle}>정원 보기</span>
                    </div>
                </div>
                {/* <button css={s.profileButton} onClick={() => navigate("/mypage")}>
                    <span css={s.profileInitial}>{userName.slice(0, 1)}</span>
                    <span css={s.profileName}>{userName}</span>
                    <span css={s.profileArrow}>▾</span>
                </button> */}
            </header>

            <div>
                <main css={s.main}>
                    <div css={s.mainTitleBar}>
                        <div css={s.mainTitleGroup}>
                            <div css={s.mainTitle}>🪴 {gardenName}</div>
                            <div css={s.mainSubtitle}>
                                생성일: {gardenQuery.data?.body?.createdAt ? new Date(gardenQuery.data.body.createdAt).toLocaleDateString() : ""}
                            </div>
                        </div>
                        <div css={s.mainActions}>
                            <span css={s.readOnlyLabel}>읽기 전용</span>
                        </div>
                    </div>

                    <GardenPreview gardenData={gardenQuery.data?.body?.gardenData} height="400px" />
                </main>
            </div>

            {toast && <div css={s.toast}>{toast}</div>}
        </div>
    );
}

export default GardenDetailPage;
