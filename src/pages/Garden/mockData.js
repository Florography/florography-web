// 정원 UI 목업용 로컬 데이터.
// 정원 핵심 기능(꽃 배치/저장, 보유 꽃 산정, 물 주기 집계 로직 등)은 아직 기획이 확정되지 않아
// reference/florography 정원.dc.html 과 동일하게 로컬 상태 + 하드코딩된 목업 데이터로 동작한다.

export const MENU_ITEMS = [
    { icon: "🏡", label: "홈", desc: "나의 정원 한눈에 보기", href: "/" },
    { icon: "🌱", label: "씨앗심기", desc: "오늘의 한 문장 기록", href: null },
    {
        icon: "💌",
        label: "꽃에게 전하는 속마음",
        desc: "대상에게 쓰는 감정 편지",
        href: null,
    },
    {
        icon: "🌼",
        label: "주간 꽃 컬렉션",
        desc: "매주 피어나는 고유한 꽃",
        href: "/flowers",
    },
    { icon: "🪴", label: "나만의 정원", desc: "기록으로 가꾸는 공간", href: null },
    {
        icon: "📈",
        label: "감정 리포트",
        desc: "월별 감정 변화 살펴보기",
        href: null,
    },
];

export const NAV_ITEMS = [
    { label: "홈", href: "/", active: false },
    { label: "속마음 편지", href: null, active: false },
    { label: "공유 게시판", href: "/shareboard", active: false },
    { label: "꽃 도감", href: "/flowers", active: false },
    { label: "정원", href: "/garden", active: true },
];

export const PETALS = [0, 72, 144, 216, 288];

export const WATER_COUNT = 4;

export const FLOWER_TYPES = [
    { name: "감사의 꽃", color: "#E59A91", count: 3 },
    { name: "위로의 꽃", color: "#D98EB0", count: 2 },
    { name: "햇살 꽃", color: "#E7B36A", count: 4 },
    { name: "평온 꽃", color: "#9DB6E0", count: 1 },
    { name: "용기 꽃", color: "#B79AD4", count: 2 },
    { name: "새싹 꽃", color: "#8AB877", count: 5 },
    { name: "기쁨 꽃", color: "#F0C14B", count: 2 },
    { name: "차분 꽃", color: "#7FA9A0", count: 3 },
];

export const THEMES = [
    {
        name: "낮 정원",
        bg: "radial-gradient(130px 130px at 80% 16%, #fcf2bf, transparent 72%), linear-gradient(180deg,#d7eef6 0%,#e6f3df 40%,#cfe6b0 64%,#b6d78d 100%)",
        overlay:
            "radial-gradient(180px 80px at 22% 100%, rgba(120,170,100,.45), transparent 70%), radial-gradient(220px 90px at 75% 100%, rgba(110,160,95,.4), transparent 70%)",
    },
    {
        name: "노을 정원",
        bg: "radial-gradient(150px 150px at 78% 18%, #ffe0a8, transparent 72%), linear-gradient(180deg,#f6dcc6 0%,#f0d9c0 35%,#d9d49e 62%,#bcd28a 100%)",
        overlay:
            "radial-gradient(200px 90px at 24% 100%, rgba(150,160,90,.4), transparent 70%), radial-gradient(220px 90px at 76% 100%, rgba(170,150,90,.35), transparent 70%)",
    },
    {
        name: "새벽 정원",
        bg: "radial-gradient(140px 140px at 80% 16%, #eaf0d2, transparent 72%), linear-gradient(180deg,#dbe6ea 0%,#e2ecdf 42%,#cfe2bd 66%,#bcd79b 100%)",
        overlay:
            "radial-gradient(200px 90px at 22% 100%, rgba(120,160,110,.4), transparent 70%), radial-gradient(220px 90px at 78% 100%, rgba(110,150,120,.35), transparent 70%)",
    },
];

export const TABS = [
    { key: "freeform", label: "1번안" },
    { key: "grid", label: "2번안" },
];

// ── 1번안: 자유 배치 ──
// x, y는 정원 캔버스 안에서의 위치(%, 0~100). flower는 FLOWER_TYPES의 인덱스.
export const FREEFORM_INITIAL = [
    { id: "f1", x: 82, y: 25, flower: 2 },
    { id: "f2", x: 33, y: 55, flower: 0 },
    { id: "f3", x: 24, y: 72, flower: 5 },
];

// ── 2번안: 격자 배치 ──
export const GRID_ROWS = 4;
export const GRID_COLS = 6;

// cell index(row*GRID_COLS+col) -> FLOWER_TYPES 인덱스
export const GRID_INITIAL = {
    2: 2,
    9: 0,
    15: 5,
};

export const MOOD_COLORS = ["#8694a3", "#94a39a", "#c4b878", "#86a866", "#588157"];

export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// 2026년 6월 기준 목업 개화 캘린더 (day -> moodColors index)
export const BLOOM_MAP_2026_06 = {
    2: 4,
    5: 3,
    9: 2,
    12: 1,
    14: 1,
    15: 2,
    17: 1,
    18: 4,
    20: 4,
    21: 0,
    22: 2,
    23: 1,
    24: 3,
    25: 3,
    26: 4,
};
