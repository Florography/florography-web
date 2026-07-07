import { css, keyframes } from "@emotion/react";

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
};

export const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const toastIn = keyframes`
    from { opacity: 0; transform: translate(-50%, 20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
`;

export const toastOut = keyframes`
    from { opacity: 1; transform: translate(-50%, 0); }
    to { opacity: 0; transform: translate(-50%, -20px); }
`;

export const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`;

export const emptyState = css`
    grid-column: 1 / -1;
    text-align: center;
    padding: 2.5rem 1rem;
    color: ${COLORS.textFaint};
    font-size: 0.9rem;
`;

export const loadingPulse = css`
    animation: ${pulse} 1.5s infinite;
`;

// ─── Page / Header ───
export const pageStyle = css`
    min-height: 100vh;
    background: ${COLORS.bg};
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    color: ${COLORS.textDark};
`;

export const headerStyle = css`
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 32px;
    background: rgba(238, 241, 230, 0.82);
    backdrop-filter: saturate(140%) blur(12px);
    border-bottom: 1px solid #dee2d2;
`;

export const headerLeft = css`
    display: flex;
    align-items: center;
    gap: 18px;
`;

export const hamburgerBtn = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 42px;
    height: 42px;
    padding: 11px;
    border: 1px solid #d3d9c5;
    border-radius: 12px;
    background: #f7f8f1;
    cursor: pointer;

    &:hover {
        background: #edefe2;
        border-color: #a3b18a;
    }

    span {
        display: block;
        height: 2px;
        border-radius: 2px;
        background: #3a5a40;
    }
`;

export const logoGroup = css`
    display: flex;
    align-items: baseline;
    gap: 10px;
`;

export const logoText = css`
    font-family: "Gowun Batang", serif;
    font-weight: 700;
    font-size: 25px;
    letter-spacing: 0.01em;
    color: #344e41;
`;

export const logoTagline = css`
    font-size: 12px;
    color: ${COLORS.textMuted};
    letter-spacing: 0.02em;
`;

export const userPill = css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 14px 6px 6px;
    border: 1px solid #d3d9c5;
    border-radius: 999px;
    background: #f7f8f1;
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #edefe2;
        border-color: #a3b18a;
    }
`;

export const userAvatar = css`
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${COLORS.accent};
    color: #f4f6ee;
    font-size: 14px;
    font-weight: 600;
    font-family: "Gowun Batang", serif;
`;

export const userName = css`
    font-size: 14px;
    font-weight: 500;
    color: #34402e;
`;

export const userChevron = css`
    font-size: 10px;
    color: #8a9480;
`;

// ─── Hamburger drawer ───
export const drawerOverlay = css`
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(44, 58, 46, 0.34);
    backdrop-filter: blur(2px);
`;

export const drawerPanel = css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 320px;
    max-width: 85vw;
    background: #f4f6ee;
    border-right: 1px solid #dde2d0;
    box-shadow: 18px 0 50px rgba(52, 78, 65, 0.14);
    padding: 26px 24px;
    display: flex;
    flex-direction: column;
`;

export const drawerHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`;

export const drawerLogo = css`
    font-family: "Gowun Batang", serif;
    font-weight: 700;
    font-size: 22px;
    color: #344e41;
`;

export const drawerClose = css`
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 10px;
    background: #e7eadc;
    color: #3a5a40;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #dce0cf;
    }
`;

export const drawerDesc = css`
    margin: 0 0 22px;
    font-size: 12.5px;
    line-height: 1.6;
    color: #7c8675;
`;

export const drawerItem = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 14px;
    border-radius: 12px;
    text-decoration: none;
    color: #34402e;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-family: "Pretendard", sans-serif;
    cursor: pointer;

    &:hover {
        background: #e7eadc;
    }
`;

export const drawerItemIcon = css`
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: #e2e7d6;
    font-size: 14px;
    flex-shrink: 0;
`;

export const drawerItemText = css`
    display: flex;
    flex-direction: column;
`;

export const drawerItemLabel = css`
    font-size: 14.5px;
    font-weight: 600;
`;

export const drawerItemDesc = css`
    font-size: 11.5px;
    color: #8a9480;
`;

