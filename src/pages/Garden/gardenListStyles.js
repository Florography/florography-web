import { css } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const page = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 60px;
`;

export const headerRow = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
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

export const createButton = css`
    padding: 11px 20px;
    border-radius: ${radius.button};
    background: ${colors.primary};
    color: #fff;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: ${shadow.soft};
    transition: background ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }
`;

export const emptyState = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 80px 20px;
    text-align: center;
    background: ${colors.surface};
    border: 1px dashed ${colors.border};
    border-radius: ${radius.card};
    color: ${colors.subtext};
    font-size: 14px;
`;

export const grid = css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

export const gardenCard = css`
    display: flex;
    flex-direction: column;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
    overflow: hidden;
    cursor: pointer;
    transition: transform ${transition}, box-shadow ${transition};

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${shadow.hover};
    }

    img {
        width: 100%;
        height: 140px;
        object-fit: cover;
    }
`;

export const gardenImgPlaceholder = css`
    display: grid;
    place-items: center;
    height: 140px;
    background: linear-gradient(160deg, ${colors.secondary}, ${colors.primarySoft});
    font-size: 32px;
`;

export const gardenCardBody = css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
`;

export const gardenCardTitle = css`
    font-size: 15px;
    font-weight: 700;
    color: ${colors.text};
`;

export const gardenCardDate = css`
    font-size: 12px;
    color: ${colors.subtext};
`;

export const modalBackdrop = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
`;

export const modalContent = css`
    background: ${colors.surface};
    border-radius: ${radius.cardLg};
    box-shadow: 0 20px 60px rgba(78, 90, 80, 0.15);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

export const modalHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px;
    border-bottom: 1px solid ${colors.border};
`;

export const modalTitle = css`
    font-family: ${font.serif};
    font-size: 20px;
    font-weight: 700;
    color: ${colors.text};
    margin: 0;
`;

export const modalCloseButton = css`
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: none;
    background: ${colors.hover};
    border-radius: ${radius.sm};
    color: ${colors.text};
    font-size: 18px;
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.secondary};
    }
`;

export const modalBody = css`
    padding: 24px;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const modalImage = css`
    width: 100%;
    height: auto;
    border-radius: ${radius.card};
    object-fit: cover;
`;

export const modalPlaceholder = css`
    display: grid;
    place-items: center;
    height: 400px;
    background: linear-gradient(160deg, ${colors.secondary}, ${colors.primarySoft});
    border-radius: ${radius.card};
    font-size: 48px;
`;

export const modalDate = css`
    font-size: 13px;
    color: ${colors.subtext};
    margin: 0;
`;

export const paginationRow = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 8px;
`;

export const pageNumbers = css`
    display: flex;
    gap: 6px;
`;

export const pageButton = css`
    min-width: 32px;
    height: 32px;
    padding: 0 8px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 12.5px;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }
`;

export const prevNextButton = css`
    padding: 8px 14px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 12.5px;
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
