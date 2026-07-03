/** @jsxImportSource @emotion/react */
import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import * as s from "./styles";
import {
    MENU_ITEMS,
    NAV_ITEMS,
    RECORDS,
    LINES,
    MOOD_STYLES,
    MOOD_COLORS,
    WEEKDAYS,
    BLOOM_MAP_2026_06,
} from "./mockData";

const API_BASE = "http://localhost:8080";
const PER_PAGE = 5;

const PROVIDERS = {
    google: { glyph: "G", bg: "#fff", color: "#4285F4", label: "Google" },
    kakao: { glyph: "K", bg: "#FEE500", color: "#3C1E1E", label: "카카오" },
    naver: { glyph: "N", bg: "#03C75A", color: "#fff", label: "네이버" },
};

const ERROR_MESSAGES = {
    invalid_token: "연동 토큰이 만료되었습니다. 다시 시도해주세요.",
    already_linked: "이 소셜 계정은 이미 다른 사용자에게 연동되어 있습니다.",
    provider_already_linked: "이미 같은 소셜 서비스의 계정이 연동되어 있습니다.",
};

function MyPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // 연동 계정 (실제 API)
    const [linkedAccounts, setLinkedAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const [toastExiting, setToastExiting] = useState(false);

    // 헤더 / 드로어
    const [menuOpen, setMenuOpen] = useState(false);

    // 프로필 (닉네임 수정은 목업: 저장 API가 아직 없어 로컬 상태만 갱신)
    const [nickname, setNickname] = useState("정원사");
    const [editOpen, setEditOpen] = useState(false);
    const [nickDraft, setNickDraft] = useState(nickname);

    // 내 기록 (목업 데이터)
    const [tab, setTab] = useState(0);
    const [page, setPage] = useState(0);

    // 회원 탈퇴 (목업)
    const [leaveOpen, setLeaveOpen] = useState(false);
    const [leaveAgree, setLeaveAgree] = useState(false);

    // 캘린더 (목업)
    const [year, setYear] = useState(2026);
    const [month, setMonth] = useState(6);

    const accessToken = localStorage.getItem("accessToken");

    const showToast = useCallback((type, message) => {
        setToastExiting(false);
        setToast({ type, message });
        setTimeout(() => {
            setToastExiting(true);
            setTimeout(() => setToast(null), 300);
        }, 3000);
    }, []);

    const fetchLinkedAccounts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_BASE}/api/user/linked-accounts`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setLinkedAccounts(res.data.linkedAccounts || []);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem("accessToken");
                navigate("/", { replace: true });
                return;
            }
            showToast("error", "계정 정보를 불러올 수 없습니다.");
        } finally {
            setLoading(false);
        }
    }, [accessToken, navigate, showToast]);

    useEffect(() => {
        if (!accessToken) {
            navigate("/", { replace: true });
            return;
        }

        const linkResult = searchParams.get("link");
        if (linkResult === "success") {
            const provider = searchParams.get("provider");
            showToast(
                "success",
                `✓ ${PROVIDERS[provider]?.label || provider} 계정이 연동되었습니다!`
            );
            setSearchParams({}, { replace: true });
        } else if (linkResult === "error") {
            const reason = searchParams.get("reason");
            showToast("error", ERROR_MESSAGES[reason] || "연동 중 오류가 발생했습니다.");
            setSearchParams({}, { replace: true });
        }

        fetchLinkedAccounts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleLink = async (provider) => {
        try {
            const res = await axios.post(
                `${API_BASE}/api/user/link/${provider}`,
                {},
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            window.location.href = `${API_BASE}${res.data.linkUrl}`;
        } catch (err) {
            const msg = err.response?.data?.error || "연동 요청에 실패했습니다.";
            showToast("error", msg);
        }
    };

    const handleUnlink = async (provider) => {
        try {
            await axios.delete(`${API_BASE}/api/user/link/${provider}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            showToast(
                "success",
                `✓ ${PROVIDERS[provider]?.label || provider} 연동이 해제되었습니다.`
            );
            fetchLinkedAccounts();
        } catch (err) {
            const msg = err.response?.data?.error || "연동 해제에 실패했습니다.";
            showToast("error", msg);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/", { replace: true });
    };

    // ─── 드로어 / 네비게이션 ───
    const goTo = (item) => {
        setMenuOpen(false);
        if (item.href) {
            navigate(item.href);
        } else {
            showToast("info", `${item.label} 기능은 준비 중이에요 🌱`);
        }
    };

    // ─── 프로필 ───
    const openEdit = () => {
        setNickDraft(nickname);
        setEditOpen(true);
    };
    const cancelEdit = () => setEditOpen(false);
    const saveNick = () => {
        const v = nickDraft.trim();
        if (!v) {
            showToast("error", "닉네임을 입력해주세요");
            return;
        }
        setNickname(v);
        setEditOpen(false);
        showToast("success", "프로필이 저장되었어요 🌿");
    };

    // ─── 회원 탈퇴 ───
    const openLeave = () => {
        setLeaveAgree(false);
        setLeaveOpen(true);
    };
    const closeLeave = () => setLeaveOpen(false);
    const confirmLeave = () => {
        if (!leaveAgree) return;
        setLeaveOpen(false);
        showToast("info", "탈퇴 요청이 접수되었어요. (목업)");
    };

    // ─── 내 기록 ───
    const pickTab = (i) => {
        setTab(i);
        setPage(0);
    };
    const current = tab === 0 ? RECORDS : LINES;
    const totalPages = Math.max(1, Math.ceil(current.length / PER_PAGE));
    const safePage = Math.min(page, totalPages - 1);
    const rows = current
        .slice(safePage * PER_PAGE, (safePage + 1) * PER_PAGE)
        .map((r) => ({
            text: r.text,
            date: r.date,
            icon: tab === 0 ? "🌱" : "💬",
            iconBg: tab === 0 ? "#EAF0DE" : "#EFE6F2",
            mood: r.mood || "",
            moodStyle: r.mood ? MOOD_STYLES[r.mood] : null,
        }));

    // ─── 캘린더 ───
    const prevYear = () =>
        setMonth((m) => {
            if (m <= 1) {
                setYear((y) => y - 1);
                return 12;
            }
            return m - 1;
        });
    const nextYear = () =>
        setMonth((m) => {
            if (m >= 12) {
                setYear((y) => y + 1);
                return 1;
            }
            return m + 1;
        });

    const railCal = useMemo(() => {
        const isBaseMonth = year === 2026 && month === 6;
        const bloomMap = isBaseMonth ? BLOOM_MAP_2026_06 : {};
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDow = new Date(year, month - 1, 1).getDay();
        const cells = [];
        for (let i = 0; i < firstDow; i++) {
            cells.push({ n: "", color: "transparent", bg: "transparent", weight: 400 });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const has = Object.prototype.hasOwnProperty.call(bloomMap, d);
            cells.push({
                n: d,
                color: has ? "#fff" : "#9aa394",
                bg: has ? MOOD_COLORS[bloomMap[d]] : "transparent",
                weight: has ? 700 : 400,
            });
        }
        return cells;
    }, [year, month]);

    const linkedByProvider = Object.fromEntries(
        linkedAccounts.map((a) => [a.provider, a])
    );
    const email = linkedAccounts[0]?.email || "이메일 없음";
    const days = 97;
    const joinDate = "2026.03.24";

    return (
        <div css={s.pageStyle}>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
            />

            {/* 헤더 */}
            <header css={s.headerStyle}>
                <div css={s.headerLeft}>
                    <button
                        css={s.hamburgerBtn}
                        aria-label="메뉴"
                        onClick={() => setMenuOpen(true)}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div css={s.logoGroup}>
                        <span css={s.logoText}>florography</span>
                        <span css={s.logoTagline}>마음을 키우는 정원</span>
                    </div>
                </div>
                <button css={s.logoutBtn} onClick={handleLogout}>
                    로그아웃
                </button>
            </header>

            {/* 햄버거 드로어 */}
            {menuOpen && (
                <div css={s.drawerOverlay} onClick={() => setMenuOpen(false)}>
                    <nav
                        css={s.drawerPanel}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div css={s.drawerHeader}>
                            <span css={s.drawerLogo}>florography</span>
                            <button
                                css={s.drawerClose}
                                aria-label="닫기"
                                onClick={() => setMenuOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <p css={s.drawerDesc}>
                            당신의 마음에 물을 주세요,
                            <br />
                            감정이 꽃피는 곳.
                        </p>
                        {MENU_ITEMS.map((m) => (
                            <button
                                key={m.label}
                                css={s.drawerItem}
                                onClick={() => goTo(m)}
                            >
                                <span css={s.drawerItemIcon}>{m.icon}</span>
                                <span css={s.drawerItemText}>
                                    <span css={s.drawerItemLabel}>
                                        {m.label}
                                    </span>
                                    <span css={s.drawerItemDesc}>
                                        {m.desc}
                                    </span>
                                </span>
                            </button>
                        ))}
                        <div css={s.drawerFooter}>© 2026 florography</div>
                    </nav>
                </div>
            )}

            <div css={s.bodyGrid}>
                {/* 좌측 레일 */}
                <aside css={s.leftRail}>
                    <button
                        css={s.writeBtn}
                        onClick={() => goTo({ label: "글 쓰기", href: null })}
                    >
                        ✎ 글 쓰기
                    </button>
                    <nav css={s.railNav}>
                        {NAV_ITEMS.map((n) => (
                            <button
                                key={n.label}
                                css={s.railNavItem(n.active)}
                                onClick={() => goTo(n)}
                            >
                                <span css={s.railNavDot(n.active)} />
                                {n.label}
                            </button>
                        ))}
                    </nav>
                    <div css={s.streakWidget}>
                        <div css={s.streakLabel}>함께한 시간</div>
                        <div css={s.streakValueRow}>
                            <span css={s.streakValue}>{days}</span>
                            <span css={s.streakUnit}>일째</span>
                        </div>
                        <div css={s.streakDesc}>
                            {joinDate} 부터 함께 자라고 있어요.
                        </div>
                    </div>
                </aside>

                {/* 중앙 */}
                <main css={s.mainCol}>
                    <div css={s.pageTitleRow}>
                        <div css={s.pageTitle}>👤 마이페이지</div>
                        <div css={s.pageSubtitle}>
                            프로필과 계정을 관리하고, 내가 남긴 기록을 모아
                            보세요.
                        </div>
                    </div>

                    {/* 닉네임 수정 (펼침) */}
                    {editOpen && (
                        <section css={s.sectionStyle}>
                            <div css={s.sectionTitle}>프로필 수정</div>
                            <div css={s.editField}>
                                <label css={s.editLabel}>닉네임</label>
                                <div css={s.editInputRow}>
                                    <input
                                        css={s.editInput}
                                        value={nickDraft}
                                        maxLength={12}
                                        placeholder="새 닉네임"
                                        onChange={(e) =>
                                            setNickDraft(e.target.value)
                                        }
                                    />
                                    <span css={s.editCounter}>
                                        {nickDraft.length}/12
                                    </span>
                                </div>
                            </div>
                            <div css={s.editHint}>
                                프로필 사진은 준비 중이에요. 곧 만나요 🌱
                            </div>
                            <div css={s.editActions}>
                                <button css={s.btnGhost} onClick={cancelEdit}>
                                    취소
                                </button>
                                <button css={s.btnPrimary} onClick={saveNick}>
                                    저장
                                </button>
                            </div>
                        </section>
                    )}

                    {/* 프로필 카드 */}
                    <section css={s.profileCard}>
                        <div css={s.avatarCircle}>{nickname.slice(0, 1)}</div>
                        <div css={s.profileInfo}>
                            <div css={s.profileName}>{nickname}</div>
                            <div css={s.profileEmail}>✉️ {email}</div>
                            <div css={s.profileStats}>
                                <div css={s.statItem}>
                                    <span css={s.statValue}>
                                        {RECORDS.length}
                                    </span>
                                    <span css={s.statLabel}>기록</span>
                                </div>
                                <div css={s.statItem}>
                                    <span css={s.statValue}>
                                        {LINES.length}
                                    </span>
                                    <span css={s.statLabel}>한마디</span>
                                </div>
                                <div css={s.statItem}>
                                    <span css={s.statValue}>8</span>
                                    <span css={s.statLabel}>꽃</span>
                                </div>
                            </div>
                        </div>
                        <button css={s.editProfileBtn} onClick={openEdit}>
                            ✎ 프로필 수정
                        </button>
                    </section>

                    {/* 연동된 계정 */}
                    <section css={s.sectionStyle}>
                        <div css={s.sectionTitle}>연동된 계정</div>
                        <div css={s.sectionDesc}>
                            소셜 계정으로 간편하게 로그인할 수 있어요.
                        </div>

                        {loading ? (
                            <div css={[s.emptyState, s.loadingPulse]}>
                                계정 정보를 불러오는 중...
                            </div>
                        ) : (
                            <div css={s.accountList}>
                                {Object.keys(PROVIDERS).map((provider) => {
                                    const config = PROVIDERS[provider];
                                    const account = linkedByProvider[provider];
                                    const connected = Boolean(account);

                                    return (
                                        <div
                                            css={s.accountItem}
                                            key={provider}
                                        >
                                            <div
                                                css={s.providerIcon(
                                                    config.bg,
                                                    config.color
                                                )}
                                            >
                                                {config.glyph}
                                            </div>
                                            <div css={s.accountInfo}>
                                                <div css={s.accountName}>
                                                    {config.label}
                                                </div>
                                                <div css={s.accountDetail}>
                                                    {connected
                                                        ? account.email ||
                                                          "이메일 없음"
                                                        : "연결하면 더 편하게 로그인해요"}
                                                </div>
                                            </div>
                                            <div css={s.accountRight}>
                                                {connected ? (
                                                    <>
                                                        <span
                                                            css={s.stateBadge(
                                                                true
                                                            )}
                                                        >
                                                            연결됨
                                                        </span>
                                                        <button
                                                            css={s.unlinkBtn}
                                                            disabled={
                                                                linkedAccounts.length <=
                                                                1
                                                            }
                                                            title={
                                                                linkedAccounts.length <=
                                                                1
                                                                    ? "최소 1개의 계정은 연동되어야 합니다"
                                                                    : "연동 해제"
                                                            }
                                                            onClick={() =>
                                                                handleUnlink(
                                                                    provider
                                                                )
                                                            }
                                                        >
                                                            해제
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        css={s.stateBadge(
                                                            false
                                                        )}
                                                        onClick={() =>
                                                            handleLink(
                                                                provider
                                                            )
                                                        }
                                                    >
                                                        연결하기
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* 내 기록 */}
                    <section css={s.sectionStyle}>
                        <div css={s.recordsHeader}>
                            <div css={s.recordsTitle}>내 기록</div>
                            <div css={s.tabGroup}>
                                <button
                                    css={s.tabBtn(tab === 0)}
                                    onClick={() => pickTab(0)}
                                >
                                    내가 쓴 글
                                </button>
                                <button
                                    css={s.tabBtn(tab === 1)}
                                    onClick={() => pickTab(1)}
                                >
                                    한마디
                                </button>
                            </div>
                        </div>

                        <div>
                            {rows.map((r, i) => (
                                <div css={s.recordRow} key={`${r.date}-${i}`}>
                                    <span css={s.recordIcon(r.iconBg)}>
                                        {r.icon}
                                    </span>
                                    <span css={s.recordText}>{r.text}</span>
                                    {r.mood && (
                                        <span
                                            css={s.recordMood(
                                                r.moodStyle.bg
                                            )}
                                        >
                                            <span
                                                css={s.recordMoodDot(
                                                    r.moodStyle.dot
                                                )}
                                            />
                                            <span css={s.recordMoodLabel}>
                                                {r.mood}
                                            </span>
                                        </span>
                                    )}
                                    <span css={s.recordDate}>{r.date}</span>
                                </div>
                            ))}
                        </div>

                        <div css={s.pagination}>
                            <button
                                css={s.pageArrowBtn}
                                disabled={safePage === 0}
                                onClick={() =>
                                    setPage((p) => Math.max(0, p - 1))
                                }
                            >
                                ‹
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    css={s.pageNumBtn(i === safePage)}
                                    onClick={() => setPage(i)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                css={s.pageArrowBtn}
                                disabled={safePage === totalPages - 1}
                                onClick={() =>
                                    setPage((p) =>
                                        Math.min(totalPages - 1, p + 1)
                                    )
                                }
                            >
                                ›
                            </button>
                        </div>
                    </section>

                    {/* 회원 탈퇴 */}
                    <section css={s.leaveSection}>
                        <div css={s.leaveInfo}>
                            <div css={s.leaveTitle}>회원 탈퇴</div>
                            <div css={s.leaveDesc}>
                                탈퇴 시 정원·기록·꽃 도감이 모두 삭제되며
                                되돌릴 수 없어요.
                            </div>
                        </div>
                        <button css={s.leaveBtn} onClick={openLeave}>
                            회원 탈퇴
                        </button>
                    </section>
                </main>

                {/* 우측 레일 */}
                <aside css={s.rightRail}>
                    <div css={s.rightCard}>
                        <div css={s.flowerCardLabel}>지난주 피운 꽃</div>
                        <div css={s.flowerStage}>
                            <div css={s.flowerBloom}>
                                {[0, 72, 144, 216, 288].map((rotate) => (
                                    <span
                                        key={rotate}
                                        css={s.flowerPetal(
                                            "#E59A91",
                                            rotate
                                        )}
                                    />
                                ))}
                                <span css={s.flowerCenter} />
                            </div>
                        </div>
                        <div css={s.flowerName}>감사의 꽃</div>
                        <div css={s.flowerMeaning}>꽃말 · 마음을 전하다</div>
                    </div>

                    <div css={s.quoteCard}>
                        <div css={s.quoteLabel}>지난주의 위로</div>
                        <p css={s.quoteText}>
                            "기록하는 감정에서,
                            <br />
                            성장하는 감정으로."
                        </p>
                    </div>

                    <div css={s.rightCard}>
                        <div css={s.calHeader}>
                            <button css={s.calNavBtn} onClick={prevYear}>
                                ◀
                            </button>
                            <span css={s.calMonth}>
                                {year}년 {month}월
                            </span>
                            <button css={s.calNavBtn} onClick={nextYear}>
                                ▶
                            </button>
                        </div>
                        <div css={s.calWeekdayRow}>
                            {WEEKDAYS.map((w) => (
                                <span css={s.calWeekday} key={w}>
                                    {w}
                                </span>
                            ))}
                        </div>
                        <div css={s.calGrid}>
                            {railCal.map((c, i) => (
                                <span
                                    css={s.calDay(c.color, c.bg, c.weight)}
                                    key={i}
                                >
                                    {c.n}
                                </span>
                            ))}
                        </div>
                        <div css={s.calLegend}>
                            <span css={s.calLegendLabel}>
                                작성한 날 · 감정 체크
                            </span>
                            <span css={s.calLegendDots}>
                                {MOOD_COLORS.map((c) => (
                                    <span
                                        css={s.calLegendDot(c)}
                                        key={c}
                                    />
                                ))}
                            </span>
                        </div>
                    </div>
                </aside>
            </div>

            {/* 탈퇴 확인 모달 */}
            {leaveOpen && (
                <div css={s.modalOverlay} onClick={closeLeave}>
                    <div
                        css={s.modalCard}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div css={s.modalIcon}>🥀</div>
                        <div css={s.modalTitle}>정말 떠나시겠어요?</div>
                        <p css={s.modalDesc}>
                            탈퇴하면 그동안 키운 정원과 {RECORDS.length}개의
                            기록, 모아온 꽃이 모두 사라져요. 이 작업은 되돌릴
                            수 없어요.
                        </p>
                        <label css={s.modalAgree}>
                            <input
                                type="checkbox"
                                checked={leaveAgree}
                                onChange={(e) =>
                                    setLeaveAgree(e.target.checked)
                                }
                            />
                            <span css={s.modalAgreeText}>
                                위 내용을 확인했으며 탈퇴에 동의합니다.
                            </span>
                        </label>
                        <div css={s.modalActions}>
                            <button
                                css={s.modalCancelBtn}
                                onClick={closeLeave}
                            >
                                계속 함께하기
                            </button>
                            <button
                                css={s.modalConfirmBtn(leaveAgree)}
                                disabled={!leaveAgree}
                                onClick={confirmLeave}
                            >
                                탈퇴하기
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 토스트 */}
            {toast && (
                <div css={s.toastStyle(toast.type, toastExiting)}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}

export default MyPage;
