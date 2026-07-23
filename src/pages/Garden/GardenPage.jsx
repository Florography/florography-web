import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useMe } from "../../hooks/queries/useUser";
import FreeformGarden from "./FreeformGarden";
import GridGarden from "./GridGarden";
import { saveGarden } from "../../api/gardenApi";
import { useGardenStore } from "../../stores/gardenStore";
import {
    MENU_ITEMS,
    // NAV_ITEMS,
    PETALS,
    WATER_COUNT,
    THEMES,
    TABS,
    MOOD_COLORS,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "./mockData";
import * as s from "./styles";

function GardenPage() {
    const navigate = useNavigate();
    const meQuery = useMe();
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

    const showToast = useCallback((msg) => {
        setToastExiting(false);
        setToast(msg);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => {
            setToastExiting(true);
            setTimeout(() => setToast(""), 300);
        }, 2000);
    }, []);

    const goTo = (item) => {
        setMenuOpen(false);
        if (item.href) {
            navigate(item.href);
        } else {
            showToast(`${item.label} 기능은 준비 중이에요 🌱`);
        }
    };

    const cycleTheme = () => setThemeIdx((i) => (i + 1) % THEMES.length);

    const handleGardenNameChange = (e) => {
        let value = e.target.value;
        let result = "";
        let koreanCount = 0;
        let englishCount = 0;

        for (let char of value) {
            if (/[가-힯]/.test(char)) {
                if (koreanCount < 8) {
                    result += char;
                    koreanCount++;
                }
            } else if (/[a-zA-Z]/.test(char)) {
                if (englishCount < 16) {
                    result += char;
                    englishCount++;
                }
            } else {
                result += char;
            }
        }
        setGardenName(result);
    };

    const handleSave = async () => {
        const gardenData = getAllGardenData();
        const userId = meQuery.data?.body?.linkedAccounts[0].uid;

        if (!userId) {
            showToast("사용자 정보를 불러올 수 없어요");
            return;
        }

        try {
            if (gardenName === ""){
                setGardenName("제목없음");
            }
            await saveGarden(gardenData, userId, gardenName);
            setSaved(true);
            showToast("정원이 저장되었어요 🌸");
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

    return (
        <div>
            <div>
                {/* 중앙 */}
                <main css={s.main}>
                    <div css={s.mainTitleBar}>
                        <div css={s.mainTitleGroup}>
                            <div css={s.mainTitle}>🪴 마음의 정원</div>
                            <input
                                css={s.gardenNameInput}
                                type="text"
                                value={gardenName}
                                onChange={handleGardenNameChange}
                                placeholder="정원 이름을 지어보세요"
                                maxLength={24}
                            />
                            <div css={s.mainSubtitle}>
                                두 가지 배치 방식을 비교해보는 구상 단계 시안입니다.
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

                    {/* 1번안 / 2번안 탭 */}
                    <div css={s.tabRow}>
                        {TABS.map((tab) => (
                            <button
                                css={s.tabButton(activeTab === tab.key)}
                                key={tab.key}
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
            </div>

            {toast && <div css={s.toast}>{toast}</div>}
        </div>
    );
}

export default GardenPage;
