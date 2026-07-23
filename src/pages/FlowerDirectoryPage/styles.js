import { css, keyframes } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const page = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 60px;
`;

export const titleBar = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
`;

export const titleGroup = css`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const title = css`
    font-family: ${font.serif};
    font-size: 22px;
    font-weight: 700;
    color: ${colors.text};
`;

export const subtitle = css`
    font-size: 13px;
    color: ${colors.subtext};
`;

export const filterRow = css`
    display: flex;
    gap: 8px;
`;

export const filterButton = (active) => css`
    padding: 9px 16px;
    border-radius: ${radius.pill};
    border: 1px solid ${active ? colors.primary : colors.border};
    background: ${active ? colors.primarySoft : colors.surface};
    color: ${colors.text};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition}, border-color ${transition};

    &:hover {
        border-color: ${colors.primary};
    }
`;

export const section = css`
    padding: 22px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
`;

export const grid = css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 14px;

    @media (max-width: 760px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 480px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

export const emptyText = css`
    font-size: 13.5px;
    color: ${colors.subtext};
    padding: 20px 0;
    text-align: center;
`;

export const flowerCard = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 10px;
    background: ${colors.background};
    border: 1px solid ${colors.border};
    border-radius: ${radius.sm};
    cursor: pointer;
    transition: transform ${transition}, box-shadow ${transition};

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${shadow.soft};
    }
`;

export const flowerImgWrap = css`
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
    background: ${colors.secondary};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const lockBadge = css`
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    background: rgba(78, 90, 80, 0.55);
    color: #fff;
    font-size: 16px;
    font-weight: 700;
`;

export const flowerName = css`
    font-size: 12.5px;
    font-weight: 600;
    color: ${colors.text};
`;

export const pagination = css`
    display: flex;
    justify-content: center;
    gap: 6px;
    margin-top: 20px;
`;

export const pageButton = css`
    min-width: 34px;
    height: 34px;
    padding: 0 10px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    color: ${colors.text};
    font-size: 13px;
    cursor: pointer;
    transition: background ${transition}, border-color ${transition};

    &:hover {
        background: ${colors.hover};
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

export const modalOverlay = css`
    position: fixed;
    inset: 0;
    z-index: 60;
    display: grid;
    place-items: center;
    background: rgba(78, 90, 80, 0.34);
    backdrop-filter: blur(2px);
    padding: 24px;
`;

export const modal = css`
    position: relative;
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 32px 28px;
    background: ${colors.surface};
    border-radius: ${radius.cardLg};
    box-shadow: ${shadow.hover};
`;

export const modalClose = css`
    position: absolute;
    top: 16px;
    right: 16px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${colors.hover};
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.secondary};
    }
`;

export const modalImgWrap = css`
    align-self: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background: ${colors.secondary};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

export const modalBody = css`
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const modalRow = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const modalRowLabel = css`
    font-size: 12px;
    color: ${colors.subtext};
`;

export const modalRowValue = css`
    font-size: 16px;
    font-weight: 700;
    color: ${colors.text};
`;

export const modalQuote = css`
    padding: 14px 16px;
    background: ${colors.hover};
    border-radius: ${radius.sm};
    font-size: 13.5px;
    line-height: 1.7;
    color: ${colors.text};
    font-style: italic;
`;

export const modalMeta = css`
    font-size: 12px;
    color: ${colors.subtext};
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
