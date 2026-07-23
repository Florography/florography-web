import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router";
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
import { useMe } from "../../hooks/queries/useUser";
import { useSeedRecord } from "../../hooks/queries/useSeedRecord";
import { linkAccountRequest, unlinkAccountRequest } from "../../api/useApi";
import * as s from "./styles";

const API_BASE = "http://localhost:8080";

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

    // 연동 계정 (TanStack Query)
    const meQuery = useMe();
    const linkedAccounts = meQuery.data?.body?.linkedAccounts || [];
    const loading = meQuery.isLoading;

    const [toast, setToast] = useState(null);
    const [toastExiting, setToastExiting] = useState(false);

    // 내가 쓴 한마디's
    console.log({ userId: meQuery.data?.body?.linkedAccounts[0]?.uid });
    const seedRecords = useSeedRecord({ userId: meQuery.data?.body?.linkedAccounts[0]?.uid });
    console.log(seedRecords?.data?.body);

    // 헤더 / 드로어
    const [menuOpen, setMenuOpen] = useState(false);

    // 프로필 (초기값은 meQuery로 동기화, 저장은 아직 API가 없어 로컬 상태만 갱신)
    const [nickname, setNickname] = useState("정원사");
    const [editOpen, setEditOpen] = useState(false);
    const [nickDraft, setNickDraft] = useState(nickname);

    const accessToken = localStorage.getItem("accessToken");

    const showToast = useCallback((type, message) => {
        setToastExiting(false);
        setToast({ type, message });
        setTimeout(() => {
            setToastExiting(true);
            setTimeout(() => setToast(null), 300);
        }, 3000);
    }, []);

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
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // meQuery 응답의 닉네임을 편집 가능한 로컬 상태로 동기화
    useEffect(() => {
        const fetchedNickname = meQuery.data?.body?.linkedAccounts?.[0]?.nickname || meQuery.data?.linkedAccounts?.[0]?.nickname;
        if (fetchedNickname) {
            setNickname(fetchedNickname);
        }
    }, [meQuery.data]);

    const handleLink = async (provider) => {
        try {
            const res = await linkAccountRequest(provider);
            window.location.assign(`${API_BASE}${res.body.linkUrl}`);
        } catch (err) {
            const msg = err.response?.data?.message || "연동 요청에 실패했습니다.";
            showToast("error", msg);
        }
    };

    const handleUnlink = async (provider) => {
        try {
            await unlinkAccountRequest(provider);
            showToast(
                "success",
                `✓ ${PROVIDERS[provider]?.label || provider} 연동이 해제되었습니다.`
            );
            meQuery.refetch();
        } catch (err) {
            const msg = err.response?.data?.message || "연동 해제에 실패했습니다.";
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

        // 라벨이 '정원'이거나 href가 '/home'인 경우 확실하게 /home 이동
        if (item.label === "홈" || item.href === "/home") {
            navigate("/home");
            return;
        }

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


    // ─── 내 기록 (목업, 정적 표시) ───
    const recordRows = seedRecords?.data?.body.map((r) => ({
        text: r.sentence,
        date: r.createdDate ? r.createdDate.slice(5).replace('-', '.') : r.createdDate,
        icon: "🌱",
        iconBg: "#EAF0DE",
        mood: r.mood.mood || "",
        moodStyle: r.mood.mood ? MOOD_STYLES[r.mood.mood] : null,
    }));

    // // ─── 내 기록 (목업, 정적 표시) ───
    // const recordRows = RECORDS.map((r) => ({
    //     text: r.text,
    //     date: r.date,
    //     icon: "🌱",
    //     iconBg: "#EAF0DE",
    //     mood: r.mood || "",
    //     moodStyle: r.mood ? MOOD_STYLES[r.mood] : null,
    // }));

    // ─── 캘린더 (목업, 정적 표시) ───
    const year = 2026;
    const month = 6;
    const railCal = (() => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDow = new Date(year, month - 1, 1).getDay();
        const cells = [];
        for (let i = 0; i < firstDow; i++) {
            cells.push({ n: "", color: "transparent", bg: "transparent", weight: 400 });
        }
        for (let d = 1; d <= daysInMonth; d++) {
            const has = Object.prototype.hasOwnProperty.call(
                BLOOM_MAP_2026_06,
                d
            );
            cells.push({
                n: d,
                color: has ? "#fff" : "#9aa394",
                bg: has ? MOOD_COLORS[BLOOM_MAP_2026_06[d]] : "transparent",
                weight: has ? 700 : 400,
            });
        }
        return cells;
    })();

    const linkedByProvider = Object.fromEntries(
        linkedAccounts.map((a) => [a.provider, a])
    );
    const email = linkedAccounts[0]?.email || "이메일 없음";

    const days = 97;
    const joinDate = "2026.03.24";

    return (
        <div css={s.page}>
                {/* 중앙 */}
                <main css={s.page}>
                    <div css={s.headerBlock}>
                        <div css={s.headerTitle}>👤 마이페이지</div>
                        <div css={s.headerDesc}>
                            프로필과 계정을 관리하고, 내가 남긴 기록을 모아
                            보세요.
                        </div>
                    </div>

                    {/* 닉네임 수정 (펼침) */}
                    {editOpen && (
                        <section css={s.editSection}>
                            <div css={s.editSectionTitle}>프로필 수정</div>
                            <div css={s.editRow}>
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
                                    <span css={s.charCount}>
                                        {nickDraft.length}/12
                                    </span>
                                </div>
                            </div>
                            <div css={s.editNote}>
                                프로필 사진은 준비 중이에요. 곧 만나요 🌱
                            </div>
                            <div css={s.editActions}>
                                <button css={s.cancelButton} onClick={cancelEdit}>
                                    취소
                                </button>
                                <button css={s.saveButton} onClick={saveNick}>
                                    저장
                                </button>
                            </div>
                        </section>
                    )}

                    {/* 프로필 카드 */}
                    <section css={s.profileCard}>
                        <div css={s.profileAvatar}>{nickname.slice(0, 1)}</div>
                        <div css={s.profileInfo}>
                            <div css={s.profileName}>{nickname}</div>
                            <div css={s.profileEmail}>✉️ {email}</div>
                            <div css={s.profileStats}>
                                <div css={s.statItem}>
                                    <span css={s.statNumber}>
                                        {RECORDS.length}
                                    </span>
                                    <span css={s.statLabel}>기록</span>
                                </div>
                                <div css={s.statItem}>
                                    <span css={s.statNumber}>
                                        {seedRecords?.data?.body.length}
                                    </span>
                                    <span css={s.statLabel}>한마디</span>
                                </div>
                                <div css={s.statItem}>
                                    <span css={s.statNumber}>8</span>
                                    <span css={s.statLabel}>꽃</span>
                                </div>
                            </div>
                        </div>
                        <button css={s.editProfileButton} onClick={openEdit}>
                            ✎ 프로필 수정
                        </button>
                    </section>

                    {/* 연동된 계정 */}
                    <section css={s.section}>
                        <div css={s.sectionTitle}>연동된 계정</div>
                        <div css={s.sectionDesc}>
                            소셜 계정으로 간편하게 로그인할 수 있어요.
                        </div>

                        {loading ? (
                            <div css={s.sectionDesc}>
                                계정 정보를 불러오는 중...
                            </div>
                        ) : (
                            <div css={s.providerList}>
                                {Object.keys(PROVIDERS).map((provider) => {
                                    const config = PROVIDERS[provider];
                                    const account = linkedByProvider[provider];
                                    const connected = Boolean(account);

                                    return (
                                        <div
                                            css={s.providerRow}
                                            key={provider}
                                        >
                                            <div
                                                css={s.providerGlyph(config.bg, config.color)}
                                            >
                                                {config.glyph}
                                            </div>
                                            <div css={s.providerInfo}>
                                                <div css={s.providerLabel}>
                                                    {config.label}
                                                </div>
                                                <div css={s.providerSub}>
                                                    {connected
                                                        ? account.email ||
                                                        "이메일 없음"
                                                        : "연결하면 더 편하게 로그인해요"}
                                                </div>
                                            </div>
                                            <div css={s.providerActions}>
                                                {connected ? (
                                                    <>
                                                        <span
                                                            css={s.connectedBadge}
                                                        >
                                                            연결됨
                                                        </span>
                                                        <button
                                                            css={s.unlinkButton}
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
                                                        css={s.linkButton}
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
                    <section css={s.section}>
                        <div>
                            <div css={s.sectionTitle}>내 기록</div>
                        </div>

                        <div css={s.recordsList}>
                            {recordRows?.map((r, i) => (
                                <div css={s.recordRow} key={`${r.date}-${i}`}>
                                    <span css={s.recordIcon}>
                                        {r.icon}
                                    </span>
                                    <span css={s.recordText}>{r.text}</span>
                                    {r.mood && (
                                        <span
                                            css={s.moodBadge(r.moodStyle?.bg)}
                                        >
                                            <span
                                                css={s.moodDot(r.moodStyle?.dot)}
                                            />
                                            <span>
                                                {r.mood}
                                            </span>
                                        </span>
                                    )}
                                    <span css={s.recordDate}>{r.date}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 회원 탈퇴 */}
                    <section css={s.dangerSection}>
                        <div>
                            <div css={s.dangerTitle}>회원 탈퇴</div>
                            <div css={s.dangerDesc}>
                                탈퇴 시 정원·기록·꽃 도감이 모두 삭제되며
                                되돌릴 수 없어요.
                            </div>
                        </div>
                        <span css={s.dangerButton}>회원 탈퇴</span>
                    </section>
                </main>

                {/* 토스트 */}
                {toast && (
                    <div css={s.toast(toast.type)}>
                        {toast.message}
                    </div>
                )}
            </div>
    );


}
export default MyPage;