export const drawerFooter = css`
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid #e0e4d4;
    font-size: 11.5px;
    color: #9aa394;
`;

// ─── Layout grid ───
export const bodyGrid = css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 30px 32px 64px;
    display: grid;
    grid-template-columns: 212px minmax(0, 1fr) 196px;
    gap: 30px;
    align-items: start;

    @media (max-width: 1140px) {
        grid-template-columns: 188px minmax(0, 1fr);
    }
    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        padding: 22px 18px 48px;
    }
`;

export const leftRail = css`
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (max-width: 720px) {
        display: none;
    }
`;

export const rightRail = css`
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (max-width: 1140px) {
        display: none;
    }
`;

export const mainCol = css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
    animation: ${fadeIn} 0.5s ease-out;
`;

// ─── Left rail ───
export const writeBtn = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 15px;
    border: none;
    border-radius: 16px;
    background: ${COLORS.primary};
    color: #f4f6ee;
    font-size: 15px;
    font-weight: 600;
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(58, 90, 64, 0.22);

    &:hover {
        background: ${COLORS.primaryHover};
    }
`;

export const railNav = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px;
    background: #f6f8f0;
    border: 1px solid #e1e5d6;
    border-radius: 16px;
`;

export const railNavItem = (active) => css`
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 12px;
    border-radius: 11px;
    text-decoration: none;
    border: none;
    background: ${active ? "#E4EBD3" : "transparent"};
    color: ${active ? "#2C3A2E" : "#46503E"};
    font-size: 13.5px;
    font-weight: ${active ? 700 : 500};
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    width: 100%;
    text-align: left;

    &:hover {
        background: #e8ebdd;
        color: #2c3a2e;
    }
`;

export const railNavDot = (active) => css`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${active ? "#588157" : "#A3B18A"};
`;

export const collectWidget = css`
    padding: 16px;
    background: linear-gradient(160deg, #dde7cf, #e9eedd);
    border: 1px solid #d6dec4;
    border-radius: 16px;
`;

export const collectLabel = css`
    font-size: 11px;
    letter-spacing: 0.08em;
    color: #6e7a62;
    font-weight: 600;
`;

export const collectValueRow = css`
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-top: 6px;
`;

export const collectValue = css`
    font-family: "Gowun Batang", serif;
    font-size: 30px;
    font-weight: 700;
    color: ${COLORS.primary};
`;

export const collectTotal = css`
    font-size: 12px;
    color: ${COLORS.textMuted};
`;

export const collectDesc = css`
    margin-top: 9px;
    font-size: 11.5px;
    line-height: 1.5;
    color: #76806a;
`;

// ─── Title bar ───
export const titleBar = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 14px;
    border-bottom: 1px solid #d8dec9;
    flex-wrap: wrap;
    gap: 12px;
`;

export const pageTitle = css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "Gowun Batang", serif;
    font-size: 22px;
    font-weight: 700;
    color: #344e41;
`;

export const pageSubtitle = css`
    font-size: 12.5px;
    color: ${COLORS.textMuted};
    margin-top: 4px;
`;

export const filterGroup = css`
    display: flex;
    gap: 4px;
    padding: 4px;
    background: #f1f4e8;
    border: 1px solid #e1e5d6;
    border-radius: 12px;
`;

export const filterBtn = (active) => css`
    padding: 8px 15px;
    border: none;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 600;
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    background: ${active ? COLORS.primary : "transparent"};
    color: ${active ? "#F4F6EE" : "#5A6450"};
`;

// ─── Flower grid ───
export const gridSection = css`
    padding: 24px;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 22px;
    box-shadow: 0 2px 16px rgba(58, 90, 64, 0.05);
`;

export const flowerGrid = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 560px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const flowerCard = (cursor) => css`
    display: flex;
    flex-direction: column;
    padding: 0;
    border: 1px solid #e8ebdd;
    border-radius: 16px;
    background: #fff;
    overflow: hidden;
    cursor: ${cursor};
    transition: transform 0.12s ease;

    &:hover {
        transform: translateY(-3px);
    }
`;

export const flowerImageArea = (bg) => css`
    position: relative;
    display: grid;
    place-items: center;
    height: 118px;
    background: ${bg};
`;

