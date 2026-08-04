import { css } from "@emotion/react";
import { colors, radius, shadow } from "../../../styles/theme";

export const sidebar = css`
    position: sticky;
    top: 68px;
    align-self: flex-start;
    width: 250px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 16px;
`;

export const section = css`
    display: flex;
    flex-direction: column;
    padding: 16px;
    background: #ffffff;
    border-radius: ${radius.sm};
    box-shadow: ${shadow.soft};
    gap: 12px;
`;

export const title = css`
    font-size: 15px;
    font-weight: 600;
    color: ${colors.text};
`;

export const contentPlaceholder = css`
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.subtext};
    font-size: 13px;
    background: ${colors.background};
    border-radius: ${radius.sm};
`;

export const rankList = css`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const rankItem = css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    background: ${colors.background};
    border-radius: ${radius.sm};
    font-size: 13px;
    color: ${colors.text};
`;

export const rankPosition = css`
    color: ${colors.primary};
    font-weight: 700;
`;

export const rankBody = css`
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const rankLike = css`
    color: ${colors.subtext};
    font-size: 12px;
`;

export const calendarWrapper = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

export const calendarHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
`;

export const calendarNavButton = css`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: ${colors.subtext};
    padding: 4px 8px;
    border-radius: ${radius.sm};
    
    &:hover {
        background: ${colors.background};
        color: ${colors.text};
    }
`;

export const calendarMonthTitle = css`
    font-size: 14px;
    font-weight: 700;
    color: ${colors.text};
`;

export const calendarGrid = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    text-align: center;
`;

export const calendarWeekday = css`
    font-size: 12px;
    font-weight: 600;
    color: ${colors.subtext};
    padding-bottom: 8px;
`;

export const calendarDay = css`
    font-size: 12px;
    padding: 6px 0;
    border-radius: ${radius.sm};
    color: ${colors.text};
    cursor: pointer;
    
    &:hover {
        background: ${colors.hover};
    }
`;

export const calendarDayToday = css`
    background: ${colors.primary};
    color: #fff;
    font-weight: 700;

    &:hover {
        background: ${colors.primaryHover};
    }
`;

export const calendarDayEmpty = css`
    padding: 6px 0;
`;
