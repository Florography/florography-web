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
    padding: 14px 10px;
    border-bottom: 1px solid ${colors.border};
    font-size: 13.5px;
    color: ${colors.text};

    span:first-of-type {
        order: 3;
        text-align: right;
        color: ${colors.subtext};
        font-size: 11.5px;
        font-variant-numeric: tabular-nums;
    }
`;

export const sentenceGroup = css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 0 20px;
    gap: 2px;
`;

export const sentence = css`
    display: flex;
    color: ${colors.subtext};
    font-size: 16px;
`;

export const recipient = css`
    display: flex;
    color: ${colors.subtext};
    font-size: 12px;
`;

export const dateLabel = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: ${colors.subtext};

    header {
        font-size: 22px;
        font-weight: 600;
        border-bottom: 1px solid ${colors.border};
    }

    span {
        display: flex;
        justify-content: center;
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

export const pagination = css`
    display: flex;
    justify-content: center;
    gap: 6px;
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
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
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
