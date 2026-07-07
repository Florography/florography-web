import { css } from "@emotion/react";

export const COLORS = {
    bg: "#EEF1E6",
    card: "#FFFFFF",
    border: "#E5E8DA",
    primary: "#3A5A40",
    primaryHover: "#34503A",
    accent: "#588157",
    textDark: "#2C3A2E",
    textMid: "#46503E",
    textMuted: "#7C8675",
    textFaint: "#9AA394",
    itemBorder: "#EAEDE1",
    itemBg: "#FBFCF7",
    linkedBg: "#EAF0DE",
    linkedText: "#46603F",
    unlinkedBg: "#EEF1E6",
    unlinkedText: "#7C8675",
    danger: "#B5564A",
};

export const pageStyle = css`
    min-height: 100vh;
    background: ${COLORS.bg};
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    color: ${COLORS.textDark};
`;
