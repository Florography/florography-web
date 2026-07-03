import { css, keyframes } from "@emotion/react";

export const COLORS = {
    primary: "#4A6B53",
    primaryLight: "#EBF1ED",
    accent: "#D4A373",
    textDark: "#2F3E46",
    textLight: "#6B7A74",
    bg: "#FAFAF7",
    card: "#FFFFFF",
};

export const float = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
`;

export const pageStyle = css`
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
        Roboto, sans-serif;
    background-color: ${COLORS.bg};
    color: ${COLORS.textDark};
    line-height: 1.6;
    min-height: 100vh;
`;

export const headerStyle = css`
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 100;
`;

export const logoStyle = css`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${COLORS.primary};
    letter-spacing: 1px;
`;

export const navStyle = css`
    a {
        text-decoration: none;
        color: ${COLORS.textDark};
        margin-left: 1.5rem;
        font-weight: 500;
        font-size: 0.95rem;
        transition: color 0.3s;

        &:hover {
            color: ${COLORS.primary};
        }
    }
`;

export const heroStyle = css`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background: linear-gradient(
        180deg,
        rgba(235, 241, 237, 0.4) 0%,
        rgba(250, 250, 247, 1) 100%
    );
    position: relative;
`;

export const heroTagline = css`
    font-size: 1.2rem;
    color: ${COLORS.accent};
    font-weight: 600;
    margin-bottom: 1rem;
    letter-spacing: 2px;
`;

export const heroTitle = css`
    font-size: 3rem;
    font-weight: 800;
    color: ${COLORS.primary};
    line-height: 1.3;
    margin-bottom: 1.5rem;

    @media (max-width: 768px) {
        font-size: 2.2rem;
    }
`;

export const heroDesc = css`
    font-size: 1.1rem;
    color: ${COLORS.textLight};
    max-width: 600px;
    margin-bottom: 2.5rem;
`;

export const btnStyle = css`
    display: inline-block;
    padding: 0.9rem 2rem;
    background-color: ${COLORS.primary};
    color: white;
    border: none;
    text-decoration: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(74, 107, 83, 0.2);
    transition: transform 0.3s, background-color 0.3s;

    &:hover {
        background-color: #39533f;
        transform: translateY(-2px);
    }
`;

export const containerStyle = css`
    max-width: 1100px;
    margin: 0 auto;
    padding: 5rem 2rem;
`;

export const sectionTitle = css`
    text-align: center;
    font-size: 2rem;
    color: ${COLORS.primary};
    margin-bottom: 3rem;
    position: relative;

    &::after {
        content: "";
        display: block;
        width: 40px;
        height: 3px;
        background-color: ${COLORS.accent};
        margin: 0.7rem auto 0;
        border-radius: 2px;
    }
`;

export const featuresGrid = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
`;

export const featureCard = css`
    background-color: ${COLORS.card};
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
    border: 1px solid rgba(0, 0, 0, 0.02);
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const featureIcon = css`
    font-size: 2rem;
    margin-bottom: 1rem;
    display: inline-block;
`;

export const featureTitle = css`
    font-size: 1.15rem;
    color: ${COLORS.primary};
    margin-bottom: 0.5rem;
`;

export const featureDesc = css`
    font-size: 0.9rem;
    color: ${COLORS.textLight};
`;

export const playground = css`
    background-color: ${COLORS.card};
    border-radius: 24px;
    padding: 3rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 2rem 1.5rem;
    }
`;

export const inputBoxTitle = css`
    font-size: 1.3rem;
    margin-bottom: 1rem;
    color: ${COLORS.primary};
`;

export const inputBoxDesc = css`
    font-size: 0.95rem;
    color: ${COLORS.textLight};
    margin-bottom: 1.5rem;
`;

export const tabsStyle = css`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const tabBtn = (active) => css`
    padding: 0.5rem 1rem;
    border: 1px solid ${active ? COLORS.primary : "#E0E0E0"};
    background: ${active ? COLORS.primaryLight : "none"};
    color: ${active ? COLORS.primary : COLORS.textLight};
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: ${active ? 600 : 400};
    transition: all 0.3s;
`;

export const textareaStyle = css`
    width: 100%;
    height: 120px;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1rem;
    resize: none;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    background-color: #fafafa;
    font-family: inherit;

    &:focus {
        outline: none;
        border-color: ${COLORS.primary};
        background-color: #fff;
    }
`;

export const submitBtn = css`
    width: 100%;
    padding: 0.8rem;
    background-color: ${COLORS.textDark};
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.95rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${COLORS.primary};
    }
`;

export const gardenDisplay = css`
    background-color: ${COLORS.primaryLight};
    border-radius: 16px;
    height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    border: 2px dashed rgba(74, 107, 83, 0.2);
`;

export const potContainer = css`
    text-align: center;
`;

export const plantIconStyle = css`
    font-size: 5rem;
    display: block;
    margin-bottom: 1rem;
    animation: ${float} 3s ease-in-out infinite;
`;

export const gardenStatusStyle = css`
    font-size: 0.9rem;
    font-weight: 600;
    color: ${COLORS.primary};
    background: white;
    padding: 0.4rem 1rem;
    border-radius: 30px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

export const analysisResultStyle = css`
    position: absolute;
    bottom: 1.5rem;
    font-size: 0.85rem;
    color: ${COLORS.textLight};
    text-align: center;
    width: 100%;
    padding: 0 1rem;
`;

export const footerStyle = css`
    background-color: ${COLORS.primary};
    color: white;
    text-align: center;
    padding: 4rem 2rem;
    margin-top: 5rem;
`;

export const footerPhrase = css`
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 3px;
    margin-bottom: 1.5rem;
`;

export const footerCopyright = css`
    font-size: 0.85rem;
    opacity: 0.7;
`;