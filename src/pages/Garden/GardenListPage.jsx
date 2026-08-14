import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { useAllGardens } from "../../hooks/queries/useGarden";
import { useMe } from "../../hooks/queries/useUser";
import GardenPreview from "../../components/GardenPreview";
import {
    MENU_ITEMS,
    // NAV_ITEMS,
    PETALS,
    WATER_COUNT,
    MOOD_COLORS,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "./mockData";
import * as s from "./gardenListStyles";

function GardenListPage() {
    const navigate = useNavigate();
    const meQuery = useMe();
    const gardensQuery = useAllGardens();
    console.log(gardensQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedGarden, setSelectedGarden] = useState(null);
    const gardens = gardensQuery.data?.body || [];

    const itemsPerPage = 9;
    const totalPages = Math.ceil(gardens.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const paginatedGardens = gardens.slice(startIdx, startIdx + itemsPerPage);

    const handleGardenClick = (garden) => {
        setSelectedGarden(garden);
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
        <div css={s.page}>
            <div>
                {/* 중앙 */}
                <main css={s.page}>
                    <div css={s.headerRow}>
                        <div css={s.titleGroup}>
                            <div css={s.title}>🪴 마음의 정원</div>
                            <div css={s.subtitle}>
                                {gardens.length}개의 정원을 만들었어요
                            </div>
                        </div>
                        <button css={s.createButton} onClick={handleCreateNew}>
                            + 새로 만들기
                        </button>
                    </div>

                    {gardens.length === 0 ? (
                        <div css={s.emptyState}>
                            <p>아직 만든 정원이 없어요</p>
                            <button css={s.createButton} onClick={handleCreateNew}>
                                첫 정원 만들어보기
                            </button>
                        </div>
                    ) : (
                        <>
                            <div css={s.grid}>
                                {paginatedGardens.map((garden) => (
                                    <div
                                        css={s.gardenCard}
                                        key={garden.id}
                                        onClick={() => handleGardenClick(garden)}
                                    >
                                        {garden.gardenData ? (
                                            <GardenPreview gardenData={garden.gardenData} height="180px" />
                                        ) : garden.gardenImage ? (
                                            <img
                                                src={garden.gardenImage}
                                                alt={garden.name}
                                            />
                                        ) : (
                                            <div css={s.gardenImgPlaceholder}>
                                                🌸
                                            </div>
                                        )}
                                        <div css={s.gardenCardBody}>
                                            <h3 css={s.gardenCardTitle}>{garden.name || "제목없음"}</h3>
                                            <p css={s.gardenCardDate}>
                                                {new Date(garden.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div css={s.paginationRow}>
                                    <button
                                        css={s.prevNextButton}
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        ◀ 이전
                                    </button>

                                    <div css={s.pageNumbers}>
                                        {Array.from({ length: totalPages }, (_, i) => (
                                            <button
                                                css={s.pageButton}
                                                key={i + 1}
                                                onClick={() => setCurrentPage(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        css={s.prevNextButton}
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
            </div>

            {/* 정원 상세 모달 */}
            {selectedGarden && (
                <div css={s.modalBackdrop} onClick={() => setSelectedGarden(null)}>
                    <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div css={s.modalHeader}>
                            <h2 css={s.modalTitle}>{selectedGarden.name || "제목없음"}</h2>
                            <button
                                css={s.modalCloseButton}
                                onClick={() => setSelectedGarden(null)}
                            >
                                ✕
                            </button>
                        </div>
                        <div css={s.modalBody}>
                            {selectedGarden.gardenData ? (
                                <GardenPreview gardenData={selectedGarden.gardenData} height="500px" />
                            ) : selectedGarden.gardenImage ? (
                                <img
                                    src={selectedGarden.gardenImage}
                                    alt={selectedGarden.name}
                                    css={s.modalImage}
                                />
                            ) : (
                                <div css={s.modalPlaceholder}>🌸</div>
                            )}
                            <p css={s.modalDate}>
                                생성일: {new Date(selectedGarden.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GardenListPage;
