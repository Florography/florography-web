import { css, keyframes } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

/* ---------- 공용 페이지 헤더 (정원 만들기/보기) ---------- */

export const pageHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${colors.border};
`;

export const headerLeft = css`
    display: flex;
    align-items: center;
    gap: 14px;
`;

export const backButton = css`
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: ${radius.sm};
    background: ${colors.hover};
    color: ${colors.text};
    font-size: 16px;
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.secondary};
    }
`;

export const headerTitleGroup = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const headerTitle = css`
    font-family: ${font.serif};
    font-size: 18px;
    font-weight: 700;
    color: ${colors.text};
`;

export const headerSubtitle = css`
    font-size: 12.5px;
    color: ${colors.subtext};
`;

export const profileButton = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 14px 7px 7px;
    border-radius: ${radius.pill};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    cursor: pointer;
    transition: background ${transition}, border-color ${transition};

    &:hover {
        background: ${colors.hover};
        border-color: ${colors.primary};
    }
`;

export const profileInitial = css`
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${colors.primary};
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    font-family: ${font.serif};
`;

export const profileName = css`
    font-size: 13.5px;
    font-weight: 500;
    color: ${colors.text};
`;

export const profileArrow = css`
    font-size: 10px;
    color: ${colors.subtext};
`;

/* ---------- 본문 레이아웃 ---------- */

export const bodyGrid = css`
    display: grid;
    grid-template-columns: 200px minmax(0, 1fr) 200px;
    gap: 24px;
    align-items: start;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`;

export const leftAside = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const writeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px;
    border-radius: ${radius.button};
    background: ${colors.primary};
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: ${shadow.soft};
    transition: background ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }
`;

export const waterCard = css`
    padding: 16px;
    background: linear-gradient(160deg, ${colors.secondary}, ${colors.primarySoft});
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
`;

export const waterLabel = css`
    font-size: 11px;
    letter-spacing: 0.06em;
    color: ${colors.subtext};
    font-weight: 600;
`;

export const waterCount = css`
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-top: 6px;
`;

export const waterNumber = css`
    font-family: ${font.serif};
    font-size: 28px;
    font-weight: 700;
    color: ${colors.text};
`;

export const waterUnit = css`
    font-size: 12px;
    color: ${colors.subtext};
`;

export const waterDesc = css`
    margin-top: 8px;
    font-size: 11.5px;
    line-height: 1.5;
    color: ${colors.subtext};
`;

export const main = css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
`;

export const mainTitleBar = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
`;

export const mainTitleGroup = css`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
`;

export const mainTitle = css`
    font-family: ${font.serif};
    font-size: 20px;
    font-weight: 700;
    color: ${colors.text};
`;

export const mainSubtitle = css`
    font-size: 12.5px;
    color: ${colors.subtext};
`;

export const gardenNameInput = css`
    height: 40px;
    padding: 0 14px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 13.5px;
    color: ${colors.text};
    transition: border-color ${transition};

    &::placeholder {
        color: ${colors.subtext};
    }

    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
`;

export const mainActions = css`
    display: flex;
    gap: 8px;
`;

export const themeButton = css`
    padding: 9px 16px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 13px;
    font-weight: 600;
    color: ${colors.text};
    cursor: pointer;
    transition: border-color ${transition}, background ${transition};

    &:hover {
        border-color: ${colors.primary};
        background: ${colors.hover};
    }
`;

export const saveButton = css`
    padding: 9px 18px;
    border-radius: ${radius.sm};
    border: none;
    background: ${colors.primary};
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }
`;

export const readOnlyLabel = css`
    padding: 9px 16px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 13px;
    font-weight: 600;
    color: ${colors.subtext};
`;

export const tabRow = css`
    display: flex;
    gap: 8px;
`;

export const tabButton = (active) => css`
    padding: 10px 18px;
    border-radius: ${radius.pill};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    background: ${active ? colors.primary : colors.hover};
    color: ${active ? "#fff" : colors.text};
    transition: background ${transition};
`;

/* ---------- 우측 레일 ---------- */

export const rightAside = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const flowerCard = css`
    padding: 18px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
    text-align: center;
`;

export const flowerLabel = css`
    font-size: 11px;
    letter-spacing: 0.06em;
    color: ${colors.subtext};
    font-weight: 600;
    text-align: left;
`;

const sway = keyframes`
    0%, 100% { transform: translate(-50%, -50%) rotate(-3deg); }
    50% { transform: translate(-50%, -50%) rotate(3deg); }
`;

export const flowerVisual = css`
    position: relative;
    width: 60px;
    height: 60px;
    margin: 14px auto 8px;
    border-radius: 50%;
    background: ${colors.secondary};
    animation: ${sway} 6s ease-in-out infinite;
`;

export const flowerName = css`
    font-family: ${font.serif};
    font-weight: 700;
    font-size: 15px;
    color: ${colors.text};
`;

export const flowerMeaning = css`
    font-size: 11.5px;
    color: ${colors.subtext};
    margin-top: 2px;
`;

export const quoteCard = css`
    padding: 18px;
    background: linear-gradient(165deg, ${colors.secondary}, ${colors.primarySoft});
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
`;

export const quoteLabel = css`
    font-size: 11px;
    letter-spacing: 0.05em;
    color: ${colors.subtext};
    font-weight: 600;
    margin-bottom: 8px;
