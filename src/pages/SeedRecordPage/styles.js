import { css } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const page = css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-bottom: 60px;
`;

export const mainCard = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px 30px;
    border-radius: ${radius.card};
    background: ${colors.surface};
    box-shadow: ${shadow.soft};
`;

export const title = css`
    font-family: ${font.serif};
    font-size: 22px;
    font-weight: 700;
    color: ${colors.text};
`;

export const rangeLabel = css`
    font-size: 13px;
    color: ${colors.subtext};
`;

export const recordList = css`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const recordListItem = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 4px;
    border-bottom: 1px solid ${colors.border};
    font-size: 13.5px;
    color: ${colors.text};

    span:first-of-type {
        order: 3;
        margin-left: auto;
        flex-shrink: 0;
        width: 64px;
        text-align: right;
        color: ${colors.subtext};
        font-size: 11.5px;
        font-variant-numeric: tabular-nums;
    }
`;

export const sentence = css`
    color: ${colors.subtext};
    font-size: 16px;
`;

export const dateLabel = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: ${colors.subtext};

    header {
        font-size: 22px;
        font-weight: 600;
        width: 60%;
        border-bottom: 1px solid ${colors.border};
    }

    span {
        display: flex;
        justify-content: center;
        width: 100%;
        color: ${colors.subtext};
        font-size: 15px;
    }
`;

export const emptyItem = css`
    padding: 40px 0;
    text-align: center;
    color: ${colors.subtext};
    font-size: 13.5px;
`;

export const weekNav = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding-top: 8px;
`;

export const weekNavButton = css`
    padding: 10px 16px;
    border-radius: ${radius.pill};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 13px;
    font-weight: 600;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

export const weekDots = css`
    display: flex;
    gap: 6px;
`;

export const weekDot = (active) => css`
    min-width: 30px;
    height: 30px;
    padding: 0 8px;
    border-radius: ${radius.pill};
    border: 1px solid ${active ? colors.primary : colors.border};
    background: ${active ? colors.primarySoft : colors.surface};
    font-size: 12px;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};
`;
