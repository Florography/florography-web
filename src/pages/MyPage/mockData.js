// 마이페이지 고유 목업 데이터
// 공통 데이터는 src/mockData.js에서 import

import {
    MENU_ITEMS_BASE,
    NAV_ITEMS_BASE,
    MOOD_COLORS,
    MOOD_STYLES,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "../../globalData";

// 마이페이지에서 사용할 MENU_ITEMS
export const MENU_ITEMS = MENU_ITEMS_BASE;

export const NAV_ITEMS = NAV_ITEMS_BASE.map(item => ({
    ...item,
    active: item.label === null
}));


// 마이페이지 고유 데이터
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

// 공통 데이터 re-export
export { MOOD_COLORS, MOOD_STYLES, WEEKDAYS, BLOOM_MAP_2026_06 };