`;

export const quoteText = css`
    font-family: ${font.serif};
    font-size: 13.5px;
    line-height: 1.7;
    color: ${colors.text};
`;

export const calendarCard = css`
    padding: 16px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
`;

export const calendarHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

export const calendarNav = css`
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    background: ${colors.hover};
    color: ${colors.text};
    font-size: 10px;
    cursor: pointer;

    &:hover {
        background: ${colors.secondary};
    }
`;

export const calendarMonth = css`
    font-family: ${font.serif};
    font-weight: 700;
    font-size: 14px;
    color: ${colors.text};
`;

export const weekdaysRow = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
    margin-bottom: 4px;
`;

export const weekday = css`
    text-align: center;
    font-size: 9.5px;
    color: ${colors.subtext};
`;

export const daysGrid = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
`;

export const calendarDay = css`
    display: grid;
    place-items: center;
    height: 21px;
    border-radius: 6px;
    font-size: 10.5px;
`;

export const moodLegend = css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid ${colors.border};
`;

export const legendLabel = css`
    font-size: 10px;
    color: ${colors.subtext};
`;

export const moodColors = css`
    display: flex;
    gap: 3px;
    margin-left: auto;

    span {
        width: 11px;
        height: 11px;
        border-radius: 3px;
    }
`;

const toastIn = keyframes`
    from { opacity: 0; transform: translate(-50%, 8px); }
    to { opacity: 1; transform: translate(-50%, 0); }
`;

export const toast = css`
    position: fixed;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    padding: 12px 22px;
    background: ${colors.text};
    color: #fff;
    font-size: 13px;
    border-radius: ${radius.pill};
    animation: ${toastIn} 0.2s ease;
    z-index: 70;
`;

export const emptyState = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 60px 20px;
    text-align: center;
    color: ${colors.subtext};
`;

/* ---------- FreeformGarden ---------- */

export const gardenCanvas = (bg, overlay) => css`
    position: relative;
    height: 520px;
    border-radius: ${radius.cardLg};
    overflow: hidden;
    border: 1px solid ${colors.border};
    box-shadow: inset 0 2px 24px rgba(78, 90, 80, 0.12);
    background: ${bg}, ${overlay};
    background-blend-mode: normal;
    cursor: default;
`;

export const slotFlowerWrap = css`
    position: relative;
    display: inline-block;
`;

const popIn = keyframes`
    0% { transform: scale(0.3); opacity: 0; }
    70% { transform: scale(1.12); }
    100% { transform: scale(1); opacity: 1; }
`;

export const slotFlowerSway = css`
    display: inline-block;
    animation: ${popIn} 0.3s ease;
`;

export const flowerImgTag = (size) => css`
    width: ${size}px;
    height: ${size}px;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
`;

export const slotStem = css`
    position: absolute;
    left: 50%;
    top: 100%;
    width: 4px;
    height: 18px;
    background: linear-gradient(180deg, ${colors.primary}, ${colors.primaryHover});
    border-radius: 4px;
    transform: translateX(-50%);
`;

export const placedFlower = (dragging) => css`
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: grab;
    opacity: ${dragging ? 0.35 : 1};
    touch-action: none;
`;

export const freeformHint = css`
    position: absolute;
    left: 50%;
    bottom: 16px;
    transform: translateX(-50%);
    padding: 9px 18px;
    background: rgba(78, 90, 80, 0.86);
    color: #fff;
    font-size: 12.5px;
    border-radius: ${radius.pill};
`;

export const paletteSection = css`
    padding: 20px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.cardLg};
    box-shadow: ${shadow.soft};
`;

export const paletteHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
    flex-wrap: wrap;
    gap: 6px;
`;

export const paletteTitle = css`
    font-family: ${font.serif};
    font-size: 15px;
    font-weight: 700;
    color: ${colors.text};
`;

export const paletteHint = css`
    font-size: 11.5px;
    color: ${colors.subtext};
`;

export const paletteGrid = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
    gap: 12px;
`;

export const paletteItem = (selected) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 14px 6px;
    border-radius: ${radius.sm};
    border: 1.5px solid ${selected ? colors.primary : colors.border};
    background: ${selected ? colors.primarySoft : colors.background};
    cursor: grab;
    transition: transform ${transition};
    touch-action: none;

    &:hover {
        transform: translateY(-3px);
    }
`;

export const paletteFlowerWrap = css`
    position: relative;
    width: 44px;
    height: 44px;
    display: grid;
    place-items: center;
`;

export const paletteFlowerInner = css`
    display: grid;
    place-items: center;
`;

export const paletteName = css`
    font-size: 11.5px;
    font-weight: 600;
    color: ${colors.text};
    text-align: center;
`;

export const dragGhost = css`
    position: fixed;
    z-index: 90;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0.85;
`;

export const paletteGhost = css`
    position: fixed;
    z-index: 90;
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 0.85;
`;

export const coordBadge = css`
    position: fixed;
    z-index: 90;
    transform: translate(16px, 16px);
    pointer-events: none;
    padding: 4px 10px;
    background: rgba(78, 90, 80, 0.86);
    color: #fff;
    font-size: 11px;
    border-radius: ${radius.pill};
`;
