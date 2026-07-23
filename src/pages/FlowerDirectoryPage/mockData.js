// 꽃 도감 페이지 고유 목업 데이터
// 공통 데이터는 src/mockData.js에서 import

import {
    MENU_ITEMS_BASE,
    NAV_ITEMS_BASE,
    FLOWERS,
    MOOD_COLORS,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "../../globalData";

// 꽃 도감에서 사용할 MENU_ITEMS
export const MENU_ITEMS = MENU_ITEMS_BASE;

// // 꽃 도감에서 사용할 NAV_ITEMS (꽃 도감 탭을 active 상태로)
export const NAV_ITEMS = NAV_ITEMS_BASE.map(item => ({
    ...item,
    active: item.label === "꽃 도감"
}));

// 공통 데이터 re-export
export { FLOWERS, MOOD_COLORS, WEEKDAYS, BLOOM_MAP_2026_06 };
