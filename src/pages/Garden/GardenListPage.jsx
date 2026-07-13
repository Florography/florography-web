/** @jsxImportSource @emotion/react */
import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import * as s from "./gardenListStyles";
import { useAllGardens } from "../../hooks/queries/useGarden";
import { useMe } from "../../hooks/queries/useUser";
import {
    MENU_ITEMS,
    NAV_ITEMS,
    PETALS,
    WATER_COUNT,
    MOOD_COLORS,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "./mockData";

function GardenListPage() {
    const navigate = useNavigate();
    const gardensQuery = useAllGardens();
    const meQuery = useMe();
    const [currentPage, setCurrentPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const gardens = gardensQuery.data?.body || [];

    const itemsPerPage = 9;
    const totalPages = Math.ceil(gardens.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedGardens = gardens.slice(startIdx, startIdx + itemsPerPage);

    const handleGardenClick = (gardenId) => {
        navigate(`/garden/${gardenId}`);
    };

    const handleCreateNew = () => {
        navigate("/garden/new");
    };

    const goTo = useCallback((item) => {
        setMenuOpen(false);
        if (item.href) {
            navigate(item.href);
        }
    }, [navigate]);

    const linkedAccounts = meQuery.data?.body?.linkedAccounts || [];
    const userName = linkedAccounts[0]?.nickname || "정원사";

    const railCal = (() => {
        const isBaseMonth = new Date().getFullYear() === 2026 && new Date().getMonth() + 1 === 6;
        const bloomMap = isBaseMonth ? BLOOM_MAP_2026_06 : {};
        const daysInMonth = new Date(2026, 6, 0).getDate();
        const firstDow = new Date(2026, 5, 1).getDay();
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
                <button css={s.userPill} onClick={() => navigate("/mypage")}>
                    <span css={s.userAvatar}>{userName.slice(0, 1)}</span>
                    <span css={s.userName}>{userName}</span>
                    <span css={s.userChevron}>▾</span>
                </button>
            </header>

            {/* 햄버거 드로어 */}
            {menuOpen && (
                <div css={s.drawerOverlay} onClick={() => setMenuOpen(false)}>
                    <nav css={s.drawerPanel} onClick={(e) => e.stopPropagation()}>
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
                                    <span css={s.drawerItemLabel}>{m.label}</span>
                                    <span css={s.drawerItemDesc}>{m.desc}</span>
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
                    <button css={s.writeBtn} onClick={() => navigate("/heartletter")}>
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

                {/* 중앙 */}
                <main css={s.mainCol}>
                    <div css={s.titleBar}>
                        <div>
                            <div css={s.pageTitle}>🪴 마음의 정원</div>
                            <div css={s.pageSubtitle}>
                                {gardens.length}개의 정원을 만들었어요
                            </div>
                        </div>
                        <button css={s.createButtonStyle} onClick={handleCreateNew}>
                            + 새로 만들기
                        </button>
                    </div>

                    {gardens.length === 0 ? (
                        <div css={s.emptyStyle}>
                            <p css={s.emptyTextStyle}>아직 만든 정원이 없어요</p>
                            <button css={s.emptyButtonStyle} onClick={handleCreateNew}>
                                첫 정원 만들어보기
                            </button>
                        </div>
                    ) : (
                        <>
                            <div css={s.gridStyle}>
                                {paginatedGardens.map((garden) => (
                                    <div
                                        key={garden.id}
                                        css={s.cardStyle}
                                        onClick={() => handleGardenClick(garden.id)}
                                    >
                                        {garden.gardenImage ? (
                                            <img
                                                src={garden.gardenImage}
                                                alt={garden.name}
                                                css={s.thumbnailStyle}
                                            />
                                        ) : (
                                            <div css={s.placeholderStyle}>
                                                🌸
                                            </div>
                                        )}
                                        <div css={s.cardOverlayStyle}>
                                            <h3 css={s.cardTitleStyle}>{garden.name || "제목없음"}</h3>
                                            <p css={s.cardDateStyle}>
                                                {new Date(garden.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div css={s.paginationStyle}>
                                    <button
                                        css={s.paginationButtonStyle(currentPage === 1)}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        ◀ 이전
                                    </button>

                                    <div css={s.pageNumbersStyle}>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                key={i + 1}
                                                css={s.pageNumberStyle(currentPage === i + 1)}
                                                onClick={() => setCurrentPage(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        css={s.paginationButtonStyle(currentPage === totalPages)}
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        다음 ▶
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>

                {/* 우측 레일 */}
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
                            <button css={s.calNavBtn} disabled>
                                ◀
                            </button>
                            <span css={s.calMonth}>2026년 6월</span>
                            <button css={s.calNavBtn} disabled>
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
        </div>
    );
}

export default GardenListPage;
