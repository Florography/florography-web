import { css } from "@emotion/react";
import { colors } from "./styles/theme";

export const shell = css`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: ${colors.background};
`;

export const body = css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 24px;
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
    padding: 0 32px 64px;
`;

export const main = css`
    flex: 1;
    min-width: 0;
    padding-top: 24px;
`;
