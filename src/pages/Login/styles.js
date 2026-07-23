import { css } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const page = css`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.background};
    padding: 24px;
`;

export const card = css`
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 40px 32px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.cardLg};
    box-shadow: ${shadow.soft};
`;

export const heading = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
`;

export const brand = css`
    font-family: ${font.serif};
    font-size: 24px;
    font-weight: 700;
    color: ${colors.text};
`;

export const subtitle = css`
    font-size: 13.5px;
    color: ${colors.subtext};
`;

export const divider = css`
    text-align: center;
    font-size: 12px;
    color: ${colors.subtext};
    letter-spacing: 0.02em;
`;

const baseButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 50px;
    border-radius: ${radius.button};
    border: 1px solid ${colors.border};
    font-size: 14.5px;
    font-weight: 600;
    cursor: pointer;
    transition: transform ${transition}, box-shadow ${transition};

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        transform: translateY(-1px);
        box-shadow: ${shadow.soft};
    }

    &:active {
        transform: scale(0.99);
    }
`;

export const googleButton = css`
    ${baseButton};
    background: #ffffff;
    color: ${colors.text};
`;

export const naverButton = css`
    ${baseButton};
    background: #03c75a;
    color: #ffffff;
    border-color: #03c75a;
`;

export const kakaoButton = css`
    ${baseButton};
    background: #fee500;
    color: #191919;
    border-color: #fee500;
`;

export const devNote = css`
    text-align: center;
    font-size: 11.5px;
    color: ${colors.subtext};
    margin-top: 8px;
`;
