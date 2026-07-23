// 전역 공통 목업 데이터
// 여러 페이지에서 공유되는 데이터를 중앙화합니다

// ─── 공통 메뉴 및 네비게이션 (각 페이지에서 active 상태 변경)
export const MENU_ITEMS_BASE = [
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
    { icon: "🪴", label: "나만의 정원", desc: "기록으로 가꾸는 공간", href: "/garden" },
    {
        icon: "📈",
        label: "감정 리포트",
        desc: "월별 감정 변화 살펴보기",
        href: null,
    },
];

// ─── n월 영문 표기
export const MonthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const NAV_ITEMS_BASE = [
    { label: "홈", href: "/", active: false },
    { label: "속마음 편지", href: null, active: false },
    { label: "공유 게시판", href: "/shareboard", active: false },
    { label: "꽃 도감", href: "/flowers", active: false },
    { label: "정원", href: "/garden", active: false },
];

// ─── 감정 관련 데이터
export const MOOD_COLORS = ["#8694a3", "#94a39a", "#c4b878", "#86a866", "#588157"];

export const MOOD_STYLES = {
    좋음: { dot: "#588157", bg: "#EAF0DE" },
    괜찮음: { dot: "#7FA05F", bg: "#EEF2E2" },
    가라앉음: { dot: "#8A9A8F", bg: "#EAEEE9" },
    "그저 그럼": { dot: "#C4B878", bg: "#F2EFDD" },
};

// ─── 캘린더 관련 데이터
export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

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

// ─── 정원 관련 데이터
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

export const FREEFORM_INITIAL = [
    { id: "f1", x: 82, y: 25, flower: 2 },
    { id: "f2", x: 33, y: 55, flower: 0 },
    { id: "f3", x: 24, y: 72, flower: 5 },
];

// ─── 도감 꽃 데이터
export const FLOWERS = [
    {
        name: "개나리",
        color: "#F2C84B",
        core: "#E0A52E",
        ring: "#D49321",
        meaning: "희망",
        msg: "노란 희망은 늘 당신 가까이에서 피어나고 있어요.",
        date: "2026.03.21",
        got: true,
    },
    {
        name: "장미",
        color: "#E5736A",
        core: "#C94F4A",
        ring: "#B5413D",
        meaning: "사랑",
        msg: "당신은 사랑받기에 충분한 사람이에요.",
        date: "2026.04.02",
        got: true,
    },
    {
        name: "튤립",
        color: "#E58FB0",
        core: "#F2C766",
        ring: "#EAB94E",
        meaning: "배려",
        msg: "오늘은 자신에게도 다정한 배려를 건네보세요.",
        date: "2026.04.15",
        got: true,
    },
    {
        name: "해바라기",
        color: "#F2B705",
        core: "#7A5A2E",
        ring: "#5E4523",
        meaning: "동경",
        msg: "바라보는 곳이 있다는 건 마음이 살아 있다는 뜻이에요.",
        date: "2026.04.28",
        got: true,
    },
    {
        name: "라벤더",
        color: "#B79AD4",
        core: "#8E72B0",
        ring: "#7A5E9C",
        meaning: "기다림",
        msg: "천천히 기다린 마음은 더 깊게 피어나요.",
        date: "2026.05.06",
        got: true,
    },
    {
        name: "수국",
        color: "#9DB6E0",
        core: "#6F8FC4",
        ring: "#5E7DB0",
        meaning: "진심",
        msg: "당신의 진심은 분명 누군가에게 닿고 있어요.",
        date: "2026.05.18",
        got: true,
    },
    {
        name: "데이지",
        color: "#EDEFE6",
        core: "#F2C766",
        ring: "#EAB94E",
        meaning: "순수",
        msg: "있는 그대로의 당신이 가장 빛나요.",
        date: "2026.05.27",
        got: true,
    },
    {
        name: "민들레",
        color: "#F0D060",
        core: "#E0A52E",
        ring: "#D49321",
        meaning: "행복",
        msg: "작은 바람에도 행복은 멀리 멀리 퍼져가요.",
        date: "2026.06.09",
        got: true,
    },
    {
        name: "벚꽃",
        color: "#F4B8C8",
        core: "#E58FB0",
        ring: "#D87AA0",
        meaning: "순결한 마음",
        msg: "스쳐가는 순간도 마음에 오래 남을 거예요.",
        date: "",
        got: false,
    },
    {
        name: "물망초",
        color: "#8FA9E0",
        core: "#F2C766",
        ring: "#EAB94E",
        meaning: "나를 잊지 마세요",
        msg: "소중한 기억은 잊히지 않아요.",
        date: "",
        got: false,
    },
    {
        name: "코스모스",
        color: "#E59AB8",
        core: "#F2C766",
        ring: "#EAB94E",
        meaning: "소녀의 순정",
        msg: "순수한 마음은 가장 큰 용기예요.",
        date: "",
        got: false,
    },
    {
        name: "동백",
        color: "#D8556A",
        core: "#F2C766",
        ring: "#EAB94E",
        meaning: "그대를 누구보다 사랑합니다",
        msg: "추운 날에도 피어나는 마음이 있어요.",
        date: "",
        got: false,
    },
    {
        name: "제비꽃",
        color: "#9B7FD4",
        core: "#F2C766",
        ring: "#EAB94E",
        meaning: "겸손",
        msg: "낮은 곳에서 피어도 향기는 멀리 가요.",
        date: "",
        got: false,
    },
    {
        name: "프리지아",
        color: "#F2D24B",
        core: "#E0A52E",
        ring: "#D49321",
        meaning: "새로운 시작",
        msg: "언제든 다시 시작할 수 있어요.",
        date: "",
        got: false,
    },
    {
        name: "은방울꽃",
        color: "#E8EEE0",
        core: "#C9D6B8",
        ring: "#B4C5A0",
        meaning: "다시 찾은 행복",
        msg: "잃어버린 줄 알았던 행복이 다시 찾아올 거예요.",
        date: "",
        got: false,
    },
    {
        name: "카네이션",
        color: "#EE8C8C",
        core: "#F2C766",
        ring: "#EAB94E",
        meaning: "감사와 사랑",
        msg: "고마운 마음을 미루지 말고 전해보세요.",
        date: "",
        got: false,
    },
];
