import { css } from "@emotion/react";
import { colors, font, radius, transition } from "../../styles/theme";

export const header = css`
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    width: 100%;
    padding: 0 32px;
    background: rgba(248, 247, 244, 0.82);
    backdrop-filter: saturate(140%) blur(12px);
    border-bottom: 1px solid ${colors.border};
`;

export const headerContent = css`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
`;

export const logo = css`
    font-family: ${font.serif};
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: ${colors.text};
`;

export const spacer = css`
    flex: 1;
`;

export const profile = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    border-radius: ${radius.pill};
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    color: ${colors.text};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background ${transition}, border-color ${transition};

    &:hover {
        background: ${colors.hover};
        border-color: ${colors.primary};
    }
`;
