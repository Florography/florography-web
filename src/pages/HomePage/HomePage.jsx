import { useNavigate } from "react-router";
import { useMood } from "../../hooks/queries/useMood";
import { useEffect, useState } from "react";
import { updateSeedRecord, writeSeedRecord } from "../../api/homeApi";
import { useMe } from "../../hooks/queries/useUser";
import { useSeedRecord } from "../../hooks/queries/useSeedRecord";
import { useHeartLetters } from "../../hooks/queries/useHeartLetter";
import { useQueryClient } from "@tanstack/react-query";
import * as s from "./styles";
import { MonthNames } from "../../globalData";

// 1. 프론트엔드에 기분 5단계 정의 (UI 매핑용)
const MOOD_OPTIONS = [
    { level: 1, label: "😭" },
    { level: 2, label: "🙁" },
    { level: 3, label: "😐" },
    { level: 4, label: "🙂" },
    { level: 5, label: "😆" },
];

const DEFAULT_MOODS = [
    { id: 1, mood: "많이 지침" },
    { id: 2, mood: "가라앉음" },
    { id: 3, mood: "괜찮음" },
    { id: 4, mood: "좋음" },
    { id: 5, mood: "매우 좋음" },
];

export const UNDER_NAV_ITEMS = [
    { label: "글 쓰기", href: "/write", active: false, icon: "✍️", desc: "오늘의 한 문장, 또는 꽃에게 전하는 속마음을 적어요.", bg: "#EDF7EA" },
    { label: "꽃 도감", href: "/flowers", active: false, icon: "🌼", desc: "그동안 피워낸 꽃과 꽃말을 모아봐요.", bg: "#D7E8C5" },
    { label: "정원", href: "/garden", active: false, icon: "🪴", desc: "쌓여가는 기록으로 나만의 정원을 가꿔요.", bg: "#F5C8D2" },
];

