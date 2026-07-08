/** @jsxImportSource @emotion/react */
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import * as s from "./styles";
import { useMe } from "../../hooks/queries/useUser";
import { useFlowerDirectoies } from "../../hooks/queries/flowerDirectory";
import { MENU_ITEMS, NAV_ITEMS, MOOD_COLORS, WEEKDAYS, BLOOM_MAP_2026_06 } from "./mockData";

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
        <div css={s.pageStyle}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
            />

            {/* 헤더 */}
            <header css={s.headerStyle}>
                <div css={s.headerLeft}>
                    <button
                        css={s.hamburgerBtn}
                        aria-label="메뉴"
                        onClick={() => setMenuOpen(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div css={s.logoGroup}>
                        <span css={s.logoText}>florography</span>
                        <span css={s.logoTagline}>마음을 키우는 정원</span>
                    </div>
                </div>
                <button
                    css={s.userPill}
                    onClick={() => navigate("/mypage")}
                >
                    <span css={s.userAvatar}>{userName.slice(0, 1)}</span>
                    <span css={s.userName}>{userName}</span>
                    <span css={s.userChevron}>▾</span>
                </button>
            </header>

            {/* 햄버거 드로어 */}
            {menuOpen && (
                <div css={s.drawerOverlay} onClick={() => setMenuOpen(false)}>
                    <nav
                        css={s.drawerPanel}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div css={s.drawerHeader}>
                            <span css={s.drawerLogo}>florography</span>
                            <button
                                css={s.drawerClose}
                                aria-label="닫기"
                                onClick={() => setMenuOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <p css={s.drawerDesc}>
                            당신의 마음에 물을 주세요,
                            <br />
                            감정이 꽃피는 곳.
                        </p>
                        {MENU_ITEMS.map((m) => (
                            <button
                                key={m.label}
                                css={s.drawerItem}
                                onClick={() => goTo(m)}
                            >
                                <span css={s.drawerItemIcon}>{m.icon}</span>
                                <span css={s.drawerItemText}>
                                    <span css={s.drawerItemLabel}>
                                        {m.label}
                                    </span>
                                    <span css={s.drawerItemDesc}>
                                        {m.desc}
                                    </span>
                                </span>
                            </button>
                        ))}
                        <div css={s.drawerFooter}>© 2026 florography</div>
                    </nav>
                </div>
            )}

            <div css={s.bodyGrid}>
                {/* 좌측 레일 */}
                <aside css={s.leftRail}>
                    <button
                        css={s.writeBtn}
                        onClick={() => goTo({ label: "글 쓰기", href: null })}
                    >
                        ✎ 글 쓰기
                    </button>
                    <nav css={s.railNav}>
                        {NAV_ITEMS.map((n) => (
                            <button
                                key={n.label}
                                css={s.railNavItem(n.active)}
                                onClick={() => goTo(n)}
                            >
                                <span css={s.railNavDot(n.active)} />
                                {n.label}
                            </button>
                        ))}
                    </nav>
                    <div css={s.collectWidget}>
                        <div css={s.collectLabel}>수집한 꽃</div>
                        <div css={s.collectValueRow}>
                            <span css={s.collectValue}>{collected}</span>
                            <span css={s.collectTotal}>/ {total}종</span>
                        </div>
                        <div css={s.collectDesc}>
                            감정을 피워낼수록 도감이 채워져요.
                        </div>
                    </div>
                </aside>

                {/* 중앙 */}
                <main css={s.mainCol}>
                    <div css={s.titleBar}>
                        <div>
                            <div css={s.pageTitle}>🌼 내가 모은 꽃들</div>
                            <div css={s.pageSubtitle}>
                                피워낸 꽃을 눌러 꽃말과 따뜻한 한마디를
                                만나보세요.
                            </div>
                        </div>
                        <div css={s.filterGroup}>
                            {FILTER_LABELS.map((label, i) => (
                                <button
                                    key={label}
                                    css={s.filterBtn(filter === i)}
                                    onClick={() => pickFilter(i)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <section css={s.gridSection}>
                        <div css={s.flowerGrid}>
                            {flowerDirectory.isLoading ? (
                                <div css={[s.emptyState, s.loadingPulse]}>
                                    도감을 불러오는 중...
                                </div>
                            ) : pageItems.length === 0 ? (
                                <div css={s.emptyState}>
                                    표시할 꽃이 없어요
                                </div>
                            ) : (
                                pageItems.map((f) => {
                                    const locked = !f.userFlower.id;
                                    // const locked = false;
                                    

                                    return (
                                        <button
                                            key={f.id}
                                            css={s.flowerCard(
                                                locked ? "default" : "pointer"
                                            )}
                                            onClick={() =>
                                                locked
                                                    ? showToast(
                                                          "아직 피우지 않은 꽃이에요 🌱"
                                                      )
                                                    : setSelected(f.id)
                                            }
                                        >
                                            <span
                                                css={s.flowerImageArea(
                                                    locked
                                                        ? "#F1F3EC"
                                                        : "#F6F9F0"
                                                )}
                                            >
                                                <img
                                                    src={flowerImgUrl(
                                                        f.flowerImg
                                                    )}
                                                    alt={f.flowerName}
                                                    css={s.flowerThumbImg(
                                                        locked
                                                    )}
                                                />
                                                {locked && (
                                                    <span
                                                        css={s.lockedOverlay}
                                                    >
                                                        ?
                                                    </span>
                                                )}
                                            </span>
                                            <span
                                                css={s.flowerNameLabel(
                                                    locked
                                                        ? "#A6AE98"
                                                        : "#34402E"
                                                )}
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
                                css={s.pageArrowBtn}
                                disabled={safePage === 0}
                                onClick={() =>
                                    setPage((p) => Math.max(0, p - 1))
                                }
                            >
                                ‹
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    css={s.pageNumBtn(i === safePage)}
                                    onClick={() => setPage(i)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                css={s.pageArrowBtn}
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

                {/* 우측 레일 */}
                <aside css={s.rightRail}>
                    <div css={s.rightCard}>
                        <div css={s.weeklyFlowerLabel}>지난주 피운 꽃</div>
                        <div css={s.weeklyFlowerStage}>
                            <div css={s.weeklyFlowerBloom}>
                                {PETALS.map((rotate) => (
                                    <span
                                        key={rotate}
                                        css={s.petal(
                                            18,
                                            30,
                                            "#E59A91",
                                            rotate,
                                            0.92
                                        )}
                                    />
                                ))}
                                <span
                                    css={s.flowerCore(
                                        22,
                                        "#F2C766",
                                        "#EAB94E",
                                        3
                                    )}
                                />
                            </div>
                        </div>
                        <div css={s.weeklyFlowerName}>감사의 꽃</div>
                        <div css={s.weeklyFlowerMeaning}>
                            꽃말 · 마음을 전하다
                        </div>
                    </div>

                    <div css={s.quoteCard}>
                        <div css={s.quoteLabel}>지난주의 위로</div>
                        <p css={s.quoteText}>
                            "기록하는 감정에서,
                            <br />
                            성장하는 감정으로."
                        </p>
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
                                <span
                                    css={s.calDay(c.color, c.bg, c.weight)}
                                    key={i}
                                >
                                    {c.n}
                                </span>
                            ))}
                        </div>
                        <div css={s.calLegend}>
                            <span css={s.calLegendLabel}>
                                작성한 날 · 감정 체크
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

            {/* 꽃 상세 모달 */}
            {selectedFlower && (
                <div
                    css={s.modalOverlay}
                    onClick={() => setSelected(null)}
                >
                    <div
                        css={s.modalCard}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            css={s.modalClose}
                            aria-label="닫기"
                            onClick={() => setSelected(null)}
                        >
                            ✕
                        </button>
                        <div css={s.modalLayout}>
                            <div css={s.modalImageBox}>
                                <img
                                    src={flowerImgUrl(
                                        selectedFlower.flowerImg
                                    )}
                                    alt={selectedFlower.flowerName}
                                    css={s.modalFlowerImg}
                                />
                            </div>
                            <div css={s.modalInfoCol}>
                                <div css={s.modalNameBox}>
                                    <div css={s.modalFieldLabel}>꽃 이름</div>
                                    <div css={s.modalName}>
                                        {selectedFlower.flowerName}
                                    </div>
                                </div>
                                <div css={s.modalMeaningBox}>
                                    <div css={s.modalMeaningLabel}>꽃말</div>
                                    <div css={s.modalMeaning}>
                                        {selectedFlower.flowerMeaning}
                                    </div>
                                </div>
                                <div css={s.modalMessageBox}>
                                    <p css={s.modalMessage}>
                                        "{selectedFlower.kindWords}"
                                    </p>
                                </div>
                                <div css={s.modalDateRow}>
                                    <span css={s.modalDateBadge}>
                                        🗓 획득{" "}
                                        {selectedFlower.userFlower
                                            ?.obtainedAt || "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 토스트 */}
            {toast && (
                <div css={s.toastStyle(toastExiting)}>{toast}</div>
            )}
        </div>
    );
}

export default FlowerDirectory;
