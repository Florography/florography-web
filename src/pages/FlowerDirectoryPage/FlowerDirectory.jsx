import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useMe } from "../../hooks/queries/useUser";
import { useFlowerDirectoies } from "../../hooks/queries/flowerDirectory";
import { MENU_ITEMS, NAV_ITEMS, MOOD_COLORS, WEEKDAYS, BLOOM_MAP_2026_06 } from "./mockData";
import * as s from "./styles";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const PETALS = [0, 72, 144, 216, 288];
const PER_PAGE = 10;
const FILTER_LABELS = ["전체", "수집한 꽃"];

const flowerImgUrl = (path) => (path ? `${API_BASE}${path}` : path);

function FlowerDirectory() {
    const navigate = useNavigate();
    const meQuery = useMe();

    const [menuOpen, setMenuOpen] = useState(false);
    const [filter, setFilter] = useState(0);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState(null);
    const [toast, setToast] = useState("");
    const [toastExiting, setToastExiting] = useState(false);
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(6);

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (!accessToken) {
            navigate("/", { replace: true });
        }
    }, [accessToken, navigate]);

    const showToast = useCallback((message) => {
        setToastExiting(false);
        setToast(message);
        setTimeout(() => {
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

    const pickFilter = (i) => {
        setFilter(i);
        setPage(0);
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

    const linkedAccounts = meQuery.data?.linkedAccounts || [];
    const userName = linkedAccounts[0]?.nickname || "정원사";

    const flowerDirectory = useFlowerDirectoies();
    const flowers = flowerDirectory.data?.body || [];

    // userFlower가 있으면 사용자가 보유(개화)한 꽃으로 간주한다.
    const collected = flowers.filter((f) => Boolean(f.userFlower)).length;
    const total = flowers.length;

    const filtered =
        filter === 1 ? flowers.filter((f) => Boolean(f.userFlower)) : flowers;
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const safePage = Math.min(page, totalPages - 1);
    const pageItems = filtered.slice(
        safePage * PER_PAGE,
        (safePage + 1) * PER_PAGE
    );

    const selectedFlower = flowers.find((f) => f.id === selected) || null;

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
        <div css={s.page}>
            {/* 중앙 */}
            <main css={s.page}>
                <div css={s.titleBar}>
                    <div css={s.titleGroup}>
                        <div css={s.title}>🌼 내가 모은 꽃들</div>
                        <div css={s.subtitle}>
                            피워낸 꽃을 눌러 꽃말과 따뜻한 한마디를
                            만나보세요.
                        </div>
                    </div>
                    <div css={s.filterRow}>
                        {FILTER_LABELS.map((label, i) => (
                            <button
                                css={s.filterButton(filter === i)}
                                key={label}
                                onClick={() => pickFilter(i)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <section css={s.section}>
                    <div css={s.grid}>
                        {flowerDirectory.isLoading ? (
                            <div css={s.emptyText}>
                                도감을 불러오는 중...
                            </div>
                        ) : pageItems.length === 0 ? (
                            <div css={s.emptyText}>
                                표시할 꽃이 없어요
                            </div>
                        ) : (
                            pageItems.map((f) => {
                                const locked = true;
                                // const locked = false;


                                return (
                                    <button
                                        css={s.flowerCard}
                                        key={f.id}
                                        onClick={() =>
                                            locked
                                                ? showToast(
                                                    "아직 피우지 않은 꽃이에요 🌱"
                                                )
                                                : setSelected(f.id)
                                        }
                                    >
                                        <span css={s.flowerImgWrap}
                                        >
                                            <img
                                                src={flowerImgUrl(
                                                    f.flowerImg
                                                )}
                                                alt={f.flowerName}
                                            />
                                            {locked && (
                                                <span css={s.lockBadge}
                                                >
                                                    ?
                                                </span>
                                            )}
                                        </span>
                                        <span css={s.flowerName}
                                        >
                                            {locked ? "???" : f.flowerName}
                                        </span>
                                    </button>
                                );
                            })
                        )}
                    </div>

                    <div css={s.pagination}>
                        <button
                            css={s.pageButton}
                            disabled={safePage === 0}
                            onClick={() =>
                                setPage((p) => Math.max(0, p - 1))
                            }
                        >
                            ‹
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                css={s.pageButton}
                                key={i}
                                onClick={() => setPage(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            css={s.pageButton}
                            disabled={safePage === totalPages - 1}
                            onClick={() =>
                                setPage((p) =>
                                    Math.min(totalPages - 1, p + 1)
                                )
                            }
                        >
                            ›
                        </button>
                    </div>
                </section>
            </main>

            {/* 꽃 상세 모달 */}
            {selectedFlower && (
                <div
                    css={s.modalOverlay}
                    onClick={() => setSelected(null)}
                >
                    <div
                        css={s.modal}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            css={s.modalClose}
                            aria-label="닫기"
                            onClick={() => setSelected(null)}
                        >
                            ✕
                        </button>
                        <div css={s.modalImgWrap}>
                            <img
                                src={flowerImgUrl(
                                    selectedFlower.flowerImg
                                )}
                                alt={selectedFlower.flowerName}
                            />
                        </div>
                        <div css={s.modalBody}>
                            <div css={s.modalRow}>
                                <div css={s.modalRowLabel}>꽃 이름</div>
                                <div css={s.modalRowValue}>
                                    {selectedFlower.flowerName}
                                </div>
                            </div>
                            <div css={s.modalRow}>
                                <div css={s.modalRowLabel}>꽃말</div>
                                <div css={s.modalRowValue}>
                                    {selectedFlower.flowerMeaning}
                                </div>
                            </div>
                            <div css={s.modalQuote}>
                                <p>
                                    "{selectedFlower.kindWords}"
                                </p>
                            </div>
                            <div css={s.modalMeta}>
                                <span>
                                    🗓 획득{" "}
                                    {selectedFlower.userFlower
                                        ?.obtainedAt || "-"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 토스트 */}
            {toast && (
                <div css={s.toast}>{toast}</div>
            )}
        </div>
    );
}

export default FlowerDirectory;
