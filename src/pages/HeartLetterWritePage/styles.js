export const pageContainer = {
  minHeight: "100vh",
  background: "#EEF1E6",
  fontFamily: "'Pretendard', sans-serif",
  color: "#2C3A2E",
  WebkitFontSmoothing: "antialiased",
};

// ============ HEADER ============
export const header = {
  position: "sticky",
  top: 0,
  zIndex: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 32px",
  background: "rgba(238,241,230,.82)",
  backdropFilter: "saturate(140%) blur(12px)",
  borderBottom: "1px solid #DEE2D2",
};

export const headerLeft = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

export const menuButton = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "5px",
  width: "42px",
  height: "42px",
  padding: "11px",
  border: "1px solid #D3D9C5",
  borderRadius: "12px",
  background: "#F7F8F1",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export const menuBar = {
  display: "block",
  height: "2px",
  borderRadius: "2px",
  background: "#3A5A40",
};

export const logo = {
  display: "flex",
  alignItems: "baseline",
  gap: "10px",
};

export const logoText = {
  fontFamily: "'Gowun Batang', serif",
  fontWeight: 700,
  fontSize: "25px",
  letterSpacing: ".01em",
  color: "#344E41",
};

export const logoSubText = {
  fontSize: "12px",
  color: "#7C8675",
  letterSpacing: ".02em",
};

export const profileButton = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "6px 14px 6px 6px",
  border: "1px solid #D3D9C5",
  borderRadius: "999px",
  background: "#F7F8F1",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export const profileInitial = {
  display: "grid",
  placeItems: "center",
  width: "32px",
  height: "32px",
  borderRadius: "50%",
  background: "#588157",
  color: "#F4F6EE",
  fontSize: "14px",
  fontWeight: "600",
  fontFamily: "'Gowun Batang', serif",
};

export const profileName = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#34402E",
};

export const profileArrow = {
  fontSize: "10px",
  color: "#8A9480",
};

// ============ HAMBURGER MENU ============
export const menuOverlay = {
  position: "fixed",
  inset: 0,
  zIndex: 60,
  background: "rgba(44,58,46,.34)",
  backdropFilter: "blur(2px)",
  animation: "flo-fade .2s ease",
};

export const menuNav = {
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "320px",
  background: "#F4F6EE",
  borderRight: "1px solid #DDE2D0",
  boxShadow: "18px 0 50px rgba(52,78,65,.14)",
  padding: "26px 24px",
  display: "flex",
  flexDirection: "column",
  animation: "flo-fade .25s ease",
};

export const menuHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "8px",
};

export const menuLogoText = {
  fontFamily: "'Gowun Batang', serif",
  fontWeight: 700,
  fontSize: "22px",
  color: "#344E41",
};

export const menuCloseBtn = {
  width: "34px",
  height: "34px",
  border: "none",
  borderRadius: "10px",
  background: "#E7EAdc",
  color: "#3A5A40",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background 0.2s ease",
};

export const menuSubText = {
  margin: "0 0 22px",
  fontSize: "12.5px",
  lineHeight: "1.6",
  color: "#7C8675",
};

export const menuItem = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "13px 14px",
  borderRadius: "12px",
  textDecoration: "none",
  color: "#34402E",
  transition: "background 0.2s ease",
};

export const menuIcon = {
  display: "grid",
  placeItems: "center",
  width: "30px",
  height: "30px",
  borderRadius: "9px",
  background: "#E2E7D6",
  fontSize: "14px",
};

export const menuItemLabel = {
  fontSize: "14.5px",
  fontWeight: "600",
};

export const menuItemDesc = {
  fontSize: "11.5px",
  color: "#8A9480",
};

export const menuFooter = {
  marginTop: "auto",
  paddingTop: "18px",
  borderTop: "1px solid #E0E4D4",
  fontSize: "11.5px",
  color: "#9aa394",
};

// ============ BODY GRID ============
export const bodyGrid = {
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "30px 32px 64px",
  display: "grid",
  gridTemplateColumns: "212px minmax(0,1fr) 196px",
  gap: "30px",
  alignItems: "start",
};

