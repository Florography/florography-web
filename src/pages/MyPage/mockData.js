// 마이페이지 UI 목업용 로컬 데이터.
// 글/한마디/도감/캘린더 관련 백엔드 API가 아직 없어 reference/florography 마이페이지.dc.html 과 동일하게
// 하드코딩된 목업 데이터를 사용한다.

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
        icon: "🌍",
        label: "공유 게시판",
        desc: "서로의 정원과 한마디 나누기",
        href: null,
    },
    { icon: "🌼", label: "꽃 도감", desc: "피워낸 꽃 모아보기", href: "/flowers" },
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
    { label: "공유 게시판", href: null, active: false },
    { label: "꽃 도감", href: "/flowers", active: false },
    { label: "마이페이지", href: "/mypage", active: true },
];

export const RECORDS = [
    { text: "비 오는 냄새가 좋았다.", date: "06.24", mood: "좋음" },
    { text: "오늘은 생각보다 괜찮은 하루였다.", date: "06.23", mood: "괜찮음" },
    { text: "조금 지치는 한 주의 끝.", date: "06.21", mood: "가라앉음" },
    { text: "창문을 열어두니 마음이 환기됐다.", date: "06.19", mood: "좋음" },
    { text: "커피 한 잔의 여유가 큰 위로였다.", date: "06.17", mood: "괜찮음" },
    { text: "별다를 것 없는 평범한 하루.", date: "06.15", mood: "그저 그럼" },
    { text: "오랜만에 친구를 만나 마음이 따뜻했다.", date: "06.13", mood: "좋음" },
    { text: "할 일이 많아 조금 버거웠던 날.", date: "06.11", mood: "가라앉음" },
    { text: "산책길의 풀냄새가 좋았다.", date: "06.09", mood: "괜찮음" },
    { text: "스스로를 칭찬해준 하루.", date: "06.07", mood: "좋음" },
    { text: "마음이 차분히 가라앉는 저녁.", date: "06.05", mood: "그저 그럼" },
    { text: "작은 성취가 기뻤던 날.", date: "06.03", mood: "좋음" },
];

export const LINES = [
    { text: "오늘은 나에게 잘했다고 말해줬다.", date: "06.25" },
    { text: "작은 한 문장이 쌓여 큰 위로가 된다.", date: "06.22" },
    { text: "천천히 가도 괜찮아.", date: "06.20" },
    { text: "마음에 쉼표를 찍으며.", date: "06.18" },
    { text: "함께라서 다행인 하루.", date: "06.14" },
    { text: "그날의 노을을 기억해.", date: "06.10" },
    { text: "작은 용기를 낸 하루.", date: "06.06" },
];

export const MOOD_STYLES = {
    좋음: { dot: "#588157", bg: "#EAF0DE" },
    괜찮음: { dot: "#7FA05F", bg: "#EEF2E2" },
    가라앉음: { dot: "#8A9A8F", bg: "#EAEEE9" },
    "그저 그럼": { dot: "#C4B878", bg: "#F2EFDD" },
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
