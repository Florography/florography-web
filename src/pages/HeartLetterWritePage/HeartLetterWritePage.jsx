import { useState } from "react";
import * as s from "./styles";

function HeartLetterWritePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [paperType, setPaperType] = useState(0);
  const [toast, setToast] = useState("");

  const papers = [
    { name: "편지지", bg: "#FBFAF3", line: "rgba(160,150,110,.30)" },
    { name: "연두", bg: "#F4F8EC", line: "rgba(120,160,100,.28)" },
    { name: "크림", bg: "#FBF5EC", line: "rgba(190,150,110,.28)" },
    { name: "하늘", bg: "#F1F6F8", line: "rgba(120,150,170,.28)" },
  ];

  const currentPaper = papers[paperType];

  const navItems = [
    { label: "홈", href: "/", active: false },
    { label: "속마음 편지", href: "/heartletter", active: true },
    { label: "공유 게시판", href: "/share", active: false },
    { label: "꽃 도감", href: "/directory", active: false },
    { label: "정원", href: "/garden", active: false },
  ];

  const menuItems = [
    { icon: "🏡", label: "홈", desc: "나의 정원 한눈에 보기" },
    { icon: "🌱", label: "씨앗심기", desc: "오늘의 한 문장 기록" },
    { icon: "💌", label: "꽃에게 전하는 속마음", desc: "대상에게 쓰는 감정 편지" },
    { icon: "🌼", label: "주간 꽃 컬렉션", desc: "매주 피어나는 고유한 꽃" },
    { icon: "🪴", label: "나만의 정원", desc: "기록으로 가꾸는 공간" },
    { icon: "📈", label: "감정 리포트", desc: "월별 감정 변화 살펴보기" },
  ];

  const tools = [
    { label: "B", title: "굵게", style: { fontWeight: "700" } },
    { label: "I", title: "기울임", style: { fontStyle: "italic" } },
    { label: "U", title: "밑줄", style: { textDecoration: "underline" } },
    { label: "≣", title: "가운데 정렬" },
    { label: "≡", title: "왼쪽 정렬" },
  ];

  const colorTools = ["#3A3F36", "#588157", "#E59A91", "#C99746", "#7C8FB0"];

  const handleSubmit = () => {
    if (!title.trim()) {
      setToast("제목을 입력해주세요");
      setTimeout(() => setToast(""), 2000);
      return;
    }
    setToast("편지를 보냈어요 💌");
    setTimeout(() => setToast(""), 2000);
  };

  const lineHeight = fontSize + 24;

  return (
    <div style={s.pageContainer}>
      {/* HEADER */}
      <header style={s.header}>
        <div style={s.headerLeft}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
            style={s.menuButton}
          >
            <span style={s.menuBar}></span>
            <span style={s.menuBar}></span>
            <span style={s.menuBar}></span>
          </button>
          <div style={s.logo}>
            <span style={s.logoText}>florography</span>
            <span style={s.logoSubText}>마음을 키우는 정원</span>
          </div>
        </div>
        <button style={s.profileButton}>
          <span style={s.profileInitial}>민</span>
          <span style={s.profileName}>민서</span>
          <span style={s.profileArrow}>▾</span>
        </button>
      </header>

      {/* HAMBURGER MENU */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={s.menuOverlay}
        >
          <nav onClick={(e) => e.stopPropagation()} style={s.menuNav}>
            <div style={s.menuHeader}>
              <span style={s.menuLogoText}>florography</span>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="닫기"
                style={s.menuCloseBtn}
              >
                ✕
              </button>
            </div>
            <p style={s.menuSubText}>
              당신의 마음에 물을 주세요,<br />
              감정이 꽃피는 곳.
            </p>
            {menuItems.map((item) => (
              <a key={item.label} href="#" style={s.menuItem}>
                <span style={s.menuIcon}>{item.icon}</span>
                <span>
                  <div style={s.menuItemLabel}>{item.label}</div>
                  <div style={s.menuItemDesc}>{item.desc}</div>
                </span>
              </a>
            ))}
            <div style={s.menuFooter}>© 2026 florography</div>
          </nav>
        </div>
      )}

      {/* BODY GRID */}
      <div style={s.bodyGrid}>
        {/* LEFT RAIL */}
        <aside style={s.leftRail}>
          <a href="#" style={s.writeButton}>
            <span>✎</span> 글 쓰기
          </a>
          <nav style={s.navBox}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href} style={{
                ...s.navItem,
                ...(item.active ? s.navItemActive : {}),
              }}>
                <span style={{
                  ...s.navDot,
                  background: item.active ? "#588157" : "#A3B18A",
                }}></span>
                {item.label}
              </a>
            ))}
          </nav>
          <div style={s.waterCard}>
            <div style={s.waterLabel}>오늘의 물 주기</div>
            <div style={s.waterCount}>
              <span style={s.waterNumber}>4</span>
              <span style={s.waterUnit}>번째 기록</span>
            </div>
            <div style={s.waterDesc}>한 문장이 곧 한 번의 물 주기예요.</div>
          </div>
        </aside>

        {/* CENTER */}
        <main style={s.mainContent}>
          {/* Title Bar */}
          <div style={s.titleBar}>
            <div>
              <div style={s.titleText}>💌 마음의 편지 작성</div>
              <div style={s.titleDesc}>전하고 싶은 마음을 편지에 담아보세요.</div>
            </div>
            <div style={s.buttonGroup}>
              <button
                onClick={() => setEditMode(!editMode)}
                style={{
                  ...s.previewButton,
                  ...(editMode ? {} : s.previewButtonActive),
                }}
              >
                👁 {editMode ? "미리보기" : "편집으로"}
              </button>
              <button onClick={handleSubmit} style={s.submitButton}>
                ✍️ 작성 완료
              </button>
            </div>
          </div>

          {/* EDIT MODE */}
          {editMode && (
            <>
              {/* Recipient Input */}
              <div style={s.recipientBox}>
                <span style={s.recipientLabel}>받는 마음</span>
                <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="~에게 (예: 엄마, 어제의 나)"
                  style={s.recipientInput}
                />
                <button
                  onClick={() => setPaperType((prev) => (prev + 1) % papers.length)}
                  style={s.paperButton}
                >
                  🎨 테마 · {currentPaper.name}
                </button>
              </div>

              {/* Title Input */}
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                style={s.titleInput}
              />

              {/* Format Toolbar */}
              <div style={s.toolsBar}>
                <span style={s.toolsLabel}>서식</span>
                {tools.map((tool) => (
                  <button key={tool.label} title={tool.title} style={s.toolButton}>
                    {tool.label}
                  </button>
                ))}
                <span style={s.toolsDivider}></span>
                <span style={s.toolsLabel}>크기</span>
                <button style={s.fontButton}>−</button>
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Math.max(10, Math.min(72, parseInt(e.target.value) || 16)))}
                  style={s.fontInput}
                  min="10"
                  max="72"
                />
                <span style={s.fontUnit}>px</span>
                <button style={s.fontButton}>+</button>
                <button style={s.applyButton}>적용</button>
                <span style={s.toolsDivider}></span>
                {colorTools.map((color) => (
                  <button
                    key={color}
                    style={{
                      ...s.colorButton,
                      background: color,
                    }}
                    title="글자색"
                  ></button>
                ))}
              </div>

              {/* Letter Editor */}
              <div style={{
                ...s.letterContainer,
                backgroundColor: currentPaper.bg,
              }}>
                <div
                  contentEditable
                  style={{
                    ...s.letterBody,
                    fontSize: `${fontSize}px`,
                    lineHeight: `${lineHeight}px`,
                    backgroundImage: `repeating-linear-gradient(
                      to bottom,
                      transparent 0,
                      transparent ${lineHeight - 1}px,
                      ${currentPaper.line} ${lineHeight - 1}px,
                      ${currentPaper.line} ${lineHeight}px
                    )`,
                  }}
                  data-placeholder="이곳에 마음을 적어보세요..."
                />
              </div>
            </>
          )}

          {/* PREVIEW MODE */}
          {!editMode && (
            <div style={s.letterPreview}>
              <div
                style={{
                  ...s.letterPreviewContent,
                  backgroundColor: currentPaper.bg,
                }}
              >
                <div style={s.previewRecipient}>
                  {recipient ? `${recipient}에게` : "사랑하는 이에게"}
                </div>
                <div style={s.previewTitle}>{title || "(제목 없음)"}</div>
                <div style={s.previewBody}>전하고 싶은 내용이 여기 표시됩니다.</div>
                <div style={s.previewSignature}>— 민서 드림</div>
              </div>
            </div>
          )}

          {/* Toast */}
          {toast && (
            <div style={s.toast}>
              {toast}
            </div>
          )}
        </main>

        {/* RIGHT RAIL */}
        <aside style={s.rightRail}>
          {/* Flower Card */}
          <div style={s.flowerCard}>
            <div style={s.flowerLabel}>지난주 피운 꽃</div>
            <div style={s.flowerVisual}></div>
            <div style={s.flowerName}>감사의 꽃</div>
            <div style={s.flowerMeaning}>꽃말 · 마음을 전하다</div>
          </div>

          {/* Quote Card */}
          <div style={s.quoteCard}>
            <div style={s.quoteLabel}>지난주의 위로</div>
            <p style={s.quoteText}>
              "기록하는 감정에서,<br />성장하는 감정으로."
            </p>
          </div>

          {/* Mini Calendar */}
          <div style={s.calendarCard}>
            <div style={s.calendarHeader}>
              <button style={s.calendarNav}>◀</button>
              <span style={s.calendarMonth}>2026년 7월</span>
              <button style={s.calendarNav}>▶</button>
            </div>
            <div style={s.weekdaysRow}>
              {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                <span key={day} style={s.weekday}>
                  {day}
                </span>
              ))}
            </div>
            <div style={s.daysGrid}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <span key={day} style={s.calendarDay}>
                  {day}
                </span>
              ))}
            </div>
            <div style={s.moodLegend}>
              <span style={s.legendLabel}>감정에 따라 색 변화</span>
              <div style={s.moodColors}>
                <span style={{ ...s.moodDot, background: "#8694a3" }}></span>
                <span style={{ ...s.moodDot, background: "#94a39a" }}></span>
                <span style={{ ...s.moodDot, background: "#c4b878" }}></span>
                <span style={{ ...s.moodDot, background: "#86a866" }}></span>
                <span style={{ ...s.moodDot, background: "#588157" }}></span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default HeartLetterWritePage;