// ============ LEFT RAIL ============
export const leftRail = {
  position: "sticky",
  top: "96px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

export const writeButton = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "9px",
  padding: "15px",
  border: "none",
  borderRadius: "16px",
  background: "#3A5A40",
  color: "#F4F6EE",
  fontSize: "15px",
  fontWeight: "600",
  fontFamily: "'Pretendard', sans-serif",
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(58,90,64,.22)",
  textDecoration: "none",
  transition: "background 0.2s ease",
};

export const navBox = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  padding: "10px",
  background: "#F6F8F0",
  border: "1px solid #E1E5D6",
  borderRadius: "16px",
};

export const navItem = {
  display: "flex",
  alignItems: "center",
  gap: "11px",
  padding: "10px 12px",
  borderRadius: "11px",
  textDecoration: "none",
  color: "#46503E",
  fontSize: "13.5px",
  fontWeight: "500",
  background: "transparent",
  transition: "all 0.2s ease",
};

export const navItemActive = {
  color: "#2C3A2E",
  fontWeight: "700",
  background: "#E4EBD3",
};

export const navDot = {
  width: "7px",
  height: "7px",
  borderRadius: "50%",
};

export const waterCard = {
  padding: "16px",
  background: "linear-gradient(160deg,#DDE7CF,#E9EEDD)",
  border: "1px solid #D6DEC4",
  borderRadius: "16px",
};

export const waterLabel = {
  fontSize: "11px",
  letterSpacing: ".08em",
  color: "#6E7A62",
  fontWeight: "600",
};

export const waterCount = {
  display: "flex",
  alignItems: "baseline",
  gap: "6px",
  marginTop: "6px",
};

export const waterNumber = {
  fontFamily: "'Gowun Batang', serif",
  fontSize: "30px",
  fontWeight: "700",
  color: "#3A5A40",
};

export const waterUnit = {
  fontSize: "12px",
  color: "#7C8675",
};

export const waterDesc = {
  marginTop: "9px",
  fontSize: "11.5px",
  lineHeight: "1.5",
  color: "#76806A",
};

// ============ CENTER MAIN ============
export const mainContent = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

export const titleBar = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: "14px",
  borderBottom: "1px solid #D8DEC9",
};

export const titleText = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  fontFamily: "'Gowun Batang', serif",
  fontSize: "22px",
  fontWeight: "700",
  color: "#344E41",
};

export const titleDesc = {
  fontSize: "12.5px",
  color: "#7C8675",
  marginTop: "4px",
};

export const buttonGroup = {
  display: "flex",
  gap: "8px",
};

export const previewButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  padding: "9px 16px",
  border: "1px solid #DDE3CF",
  borderRadius: "11px",
  background: "#F7F9F1",
  fontSize: "13px",
  fontWeight: "600",
  color: "#4A5440",
  cursor: "pointer",
  fontFamily: "'Pretendard', sans-serif",
  transition: "all 0.2s ease",
};

export const previewButtonActive = {
  background: "#E4EBD3",
  color: "#2C3A2E",
};

export const submitButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: "7px",
  padding: "9px 20px",
  border: "none",
  borderRadius: "11px",
  background: "#3A5A40",
  color: "#F4F6EE",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  fontFamily: "'Pretendard', sans-serif",
  transition: "background 0.2s ease",
};

// ============ EDIT MODE ============
export const recipientBox = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  width: "100%",
  padding: "12px 18px",
  border: "1px solid #E5E8DA",
  borderRadius: "16px",
  background: "#fff",
  boxShadow: "0 2px 12px rgba(58,90,64,.04)",
};

export const recipientLabel = {
  fontFamily: "'Gowun Batang', serif",
  fontSize: "15px",
  color: "#7C8675",
  whiteSpace: "nowrap",
};

export const recipientInput = {
  flex: 1,
  minWidth: 0,
  padding: "9px 12px",
  border: "1px solid #E5E8DA",
  borderRadius: "10px",
  background: "#FBFCF7",
  fontSize: "14px",
  fontFamily: "'Gowun Batang', serif",
  color: "#2C3A2E",
  outline: "none",
  transition: "border-color 0.2s ease",
};

