import { css, keyframes } from "@emotion/react";
import { colors, font, radius, shadow, transition } from "../../styles/theme";

export const page = css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-bottom: 60px;
`;

export const headerBlock = css`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const headerTitle = css`
    font-family: ${font.serif};
    font-size: 22px;
    font-weight: 700;
    color: ${colors.text};
`;

export const headerDesc = css`
    font-size: 13px;
    color: ${colors.subtext};
`;

export const editSection = css`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 22px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
`;

export const editSectionTitle = css`
    font-size: 15px;
    font-weight: 700;
    color: ${colors.text};
`;

export const editRow = css`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const editLabel = css`
    font-size: 12.5px;
    color: ${colors.subtext};
`;

export const editInputRow = css`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const editInput = css`
    flex: 1;
    height: 44px;
    padding: 0 14px;
    border-radius: ${radius.input};
    border: 1px solid ${colors.border};
    background: ${colors.background};
    font-size: 14px;
    color: ${colors.text};

    &:focus {
        outline: none;
        border-color: ${colors.primary};
    }
`;

export const charCount = css`
    font-size: 12px;
    color: ${colors.subtext};
    white-space: nowrap;
`;

export const editNote = css`
    font-size: 12px;
    color: ${colors.subtext};
`;

export const editActions = css`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`;

export const cancelButton = css`
    padding: 10px 18px;
    border-radius: ${radius.button};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 13px;
    color: ${colors.text};
    cursor: pointer;
`;

export const saveButton = css`
    padding: 10px 20px;
    border-radius: ${radius.button};
    border: none;
    background: ${colors.primary};
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }
`;

export const profileCard = css`
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
    flex-wrap: wrap;
`;

export const profileAvatar = css`
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: ${colors.primary};
    color: #fff;
    font-family: ${font.serif};
    font-size: 24px;
    font-weight: 700;
    flex-shrink: 0;
`;

export const profileInfo = css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
    min-width: 180px;
`;

export const profileName = css`
    font-size: 17px;
    font-weight: 700;
    color: ${colors.text};
`;

export const profileEmail = css`
    font-size: 13px;
    color: ${colors.subtext};
`;

export const profileStats = css`
    display: flex;
    gap: 18px;
    margin-top: 4px;
`;

export const statItem = css`
    display: flex;
    align-items: baseline;
    gap: 4px;
`;

export const statNumber = css`
    font-size: 15px;
    font-weight: 700;
    color: ${colors.primary};
`;

export const statLabel = css`
    font-size: 11.5px;
    color: ${colors.subtext};
`;

export const editProfileButton = css`
    padding: 10px 18px;
    border-radius: ${radius.button};
    border: 1px solid ${colors.border};
    background: ${colors.background};
    font-size: 13px;
    font-weight: 600;
    color: ${colors.text};
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.hover};
    }
`;

export const section = css`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 22px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    box-shadow: ${shadow.soft};
`;

export const sectionTitle = css`
    font-size: 15px;
    font-weight: 700;
    color: ${colors.text};
`;

export const sectionDesc = css`
    font-size: 12.5px;
    color: ${colors.subtext};
    margin-top: -8px;
`;

export const providerList = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const providerRow = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: ${colors.background};
    border: 1px solid ${colors.border};
    border-radius: ${radius.sm};
`;

export const providerGlyph = (bg, color) => css`
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${bg};
    color: ${color};
    font-weight: 700;
    font-size: 13px;
    flex-shrink: 0;
`;

export const providerInfo = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
`;

export const providerLabel = css`
    font-size: 13.5px;
    font-weight: 600;
    color: ${colors.text};
`;

export const providerSub = css`
    font-size: 12px;
    color: ${colors.subtext};
`;

export const providerActions = css`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const connectedBadge = css`
    font-size: 11.5px;
    color: ${colors.primary};
    font-weight: 600;
`;

export const unlinkButton = css`
    padding: 7px 14px;
    border-radius: ${radius.sm};
    border: 1px solid ${colors.border};
    background: ${colors.surface};
    font-size: 12px;
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

export const linkButton = css`
    padding: 7px 16px;
    border-radius: ${radius.sm};
    border: none;
    background: ${colors.primary};
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background ${transition};

    &:hover {
        background: ${colors.primaryHover};
    }
`;

export const recordsList = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const recordRow = css`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background: ${colors.background};
    border-radius: ${radius.sm};
    font-size: 13.5px;
    color: ${colors.text};
`;

export const recordIcon = css`
    font-size: 16px;
`;

export const recordText = css`
    flex: 1;
    min-width: 0;
`;

export const moodBadge = (bg) => css`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: ${radius.pill};
    background: ${bg || colors.hover};
    font-size: 11.5px;
    color: ${colors.text};
`;

export const moodDot = (dot) => css`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${dot || colors.primary};
`;

export const recordDate = css`
    font-size: 12px;
    color: ${colors.subtext};
`;

export const dangerSection = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 20px 22px;
    background: ${colors.surface};
    border: 1px solid ${colors.border};
    border-radius: ${radius.card};
    flex-wrap: wrap;
`;

export const dangerTitle = css`
    font-size: 14px;
    font-weight: 700;
    color: ${colors.danger};
`;

export const dangerDesc = css`
    font-size: 12px;
    color: ${colors.subtext};
    margin-top: 4px;
`;

export const dangerButton = css`
    padding: 9px 16px;
    border-radius: ${radius.button};
    border: 1px solid ${colors.danger};
    background: #fff;
    color: ${colors.danger};
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: #fbeaea;
    }
`;

const toastIn = keyframes`
    from { opacity: 0; transform: translate(-50%, 8px); }
    to { opacity: 1; transform: translate(-50%, 0); }
`;

export const toast = (type) => css`
    position: fixed;
    left: 50%;
    bottom: 32px;
    transform: translateX(-50%);
    padding: 12px 22px;
    background: ${type === "error" ? colors.danger : colors.text};
    color: #fff;
    font-size: 13px;
    border-radius: ${radius.pill};
    animation: ${toastIn} 0.2s ease;
    z-index: 70;
`;
