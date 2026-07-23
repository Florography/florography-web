import { css, keyframes } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../../styles/theme";

export const sidebar = css`
    position: sticky;
    top: 68px;
    align-self: flex-start;
    width: 220px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 24px 16px;
`;

export const writeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 14px;
    border-radius: ${radius.button};
    background: ${colors.primary};
    color: #ffffff;
    font-size: 15px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
    box-shadow: ${shadow.soft};
    transition: background ${transition}, transform ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const menu = css`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const menuItemWrap = css`
    display: flex;
    flex-direction: column;
`;

export const menuItem = css`
    padding: 12px 14px;
    border-radius: ${radius.sm};
    font-size: 14.5px;
    font-weight: 500;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition}, border-color ${transition};
    border-left: 3px solid transparent;

    &:hover {
        background: ${colors.hover};
    }
`;

const expand = keyframes`
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const submenu = css`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 2px 0 6px 14px;
    padding-left: 12px;
    border-left: 2px solid ${colors.border};
    animation: ${expand} 0.2s ease;
`;

export const submenuItem = css`
    padding: 9px 12px;
    border-radius: ${radius.sm};
    font-size: 13.5px;
    color: ${colors.subtext};
    cursor: pointer;
    transition: background ${transition}, color ${transition};

    &:hover {
        background: ${colors.hover};
        color: ${colors.text};
    }
`;
