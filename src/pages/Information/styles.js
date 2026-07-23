import { css } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const page = css`
    display: flex;
    flex-direction: column;
`;

export const header = css`
    position: sticky;
    top: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    background: rgba(248, 247, 244, 0.82);
    backdrop-filter: saturate(140%) blur(12px);
    border-bottom: 1px solid ${colors.border};
`;

export const logo = css`
    font-family: ${font.serif};
    font-size: 22px;
    font-weight: 700;
    color: ${colors.text};
`;

export const nav = css`
    display: flex;
    gap: 28px;
`;

export const navLink = css`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.subtext};

    &:hover {
        color: ${colors.text};
    }
`;

export const hero = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 18px;
    padding: 120px 24px 100px;
    max-width: 720px;
    margin: 0 auto;
`;

export const heroEyebrow = css`
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: ${colors.primary};
`;

export const heroTitle = css`
    font-family: ${font.serif};
    font-size: 44px;
    font-weight: 700;
    line-height: 1.4;
    color: ${colors.text};
    text-wrap: pretty;
`;

export const heroDesc = css`
    font-size: 16px;
    line-height: 1.8;
    color: ${colors.subtext};
    max-width: 560px;
    text-wrap: pretty;
`;

export const heroCta = css`
    margin-top: 12px;
    padding: 15px 32px;
    border-radius: ${radius.button};
    background: ${colors.primary};
    color: #fff;
    font-size: 15px;
    font-weight: 600;
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

export const main = css`
    max-width: 1080px;
    width: 100%;
    margin: 0 auto;
    padding: 0 24px 120px;
    display: flex;
    flex-direction: column;
    gap: 96px;
`;

export const sectionTitle = css`
    font-family: ${font.serif};
    font-size: 28px;
    font-weight: 700;
    color: ${colors.text};
    text-align: center;
    margin-bottom: 40px;
`;

export const featuresGrid = css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`;

export const featureCard = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 28px 22px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
    transition: transform ${transition}, box-shadow ${transition};

    &:hover {
        transform: translateY(-4px);
        box-shadow: ${shadow.hover};
    }
`;

export const featureIcon = css`
    font-size: 28px;
`;

export const featureTitle = css`
    font-size: 16px;
    font-weight: 700;
    color: ${colors.text};
`;

export const featureDesc = css`
    font-size: 13.5px;
    line-height: 1.7;
    color: ${colors.subtext};
    text-wrap: pretty;
`;

export const playgroundGrid = css`
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 20px;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

export const playCard = css`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.cardLg};
    box-shadow: ${shadow.soft};
`;

export const playCardTitle = css`
    font-size: 17px;
    font-weight: 700;
    color: ${colors.text};
`;

export const playCardDesc = css`
    font-size: 13.5px;
    line-height: 1.7;
    color: ${colors.subtext};
`;

export const tabRow = css`
    display: flex;
    gap: 8px;
`;

export const tabButton = (active) => css`
    padding: 10px 16px;
    border-radius: ${radius.pill};
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition}, color ${transition};
    background: ${active ? colors.primary : colors.hover};
    color: ${active ? "#fff" : colors.text};

    &:hover {
        background: ${active ? colors.primaryHover : colors.secondary};
    }
`;

export const textarea = css`
    min-height: 110px;
    padding: 14px 16px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.background};
    font-size: 14px;
    line-height: 1.7;
    color: ${colors.text};
    resize: vertical;
    transition: border-color ${transition};

    &::placeholder {
        color: ${colors.subtext};
        opacity: 0.7;
    }

    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
`;

export const analyzeButton = css`
    padding: 13px;
    border-radius: ${radius.button};
    background: ${colors.text};
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition}, transform ${transition};

    &:hover {
        background: #3c463f;
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const resultCard = css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 28px;
    background: linear-gradient(165deg, ${colors.secondary}, ${colors.primarySoft});
    border: 1px solid ${colors.border};
    border-radius: ${radius.cardLg};
`;

export const resultStatus = css`
    display: flex;
    align-items: center;
    gap: 12px;
`;

export const resultIcon = css`
    font-size: 36px;
`;

export const resultStatusText = css`
    font-size: 15px;
    font-weight: 700;
    color: ${colors.text};
`;

export const resultText = css`
    font-size: 13.5px;
    line-height: 1.8;
    color: ${colors.text};
`;

export const footer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 40px 24px 56px;
    border-top: 1px solid ${colors.border};
    text-align: center;
`;

export const footerQuote = css`
    font-family: ${font.serif};
    font-size: 15px;
    color: ${colors.text};
`;

export const footerCopy = css`
    font-size: 12px;
    color: ${colors.subtext};
`;
