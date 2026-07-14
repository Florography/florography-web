/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import * as s from "./styles";
import { useMe } from "../../hooks/queries/useUser";
import { useGardenById } from "../../hooks/queries/useGarden";
import FreeformGarden from "./FreeformGarden";
import GridGarden from "./GridGarden";
import { saveGarden } from "../../api/gardenApi";
import { useGardenStore } from "../../stores/gardenStore";
import {
    NAV_ITEMS,
    PETALS,
    WATER_COUNT,
    THEMES,
    TABS,
    MOOD_COLORS,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "./mockData";

function GardenDetailPage() {
    const navigate = useNavigate();
    const { gardenId } = useParams();
    const meQuery = useMe();
    const gardenQuery = useGardenById(Number(gardenId));

    const setFreeformFlowers = useGardenStore((state) => state.setFreeformFlowers);
    const setGridGardenData = useGardenStore((state) => state.setGridGardenData);
    const getAllGardenData = useGardenStore((state) => state.getAllGardenData);

    const [menuOpen, setMenuOpen] = useState(false);
    const [themeIdx, setThemeIdx] = useState(0);
    const [activeTab, setActiveTab] = useState(TABS[0].key);
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
        }
    }, [accessToken, navigate]);

    useEffect(() => {
        if (gardenQuery.data?.body) {
            const garden = gardenQuery.data.body;
            setGardenName(garden.name || "제목없음");
            console.log(garden.gardenData);
            try {
                const parsedData = JSON.parse(garden.gardenData);
                console.log(parsedData.freeformFlowers);
                // console.log(parsedData.gridGardenData);
                if (parsedData.freeformFlowers) {
                    setFreeformFlowers(parsedData.freeformFlowers);
                }
                // if (parsedData.gridGardenData) {
                //     setGridGardenData(parsedData.gridGardenData);
                // }
            } catch (e) {
                console.error("정원 데이터 파싱 실패:", e);
            }
        }
    }, [gardenQuery.data, setFreeformFlowers, setGridGardenData]);

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

        if (!userId) {
            showToast("사용자 정보를 불러올 수 없어요");
            return;
        }

        try {
            await saveGarden(gardenData, userId, gardenName);
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
        return <div css={s.pageStyle}>로딩 중...</div>;
    }

    return (
        <div css={s.pageStyle}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
            />

            <header css={s.headerStyle}>
                <div css={s.headerLeft}>
                    <button
                        css={s.hamburgerBtn}
                        aria-label="돌아가기"
                        onClick={() => navigate("/garden")}
                    >
                        ←
                    </button>
                    <div css={s.logoGroup}>
                        <span css={s.logoText}>{gardenName}</span>
                        <span css={s.logoTagline}>정원 보기</span>
                    </div>
                </div>
                <button css={s.userPill} onClick={() => navigate("/mypage")}>
                    <span css={s.userAvatar}>{userName.slice(0, 1)}</span>
                    <span css={s.userName}>{userName}</span>
                    <span css={s.userChevron}>▾</span>
                </button>
            </header>

            <div css={s.bodyGrid}>
                <aside css={s.leftRail}>
                    <button css={s.writeBtn} onClick={() => navigate("/heartletter")}>
                        ✎ 글 쓰기
                    </button>
                    <nav css={s.railNav}>
                        {NAV_ITEMS.map((n) => (
                            <button
                                key={n.label}
                                css={s.railNavItem(n.active)}
                                onClick={() => {
                                    if (n.href) navigate(n.href);
                                }}
                            >
                                <span css={s.railNavDot(n.active)} />
                                {n.label}
                            </button>
                        ))}
                    </nav>
                    <div css={s.waterWidget}>
                        <div css={s.waterLabel}>오늘의 물 주기</div>
                        <div css={s.waterValueRow}>
                            <span css={s.waterValue}>{WATER_COUNT}</span>
                            <span css={s.waterUnit}>번째 기록</span>
                        </div>
                        <div css={s.waterDesc}>
                            한 문장이 곧 한 번의 물 주기예요.
                        </div>
                    </div>
                </aside>

                <main css={s.mainCol}>
                    <div css={s.titleBar}>
                        <div>
                            <div css={s.pageTitle}>🪴 {gardenName}</div>
                            <div css={s.pageSubtitle}>
                                생성일: {gardenQuery.data?.body?.createdAt ? new Date(gardenQuery.data.body.createdAt).toLocaleDateString() : ""}
                            </div>
                        </div>
                        <div css={s.titleActions}>
                            <button css={s.themeBtn} onClick={cycleTheme}>
                                🎨 테마 · {theme.name}
                            </button>
                            <button css={s.saveBtn} onClick={handleSave}>
                                {saved ? "저장됨 ✓" : "💾 저장"}
                            </button>
                        </div>
                    </div>

                    <div css={s.tabBar}>
                        {TABS.map((tab) => (
                            <button
                                key={tab.key}
                                css={s.tabBtn(activeTab === tab.key)}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {activeTab === "freeform" ? (
                        <FreeformGarden theme={theme} />
                    ) : (
                        <GridGarden theme={theme} />
                    )}
                </main>

                <aside css={s.rightRail}>
                    <div css={s.rightCard}>
                        <div css={s.weeklyFlowerLabel}>지난주 피운 꽃</div>
                        <div css={s.weeklyFlowerStage}>
                            <div css={s.weeklyFlowerBloom}>
                                {PETALS.map((deg) => (
                                    <span
                                        key={deg}
                                        css={s.petal(18, 30, "#E59A91", deg, 0.92)}
                                    />
                                ))}
                                <span
                                    css={s.flowerCore(22, "#F2C766", "#EAB94E", 3)}
                                />
                            </div>
                        </div>
                        <div css={s.weeklyFlowerName}>감사의 꽃</div>
                        <div css={s.weeklyFlowerMeaning}>꽃말 · 마음을 전하다</div>
                    </div>

                    <div css={s.rightCard}>
                        <div css={s.calHeader}>
                            <button css={s.calNavBtn} onClick={prevYear}>
                                ◀
                            </button>
                            <span css={s.calMonth}>
                                {year}년 {month}월
                            </span>
                            <button css={s.calNavBtn} onClick={nextYear}>
                                ▶
                            </button>
                        </div>
                        <div css={s.calWeekdayRow}>
                            {WEEKDAYS.map((w) => (
                                <span css={s.calWeekday} key={w}>
                                    {w}
                                </span>
                            ))}
                        </div>
                        <div css={s.calGrid}>
                            {railCal.map((c, i) => (
                                <span css={s.calDay(c.color, c.bg, c.weight)} key={i}>
                                    {c.n}
                                </span>
                            ))}
                        </div>
                        <div css={s.calLegend}>
                            <span css={s.calLegendLabel}>
                                감정에 따라 색 변화
                            </span>
                            <span css={s.calLegendDots}>
                                {MOOD_COLORS.map((c) => (
                                    <span css={s.calLegendDot(c)} key={c} />
                                ))}
                            </span>
                        </div>
                    </div>
                </aside>
            </div>

            {toast && <div css={s.toastStyle(toastExiting)}>{toast}</div>}
        </div>
    );
}

export default GardenDetailPage;
