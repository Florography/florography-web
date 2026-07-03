import { css, keyframes } from "@emotion/react";

export const COLORS = {
    bg: "#EEF1E6",
    card: "#FFFFFF",
    border: "#E5E8DA",
    primary: "#3A5A40",
    primaryHover: "#34503A",
    accent: "#588157",
    textDark: "#2C3A2E",
    textMid: "#46503E",
    textMuted: "#7C8675",
    textFaint: "#9AA394",
    itemBorder: "#EAEDE1",
    itemBg: "#FBFCF7",
    linkedBg: "#EAF0DE",
    linkedText: "#46603F",
    unlinkedBg: "#EEF1E6",
    unlinkedText: "#7C8675",
    danger: "#B5564A",
};

export const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
`;

export const slideIn = keyframes`
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
`;

export const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`;

export const toastIn = keyframes`
    from { opacity: 0; transform: translate(-50%, 20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
`;

export const toastOut = keyframes`
    from { opacity: 1; transform: translate(-50%, 0); }
    to { opacity: 0; transform: translate(-50%, -20px); }
`;

// ─── Page / Header ───
export const pageStyle = css`
    min-height: 100vh;
    background: ${COLORS.bg};
    font-family: "Pretendard", -apple-system, BlinkMacSystemFont, sans-serif;
    color: ${COLORS.textDark};
`;

export const headerStyle = css`
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 32px;
    background: rgba(238, 241, 230, 0.82);
    backdrop-filter: saturate(140%) blur(12px);
    border-bottom: 1px solid #dee2d2;
`;

export const headerLeft = css`
    display: flex;
    align-items: center;
    gap: 18px;
`;

export const hamburgerBtn = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 42px;
    height: 42px;
    padding: 11px;
    border: 1px solid #d3d9c5;
    border-radius: 12px;
    background: #f7f8f1;
    cursor: pointer;

    &:hover {
        background: #edefe2;
        border-color: #a3b18a;
    }

    span {
        display: block;
        height: 2px;
        border-radius: 2px;
        background: #3a5a40;
    }
`;

export const logoGroup = css`
    display: flex;
    align-items: baseline;
    gap: 10px;
`;

export const logoText = css`
    font-family: "Gowun Batang", serif;
    font-weight: 700;
    font-size: 25px;
    letter-spacing: 0.01em;
    color: #344e41;
`;

export const logoTagline = css`
    font-size: 12px;
    color: ${COLORS.textMuted};
    letter-spacing: 0.02em;
`;

export const logoutBtn = css`
    padding: 10px 18px;
    border: 1px solid #d3d9c5;
    border-radius: 999px;
    background: #f7f8f1;
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textMid};
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: #edefe2;
        border-color: #a3b18a;
    }
`;

// ─── Hamburger drawer ───
export const drawerOverlay = css`
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(44, 58, 46, 0.34);
    backdrop-filter: blur(2px);
`;

export const drawerPanel = css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 320px;
    max-width: 85vw;
    background: #f4f6ee;
    border-right: 1px solid #dde2d0;
    box-shadow: 18px 0 50px rgba(52, 78, 65, 0.14);
    padding: 26px 24px;
    display: flex;
    flex-direction: column;
`;

export const drawerHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
`;

export const drawerLogo = css`
    font-family: "Gowun Batang", serif;
    font-weight: 700;
    font-size: 22px;
    color: #344e41;
`;

export const drawerClose = css`
    width: 34px;
    height: 34px;
    border: none;
    border-radius: 10px;
    background: #e7eadc;
    color: #3a5a40;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: #dce0cf;
    }
`;

export const drawerDesc = css`
    margin: 0 0 22px;
    font-size: 12.5px;
    line-height: 1.6;
    color: #7c8675;
`;

export const drawerItem = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 14px;
    border-radius: 12px;
    text-decoration: none;
    color: #34402e;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-family: "Pretendard", sans-serif;
    cursor: pointer;

    &:hover {
        background: #e7eadc;
    }
`;

export const drawerItemIcon = css`
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: #e2e7d6;
    font-size: 14px;
    flex-shrink: 0;
`;

export const drawerItemText = css`
    display: flex;
    flex-direction: column;
`;

export const drawerItemLabel = css`
    font-size: 14.5px;
    font-weight: 600;
`;

export const drawerItemDesc = css`
    font-size: 11.5px;
    color: #8a9480;
`;

export const drawerFooter = css`
    margin-top: auto;
    padding-top: 18px;
    border-top: 1px solid #e0e4d4;
    font-size: 11.5px;
    color: #9aa394;
`;

