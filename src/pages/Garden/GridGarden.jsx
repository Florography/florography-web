/** @jsxImportSource @emotion/react */
import { useCallback, useRef, useState } from "react";
import * as s from "./styles";
import {
    PETALS,
    FLOWER_TYPES,
    GRID_ROWS,
    GRID_COLS,
    GRID_INITIAL,
} from "./mockData";

const TOTAL_CELLS = GRID_ROWS * GRID_COLS;

function buildInitialCells() {
    return Array.from({ length: TOTAL_CELLS }, (_, i) =>
        i in GRID_INITIAL ? GRID_INITIAL[i] : null
    );
}

function GridGarden({ theme }) {
    const [cells, setCells] = useState(buildInitialCells);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [overIdx, setOverIdx] = useState(null);
    const [dragPos, setDragPos] = useState(null);
    const [hint, setHint] = useState("");
    const hintTimer = useRef(null);

    const showHint = useCallback((msg) => {
        setHint(msg);
        clearTimeout(hintTimer.current);
        hintTimer.current = setTimeout(() => setHint(""), 2000);
    }, []);

    const pickFlower = (id) =>
        setSelectedFlower((cur) => (cur === id ? null : id));

    const cellPosition = (idx) => ({
        row: Math.floor(idx / GRID_COLS) + 1,
        col: (idx % GRID_COLS) + 1,
    });

    const placeAt = (idx, flowerId) => {
        setCells((prev) => {
            const next = [...prev];
            next[idx] = flowerId;
            return next;
        });
        const { row, col } = cellPosition(idx);
        showHint(`${FLOWER_TYPES[flowerId].name}을(를) (${row}행 ${col}열)에 심었어요`);
    };

    const handleCellClick = (idx) => {
        const current = cells[idx];
        if (current != null) {
            setCells((prev) => {
                const next = [...prev];
                next[idx] = null;
                return next;
            });
            showHint("꽃을 치웠어요");
        } else if (selectedFlower != null) {
            placeAt(idx, selectedFlower);
            setSelectedFlower(null);
        } else {
            showHint("먼저 아래에서 꽃을 선택하세요");
        }
    };

    // ── 팔레트 → 칸 드래그 ──
    const handlePaletteDragStart = (flowerId) => (e) => {
        e.dataTransfer.effectAllowed = "copy";
        e.dataTransfer.setData(
            "application/json",
            JSON.stringify({ type: "palette", flowerId })
        );
    };

    // ── 심어진 꽃 → 다른 칸으로 드래그, 격자 밖으로 드래그하면 삭제 ──
    const handleCellDragStart = (idx) => (e) => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData(
            "application/json",
            JSON.stringify({ type: "cell", fromIndex: idx })
        );
    };

    const handleCellDragEnd = (idx) => (e) => {
        setOverIdx(null);
        setDragPos(null);
        if (e.dataTransfer.dropEffect === "none") {
            setCells((prev) => {
                const next = [...prev];
                next[idx] = null;
                return next;
            });
            showHint("정원 밖으로 꺼내 꽃을 삭제했어요");
        }
    };

    const handleCellDragOver = (idx) => (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = cells[idx] != null ? "move" : "copy";
        setOverIdx(idx);
        setDragPos({ x: e.clientX, y: e.clientY });
    };

    const handleCellDragLeave = (idx) => () => {
        setOverIdx((cur) => (cur === idx ? null : cur));
    };

    const handleCellDrop = (idx) => (e) => {
        e.preventDefault();
        setOverIdx(null);
        setDragPos(null);

        let data;
        try {
            data = JSON.parse(e.dataTransfer.getData("application/json"));
        } catch {
            return;
        }

        if (data.type === "palette") {
            if (cells[idx] != null) {
                showHint("이미 꽃이 있어요");
                return;
            }
            placeAt(idx, data.flowerId);
        } else if (data.type === "cell") {
            const from = data.fromIndex;
            if (from === idx) return;
            setCells((prev) => {
                const next = [...prev];
                const temp = next[idx];
                next[idx] = next[from];
                next[from] = temp;
                return next;
            });
            const { row, col } = cellPosition(idx);
            showHint(`(${row}행 ${col}열)로 옮겼어요`);
        }
    };

    return (
        <>
            <div css={s.gardenCanvas(theme.bg, theme.overlay)}>
                <div css={s.gridWrap(GRID_COLS)}>
                    {cells.map((flowerId, idx) => {
                        const filled = flowerId != null;
                        return (
                            <div
                                key={idx}
                                css={s.gridCell(filled, overIdx === idx, false)}
                                draggable={filled}
                                onDragStart={
                                    filled ? handleCellDragStart(idx) : undefined
                                }
                                onDragEnd={filled ? handleCellDragEnd(idx) : undefined}
                                onDragOver={handleCellDragOver(idx)}
                                onDragLeave={handleCellDragLeave(idx)}
                                onDrop={handleCellDrop(idx)}
                                onClick={() => handleCellClick(idx)}
                                title={
                                    filled
                                        ? `${FLOWER_TYPES[flowerId].name} · 클릭하면 비워요`
                                        : "빈 자리 · 꽃을 놓아주세요"
                                }
                            >
                                {filled ? (
                                    <span css={s.gridFlowerWrap}>
                                        <span css={s.gridFlowerSway}>
                                            {PETALS.map((deg) => (
                                                <span
                                                    key={deg}
                                                    css={s.petal(
                                                        13,
                                                        22,
                                                        FLOWER_TYPES[flowerId].color,
                                                        deg
                                                    )}
                                                />
                                            ))}
                                            <span
                                                css={s.flowerCore(
                                                    17,
                                                    "#F2C766",
                                                    "#EAB94E",
                                                    2
                                                )}
                                            />
                                        </span>
                                    </span>
                                ) : (
                                    <span css={s.slotPlus}>+</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                {hint && <div css={s.hintToast}>{hint}</div>}

                {overIdx != null && dragPos && (
                    <div
                        css={s.coordBadge}
                        style={{ left: dragPos.x, top: dragPos.y }}
                    >
                        {cellPosition(overIdx).row}행 {cellPosition(overIdx).col}열
                    </div>
                )}
            </div>

            <section css={s.paletteSection}>
                <div css={s.paletteHeader}>
                    <div css={s.paletteTitle}>🌸 보유중인 꽃</div>
                    <span css={s.paletteHint}>
                        드래그하거나 클릭 후 빈 칸을 클릭해보세요
                    </span>
                </div>
                <div css={s.paletteGrid}>
                    {FLOWER_TYPES.map((f, i) => (
                        <div
                            key={f.name}
                            css={s.paletteItem(selectedFlower === i)}
                            draggable
                            onDragStart={handlePaletteDragStart(i)}
                            onClick={() => pickFlower(i)}
                        >
                            <span css={s.paletteFlowerWrap}>
                                <span css={s.paletteFlowerInner}>
                                    {PETALS.map((deg) => (
                                        <span
                                            key={deg}
                                            css={s.petal(12, 20, f.color, deg)}
                                        />
                                    ))}
                                    <span
                                        css={s.flowerCore(15, "#F2C766", "#EAB94E", 2)}
                                    />
                                </span>
                            </span>
                            <span css={s.paletteName}>{f.name}</span>
                            <span css={s.paletteCount}>보유 {f.count}</span>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default GridGarden;