export const paperButton = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 14px",
  border: "1px solid #DDE3CF",
  borderRadius: "10px",
  background: "#F7F9F1",
  fontSize: "12.5px",
  fontWeight: "600",
  color: "#4A5440",
  cursor: "pointer",
  whiteSpace: "nowrap",
  fontFamily: "'Pretendard', sans-serif",
  transition: "all 0.2s ease",
};

export const titleInput = {
  width: "100%",
  padding: "16px 20px",
  border: "1px solid #E5E8DA",
  borderRadius: "16px",
  background: "#fff",
  fontSize: "17px",
  fontFamily: "'Gowun Batang', serif",
  color: "#2C3A2E",
  outline: "none",
  boxShadow: "0 2px 12px rgba(58,90,64,.04)",
  transition: "border-color 0.2s ease",
};

export const toolsBar = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  flexWrap: "wrap",
  padding: "10px 14px",
  background: "#fff",
  border: "1px solid #E5E8DA",
  borderRadius: "16px",
  boxShadow: "0 2px 12px rgba(58,90,64,.04)",
};

export const toolsLabel = {
  fontSize: "11px",
  color: "#9aa394",
  marginRight: "4px",
};

export const toolButton = {
  minWidth: "34px",
  height: "34px",
  padding: "0 9px",
  border: "1px solid #E2E6D6",
  borderRadius: "9px",
  background: "#F8FAF3",
  color: "#3A5A40",
  fontSize: "14px",
  fontWeight: "400",
  cursor: "pointer",
  fontFamily: "'Gowun Batang', serif",
  transition: "all 0.2s ease",
};

export const toolsDivider = {
  width: "1px",
  height: "22px",
  background: "#E5E9DA",
  margin: "0 4px",
};