// ─── Layout grid ───
export const bodyGrid = css`
    max-width: 1280px;
    margin: 0 auto;
    padding: 30px 32px 64px;
    display: grid;
    grid-template-columns: 212px minmax(0, 1fr) 200px;
    gap: 30px;
    align-items: start;

    @media (max-width: 1140px) {
        grid-template-columns: 188px minmax(0, 1fr);
    }
    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        padding: 22px 18px 48px;
    }
`;

export const leftRail = css`
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (max-width: 720px) {
        display: none;
    }
`;

export const rightRail = css`
    position: sticky;
    top: 96px;
    display: flex;
    flex-direction: column;
    gap: 18px;

    @media (max-width: 1140px) {
        display: none;
    }
`;

export const mainCol = css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
    animation: ${fadeIn} 0.5s ease-out;
`;

// ─── Left rail ───
export const writeBtn = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 15px;
    border: none;
    border-radius: 16px;
    background: ${COLORS.primary};
    color: #f4f6ee;
    font-size: 15px;
    font-weight: 600;
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(58, 90, 64, 0.22);

    &:hover {
        background: ${COLORS.primaryHover};
    }
`;

export const railNav = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px;
    background: #f6f8f0;
    border: 1px solid #e1e5d6;
    border-radius: 16px;
`;

export const railNavItem = (active) => css`
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 12px;
    border-radius: 11px;
    text-decoration: none;
    border: none;
    background: ${active ? "#E4EBD3" : "transparent"};
    color: ${active ? "#2C3A2E" : "#46503E"};
    font-size: 13.5px;
    font-weight: ${active ? 700 : 500};
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    width: 100%;
    text-align: left;

    &:hover {
        background: #e8ebdd;
        color: #2c3a2e;
    }
`;

export const railNavDot = (active) => css`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${active ? "#588157" : "#A3B18A"};
`;

export const streakWidget = css`
    padding: 16px;
    background: linear-gradient(160deg, #dde7cf, #e9eedd);
    border: 1px solid #d6dec4;
    border-radius: 16px;
`;

export const streakLabel = css`
    font-size: 11px;
    letter-spacing: 0.08em;
    color: #6e7a62;
    font-weight: 600;
`;

export const streakValueRow = css`
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-top: 6px;
`;

export const streakValue = css`
    font-family: "Gowun Batang", serif;
    font-size: 30px;
    font-weight: 700;
    color: ${COLORS.primary};
`;

export const streakUnit = css`
    font-size: 12px;
    color: ${COLORS.textMuted};
`;

export const streakDesc = css`
    margin-top: 9px;
    font-size: 11.5px;
    line-height: 1.5;
    color: #76806a;
`;

// ─── Page title ───
export const pageTitleRow = css`
    padding-bottom: 14px;
    border-bottom: 1px solid #d8dec9;
`;

export const pageTitle = css`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: "Gowun Batang", serif;
    font-size: 22px;
    font-weight: 700;
    color: #344e41;
`;

export const pageSubtitle = css`
    font-size: 12.5px;
    color: ${COLORS.textMuted};
    margin-top: 4px;
`;

// ─── Shared section/card ───
export const sectionStyle = css`
    padding: 22px;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 20px;
    box-shadow: 0 2px 16px rgba(58, 90, 64, 0.05);
`;

export const sectionTitle = css`
    font-size: 14px;
    font-weight: 700;
    color: ${COLORS.primary};
    margin-bottom: 4px;
`;

export const sectionDesc = css`
    font-size: 12px;
    color: ${COLORS.textFaint};
    margin-bottom: 16px;
`;

// ─── Profile card ───
export const profileCard = css`
    display: flex;
    gap: 24px;
    align-items: center;
    padding: 24px;
    background: ${COLORS.card};
    border: 1px solid ${COLORS.border};
    border-radius: 22px;
    box-shadow: 0 2px 16px rgba(58, 90, 64, 0.05);
    flex-wrap: wrap;
`;

export const avatarCircle = css`
    display: grid;
    place-items: center;
    width: 74px;
    height: 74px;
    border-radius: 50%;
    background: ${COLORS.accent};
    color: #f4f6ee;
    font-family: "Gowun Batang", serif;
    font-size: 28px;
    font-weight: 700;
    border: 3px solid #e2e7d6;
    box-shadow: 0 4px 14px rgba(58, 90, 64, 0.12);
    flex-shrink: 0;
`;

export const profileInfo = css`
    flex: 1;
    min-width: 220px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

export const profileName = css`
    font-family: "Gowun Batang", serif;
    font-size: 24px;
    font-weight: 700;
    color: ${COLORS.textDark};
`;

export const profileEmail = css`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #6e7a62;
    font-size: 13.5px;
`;

export const profileStats = css`
    display: flex;
    gap: 20px;
    margin-top: 8px;
`;

export const statItem = css`
    display: flex;
    flex-direction: column;
`;

export const statValue = css`
    font-family: "Gowun Batang", serif;
    font-size: 20px;
    font-weight: 700;
    color: ${COLORS.primary};
`;

export const statLabel = css`
    font-size: 11px;
    color: ${COLORS.textFaint};
`;

export const editProfileBtn = css`
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 10px 16px;
    border: 1px solid #dde3cf;
    border-radius: 12px;
    background: #f7f9f1;
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textMid};
    font-family: "Pretendard", sans-serif;
    cursor: pointer;

    &:hover {
        border-color: #a3b18a;
        background: #eff4e3;
    }
`;

// ─── Nickname edit form ───
export const editField = css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
`;

export const editLabel = css`
    font-size: 12px;
    color: ${COLORS.textMuted};
`;

export const editInputRow = css`
    display: flex;
    gap: 10px;
`;

export const editInput = css`
    flex: 1;
    min-width: 0;
    padding: 12px 14px;
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    background: #fbfcf7;
    font-size: 14.5px;
    font-family: "Gowun Batang", serif;
    color: ${COLORS.textDark};
    outline: none;

    &:focus {
        border-color: #a3b18a;
    }
`;

export const editCounter = css`
    display: grid;
    place-items: center;
    padding: 0 12px;
    font-size: 11.5px;
    color: ${COLORS.textFaint};
`;

export const editHint = css`
    font-size: 12px;
    color: ${COLORS.textMuted};
    margin-bottom: 14px;
`;

export const editActions = css`
    display: flex;
    gap: 8px;
    justify-content: flex-end;
`;

export const btnGhost = css`
    padding: 10px 18px;
    border: 1px solid #dde3cf;
    border-radius: 12px;
    background: #f7f9f1;
    font-size: 13px;
    font-weight: 600;
    color: #4a5440;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
        background: #eff4e3;
    }
