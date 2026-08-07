import { css } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const page = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 8px 0 60px;
`;

export const card = css`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 24px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
`;

export const cardLabel = css`
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    color: ${colors.text};

    & > p {
        font-size: 12px;
        font-weight: 400;
        color: ${colors.subtext};
    }
`;

export const inputRow = css`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const textInput = css`
    flex: 1;
    height: 60px;
    padding: 0 16px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.background};
    font-size: 16px;
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

export const primaryButton = css`
    padding: 0 22px;
    height: 48px;
    border-radius: ${radius.button};
    background: ${colors.primary};
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition}, transform ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }

    &:active {
        transform: scale(0.97);
    }
`;

export const moodRow = css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

export const moodLabel = (checked) => css`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 16px;
    border-radius: ${radius.pill};
    border: 1px solid ${checked ? colors.primary : colors.border};
    background: ${checked ? colors.primarySoft : colors.background};
    font-size: 13.5px;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition}, border-color ${transition};

    div {
        font-size: 30px;
    }

    input {
        display: none;
        accent-color: ${colors.primary};
    }
`;

export const shortcutSectionTitle = css`
    display: flex;
    align-items: center;
    gap: 16px;

    span:first-of-type,
    span:last-of-type {
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, transparent, ${colors.border}, transparent);
    }

    span:not(:first-of-type):not(:last-of-type) {
        font-size: 12px;
        color: ${colors.subtext};
        letter-spacing: 0.06em;
    }
`;

export const shortcutGrid = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
`;

export const shortcutCard = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 22px 20px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.cardLg};
    text-decoration: none;
    cursor: pointer;
    box-shadow: ${shadow.soft};
    transition: transform ${transition}, box-shadow ${transition};

    &:hover {
        transform: translateY(-3px);
        box-shadow: ${shadow.hover};
    }
`;

export const shortcutIcon = (bg) => css`
    display: grid;
    place-items: center;
    width: 46px;
    height: 46px;
    border-radius: ${radius.sm};
    background: ${bg};
    font-size: 22px;
`;

export const shortcutTitle = css`
    font-size: 16px;
    font-weight: 700;
    color: ${colors.text};
    font-family: ${font.serif};
`;

export const shortcutDesc = css`
    font-size: 12.5px;
    line-height: 1.55;
    color: ${colors.subtext};
`;

export const mutedText = css`
    font-size: 13px;
    color: ${colors.subtext};
`;

export const divider = css`
    font-size: 0;
    height: 1px;
    background: ${colors.border};
    margin: 4px 0;
`;

export const historyRow = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 0 10px;
`;

export const historyRowTitle = css`
    font-size: 16px;
    font-weight: 700;
    color: ${colors.text};
`;

export const dateInput = css`
    padding: 8px 16px;
    border-radius: ${radius.pill};
    border: 1px solid transparent;
    background: ${colors.primarySoft};
    font-size: 14px;
    font-weight: 600;
    color: ${colors.primary};
    cursor: pointer;
    transition: all ${transition};
    box-shadow: ${shadow.soft};

    /* For webkit browsers to hide or style the calendar icon */
    &::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.6;
        transition: opacity ${transition};
    }

    &::-webkit-calendar-picker-indicator:hover {
        opacity: 1;
    }

    &:focus {
        outline: none;
        border-color: ${colors.primary};
        background: ${colors.background};
    }

    &:hover {
        background: ${colors.hover};
    }
`;

export const historyBlock = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const historyBlockTitle = css`
    font-size: 13.5px;
    font-weight: 600;
    color: ${colors.subtext};
`;

export const recordChip = css`
    padding: 10px 14px;
    border-radius: ${radius.sm};
    background: ${colors.hover};
    font-size: 13.5px;
    color: ${colors.text};
`;

export const emptyText = css`
    font-size: 13px;
    color: ${colors.subtext};
    padding: 8px 2px;
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

export const paginationRow = css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    margin-top: 20px;
`;

export const pageButton = css`
    padding: 6px 12px;
    border: 1px solid ${colors.border};
    background: ${colors.background};
    border-radius: ${radius.sm};
    cursor: pointer;
    font-size: 13.5px;
    color: ${colors.text};
    transition: background ${transition};

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background: ${colors.hover};
    }
`;

export const pageIndicator = css`
    font-size: 13.5px;
    color: ${colors.subtext};
`;
