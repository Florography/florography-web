import { css, keyframes } from "@emotion/react";

const COLORS = {
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

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

const pop = keyframes`
    0% { transform: scale(.3); opacity: 0; }
    70% { transform: scale(1.12); }
    100% { transform: scale(1); opacity: 1; }
`;

const sway = keyframes`
    0%, 100% { transform: translate(-50%, -50%) rotate(-3deg); }
    50% { transform: translate(-50%, -50%) rotate(3deg); }
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

export const waterWidget = css`
    padding: 16px;
    background: linear-gradient(160deg, #dde7cf, #e9eedd);
    border: 1px solid #d6dec4;
    border-radius: 16px;
`;

export const waterLabel = css`
    font-size: 11px;
    letter-spacing: 0.08em;
    color: #6e7a62;
    font-weight: 600;
`;

export const waterValueRow = css`
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-top: 6px;
`;

export const waterValue = css`
    font-family: "Gowun Batang", serif;
    font-size: 30px;
    font-weight: 700;
    color: ${COLORS.primary};
`;

export const waterUnit = css`
    font-size: 12px;
    color: ${COLORS.textMuted};
`;

export const waterDesc = css`
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

export const createButtonStyle = css`
    padding: 10px 20px;
    background: ${COLORS.primary};
    border: none;
    border-radius: 10px;
    color: #f4f6ee;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
        background: ${COLORS.primaryHover};
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const gridStyle = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-bottom: 24px;
`;

export const cardStyle = css`
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
    aspect-ratio: 1;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        border-color: ${COLORS.accent};
    }

    &:hover > div {
        opacity: 1;
    }
`;

export const thumbnailStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const placeholderStyle = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    background: linear-gradient(135deg, #dde5d1 0%, #e8eee0 100%);
    color: ${COLORS.textMuted};
`;

export const cardOverlayStyle = css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 18px;
    background: linear-gradient(to top, rgba(44, 58, 46, 0.9), rgba(44, 58, 46, 0.4));
    color: #f4f6ee;
    opacity: 0;
    transition: opacity 0.3s ease;
`;

export const cardTitleStyle = css`
    margin: 0 0 6px 0;
    font-family: "Gowun Batang", serif;
    font-size: 1.2rem;
    font-weight: 600;
    word-break: break-word;
`;

export const cardDateStyle = css`
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.85;
`;

export const emptyStyle = css`
    text-align: center;
    padding: 80px 20px;
`;

export const emptyTextStyle = css`
    font-size: 1.2rem;
    color: ${COLORS.textMuted};
    margin-bottom: 28px;
`;

export const emptyButtonStyle = css`
    padding: 10px 24px;
    background: ${COLORS.primary};
    border: none;
    border-radius: 10px;
    color: #f4f6ee;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${COLORS.primaryHover};
        transform: translateY(-2px);
    }
`;

export const paginationStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
`;

export const paginationButtonStyle = (isDisabled) => css`
    padding: 8px 14px;
    background: ${isDisabled ? "#f0f0f0" : COLORS.card};
    border: 1px solid ${isDisabled ? "#d9d9d9" : COLORS.border};
    border-radius: 8px;
    cursor: ${isDisabled ? "not-allowed" : "pointer"};
    color: ${isDisabled ? COLORS.textMuted : COLORS.textDark};
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background: #f9faf7;
        border-color: ${COLORS.accent};
        color: ${COLORS.accent};
    }

    &:disabled {
        opacity: 0.5;
    }
`;

export const pageNumbersStyle = css`
    display: flex;
    gap: 6px;
`;

export const pageNumberStyle = (isActive) => css`
    min-width: 36px;
    height: 36px;
    padding: 0;
    background: ${isActive ? COLORS.primary : COLORS.card};
    border: 1px solid ${isActive ? COLORS.primary : COLORS.border};
    border-radius: 8px;
    color: ${isActive ? "#f4f6ee" : COLORS.textDark};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;

    &:hover {
        background: ${isActive ? COLORS.primaryHover : "#f9faf7"};
        border-color: ${isActive ? COLORS.primaryHover : COLORS.accent};
    }
`;

// ─── Right rail ───
export const rightCard = css`
    padding: 18px;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 16px;
`;

export const weeklyFlowerLabel = css`
    font-size: 11px;
    letter-spacing: 0.08em;
    color: ${COLORS.textMuted};
    font-weight: 600;
`;

export const weeklyFlowerStage = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 18px 0;
    min-height: 120px;
`;

export const weeklyFlowerBloom = css`
    position: relative;
    width: 80px;
    height: 80px;
`;

export const petal = (size, dist, color, deg, opacity) => css`
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    border-radius: 50%;
    opacity: ${opacity};
    transform: translate(-50%, -50%) translate(${Math.cos((deg - 90) * Math.PI / 180) * dist}px, ${Math.sin((deg - 90) * Math.PI / 180) * dist}px) rotate(${deg}deg);
    animation: ${pop} 0.6s ease-out;
`;

export const flowerCore = (size, bgColor, borderColor, borderWidth) => css`
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${size}px;
    height: ${size}px;
    background: ${bgColor};
    border: ${borderWidth}px solid ${borderColor};
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${pop} 0.6s ease-out 0.1s both;
`;

export const weeklyFlowerName = css`
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textDark};
    text-align: center;
`;

export const weeklyFlowerMeaning = css`
    font-size: 11px;
    color: ${COLORS.textMuted};
    text-align: center;
    margin-top: 4px;
`;

export const quoteCard = css`
    padding: 18px;
    background: linear-gradient(160deg, #e8ebe0, #eff1e7);
    border: 1px solid #dde1d0;
    border-radius: 16px;
`;

export const quoteLabel = css`
    font-size: 11px;
    letter-spacing: 0.08em;
    color: ${COLORS.textMuted};
    font-weight: 600;
`;

export const quoteText = css`
    margin-top: 10px;
    font-family: "Gowun Batang", serif;
    font-size: 13px;
    line-height: 1.7;
    color: ${COLORS.textDark};
    font-style: italic;
`;

export const calHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
`;

export const calNavBtn = css`
    width: 28px;
    height: 28px;
    border: 1px solid ${COLORS.border};
    border-radius: 8px;
    background: ${COLORS.card};
    color: ${COLORS.textMuted};
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background: #f9faf7;
        border-color: ${COLORS.accent};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const calMonth = css`
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textDark};
`;

export const calWeekdayRow = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 8px;
`;

export const calWeekday = css`
    text-align: center;
    font-size: 10px;
    font-weight: 600;
    color: ${COLORS.textMuted};
`;

export const calGrid = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
`;

export const calDay = (color, bg, weight) => css`
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: ${weight};
    color: ${color};
    background: ${bg};
    border-radius: 6px;
`;

export const calLegend = css`
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid ${COLORS.border};
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const calLegendLabel = css`
    font-size: 10px;
    color: ${COLORS.textMuted};
    font-weight: 600;
`;

export const calLegendDots = css`
    display: flex;
    gap: 6px;
`;

export const calLegendDot = (color) => css`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${color};
`;