`;

export const btnPrimary = css`
    padding: 10px 20px;
    border: none;
    border-radius: 12px;
    background: ${COLORS.primary};
    color: #f4f6ee;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
        background: ${COLORS.primaryHover};
    }
`;

// ─── Connected accounts ───
export const accountList = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const accountItem = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 13px 16px;
    border: 1px solid ${COLORS.itemBorder};
    border-radius: 14px;
    background: ${COLORS.itemBg};
    animation: ${slideIn} 0.3s ease-out;
`;

export const providerIcon = (bg, color) => css`
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: ${bg};
    color: ${color};
    font-size: 16px;
    font-weight: 800;
    font-family: "Pretendard", sans-serif;
    flex-shrink: 0;
`;

export const accountInfo = css`
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
`;

export const accountName = css`
    font-size: 14px;
    font-weight: 600;
    color: ${COLORS.textMid};
`;

export const accountDetail = css`
    font-size: 12px;
    color: ${COLORS.textFaint};
`;

export const accountRight = css`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
`;

export const stateBadge = (connected) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 13px;
    border: none;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    font-family: "Pretendard", sans-serif;
    background: ${connected ? COLORS.linkedBg : COLORS.unlinkedBg};
    color: ${connected ? COLORS.linkedText : COLORS.unlinkedText};
    cursor: ${connected ? "default" : "pointer"};
    transition: all 0.2s;

    ${!connected &&
    css`
        &:hover {
            background: #e0e7d1;
            color: ${COLORS.primary};
        }
    `}
`;

export const unlinkBtn = css`
    padding: 4px 10px;
    border: none;
    background: none;
    font-size: 11.5px;
    font-weight: 600;
    color: ${COLORS.danger};
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
        text-decoration: underline;
    }

    &:disabled {
        color: ${COLORS.textFaint};
        cursor: not-allowed;
        text-decoration: none;
    }
`;

// ─── Records / lines ───
export const recordsHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const recordsTitle = css`
    font-size: 14px;
    font-weight: 700;
    color: ${COLORS.primary};
`;

export const tabGroup = css`
    display: flex;
    gap: 4px;
    padding: 4px;
    background: #f1f4e8;
    border: 1px solid #e1e5d6;
    border-radius: 11px;