export const petalWrap = (size) => css`
    position: relative;
    width: ${size}px;
    height: ${size}px;
`;

export const petal = (width, height, color, rotate, opacity) => css`
    position: absolute;
    left: calc(50% - ${width / 2}px);
    bottom: 50%;
    width: ${width}px;
    height: ${height}px;
    border-radius: 50%;
    background: ${color};
    transform-origin: 50% 100%;
    transform: rotate(${rotate}deg);
    opacity: ${opacity};
`;

export const flowerCore = (size, color, ring, ringWidth) => css`
    position: absolute;
    left: 50%;
    bottom: 50%;
    width: ${size}px;
    height: ${size}px;
    border-radius: 50%;
    background: ${color};
    transform: translate(-50%, 50%);
    box-shadow: inset 0 0 0 ${ringWidth}px ${ring};
`;

export const flowerThumbImg = (locked) => css`
    width: 72px;
    height: 72px;
    object-fit: contain;
    filter: ${locked ? "grayscale(1)" : "none"};
    opacity: ${locked ? 0.5 : 1};
`;

export const modalFlowerImg = css`
    width: 180px;
    height: 180px;
    object-fit: contain;
`;

export const lockedOverlay = css`
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(244, 246, 238, 0.55);
    font-size: 26px;
    font-weight: 700;
    color: #a6ae98;
`;

export const flowerNameLabel = (color) => css`
    display: block;
    padding: 9px 6px;
    text-align: center;
    border-top: 1px solid #e8ebdd;
    background: #fbfcf7;
    font-family: "Gowun Batang", serif;
    font-size: 13px;
    font-weight: 700;
    color: ${color};
`;

export const pagination = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 22px;
`;

export const pageArrowBtn = css`
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: 1px solid #dde3cf;
    border-radius: 10px;
    background: #f7f9f1;
    color: ${COLORS.primary};
    font-size: 13px;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
        border-color: #a3b18a;
        background: #eff4e3;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

export const pageNumBtn = (active) => css`
    min-width: 34px;
    height: 34px;
    padding: 0 8px;
    border: 1px solid ${active ? COLORS.primary : "#DDE3CF"};
    border-radius: 10px;
    background: ${active ? COLORS.primary : "#F7F9F1"};
    color: ${active ? "#F4F6EE" : "#46503E"};
    font-size: 13px;
    font-weight: ${active ? 700 : 500};
    cursor: pointer;
    font-family: "Pretendard", sans-serif;
`;

// ─── Right rail widgets ───
export const rightCard = css`
    padding: 18px;
    background: #ffffff;
    border: 1px solid ${COLORS.border};
    border-radius: 18px;
    box-shadow: 0 2px 14px rgba(58, 90, 64, 0.05);
`;

export const weeklyFlowerLabel = css`
    font-size: 11px;
    letter-spacing: 0.08em;
    color: ${COLORS.textMuted};
    font-weight: 600;
`;

export const weeklyFlowerStage = css`
    position: relative;
    height: 78px;
    margin: 10px auto 6px;
    width: 78px;
`;

export const weeklyFlowerBloom = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
`;

export const weeklyFlowerName = css`
    text-align: center;
    font-family: "Gowun Batang", serif;
    font-weight: 700;
    font-size: 16px;
    color: ${COLORS.primary};
`;

export const weeklyFlowerMeaning = css`
    text-align: center;
    font-size: 11.5px;
    color: ${COLORS.textMuted};
    margin-top: 2px;