export const fontButton = {
  width: "30px",
  height: "34px",
  border: "1px solid #E2E6D6",
  borderRadius: "9px",
  background: "#F8FAF3",
  color: "#3A5A40",
  fontSize: "16px",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

export const fontInput = {
  width: "46px",
  height: "34px",
  textAlign: "center",
  border: "1px solid #E2E6D6",
  borderRadius: "9px",
  background: "#fff",
  fontSize: "13px",
  fontFamily: "'Pretendard', sans-serif",
  color: "#2C3A2E",
  outline: "none",
  transition: "border-color 0.2s ease",
};

export const fontUnit = {
  fontSize: "11px",
  color: "#9aa394",
};

export const applyButton = {
  height: "34px",
  padding: "0 12px",
  border: "1px solid #BCD0A2",
  borderRadius: "9px",
  background: "#EFF4E3",
  color: "#3A5A40",
  fontSize: "12.5px",
  fontWeight: "600",
  cursor: "pointer",
  fontFamily: "'Pretendard', sans-serif",
  transition: "all 0.2s ease",
};

export const colorButton = {
  width: "24px",
  height: "24px",
  border: "2px solid #fff",
  outline: "1px solid #E2E6D6",
  borderRadius: "50%",
  cursor: "pointer",
  transition: "transform 0.2s ease",
};

export const letterContainer = {
  border: "1px solid #E5E8DA",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 2px 16px rgba(58,90,64,.05)",
};

export const letterBody = {
  minHeight: "380px",
  padding: "30px 36px",
  fontFamily: "'Gowun Batang', serif",
  color: "#3A3F36",
  lineHeight: "40px",
  outline: "none",
  backgroundAttachment: "local",
};

// ============ PREVIEW MODE ============
export const letterPreview = {
  border: "1px solid #E5E8DA",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow: "0 6px 28px rgba(58,90,64,.1)",
};

export const letterPreviewContent = {
  padding: "42px 48px",
  minHeight: "420px",
  backgroundAttachment: "local",
};

export const previewRecipient = {
  fontFamily: "'Gowun Batang', serif",
  fontSize: "14px",
  color: "#7C8675",
  lineHeight: "40px",
};

export const previewTitle = {
  fontFamily: "'Gowun Batang', serif",
  fontSize: "22px",
  fontWeight: "700",
  color: "#2C3A2E",
  lineHeight: "40px",
  marginBottom: "8px",
};

export const previewBody = {
  fontFamily: "'Gowun Batang', serif",
  fontSize: "16px",
  color: "#3A3F36",
  lineHeight: "40px",
};

export const previewSignature = {
  textAlign: "right",
  fontFamily: "'Gowun Batang', serif",
  fontSize: "14px",
  color: "#7C8675",
  lineHeight: "40px",
  marginTop: "24px",
};

// ============ TOAST ============
export const toast = {
  alignSelf: "center",
  padding: "10px 20px",
  background: "rgba(44,58,46,.88)",
  color: "#F4F6EE",
  fontSize: "13px",
  borderRadius: "999px",
  animation: "flo-fade .2s ease",
  marginTop: "16px",
};

// ============ RIGHT RAIL ============
export const rightRail = {
  position: "sticky",
  top: "96px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

export const flowerCard = {
  padding: "18px",
  background: "#FFFFFF",
  border: "1px solid #E5E8DA",
  borderRadius: "18px",
  boxShadow: "0 2px 14px rgba(58,90,64,.05)",
  textAlign: "center",
};

export const flowerLabel = {
  fontSize: "11px",
  letterSpacing: ".08em",
  color: "#7C8675",
  fontWeight: "600",
};

export const flowerVisual = {
  position: "relative",
  height: "78px",
  margin: "10px auto 6px",
  width: "78px",
};

export const flowerName = {
  fontFamily: "'Gowun Batang', serif",
  fontWeight: "700",
  fontSize: "16px",
  color: "#3A5A40",
};

export const flowerMeaning = {
  textAlign: "center",
  fontSize: "11.5px",
  color: "#8A9480",
  marginTop: "2px",
};

export const quoteCard = {
  padding: "18px",
  background: "linear-gradient(165deg,#E6EFD6,#DCE7C8)",
  border: "1px solid #D2DCBE",
  borderRadius: "18px",
};

export const quoteLabel = {
  fontSize: "11px",
  letterSpacing: ".06em",
  color: "#6E7A62",
  fontWeight: "600",
  marginBottom: "8px",
};

export const quoteText = {
  margin: 0,
  fontFamily: "'Gowun Batang', serif",
  fontSize: "14px",
  lineHeight: "1.7",
  color: "#3F4D38",
};

export const calendarCard = {
  padding: "16px",
  background: "#FFFFFF",
  border: "1px solid #E5E8DA",
  borderRadius: "18px",
  boxShadow: "0 2px 14px rgba(58,90,64,.05)",
};

export const calendarHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "12px",
};

export const calendarNav = {
  display: "grid",
  placeItems: "center",
  width: "26px",
  height: "26px",
  border: "none",
  borderRadius: "8px",
  background: "#EDF1E3",
  color: "#3A5A40",
  cursor: "pointer",
  fontSize: "11px",
  transition: "background 0.2s ease",
};

export const calendarMonth = {
  fontFamily: "'Gowun Batang', serif",
  fontSize: "15px",
  fontWeight: "700",
  color: "#3A5A40",
};

export const weekdaysRow = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "3px",
  marginBottom: "5px",
};

export const weekday = {
  textAlign: "center",
  fontSize: "9.5px",
  color: "#A6AE98",
};

export const daysGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "3px",
};

export const calendarDay = {
  display: "grid",
  placeItems: "center",
  height: "22px",
  borderRadius: "6px",
  fontSize: "10.5px",
  color: "#9aa394",
  fontWeight: "400",
};

export const moodLegend = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "12px",
  paddingTop: "10px",
  borderTop: "1px solid #EEF1E6",
};

export const legendLabel = {
  fontSize: "10px",
  color: "#9aa394",
};

export const moodColors = {
  display: "flex",
  gap: "3px",
  marginLeft: "auto",
};

export const moodDot = {
  width: "11px",
  height: "11px",
  borderRadius: "3px",
};