`;

export const tabBtn = (active) => css`
    padding: 7px 15px;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
    font-family: "Pretendard", sans-serif;
    cursor: pointer;
    background: ${active ? COLORS.primary : "transparent"};
    color: ${active ? "#F4F6EE" : "#5A6450"};
`;

export const recordRow = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 4px;
    border-bottom: 1px solid #eef1e6;

    &:last-of-type {
        border-bottom: none;
    }
`;

export const recordIcon = (bg) => css`
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 11px;
    background: ${bg};
    font-size: 16px;
    flex-shrink: 0;
`;

export const recordText = css`
    flex: 1;
    min-width: 0;
    font-family: "Gowun Batang", serif;
    font-size: 15px;
    color: #34402e;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const recordMood = (bg) => css`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 11px;
    border-radius: 999px;
    background: ${bg};
    flex-shrink: 0;
`;

export const recordMoodDot = (dot) => css`
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${dot};
`;

export const recordMoodLabel = css`
    font-size: 11px;
    font-weight: 600;
    color: #56604c;
`;

export const recordDate = css`
    font-size: 11.5px;
    color: ${COLORS.textFaint};
    flex-shrink: 0;
    width: 64px;
    text-align: right;
`;

export const pagination = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 18px;
`;

export const pageArrowBtn = css`
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: 1px solid #dde3cf;
    border-radius: 10px;
    background: #f7f9f1;
    color: ${COLORS.primary};
    font-size: 13px;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
        border-color: #a3b18a;
        background: #eff4e3;
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

export const pageNumBtn = (active) => css`
    min-width: 34px;
    height: 34px;
    padding: 0 8px;
    border: 1px solid ${active ? COLORS.primary : "#DDE3CF"};
    border-radius: 10px;
    background: ${active ? COLORS.primary : "#F7F9F1"};
    color: ${active ? "#F4F6EE" : "#46503E"};
    font-size: 13px;
    font-weight: ${active ? 700 : 500};
    cursor: pointer;
    font-family: "Pretendard", sans-serif;
`;

// ─── Leave account ───
export const leaveSection = css`
    padding: 18px 22px;
    background: #fbf3f1;
    border: 1px solid #ecd9d4;
    border-radius: 18px;
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
`;

export const leaveInfo = css`
    flex: 1;
    min-width: 200px;
`;

export const leaveTitle = css`
    font-size: 13.5px;
    font-weight: 700;
    color: #a85a4e;
`;

export const leaveDesc = css`
    font-size: 12px;
    color: #9c7a73;
    margin-top: 3px;
`;

export const leaveBtn = css`
    padding: 10px 18px;
    border: 1px solid #e0b5ac;
    border-radius: 12px;
    background: #fff;
    font-size: 13px;
    font-weight: 600;
    color: #b5564a;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
        background: #f7e9e6;
    }
`;

export const modalOverlay = css`
    position: fixed;
    inset: 0;
    z-index: 70;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(44, 58, 46, 0.42);
    backdrop-filter: blur(3px);
`;

export const modalCard = css`
    width: 100%;
    max-width: 420px;
    background: #fbfcf7;
    border: 1px solid #e0e6d2;
    border-radius: 22px;
    box-shadow: 0 30px 70px rgba(44, 58, 46, 0.3);
    padding: 28px;
`;

export const modalIcon = css`
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: #fbedeb;
    font-size: 24px;
    margin-bottom: 14px;
`;

export const modalTitle = css`
    font-family: "Gowun Batang", serif;
    font-size: 20px;
    font-weight: 700;
    color: ${COLORS.textDark};
`;

export const modalDesc = css`
    margin: 8px 0 18px;
    font-size: 13.5px;
    line-height: 1.65;
    color: #6e7a62;
`;

export const modalAgree = css`
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 12px 14px;
    background: #fff;
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    cursor: pointer;
    margin-bottom: 16px;
`;

export const modalAgreeText = css`
    font-size: 13px;
    color: #46503e;
`;

export const modalActions = css`
    display: flex;
    gap: 8px;
`;

export const modalCancelBtn = css`
    flex: 1;
    padding: 12px;
    border: 1px solid #dde3cf;
    border-radius: 12px;
    background: #f7f9f1;
    font-size: 14px;
    font-weight: 600;
    color: ${COLORS.primary};
    cursor: pointer;
    font-family: "Pretendard", sans-serif;

    &:hover {
        background: #eff4e3;
    }