`;

export const quoteCard = css`
    padding: 18px;
    background: linear-gradient(165deg, #e6efd6, #dce7c8);
    border: 1px solid #d2dcbe;
    border-radius: 18px;
`;

export const quoteLabel = css`
    font-size: 11px;
    letter-spacing: 0.06em;
    color: #6e7a62;
    font-weight: 600;
    margin-bottom: 8px;
`;

export const quoteText = css`
    margin: 0;
    font-family: "Gowun Batang", serif;
    font-size: 14px;
    line-height: 1.7;
    color: #3f4d38;
`;

export const calHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const calNavBtn = css`
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 8px;
    background: #edf1e3;
    color: ${COLORS.primary};
    cursor: pointer;
    font-size: 11px;

    &:hover {
        background: #e0e7d1;
    }
`;

export const calMonth = css`
    font-family: "Gowun Batang", serif;
    font-size: 15px;
    font-weight: 700;
    color: ${COLORS.primary};
`;

export const calGrid = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
`;

export const calWeekdayRow = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
    margin-bottom: 5px;
`;

export const calWeekday = css`
    text-align: center;
    font-size: 9.5px;
    color: #a6ae98;
`;

export const calDay = (color, bg, weight) => css`
    display: grid;
    place-items: center;
    height: 22px;
    border-radius: 6px;
    font-size: 10.5px;
    color: ${color};
    background: ${bg};
    font-weight: ${weight};
`;

export const calLegend = css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid #eef1e6;
`;

export const calLegendLabel = css`
    font-size: 10px;
    color: ${COLORS.textFaint};
`;

export const calLegendDots = css`
    display: flex;
    gap: 3px;
    margin-left: auto;
`;

export const calLegendDot = (color) => css`
    width: 11px;
    height: 11px;
    border-radius: 3px;
    background: ${color};
`;

// ─── Detail modal ───
export const modalOverlay = css`
    position: fixed;
    inset: 0;
    z-index: 70;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(44, 58, 46, 0.42);
    backdrop-filter: blur(3px);
`;

export const modalCard = css`
    position: relative;
    width: 100%;
    max-width: 720px;
    background: #fbfcf7;
    border: 1px solid #e0e6d2;
    border-radius: 24px;
    box-shadow: 0 30px 70px rgba(44, 58, 46, 0.3);
    padding: 30px;
`;

export const modalClose = css`
    position: absolute;
    top: 18px;
    right: 18px;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 11px;
    background: #edefe2;
    color: ${COLORS.primary};
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #e0e4d4;
    }
`;

export const modalLayout = css`
    display: grid;
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 26px;
    align-items: stretch;

    @media (max-width: 640px) {
        grid-template-columns: 1fr;
    }
`;

export const modalImageBox = css`
    display: grid;
    place-items: center;
    border-radius: 18px;
    background: #f6f9f0;
    border: 1px solid #e2e7d6;
    min-height: 300px;
`;

export const modalInfoCol = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const modalNameBox = css`
    padding: 14px 18px;
    background: #fff;
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
`;

export const modalFieldLabel = css`
    font-size: 11px;
    color: #9aa394;
    letter-spacing: 0.04em;
`;

export const modalName = css`
    font-family: "Gowun Batang", serif;
    font-size: 22px;
    font-weight: 700;
    color: #2c3a2e;
    margin-top: 2px;
`;

export const modalMeaningBox = css`
    padding: 14px 18px;
    background: #eff3e4;
    border: 1px solid #dde6cc;
    border-radius: 14px;
`;

export const modalMeaningLabel = css`
    font-size: 11px;
    color: #6e7a62;
    letter-spacing: 0.04em;
    font-weight: 600;
`;

export const modalMeaning = css`
    font-family: "Gowun Batang", serif;
    font-size: 17px;
    font-weight: 700;
    color: ${COLORS.primary};
    margin-top: 2px;
`;

export const modalMessageBox = css`
    flex: 1;
    padding: 16px 18px;
    background: #fff;
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
    display: flex;
    align-items: center;
`;

export const modalMessage = css`
    margin: 0;
    font-family: "Gowun Batang", serif;
    font-size: 15.5px;
    line-height: 1.7;
    color: #46503e;
`;

export const modalDateRow = css`
    display: flex;
    justify-content: flex-end;
`;

export const modalDateBadge = css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f4f6ec;
    border: 1px solid #e0e6d2;
    border-radius: 999px;
    font-size: 12.5px;
    color: #56604c;
`;

// ─── Toast ───
export const toastStyle = (isExiting) => css`
    position: fixed;
    left: 50%;
    bottom: 34px;
    transform: translateX(-50%);
    z-index: 80;
    padding: 11px 22px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: #f4f6ee;
    background: rgba(44, 58, 46, 0.88);
    animation: ${isExiting ? toastOut : toastIn} 0.3s ease-out forwards;
`;
