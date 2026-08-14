import { useFlowerDirectoies } from "../hooks/queries/flowerDirectory";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const flowerImgUrl = (path) => (path ? `${API_BASE}${path}` : "");

function GardenPreview({ gardenData, height = "200px" }) {
    const { data: directoryData } = useFlowerDirectoies();

    if (!gardenData) return null;

    let parsedData = null;
    try {
        if (typeof gardenData === "string") {
            const cleanData = gardenData.trim();
            if (!cleanData.startsWith("{") && !cleanData.startsWith("[")) {
                return null;
            }
            parsedData = JSON.parse(cleanData);
            if (typeof parsedData === "string" && (parsedData.startsWith("{") || parsedData.startsWith("["))) {
                parsedData = JSON.parse(parsedData);
            }
        } else if (typeof gardenData === "object") {
            parsedData = gardenData;
        }
    } catch (error) {
        console.error("정원 JSON 파싱 오류:", error);
        return null;
    }

    const flowers = parsedData?.freeformFlowers || [];
    if (!Array.isArray(flowers) || flowers.length === 0) return null;

    const flowerMap = Object.fromEntries(
        (directoryData?.body || []).map((f) => [f.id, f])
    );

    return (
        <div style={{
            position: "relative",
            width: "100%",
            height: height,
            background: "radial-gradient(130px 130px at 80% 16%, #fcf2bf, transparent 72%), linear-gradient(180deg,#d7eef6 0%,#e6f3df 40%,#cfe6b0 64%,#b6d78d 100%)",
            borderRadius: "12px",
            overflow: "hidden",
            marginBottom: "12px",
            border: "1px solid #e6f3df",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)"
        }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", overflow: "visible" }}>
                {flowers.map((item, index) => {
                    const flowerDef = flowerMap[item.flower];
                    if (!flowerDef) return null;

                    const x = Number(item.x) || 0;
                    const y = Number(item.y) || 0;

                    return (
                        <image
                            key={item.id || index}
                            href={flowerImgUrl(flowerDef.flowerImg)}
                            x={x - 6}
                            y={y - 6}
                            width="12"
                            height="12"
                            preserveAspectRatio="xMidYMid meet"
                        />
                    );
                })}
            </svg>
        </div>
    );
}

export default GardenPreview;
