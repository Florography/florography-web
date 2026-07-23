import { useEffect, useState } from "react";
import { useHeartLetters } from "../../hooks/queries/useHeartLetter";
import { useMe } from "../../hooks/queries/useUser";
import { useMood } from "../../hooks/queries/useMood";
import { useSeedRecord } from "../../hooks/queries/useSeedRecord";
import * as s from "./styles";
import { MonthNames } from "../../globalData";

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

function HeartLetterPage() {
    const user = useMe();

    const userId = user.data?.body?.linkedAccounts?.[0]?.uid;

    const moodQuery = useMood();
    const moods = moodQuery.data?.body || DEFAULT_MOODS;

    const { data: letters, isLoading: isLetterLoading, isError: isLetterError } = useHeartLetters(userId);
    const { data: seedRecords, isLoading: isSeedLoading } = useSeedRecord(userId);

    const [currentMonday, setCurrentMonday] = useState(() => getMondayOfDate(new Date()));
    const [currentPage, setCurrentPage] = useState(1);

    const [availableWeeks, setAvailableWeeks] = useState([]);

    let allSeedRecords = [];
    if (seedRecords && typeof seedRecords !== "string") {
        allSeedRecords = seedRecords.body && Array.isArray(seedRecords.body)
            ? seedRecords.body
            : (Array.isArray(seedRecords) ? seedRecords : []);
    }

    const safeLetters = Array.isArray(letters) ? letters : [];

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
        if (safeLetters.length === 0) return;
        const weeksSet = new Set();
        safeLetters.forEach(letter => {
            if (letter?.createdAt) {
                const monday = getMondayOfDate(new Date(letter.createdAt));
                weeksSet.add(formatDate(monday));
            }
        });
        weeksSet.add(formatDate(getMondayOfDate(new Date())));
        const sortedWeeks = Array.from(weeksSet).sort();
        setAvailableWeeks(sortedWeeks);
    }, [letters]);

    if (isLetterLoading || isSeedLoading) {
        return <div css={s.emptyItem}>데이터를 불러오는 중입니다...</div>
    }

    if (isLetterError) {
        return <div css={s.emptyItem}>데이터를 가져오는데 실패했습니다: {isLetterError.message}</div>
    }

    // 선택한 주차의 편지 필터
    const filteredLetters = (Array.isArray(letters) ? letters : []).filter(letter => {
        if (!letter?.createdAt) return false;
        const letterDateStr = letter.createdAt.substring(0, 10);
        return letterDateStr >= startStr && letterDateStr <= endStr;
    });

    const ITEMS_PER_PAGE = 7;
    const totalPages = Math.ceil(filteredLetters.length / ITEMS_PER_PAGE);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filteredLetters.slice(indexOfFirstItem, indexOfLastItem);

    // 특정 주에 편지가 존재하는지 체크
    const hasLettersInWeek = (mondayObj) => {
        const sundayObj = new Date(mondayObj);
        sundayObj.setDate(mondayObj.getDate() + 6);

        const sStr = formatDate(mondayObj);
        const eStr = formatDate(sundayObj);

        return safeLetters.some(letter => {
            if (!letter?.createdAt) return false;
            const letterDateStr = letter.createdAt.substring(0, 10);
            return letterDateStr >= sStr && letterDateStr <= eStr;
        });
    };

    const handlePrevWeek = () => {
        if (safeLetters.length === 0) return;

        let tempMonday = new Date(currentMonday);
        let found = false;

        const letterDates = safeLetters
            .map(l => l.createdAt?.substring(0, 10))
            .filter(Boolean)
            .sort();

        if (letterDates.length === 0) return;
        const oldestLetterMonday = getMondayOfDate(new Date(letterDates[0]));

        while (tempMonday >= oldestLetterMonday) {
            tempMonday.setDate(tempMonday.getDate() - 7);
            if (hasLettersInWeek(tempMonday)) {
                found = true;
                break;
            }
        }

        if (found) {
            setCurrentMonday(tempMonday);
            setCurrentPage(1);
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
            if (hasLettersInWeek(tempMonday)) {
                found = true;
                break;
            }
        }

        // 데이터를 못 찾으면 이번 주로 돌아오도록
        if (found) {
            setCurrentMonday(tempMonday);
            setCurrentPage(1);
        } else {
            setCurrentMonday(new Date(thisWeekMonday));
            setCurrentPage(1);
        }
    };

    const handleGoToWeek = (weeksSet) => {
        setCurrentMonday(new Date(weeksSet));
        setCurrentPage(1);
    };

    return (
        <div css={s.page}>
            <h1 css={s.title}>나의 편지</h1>
            <span css={s.rangeLabel}>
                {startStr} (월) ~ {endStr} (일)
            </span>
            <div css={s.mainCard}>
                <ul css={s.recordList}>
                    {currentItems && currentItems.length > 0 ? (
                        currentItems.map((heartletter, index) => {
                            const letterDate = heartletter.createdAt?.substring(0, 10);
                            const month = heartletter.createdAt?.substring(5, 7);
                            const day = heartletter.createdAt?.substring(8, 10);

                            const targetRecord = allSeedRecords.find(record =>
                                record?.createdDate && record.createdDate.startsWith(letterDate)
                            );

                            const currentMoodId = targetRecord ? targetRecord.moodIdx : null;
                            const matchedMood = moods.find(m => Number(m.id) === Number(currentMoodId));

                            return (
                                <li css={s.recordListItem} key={`${heartletter.userId}-${index}`}>
                                    <div css={s.dateLabel}>
                                        <header>{day}</header>
                                        <span>{MonthNames[parseInt(month) - 1]}</span>
                                    </div>
                                    <span>({matchedMood ? matchedMood.mood : "괜찮음"})</span>
                                    <div css={s.sentenceGroup}>
                                        <span css={s.recipient}>받는이: {heartletter.recipient}</span>
                                        <span css={s.sentence}>{heartletter.title}</span>
                                    </div>
                                </li>
                            );
                        })
                    ) : (
                        <li css={s.emptyItem}>이번 주에 쓴 편지가 없습니다.</li>
                    )}
                </ul>
                {totalPages > 1 && (
                    <div css={s.pagination}>
                        <button
                            css={s.pageButton}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            이전
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                            <button
                                css={s.pageButton}
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                            >
                                {pageNum}
                            </button>
                        ))}
                        <button
                            css={s.pageButton}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            다음
                        </button>
                    </div>
                )}
                <div css={s.weekNav}>
                    <button css={s.weekNavButton} onClick={handlePrevWeek}>◀ 이전 주</button>

                    {availableWeeks.length > 1 && (
                        <div css={s.weekDots}>
                            {availableWeeks.map((weeksSet, index) => {
                                const isCurrentWeekMatch = formatDate(currentMonday) === weeksSet;
                                return (
                                    <button
                                        css={s.weekDot(isCurrentWeekMatch)}
                                        key={weeksSet}
                                        onClick={() => handleGoToWeek(weeksSet)}
                                    >
                                        {index + 1}
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {/* 현재 기준 다음 주 버튼 비활성화 */}
                    <button css={s.weekNavButton} onClick={handleNextWeek} disabled={isThisWeek}>다음 주 ▶</button>
                </div>
            </div>
        </div>
    );
}
export default HeartLetterPage;
