import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useMe } from "../../hooks/queries/useUser";
import { useGardenById } from "../../hooks/queries/useGarden";
import FreeformGarden from "./FreeformGarden";
import { saveGarden } from "../../api/gardenApi";
import { useGardenStore } from "../../stores/gardenStore";
import {
    // NAV_ITEMS,
    PETALS,
    WATER_COUNT,
    THEMES,
    MOOD_COLORS,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "./mockData";
import * as s from "./styles";

function GardenDetailPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { gardenId } = useParams();
    const meQuery = useMe();
    const gardenQuery = useGardenById(Number(gardenId));

    const setFreeformFlowers = useGardenStore((state) => state.setFreeformFlowers);
    const resetGardenData = useGardenStore((state) => state.resetGardenData);
    const getAllGardenData = useGardenStore((state) => state.getAllGardenData);

    const [menuOpen, setMenuOpen] = useState(false);
    const [themeIdx, setThemeIdx] = useState(0);
    const [saved, setSaved] = useState(false);
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(6);
    const [toast, setToast] = useState("");
    const [toastExiting, setToastExiting] = useState(false);
    const [gardenName, setGardenName] = useState("");

    const toastTimer = useRef(null);
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!accessToken) {
            navigate("/", { replace: true });
        } else {
            // 정원 상세 페이지 진입 시 store 초기화
            resetGardenData();
        }
    }, [accessToken, navigate]);

    useEffect(() => {
        if (gardenQuery.data?.body) {
            const garden = gardenQuery.data.body;
            setGardenName(garden.name || "제목없음");
            console.log(garden);
            try {
                const parsedData = JSON.parse(garden.gardenData);
                if (parsedData.freeformFlowers) {
                    setFreeformFlowers(parsedData.freeformFlowers);
                }
            } catch (e) {
                console.error("정원 데이터 파싱 실패:", e);
            }
        }
    }, [gardenQuery.data, setFreeformFlowers]);

    const showToast = useCallback((msg) => {
        setToastExiting(false);
        setToast(msg);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => {
            setToastExiting(true);
            setTimeout(() => setToast(""), 300);
        }, 2000);
    }, []);

    const cycleTheme = () => setThemeIdx((i) => (i + 1) % THEMES.length);

    const handleSave = async () => {
        const gardenData = getAllGardenData();
        const userId = meQuery.data?.body?.linkedAccounts[0].uid;
        const gardenId =  gardenQuery.data.body.id;

        if (!userId) {
            showToast("사용자 정보를 불러올 수 없어요");
            return;
        }

        try {
            await saveGarden(gardenData, gardenId ,userId, gardenName);

            // 정원 목록과 현재 정원 캐시 무효화 (데이터 자동 갱신)
            await queryClient.invalidateQueries({ queryKey: ["gardens"] });

            setSaved(true);
            showToast("정원이 수정되었어요 🌸");
            setTimeout(() => setSaved(false), 1800);
        } catch (error) {
            console.error("정원 저장 실패:", error);
            showToast("저장에 실패했어요");
        }
    };

    const prevYear = () =>
        setMonth((m) => {
            if (m <= 1) {
                setYear((y) => y - 1);
                return 12;
            }
            return m - 1;
        });

    const nextYear = () =>
        setMonth((m) => {
            if (m >= 12) {
                setYear((y) => y + 1);
                return 1;
            }
            return m + 1;
        });

    const linkedAccounts = meQuery.data?.body?.linkedAccounts || [];
    const userName = linkedAccounts[0]?.nickname || "정원사";

    const theme = THEMES[themeIdx];

    const railCal = (() => {
        const isBaseMonth = year === 2026 && month === 6;
        const bloomMap = isBaseMonth ? BLOOM_MAP_2026_06 : {};
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDow = new Date(year, month - 1, 1).getDay();
        const cells = [];
        for (let i = 0; i < firstDow; i++) {
            cells.push({ n: "", color: "transparent", bg: "transparent", weight: 400 });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const has = Object.prototype.hasOwnProperty.call(bloomMap, d);
            cells.push({
                n: d,
                color: has ? "#fff" : "#9aa394",
                bg: has ? MOOD_COLORS[bloomMap[d]] : "transparent",
                weight: has ? 700 : 400,
            });
        }
        return cells;
    })();

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
                <button css={s.profileButton} onClick={() => navigate("/mypage")}>
                    <span css={s.profileInitial}>{userName.slice(0, 1)}</span>
                    <span css={s.profileName}>{userName}</span>
                    <span css={s.profileArrow}>▾</span>
                </button>
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
                            <button css={s.themeButton} onClick={cycleTheme}>
                                🎨 테마 · {theme.name}
                            </button>
                            <button css={s.saveButton} onClick={handleSave}>
                                {saved ? "저장됨 ✓" : "💾 저장"}
                            </button>
                        </div>
                    </div>

                    <FreeformGarden theme={theme} />
                </main>
            </div>

            {toast && <div css={s.toast}>{toast}</div>}
        </div>
    );
}

export default GardenDetailPage;
