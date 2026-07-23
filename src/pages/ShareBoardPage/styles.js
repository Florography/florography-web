import { css } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const composerCard = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 20px;
    margin-bottom: 16px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
`;

export const composerLabel = css`
    font-size: 14px;
    font-weight: 700;
    color: ${colors.text};
`;

export const composerRow = css`
    display: flex;
    gap: 10px;
`;

export const composerInput = css`
    flex: 1;
    height: 46px;
    padding: 0 16px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.background};
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

export const composerButton = css`
    padding: 0 22px;
    border-radius: ${radius.button};
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

export const filterRow = css`
    margin-bottom: 16px;
`;

export const filterButton = css`
    padding: 9px 16px;
    border-radius: ${radius.pill};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 12.5px;
    font-weight: 600;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }
`;

export const sectionLabel = css`
    font-family: ${font.serif};
    font-size: 17px;
    font-weight: 700;
    color: ${colors.text};
    margin-bottom: 12px;
`;

export const boardList = css`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
`;

export const boardEmpty = css`
    padding: 40px 0;
    text-align: center;
    color: ${colors.subtext};
    font-size: 13.5px;
`;

export const boardItem = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 18px 20px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
`;

export const boardBody = css`
    font-size: 14px;
    line-height: 1.7;
    color: ${colors.text};
`;

export const boardMetaRow = css`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    font-size: 12px;
    color: ${colors.subtext};
`;

export const likeButton = css`
    padding: 6px 14px;
    border-radius: ${radius.pill};
    border: 1px solid ${colors.border};
    background: ${colors.background};
    font-size: 12.5px;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }
`;

export const boardActions = css`
    display: flex;
    gap: 8px;
    margin-left: auto;
`;

export const actionButton = css`
    padding: 6px 12px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.background};
    font-size: 12px;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }
`;

export const dangerAction = css`
    color: ${colors.danger};
    border-color: ${colors.danger};

    &:hover {
        background: #fbeaea;
    }
`;

export const editRow = css`
    display: flex;
    gap: 8px;
`;

export const editInput = css`
    flex: 1;
    height: 40px;
    padding: 0 14px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    font-size: 13.5px;
    color: ${colors.text};

    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
`;

export const saveButton = css`
    padding: 0 16px;
    border-radius: ${radius.sm};
    border: none;
    background: ${colors.primary};
    color: #fff;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
`;

export const cancelButton = css`
    padding: 0 16px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 12.5px;
    color: ${colors.text};
    cursor: pointer;
`;

export const commentSection = css`
    margin-top: 6px;
    padding-top: 12px;
    border-top: 1px solid ${colors.border};
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const commentTitle = css`
    font-size: 12px;
    font-weight: 700;
    color: ${colors.subtext};
`;

export const commentForm = css`
    display: flex;
    gap: 8px;
`;

export const commentInput = css`
    flex: 1;
    height: 38px;
    padding: 0 12px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.background};
    font-size: 13px;
    color: ${colors.text};

    &::placeholder {
        color: ${colors.subtext};
    }

    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
`;

export const commentSubmit = css`
    padding: 0 14px;
    border-radius: ${radius.sm};
    border: none;
    background: ${colors.text};
    color: #fff;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
`;

export const commentList = css`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const commentItem = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: ${colors.background};
    border-radius: ${radius.sm};
    font-size: 12.5px;
    color: ${colors.text};
`;

export const commentActions = css`
    display: flex;
    gap: 6px;
    margin-left: auto;
`;

export const rankSection = css`
    padding: 20px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
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
`;

export const rankLike = css`
    color: ${colors.subtext};
    font-size: 12px;
`;
