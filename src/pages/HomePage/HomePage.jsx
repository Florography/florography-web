/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import * as s from "./styles";
import { useMood } from "../../hooks/queries/useMood";
import { useEffect, useState } from "react";
import { updateSeedRecord, writeSeedRecord } from "../../api/homeApi";
import { useMe } from "../../hooks/queries/useUser";
import { useSeedRecord } from "../../hooks/queries/useSeedRecord";
import { useHeartLetters } from "../../hooks/queries/useHeartLetter";
import { useQueryClient } from "@tanstack/react-query";

// 1. 프론트엔드에 기분 5단계 정의 (UI 매핑용)
const MOOD_OPTIONS = [
    { level: 0, label: "😭" },
    { level: 1, label: "🙁" },
    { level: 2, label: "😐" },
    { level: 3, label: "🙂" },
    { level: 4, label: "😆" },
];

const DEFAULT_MOODS = [
    { id: 0, mood: "많이 지침" },
    { id: 1, mood: "가라앉음" },
    { id: 2, mood: "괜찮음" },
    { id: 3, mood: "좋음" },
    { id: 4, mood: "매우 좋음" },
];

export const UNDER_NAV_ITEMS = [
    { label: "글 쓰기", href: "/write", active: false },
    { label: "꽃 도감", href: "/flowers", active: false },
    { label: "정원", href: "/garden", active: false },
];

function HomePage() {
    const todayStr = new Date().toLocaleDateString("sv-SE"); // sv-SE는 "YYYY-MM-DD" 형식 보장

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const user = useMe();
    const userId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const [date, setDate] = useState(todayStr); // 오늘 날짜를 기본값으로 설정
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
                alert("오늘의 한마디를 심었습니다! 🌱");

                queryClient.invalidateQueries({ queryKey: ["seedRecord", userId] });
            } catch (error) {
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

    return (
        <div css={s.pageStyle}>
            <div>
                <label>
                    {existingRecord ? "✏️ 오늘의 한마디를 수정하시겠어요?" : "🌱 오늘 하루는 어땠나요?"}
                </label>
                <div>
                    <input type="text" 
                        value={inputSeedRecord.sentence} // value를 제어 컴포넌트로 연결
                        onChange={(e) => setInputSeedRecord({ ...inputSeedRecord, sentence: e.target.value })} 
                        placeholder="오늘의 한 문장을 심어보세요 🌱" 
                    />
                    <button onClick={handleSaveOnClick}>
                        {existingRecord ? "수정" : "입력"}
                    </button>
                </div>
            </div>
            <div>
                <label>오늘의 대표 감정을 골라주세요</label>

                {isLoading ? (
                    <div>감정 목록을 불러오는 중...</div>
                ) : (
                    moods.length > 0 ? (
                        moods.map((mood, index) => (
                            <label key={mood.id} style={{ cursor: todayRecord ? "not-allowed" : "pointer", opacity: todayRecord && Number(inputSeedRecord.moodIdx) !== Number(mood.id) ? 0.2 : 1}}>
                                <input 
                                    type="radio"
                                    name="mood"
                                    value={mood.id}
                                    disabled={!!todayRecord}
                                    checked={Number(inputSeedRecord.moodIdx) === Number(mood.id)}
                                    onChange={() => setInputSeedRecord({ 
                                        ...inputSeedRecord, 
                                        moodIdx: Number(mood.id)
                                    })} 
                                />
                                <span>{MOOD_OPTIONS[index]?.label || "😐"}</span>
                                <span>{mood.mood}</span>
                            </label>
                        ))
                    ) : (
                        <div>감정을 불러올 수 없습니다.</div>
                    )
                )}
            </div>
            <div>-------------------------- 구분 선 --------------------------</div>
            <div>
                그날의 나는?
                <input 
                    type="date" 
                    value={date} 
                    max={todayStr}
                    onChange={dateOnChange} 
                />
                <div>그때 남긴 한마디
                    {isSeedRecordLoading ? (
                        <div>로딩 중...</div>
                    ) : (
                        <div>
                            {filteredSeedRecords && filteredSeedRecords.length > 0 ? (
                                filteredSeedRecords.map((seedRecord, index) => {
                                    return (
                                        <div key={`${seedRecord.id}-${index}`}>
                                            <span>{seedRecord.sentence}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div>해당 날짜에 작성된 한마디가 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
                <div>-------------------------- 구분 선 --------------------------</div>
                <div>그때 남긴 편지
                    {isLetterLoading ? (
                        <div>로딩 중...</div>
                    ) : (
                        <div>
                            {filteredLetters.length > 0 ? (
                                // 제일 최신 편지를 가지고 옴
                                <div key={`${filteredLetters[filteredLetters.length - 1].userId}-latest`}>
                                    <span>{filteredLetters[filteredLetters.length - 1].title}</span>
                                </div>
                            ) : (
                                <div>해당 날짜에 작성된 편지가 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
                <div>-------------------------- 구분 선 --------------------------</div>
                <div>그날의 감정 분석
                    {isSeedRecordLoading ? (
                        <div>로딩 중...</div>
                    ) : (
                        <div>
                            {filteredSeedRecords && filteredSeedRecords.length > 0 ? (
                                filteredSeedRecords.map((seedRecord, index) => {
                                    return (
                                        <div key={`${seedRecord.id}-${index}`}>
                                            <span>{seedRecord.aiComment}</span>
                                        </div>
                                    );
                                })
                            ) : (
                                <div>해당 날짜에 작성된 한마디가 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div>-------------------------- 구분 선 --------------------------</div>
            <div>바로 가기 기능
                {UNDER_NAV_ITEMS.map((n) => (
                    <button
                        key={n.label}
                        onClick={() => goTo(n)}
                    >
                        {n.label}
                    </button>
                ))}
                    
            </div>
            <div>쓴 글 목록
                <ul>
                    {seedRecords && Array.isArray(seedRecords) ? (
                        seedRecords.map((seedrecord, index) => {
                            const matchedMood = moods.find(m => Number(m.id) === Number(seedrecord.moodIdx));

                            return (
                                <li key={`${seedrecord.userId}-${index}`}>
                                    <span>{seedrecord.createdDate}</span>
                                    <span>{seedrecord.sentence}</span>
                                    <span>({matchedMood ? matchedMood.mood : seedrecord.moodIdx})</span>
                                </li>
                            );
                        })
                    ) : (
                        <li>작성하신 한마디가 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;

