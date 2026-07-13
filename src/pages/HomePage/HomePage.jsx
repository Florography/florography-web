/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import * as s from "./styles";
import { useMood } from "../../hooks/queries/useMood";
import { useEffect, useState } from "react";
import { writeSeedRecord } from "../../api/homeApi";
import { useMe } from "../../hooks/queries/useUser";
import { useSeedRecord } from "../../hooks/queries/useSeedRecord";
import { useHeartLetters } from "../../hooks/queries/useHeartLetter";

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
    const navigate = useNavigate();

    const user = useMe();
    const userId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 오늘 날짜를 기본값으로 설정
    const [inputSeedRecord, setInputSeedRecord] = useState({
        userId: userId,    //userId,
        sentence: "",
        moodIdx: 3,
    });

    const [toast, setToast] = useState(null);

    const [menuOpen, setMenuOpen] = useState(false);

    const moodQuery = useMood();
    const letterQuery = useHeartLetters(userId);
    const seedrecordQuery = useSeedRecord(userId);

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

    const filteredSeedRecords = allSeedRecords.filter(record => 
        record?.createdDate && record.createdDate.startsWith(date)
    );

    const existingRecord = filteredSeedRecords[0];

    useEffect(() => {
        if (existingRecord) {
            setInputSeedRecord({
                userId: userId,
                sentence: existingRecord.sentence || "",
                moodIdx: existingRecord.moodIdx ?? 3,
            });
        } else {
            setInputSeedRecord({
                userId: userId,
                sentence: "",
                moodIdx: 3,
            });
        }
    }, [date, existingRecord, userId]);

    const handleSaveOnClick = async () => {
        if (!inputSeedRecord.sentence.trim()) {
            alert("오늘의 한 문장을 심어주세요 🌱");
            return;
        }

        const payload = {
            ...inputSeedRecord,
            userId: userId // 실행 시점의 최신 userId 보장
        };

        if (existingRecord) {
            try {
                await updateSeedRecord({ ...payload, id: existingRecord.id });
                alert("오늘의 한마디를 수정했습니다! ✨");
            } catch (error) {
                alert("수정에 실패했습니다.");
            }
        } else {
            try {
                await writeSeedRecord(payload);
                alert("오늘의 한마디를 심었습니다! 🌱");
            } catch (error) {
                alert("등록에 실패했습니다.");
            }
        }
    }

    // const handleWriteOnClick = () => {
    //     writeSeedRecord(inputSeedRecord);
    // }

    // const handleSubmit = () => {
    //     if (!textTrim()) {
    //         alert("오늘의 한 문장을 심어주세요");
    //         return;
    //     }
    // };
    
    const dateOnChange = (e) => {
        setDate(e.target.value);
    }

    const goTo = (item) => {
        setMenuOpen(false);

        if (item.label === "글 쓰기" || item.href === "/write") {
            navigate("/write");
            return;
        }

        if (item.label === "꽃 도감" || item.href === "/flowers") {
            navigate("/flowers");
            return;
        }

        if (item.label === "정원" || item.href === "/garden") {
            navigate("/garden");
            return;
        }

        if (item.href) {
            Navigate(item.href);
        } else {
            showToast("info", `${item.label} 기능은 준비 중이에요 🌱`);
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
                        placeholder="오늘의 한 문장을 심어보세요" 
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
                            <label key={mood.id}>
                                <input 
                                    type="radio"
                                    name="mood"
                                    value={mood.id}
                                    checked={inputSeedRecord.moodIdx === mood.id}
                                    onChange={() => setInputSeedRecord({ ...inputSeedRecord, moodIdx: mood.id})} 
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
                <input type="date" value={date} onChange={dateOnChange} />
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
                                filteredLetters.map((heartletter, index) => (
                                    <div key={`${heartletter.userId}-${index}`}>
                                        <span>{heartletter.title}</span>
                                    </div>
                                ))
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
                        seedRecords.map((seedrecord, index) => (
                            <li key={`${seedrecord.userId}-${index}`}>
                                <span>{seedrecord.createdDate}</span>
                                <span>{seedrecord.sentence}</span>
                                <span>{seedrecord.moodIdx}</span>
                            </li>
                        ))
                    ) : (
                        <li>작성하신 한마디가 없습니다.</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;