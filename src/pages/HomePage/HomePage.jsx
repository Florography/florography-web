/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import * as s from "./styles";
import { useMood } from "../../hooks/queries/useMood";
import { useState } from "react";
import { writeSeedRecord } from "../../api/homeApi";
import { useMe } from "../../hooks/queries/useUser";
import { useSeedRecord } from "../../hooks/queries/useSeedRecord";
import { getMyRecord } from "../../api/useApi";

// 1. 프론트엔드에 기분 5단계 정의 (UI 매핑용)
const MOOD_OPTIONS = [
    { level: 0, label: "😭" },
    { level: 1, label: "🙁" },
    { level: 2, label: "😐" },
    { level: 3, label: "🙂" },
    { level: 4, label: "😆" },
];

function HomePage() {
    const moodQuery = useMood();
    const user = useMe();
    const seedrecordData = useSeedRecord({ userId: user.data?.body?.linkedAccounts[0]?.uid })

    const moods = moodQuery.data?.body || []; // 안전하게 빈 배열을 기본값으로 세팅
    const isLoading = moodQuery.isLoading;

    console.log(user);
    const [inputSeedRecord, setInputSeedRecord] = useState({
        userId: user.data?.body?.linkedAccounts[0]?.uid,
        sentence: "",
        moodIdx: 3,
    });
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // 오늘 날짜를 기본값으로 설정
    console.log(seedrecordData);
    // const [seedRecord, setSeedRecord] = useState({if(seedrecordData.data){}});

    const handleWriteOnClick = () => {
        writeSeedRecord(inputSeedRecord);
    }

    const handleSubmit = () => {
        if (!textTrim()) {
            alert("오늘의 한 문장을 심어주세요");
            return;
        }
    }
    
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

                {isLoading && <div>기록을 불러오는 중입니다...</div>}

                {/* 데이터가 출력되는지 확인 */}
                {!isLoading && moods.map((mood, index) => (
                    <label key={mood.id || index}>
                        <input
                            type="radio"
                            name="mood"
                            value={mood.id}
                            checked={inputSeedRecord.moodIdx === mood.id}
                            onChange={() => setInputSeedRecord({ ...inputSeedRecord, moodIdx: mood.id })}
                        />
                        <span>{MOOD_OPTIONS[index]?.label}</span>
                        <span>{mood.mood || "데이터 없음"}</span>
                    </label>
                ))}
            </div>
            <div>
                그날의 나는?
                <input type="date" value={date} onChange={dateOnChange} />
                <div>그날의 한마디
                    {(seedrecordData.data?.body ?? []).map((r, i) => (
                        <div key={i}>{r.sentence}</div>
                    ))}
                    {!seedrecordData.data?.body?.length && "데이터 없음"}
                </div>
                <div>그날 쓴 편지
                    <div></div>
                </div>
                <div>그날의 감정 분석
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;