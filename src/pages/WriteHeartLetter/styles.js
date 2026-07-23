import { css } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const container = css`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

export const header = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
`;

export const headerTitle = css`
    font-family: ${font.serif};
    font-size: 19px;
    font-weight: 700;
    color: ${colors.text};
`;

export const headerDesc = css`
    font-size: 12.5px;
    color: ${colors.subtext};
    margin-top: 4px;
`;

export const submitButton = css`
    padding: 10px 20px;
    border-radius: ${radius.button};
    border: none;
    background: ${colors.primary};
    color: #fff;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }
`;

export const divider = css`
    border: none;
    border-top: 1px solid ${colors.border};
`;

export const toolRow = css`
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
`;

export const themeGroup = css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${colors.subtext};
`;

export const themeSelect = css`
    height: 38px;
    padding: 0 12px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 13px;
    color: ${colors.text};

    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
`;

export const formatGroup = css`
    display: flex;
    align-items: center;
    gap: 6px;
`;

export const formatLabel = css`
    font-size: 12px;
    color: ${colors.subtext};
    margin-right: 2px;
`;

export const formatButton = css`
    min-width: 30px;
    height: 30px;
    border-radius: 8px;
    border: 1px solid ${colors.border};
    background: ${colors.background};
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }
`;

export const sizeGroup = css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    color: ${colors.subtext};
`;

export const sizeButton = css`
    width: 26px;
    height: 26px;
    border-radius: 8px;
    border: 1px solid ${colors.border};
    background: ${colors.background};
    color: ${colors.text};
    cursor: pointer;

    &:hover {
        background: ${colors.hover};
    }
`;

export const inputRow = css`
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
`;

export const textInput = css`
    flex: 1;
    min-width: 200px;
    height: 46px;
    padding: 0 16px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 13.5px;
    color: ${colors.text};

    &::placeholder {
        color: ${colors.subtext};
    }

    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
`;

export const editorGrid = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const editorPane = css`
    min-height: 300px;
    padding: 20px;
    border-radius: ${radius.cardLg};
    border: 1px solid ${colors.border};
    outline: none;
`;

export const previewPane = css`
    min-height: 300px;
    padding: 24px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.cardLg};
    box-shadow: ${shadow.soft};
`;

export const previewHeading = css`
    font-size: 15px;
    font-weight: 700;
    color: ${colors.text};
    margin-bottom: 10px;
`;

export const previewTo = css`
    font-size: 13px;
    color: ${colors.subtext};
    margin: 14px 0 4px;
`;

export const previewTitle = css`
    font-family: ${font.serif};
    font-size: 18px;
    font-weight: 700;
    color: ${colors.text};
    margin-bottom: 12px;
`;

export const previewBody = css`
    font-size: 14.5px;
    line-height: 1.8;
    color: ${colors.text};
`;