`;

export const modalConfirmBtn = (enabled) => css`
    flex: 1;
    padding: 12px;
    border: none;
    border-radius: 12px;
    background: ${enabled ? "#B5564A" : "#D8B5AE"};
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    cursor: ${enabled ? "pointer" : "not-allowed"};
    font-family: "Pretendard", sans-serif;
`;

// ─── Right rail widgets ───
export const rightCard = css`
    padding: 18px;
    background: #ffffff;
    border: 1px solid ${COLORS.border};
    border-radius: 18px;
    box-shadow: 0 2px 14px rgba(58, 90, 64, 0.05);
`;

export const flowerCardLabel = css`
    font-size: 11px;
    letter-spacing: 0.08em;
    color: ${COLORS.textMuted};
    font-weight: 600;
`;

export const flowerStage = css`
    position: relative;
    height: 78px;
    margin: 10px auto 6px;
    width: 78px;
`;

export const flowerBloom = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
`;

export const flowerPetal = (color, rotate) => css`
    position: absolute;
    left: calc(50% - 9px);
    bottom: 50%;
    width: 18px;
    height: 30px;
    border-radius: 50%;
    background: ${color};
    transform-origin: 50% 100%;
    transform: rotate(${rotate}deg);
    opacity: 0.92;
`;

export const flowerCenter = css`
    position: absolute;
    left: 50%;
    bottom: 50%;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #f2c766;
    transform: translate(-50%, 50%);
    box-shadow: inset 0 0 0 3px #eab94e;
`;

export const flowerName = css`
    text-align: center;
    font-family: "Gowun Batang", serif;
    font-weight: 700;
    font-size: 16px;
    color: ${COLORS.primary};
`;

export const flowerMeaning = css`
    text-align: center;
    font-size: 11.5px;
    color: ${COLORS.textMuted};
    margin-top: 2px;
`;

export const quoteCard = css`
    padding: 18px;
    background: linear-gradient(165deg, #e6efd6, #dce7c8);
    border: 1px solid #d2dcbe;
    border-radius: 18px;
`;

export const quoteLabel = css`
    font-size: 11px;
    letter-spacing: 0.06em;
    color: #6e7a62;
    font-weight: 600;
    margin-bottom: 8px;
`;

export const quoteText = css`
    margin: 0;
    font-family: "Gowun Batang", serif;
    font-size: 14px;
    line-height: 1.7;
    color: #3f4d38;
`;

export const calHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const calNavBtn = css`
    display: grid;
    place-items: center;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: 8px;
    background: #edf1e3;
    color: ${COLORS.primary};
    cursor: pointer;
    font-size: 11px;

    &:hover {
        background: #e0e7d1;
    }
`;

export const calMonth = css`
    font-family: "Gowun Batang", serif;
    font-size: 15px;
    font-weight: 700;
    color: ${COLORS.primary};
`;

export const calGrid = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
`;

export const calWeekdayRow = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 3px;
    margin-bottom: 5px;
`;

export const calWeekday = css`
    text-align: center;
    font-size: 9.5px;
    color: #a6ae98;
`;

export const calDay = (color, bg, weight) => css`
    display: grid;
    place-items: center;
    height: 22px;
    border-radius: 6px;
    font-size: 10.5px;
    color: ${color};
    background: ${bg};
    font-weight: ${weight};
`;

export const calLegend = css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid #eef1e6;
`;

export const calLegendLabel = css`
    font-size: 10px;
    color: ${COLORS.textFaint};
`;

export const calLegendDots = css`
    display: flex;
    gap: 3px;
    margin-left: auto;
`;

export const calLegendDot = (color) => css`
    width: 11px;
    height: 11px;
    border-radius: 3px;
    background: ${color};
`;

// ─── Misc ───
export const emptyState = css`
    text-align: center;
    padding: 1.5rem;
    color: ${COLORS.textFaint};
    font-size: 0.85rem;
`;

export const loadingPulse = css`
    animation: ${pulse} 1.5s infinite;
`;

export const toastStyle = (type, isExiting) => css`
    position: fixed;
    left: 50%;
    bottom: 34px;
    transform: translateX(-50%);
    z-index: 80;
    padding: 11px 22px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 500;
    color: #f4f6ee;
    animation: ${isExiting ? toastOut : toastIn} 0.3s ease-out forwards;

    background: ${type === "success"
        ? "rgba(58,90,64,.92)"
        : type === "error"
        ? "rgba(181,86,74,.92)"
        : "rgba(44,58,46,.88)"};
`;
