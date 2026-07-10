/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import * as s from "./styles";
import { useMood } from "../../hooks/queries/useMood";
import { useState } from "react";
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

function HomePage() {
    const user = useMe();
    const userId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 오늘 날짜를 기본값으로 설정
    const [inputSeedRecord, setInputSeedRecord] = useState({
        userId: userId,    //userId,
        sentence: "",
        moodIdx: 3,
    });

    const moodQuery = useMood();
    const letterQuery = useHeartLetters(userId);
    const seedrecordQuery = useSeedRecord(userId);

    // console.log("실제 서버 응답 데이터 전체:", seedrecordQuery.data);

    // console.log("SeedRecord 훅 호출용 userId:", userId);
    // console.log("SeedRecord 전체 응답:", seedrecordQuery);

    const { data: letters, isLoading: isLetterLoading } = useHeartLetters(userId);
    const { data: seedRecords, isLoading: isSeedRecordLoading } = useSeedRecord(userId);

    const moods = moodQuery.data?.body || DEFAULT_MOODS; // 안전하게 빈 배열을 기본값으로 세팅
    const isLoading = moodQuery.isLoading;

    // console.log("moods 확인:", moods);
    // console.log("확인 (letters 원본):", letters);
    
    const allLetters = letters || [];
    const filteredLetters = allLetters.filter(letter => 
        letter.createdAt && letter.createdAt.startsWith(date)
    );
    
    const allSeedRecords = seedrecordQuery.data || [];

    // console.log("현재 달력 날짜:", date);
    // console.log("백엔드에서 온 편지 원본:", allSeedRecords);

    const filteredSeedRecords = allSeedRecords.filter(record => 
        record.createdDate && record.createdDate.startsWith(date)
    );
    
    // console.log(user);
    // console.log(seedrecordData);
    // const [seedRecord, setSeedRecord] = useState({if(seedrecordData.data){}});

    const handleWriteOnClick = () => {
        writeSeedRecord(inputSeedRecord);
    }

    const handleSubmit = () => {
        if (!textTrim()) {
            alert("오늘의 한 문장을 심어주세요");
            return;
        }
    };
    
    const dateOnChange = (e) => {
        setDate(e.target.value);
    }

    return (
        <div css={s.pageStyle}>
            <div>
                <label>🌱 오늘 하루는 어땠나요?</label>
                <div>
                    <input type="text" onChange={(e) => setInputSeedRecord({ ...inputSeedRecord, sentence: e.target.value })} placeholder="오늘의 한 문장을 심어보세요" />
                    <button onClick={handleWriteOnClick}>입력</button>
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
            <div>
                그날의 나는?
                <input type="date" value={date} onChange={dateOnChange} />
                <div>그때 남긴 한마디
                    {isSeedRecordLoading ? (
                        <div>로딩 중...</div>
                    ) : (
                        <div>
                            {filteredSeedRecords && Array.isArray(seedRecords) ? (
                                filteredSeedRecords.map((seedRecord, index) => (
                                    <div key={`${seedRecord.id}-${index}`}>
                                        <span>{seedRecord.sentence}</span>
                                    </div>
                                ))
                            ) : (
                                <div>해당 날짜에 작성된 한마디가 없습니다.</div>
                            )}
                        </div>
                    )}
                </div>
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
                <div>그날의 감정 분석
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;