function HomePage() {
    const todayStr = new Date().toLocaleDateString("sv-SE"); // sv-SE는 "YYYY-MM-DD" 형식 보장

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const user = useMe();
    console.log(user); 
    const userId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const [date, setDate] = useState(todayStr); // 오늘 날짜를 기본값으로 설정
    const [currentPage, setCurrentPage] = useState(1); // 쓴 글 목록 페이지네이션
    const ITEMS_PER_PAGE = 7;

    const [inputSeedRecord, setInputSeedRecord] = useState({
        userId: userId,
        sentence: "",
        moodIdx: 3,
    });


    const moodQuery = useMood();
    const { data: letters, isLoading: isLetterLoading } = useHeartLetters(userId);
    const { data: seedRecords, isLoading: isSeedRecordLoading } = useSeedRecord(userId);

    const moods = moodQuery.data?.body || DEFAULT_MOODS; // 안전하게 빈 배열을 기본값으로 세팅
    const isLoading = moodQuery.isLoading;

    const allLetters = Array.isArray(letters)
        ? letters
        : (letters && Array.isArray(letters) ? letters : []);

    const filteredLetters = allLetters.filter(letter =>
        letter?.createdAt && letter.createdAt.startsWith(date)
    );

    let allSeedRecords = [];
    if (seedRecords && typeof seedRecords !== "string") {
        allSeedRecords = seedRecords.body && Array.isArray(seedRecords.body)
            ? seedRecords.body
            : (Array.isArray(seedRecords) ? seedRecords : []);
    }

    // 달력 아래 필터: 선택할 날짜의 기록을 보여줌
    const filteredSeedRecords = allSeedRecords.filter(record =>
        record?.createdDate && record.createdDate.startsWith(date)
    );

    // 달력 상단 필터: 오늘의 기록만 보여줌
    const todayRecord = allSeedRecords.find(record =>
        record?.createdDate && record.createdDate.startsWith(todayStr)
    );

    const existingRecord = filteredSeedRecords[0];

    useEffect(() => {
        // 로그인된 유저 ID가 없으면 아무것도 안 함
        if (!userId) return;

        // 선택된 날짜 오늘일 때만 자동 채우기/기본값 세팅
        if (date === todayStr) {
            if (todayRecord) {
                // 화면 나갔다 들어왔을 때 입력창 채워줌
                setInputSeedRecord(prev => {
                    if (!prev.sentence.trim()) {
                        return {
                            userId: userId,
                            sentence: todayRecord.sentence || "",
                            moodIdx: todayRecord.moodIdx ?? 3,
                        };
                    }
                    return prev;
                });
            } else {
                // 기록이 없을 땐 비어있는 세팅
                setInputSeedRecord(prev => {
                    if (!prev.sentence.trim()) {
                        return {
                            userId: userId,
                            sentence: "",
                            moodIdx: 3,
                        };
                    }
                    return prev;
                });
            }
        }
    }, [todayRecord, userId, date, todayStr]);

    const handleSaveOnClick = async () => {
        // 빈 글 방지
        if (!inputSeedRecord.sentence.trim()) {
            alert("오늘의 한 문장을 심어주세요 🌱");
            return;
        }

        //미래 날짜 차단
        if (date > todayStr) {
            alert("미래의 한마디는 미리 심을 수 없어요!");
            return
        }

        if (todayRecord) {
            //한마디 수정
            const modifyPayload = {
                userId: userId,
                sentence: inputSeedRecord.sentence,
                moodIdx: inputSeedRecord.moodIdx,
                createdDate: todayStr
            };

            try {
                console.log("수정 요청 데이터:", modifyPayload);
                await updateSeedRecord(modifyPayload);
                alert("오늘의 한마디를 수정했습니다! ✨");

                queryClient.invalidateQueries({ queryKey: ["seedRecord", userId] });
            } catch (error) {
                alert("수정에 실패했습니다.");
            }
        } else {

            //한마디 등록
            const createPayload = {
                userId: userId,
                sentence: inputSeedRecord.sentence,
                moodIdx: inputSeedRecord.moodIdx,
                createdDate: todayStr
            }

            try {
                await writeSeedRecord(createPayload);
                console.log(createPayload);
                alert("오늘의 한마디를 심었습니다! 🌱");

                queryClient.invalidateQueries({ queryKey: ["seedRecord", userId] });
            } catch (error) {
                console.log(createPayload);
                alert("등록에 실패했습니다.");
            }
        }
    }

    const dateOnChange = (e) => {
        setDate(e.target.value);
    }

    const goTo = (item) => {
        if (item.href) {
            navigate(item.href);
        }
    }

    const createOnClick = (moodId) => {
        setInputSeedRecord({
            ...inputSeedRecord,
            moodIdx: Number(moodId)
        })
    }

    return (
        <div css={s.page}>
            <div css={s.card}>
                <label css={s.cardLabel}>
                    {existingRecord ? "✏️ 오늘의 한마디를 수정하시겠어요?" : "🌱 오늘 하루는 어땠나요?"}
                </label>
                <div css={s.inputRow}>
                    <input css={s.textInput} type="text"
                        value={inputSeedRecord.sentence} // value를 제어 컴포넌트로 연결
                        onChange={(e) => setInputSeedRecord({ ...inputSeedRecord, sentence: e.target.value })}
                        placeholder="오늘의 한 문장을 심어보세요 🌱"
                    />
                    <button css={s.primaryButton} onClick={handleSaveOnClick}>
                        {existingRecord ? "수정" : "입력"}
                    </button>
                </div>
                <label css={s.cardLabel}>오늘의 대표 감정을 골라주세요 <p>( 변경할 수 없으니 신중히 선택해 주세요! )</p></label>
                {isLoading ? (
                    <div css={s.mutedText}>감정 목록을 불러오는 중...</div>
                ) : (
                    moods.length > 0 ? (
                        <div css={s.moodRow}>
                            {moods.map((mood, index) => (
                                <label css={s.moodLabel(Number(inputSeedRecord.moodIdx) === Number(mood.id))} key={mood.id}>
                                    <input
                                        type="radio"
                                        name="mood"
                                        value={mood.id}
                                        disabled={!!todayRecord}
                                        checked={Number(inputSeedRecord.moodIdx) === Number(mood.id)}
                                        onClick={() => createOnClick(mood.id)}
                                    />
                                    <div>{MOOD_OPTIONS[index]?.label || "😐"}</div>
                                    <span>{mood.mood}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div css={s.mutedText}>감정을 불러올 수 없습니다.</div>
                    )
                )}
            </div>
            <div css={s.divider}>-------------------------- 구분 선 --------------------------</div>
            <div css={s.card}>
                <div css={s.historyRow}>
                    <span css={s.historyRowTitle}>그날의 나는?</span>
                    <input
                        css={s.dateInput}
                        type="date"
                        value={date}
                        max={todayStr}
                        onChange={dateOnChange}
                    />
                </div>
                <div css={s.historyBlock}>
                    <span css={s.historyBlockTitle}>그때 남긴 한마디</span>
                    {isSeedRecordLoading ? (
                        <div css={s.mutedText}>로딩 중...</div>
                    ) : (
                        <div css={s.historyBlock}>
                            {filteredSeedRecords && filteredSeedRecords.length > 0 ? (
                                <div css={s.recordChip} key={`${filteredSeedRecords[0].id}-latest`}>
                                    <span>{filteredSeedRecords[0].sentence}</span>
                                </div>
                            ) : (
                                <div css={s.emptyText}>해당 날짜에 작성된 한마디가 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
                <div css={s.divider}>-------------------------- 구분 선 --------------------------</div>
                <div css={s.historyBlock}>
                    <span css={s.historyBlockTitle}>그때 남긴 편지</span>
                    {isLetterLoading ? (
                        <div css={s.mutedText}>로딩 중...</div>
                    ) : (
                        <div css={s.historyBlock}>
                            {filteredLetters.length > 0 ? (
                                // 제일 최신 편지를 가지고 옴
                                <div css={s.recordChip} key={`${filteredLetters[0].userId}-latest`}>
                                    <span>{filteredLetters[0].title}</span>
                                </div>
                            ) : (
                                <div css={s.emptyText}>해당 날짜에 작성된 편지가 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
                <div css={s.divider}>-------------------------- 구분 선 --------------------------</div>
                <div css={s.historyBlock}>
                    <span css={s.historyBlockTitle}>그날의 감정 분석</span>
                    {isSeedRecordLoading ? (
                        <div css={s.mutedText}>로딩 중...</div>
                    ) : (
                        <div css={s.historyBlock}>
                            {filteredSeedRecords && filteredSeedRecords.length > 0 ? (
                                <div css={s.recordChip} key={`${filteredSeedRecords[0].id}-latest-ai`}>
                                    <span>{filteredSeedRecords[0].aiComment}</span>
                                </div>
                            ) : (
                                <div css={s.emptyText}>해당 날짜에 작성된 한마디가 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div css={s.divider}>-------------------------- 구분 선 --------------------------</div>
            <div css={s.shortcutSectionTitle}>
                <span></span>
                <span>바로가기</span>
                <span></span>
            </div>
            <div css={s.shortcutGrid}>
                {UNDER_NAV_ITEMS.map((n) => (
                    <a
                        css={s.shortcutCard}
                        key={n.label}
                        onClick={() => goTo(n)}
                    >
                        <span css={s.shortcutIcon(n.bg)}>{n.icon}</span>
                        <span css={s.shortcutTitle}>{n.label}</span>
                        <span css={s.shortcutDesc}>{n.desc}</span>
                    </a>
                ))}
            </div>
            <div css={s.card}>
                <label css={s.cardLabel}>쓴 글 목록</label>
                <ul css={s.recordList}>
                    {(() => {
                        const allSeedRecordsForList = seedRecords && Array.isArray(seedRecords) ? seedRecords : [];
                        const totalPages = Math.max(1, Math.ceil(allSeedRecordsForList.length / ITEMS_PER_PAGE));
                        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
                        const currentRecords = allSeedRecordsForList.slice(startIndex, startIndex + ITEMS_PER_PAGE);

                        return (
                            <>
                                {currentRecords.length > 0 ? (
                                    currentRecords.map((seedrecord, index) => {
                                        const matchedMood = moods.find(m => Number(m.id) === Number(seedrecord.moodIdx));
                                        const month = seedrecord.createdDate.substring(5, 7);
                                        const day = seedrecord.createdDate.substring(8, 10);

                                        return (
                                            <li css={s.recordListItem} key={`${seedrecord.userId}-${index}`}>
                                                <div css={s.dateLabel}>
                                                    <header>{day}</header>
                                                    <span>{MonthNames[parseInt(month) - 1]}</span>
                                                </div>
                                                <span>({matchedMood ? matchedMood.mood : seedrecord.moodIdx})</span>
                                                <span css={s.sentence}>{seedrecord.sentence}</span>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <li css={s.emptyText}>작성하신 한마디가 없습니다.</li>
                                )}
                                
                                {allSeedRecordsForList.length > ITEMS_PER_PAGE && (
                                    <div css={s.paginationRow}>
                                        <button 
                                            css={s.pageButton} 
                                            disabled={currentPage === 1}
                                            onClick={() => setCurrentPage(p => p - 1)}
                                        >
                                            이전
                                        </button>
                                        <span css={s.pageIndicator}>{currentPage} / {totalPages}</span>
                                        <button 
                                            css={s.pageButton} 
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(p => p + 1)}
                                        >
                                            다음
                                        </button>
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;