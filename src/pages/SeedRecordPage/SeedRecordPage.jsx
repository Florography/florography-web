import { useEffect, useState } from "react";
import { useMood } from "../../hooks/queries/useMood";
import { useSeedRecord } from "../../hooks/queries/useSeedRecord";
import { useMe } from "../../hooks/queries/useUser";
import * as s from "./styles";

const DEFAULT_MOODS = [
    { id: 0, mood: "많이 지침" },
    { id: 1, mood: "가라앉음" },
    { id: 2, mood: "괜찮음" },
    { id: 3, mood: "좋음" },
    { id: 4, mood: "매우 좋음" },
];

// 일주일 계산
const getMondayOfDate = (d) => {
    const date = new Date(d);
    const day = date.getDay();  //일요일: 0, 월요일: 1, ... 토요일: 6
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
};

function SeedRecordPage() {
    const user = useMe();

    const userId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const moodQuery = useMood();
    const moods = moodQuery.data?.body || DEFAULT_MOODS;

    const { data: seedRecords, isLoading: isSeedLoading, isError: isSeedError } = useSeedRecord(userId);

    const [currentMonday, setCurrentMonday] = useState(() => getMondayOfDate(new Date()));
    const [currentPage, setCurrentPage] = useState(1);

    const [availableWeeks, setAvailableWeeks] = useState([]);

    const safeRecords = Array.isArray(seedRecords) ? seedRecords : [];

    // 현재 주 계산
    const currentSunday = new Date(currentMonday);
    currentSunday.setDate(currentMonday.getDate() + 6);

    // 날짜 포맷 (YYYY-MM-DD)
    const formatDate = (dateObj) => {
        return dateObj.toLocaleDateString("sv-SE");
    };

    const startStr = formatDate(currentMonday);
    const endStr = formatDate(currentSunday);

    // 미래 날짜 제한
    const thisWeekMonday = getMondayOfDate(new Date());
    const isThisWeek = formatDate(currentMonday) === formatDate(thisWeekMonday);

    useEffect(() => {
        if (safeRecords.length === 0) return;
        const weeksSet = new Set();
        safeRecords.forEach(record => {
            if (record?.createdDate) {
                const monday = getMondayOfDate(new Date(record.createdDate));
                weeksSet.add(formatDate(monday));
            }
        });
        weeksSet.add(formatDate(getMondayOfDate(new Date())));
        const sortedWeeks = Array.from(weeksSet).sort();
        setAvailableWeeks(sortedWeeks);
    }, [seedRecords, safeRecords]);

    if (isSeedLoading) {
        return <div>데이터를 불러오는 중입니다...</div>
    }

    if (isSeedError) {
        return <div>데이터를 가져오는데 실패했습니다: {isSeedError.message}</div>
    }

    // 선택한 주차의 편지 필터
    const filteredRecords = (Array.isArray(seedRecords) ? seedRecords : []).filter(record => {
        if (!record?.createdDate) return false;
        const recordDateStr = record.createdDate.substring(0, 10);
        return recordDateStr >= startStr && recordDateStr <= endStr;
    });

    // 특정 주에 편지가 존재하는지 체크
    const hasRecordsInWeek = (mondayObj) => {
        const sundayObj = new Date(mondayObj);
        sundayObj.setDate(mondayObj.getDate() + 6);

        const sStr = formatDate(mondayObj);
        const eStr = formatDate(sundayObj);

        return safeRecords.some(record => {
            if (!record?.createdDate) return false;
            const recordDateStr = record.createdDate.substring(0, 10);
            return recordDateStr >= sStr && recordDateStr <= eStr;
        });
    };

    const handlePrevWeek = () => {
        if (safeRecords.length === 0) return;

        let tempMonday = new Date(currentMonday);
        let found = false;

        const recordDates = safeRecords
            .map(l => l.createdDate?.substring(0, 10))
            .filter(Boolean)
            .sort();

        if (recordDates.length === 0) return;
        const oldestRecordMonday = getMondayOfDate(new Date(recordDates[0]));

        while (tempMonday >= oldestRecordMonday) {
            tempMonday.setDate(tempMonday.getDate() - 7);
            if (hasRecordsInWeek(tempMonday)) {
                found = true;
                break;
            }
        }
        
        if (found) {
            setCurrentMonday(tempMonday);
        } else {
            alert("이전 주에 작성된 편지가 더 이상 없습니다.")
        }
    };

    const handleNextWeek = () => {
        if (isThisWeek) return; // 이번 주라면 미래 불가

        let tempMonday = new Date(currentMonday);
        let found = false;

        while (tempMonday < thisWeekMonday) {
            tempMonday.setDate(tempMonday.getDate() + 7);
            if (hasRecordsInWeek(tempMonday)) {
                found = true;
                break;
            }
        }

        // 데이터를 못 찾으면 이번 주로 돌아오도록
        if (found) {
            setCurrentMonday(tempMonday);
        } else {
            setCurrentMonday(new Date(thisWeekMonday));
        }
    };

    const handleGoToWeek = (weeksSet) => {
        setCurrentMonday(new Date(weeksSet));
        setCurrentPage(1);
    };

    return (
        <div>
            <h1>나의 한마디</h1>
                <span style={{ fontWeight: "bold"}}>
                    {startStr} (월) ~ {endStr} (일)
                </span>
            <ul>
                {filteredRecords && filteredRecords.length > 0 ? (
                    seedRecords.map((seedrecord, index) => {
                        const matchedMood = moods.find(m => Number(m.id) === Number(seedrecord.moodIdx));

                        return (
                            <li key={`${seedrecord.userId || 'record'}-${index}`}>
                                <span>{seedrecord.createdDate}</span>
                                <span>{seedrecord.sentence}</span>
                                <span>({matchedMood ? matchedMood.mood : seedrecord.moodIdx})</span>
                            </li> 
                        );
                    })
                ) : (
                    <li>표시할 데이터가 없습니다.</li>
                )}
            </ul>
            <div style={{ display: "flex", gap: "15px", alignItems: "center", margin: "20px 0" }}>
                <button onClick={handlePrevWeek}>◀ 이전 주</button>
                
                {availableWeeks.length > 1 && (
                    <div style={{ display: "flex", gap: "6px" }}>
                        {availableWeeks.map((weeksSet, index) => {
                            const isCurrentWeekMatch = formatDate(currentMonday) === weeksSet;
                            return (
                                <button
                                    key={weeksSet}
                                    onClick={() => handleGoToWeek(weeksSet)}
                                    style={{ 
                                        fontWeight: isCurrentWeekMatch ? "bold" : "normal", 
                                        backgroundColor: isCurrentWeekMatch ? "#ddd" : "#fff", 
                                        border: "1px solid #ccc", 
                                        padding: "6px 12px", 
                                        cursor: "pointer", 
                                        borderRadius: "4px" 
                                    }} 
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 현재 기준 다음 주 버튼 비활성화 */}
                <button onClick={handleNextWeek} disabled={isThisWeek}>다음 주 ▶</button>
            </div>
        </div>
    )
}

export default SeedRecordPage;