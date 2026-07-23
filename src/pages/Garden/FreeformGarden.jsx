import { useCallback, useEffect, useRef, useState } from "react";
import * as s from "./styles";
import { useFlowerDirectoies } from "../../hooks/queries/flowerDirectory";
import { useGardenStore } from "../../stores/gardenStore";

const CLICK_THRESHOLD = 6; // 이 이하로 움직이면 드래그가 아니라 클릭/탭으로 간주한다.

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const flowerImgUrl = (path) => (path ? `${API_BASE}${path}` : "");

let nextFreeformId = 1;

function FlowerBloom({ img, name, size, withStem }) {
    return (
        <span css={s.slotFlowerWrap}>
            <span css={s.slotFlowerSway}>
                <img src={img} alt={name} css={s.flowerImgTag(size)} />
            </span>
            {withStem && <span css={s.slotStem} />}
        </span>
    );
}

function FreeformGarden({ theme }) {
    const canvasRef = useRef(null);
    const flowerDirectory = useFlowerDirectoies();
    const [flowers, setFlowers] = useState([]);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [hint, setHint] = useState("");
    const [drag, setDrag] = useState(null);

    const hintTimer = useRef(null);
    const isLoadingFromStore = useRef(false);
    const setFreeformFlowers = useGardenStore((state) => state.setFreeformFlowers);
    const storedFlowers = useGardenStore((state) => state.freeformFlowers);

    // 저장된 꽃 데이터 로드 (store으로부터만)
    useEffect(() => {
        if (Array.isArray(storedFlowers)) {
            isLoadingFromStore.current = true;
            setFlowers(storedFlowers);
        }
    }, [storedFlowers]);

    const showHint = useCallback((msg) => {
        setHint(msg);
        clearTimeout(hintTimer.current);
        hintTimer.current = setTimeout(() => setHint(""), 2000);
    }, []);

    // flowers 상태가 변경될 때마다 스토어에 동기화 (사용자 액션일 때만)
    useEffect(() => {
        if (!isLoadingFromStore.current) {
            setFreeformFlowers(flowers);
        } else {
            isLoadingFromStore.current = false;
        }
    }, [flowers, setFreeformFlowers]);

    // DB 도감 중 사용자가 실제로 개화(보유)한 꽃만 정원에 심을 수 있다.
    const unlockedFlowers = (flowerDirectory.data?.body || []).filter((f) =>
        Boolean(f.userFlower)
    );
    const flowersById = Object.fromEntries(
        unlockedFlowers.map((f) => [f.id, f])
    );

    const isInsideCanvas = (clientX, clientY) => {
        const rect = canvasRef.current.getBoundingClientRect();
        return (
            clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom
        );
    };

    const toPercent = (clientX, clientY) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * 100;
        const y = ((clientY - rect.top) / rect.height) * 100;
        return {
            x: Math.min(97, Math.max(3, x)),
            y: Math.min(95, Math.max(5, y)),
        };
    };

    const removeFlower = (id, msg) => {
        setFlowers((prev) => prev.filter((f) => f.id !== id));
        showHint(msg);
    };

    const pickFlower = (id) =>
        setSelectedFlower((cur) => (cur === id ? null : id));

    // 드래그 도중 포인터 이동/해제는 캔버스나 팔레트 바깥에서도 일어날 수 있어 window에서 추적한다.
    useEffect(() => {
        if (!drag) return;

        const handleMove = (e) => {
            const pct = isInsideCanvas(e.clientX, e.clientY)
                ? toPercent(e.clientX, e.clientY)
                : null;
            setDrag((d) =>
                d ? { ...d, clientX: e.clientX, clientY: e.clientY, pct } : d
            );
        };

        const handleUp = (e) => {
            const dx = e.clientX - drag.startX;
            const dy = e.clientY - drag.startY;
            const moved = Math.hypot(dx, dy) > CLICK_THRESHOLD;
            const inside = isInsideCanvas(e.clientX, e.clientY);

            if (drag.type === "placed") {
                if (!moved) {
                    removeFlower(drag.id, "꽃을 치웠어요");
                } else if (inside) {
                    const { x, y } = toPercent(e.clientX, e.clientY);
                    setFlowers((prev) =>
                        prev.map((f) => (f.id === drag.id ? { ...f, x, y } : f))
                    );
                    showHint(`(${Math.round(x)}%, ${Math.round(y)}%)로 옮겼어요`);
                } else {
                    removeFlower(drag.id, "정원 밖으로 꺼내 꽃을 삭제했어요");
                }
            } else if (drag.type === "palette") {
                if (!moved) {
                    pickFlower(drag.flowerId);
                } else if (inside) {
                    const { x, y } = toPercent(e.clientX, e.clientY);
                    setFlowers((prev) => [
                        ...prev,
                        { id: `f${nextFreeformId++}`, x, y, flower: drag.flowerId },
                    ]);
                    showHint(
                        `${flowersById[drag.flowerId]?.flowerName}을(를) (${Math.round(
                            x
                        )}%, ${Math.round(y)}%)에 심었어요`
                    );
                }
                // 캔버스 밖에 놓으면 아무 일도 일어나지 않는다 (원래 자리인 팔레트로 되돌아감).
            }

            setDrag(null);
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);
        return () => {
            window.removeEventListener("pointermove", handleMove);
            window.removeEventListener("pointerup", handleUp);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drag]);

    const startDragPlaced = (id) => (e) => {
        e.preventDefault();
        setDrag({
            type: "placed",
            id,
            startX: e.clientX,
            startY: e.clientY,
            clientX: e.clientX,
            clientY: e.clientY,
        });
    };

    const startDragPalette = (flowerId) => (e) => {
        e.preventDefault();
        setDrag({
            type: "palette",
            flowerId,
            startX: e.clientX,
            startY: e.clientY,
            clientX: e.clientX,
            clientY: e.clientY,
        });
    };

    const handleCanvasClick = (e) => {
        if (selectedFlower == null || e.target !== canvasRef.current) return;
        const { x, y } = toPercent(e.clientX, e.clientY);
        setFlowers((prev) => [
            ...prev,
            { id: `f${nextFreeformId++}`, x, y, flower: selectedFlower },
        ]);
        showHint(
            `${flowersById[selectedFlower]?.flowerName}을(를) (${Math.round(
                x
            )}%, ${Math.round(y)}%)에 심었어요`
        );
        setSelectedFlower(null);
    };

    const ghostFlower =
        drag?.type === "placed"
            ? flowersById[flowers.find((f) => f.id === drag.id)?.flower]
            : drag
            ? flowersById[drag.flowerId]
            : null;

    return (
        <>
            <div
                ref={canvasRef}
                css={s.gardenCanvas(theme.bg, theme.overlay)}
                onClick={handleCanvasClick}
            >
                {flowers.map((f) => {
                    const flower = flowersById[f.flower];
                    if (!flower) return null;
                    return (
                        <div
                            key={f.id}
                            css={s.placedFlower(
                                drag?.type === "placed" && drag.id === f.id
                            )}
                            style={{ left: `${f.x}%`, top: `${f.y}%` }}
                            onPointerDown={startDragPlaced(f.id)}
                            title="드래그로 옮기기 · 밖으로 빼면 삭제 · 클릭하면 바로 삭제"
                        >
                            <FlowerBloom
                                img={flowerImgUrl(flower.flowerImg)}
                                name={flower.flowerName}
                                size={56}
                                withStem
                            />
                        </div>
                    );
                })}

                {hint && <div css={s.freeformHint}>{hint}</div>}
            </div>

            <section css={s.paletteSection}>
                <div css={s.paletteHeader}>
                    <div css={s.paletteTitle}>🌸 보유중인 꽃</div>
                    <span css={s.paletteHint}>
                        드래그해서 정원 어디든 놓거나, 클릭 후 정원을 클릭해보세요
                    </span>
                </div>
                {flowerDirectory.isLoading ? (
                    <div css={s.paletteHint}>보유한 꽃을 불러오는 중...</div>
                ) : unlockedFlowers.length === 0 ? (
                    <div css={s.paletteHint}>
                        아직 피운 꽃이 없어요. 도감에서 먼저 꽃을 피워보세요 🌱
                    </div>
                ) : (
                    <div css={s.paletteGrid}>
                        {unlockedFlowers.map((f) => (
                            <div
                                key={f.id}
                                css={s.paletteItem(selectedFlower === f.id)}
                                onPointerDown={startDragPalette(f.id)}
                            >
                                <span css={s.paletteFlowerWrap}>
                                    <span css={s.paletteFlowerInner}>
                                        <img
                                            src={flowerImgUrl(f.flowerImg)}
                                            alt={f.flowerName}
                                            css={s.flowerImgTag(36)}
                                        />
                                    </span>
                                </span>
                                <span css={s.paletteName}>{f.flowerName}</span>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {drag && ghostFlower && (
                <div
                    css={drag.type === "placed" ? s.dragGhost : s.paletteGhost}
                    style={{ left: drag.clientX, top: drag.clientY }}
                >
                    <FlowerBloom
                        img={flowerImgUrl(ghostFlower.flowerImg)}
                        name={ghostFlower.flowerName}
                        size={drag.type === "placed" ? 56 : 34}
                    />
                </div>
            )}

            {drag && (
                <div
                    css={s.coordBadge}
                    style={{ left: drag.clientX, top: drag.clientY }}
                >
                    {drag.pct
                        ? `${Math.round(drag.pct.x)}%, ${Math.round(drag.pct.y)}%`
                        : "정원 밖"}
                </div>
            )}
        </>
    );
}

export default FreeformGarden;
