/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router";
import * as s from "./styles";
import { useMood } from "../../hooks/queries/useMood";
import { useState } from "react";
import { writeSeedRecord } from "../../api/homeApi";

// 1. 프론트엔드에 기분 5단계 정의 (UI 매핑용)
const MOOD_OPTIONS = [
    { level: 1, label: "😭 많이 지침" },
    { level: 2, label: "🙁 가라앉음" },
    { level: 3, label: "😐 괜찮음" },
    { level: 4, label: "🙂 좋음" },
    { level: 5, label: "😆 매우 좋음" },
];

function HomePage() {
    const moodQuery = useMood();
    const moods = moodQuery.data?.body || []; // 안전하게 빈 배열을 기본값으로 세팅
    const isLoading = moodQuery.isLoading;

    const [selectMood, setSelectMood] = useState(3); //기본값 : 3 (괜찮음)

    const [ inputSeedRecord, setInputSeedRecord ] = useState();

    const handleWriteOnClick = () => {
        writeSeedRecord(inputSeedRecord);
    }

    const handleSubmit = () => {
        if(!textTrim()) {
            alert("오늘의 한 문장을 입력해주세요!");
            return;
        }
    }

    return (
        <div css={s.pageStyle}>
            <div css={s.top}>
                <label>🌱 오늘 하루는 어땠나요?</label>
                <div>
                    <input type="text" onChange={(e) => setInputSeedRecord(e.target.value)} placeholder="오늘의 한 문장을 심어보세요" />
                    <button onClick={handleWriteOnClick}>입력</button>
                </div>
            </div>
            <div>
                <h3>🌿 전체 감정 기록 목록</h3>
                
                {isLoading && <div>기록을 불러오는 중입니다...</div>}

                {/* 데이터가 출력되는지 확인 */}
                {!isLoading && moods.map((mood, index) => (
                    <div key={mood.id || index} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                        <span style={{ fontWeight: "bold" }}>
                            {mood.mood || "데이터 없음"}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;