import { useState } from "react";
import * as s from "./styles";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const days = [];

    // 빈 칸 채우기 (첫째 날 이전)
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} css={s.calendarDayEmpty}></div>);
    }

    // 날짜 채우기
    const today = new Date();
    for (let d = 1; d <= daysInMonth; d++) {
        const isToday =
            today.getDate() === d &&
            today.getMonth() === month &&
            today.getFullYear() === year;

        days.push(
            <div key={d} css={[s.calendarDay, isToday && s.calendarDayToday]}>
                {d}
            </div>
        );
    }

    return (
        <div css={s.calendarWrapper}>
            <div css={s.calendarHeader}>
                <button css={s.calendarNavButton} onClick={prevMonth}>&lt;</button>
                <span css={s.calendarMonthTitle}>
                    {year}년 {month + 1}월
                </span>
                <button css={s.calendarNavButton} onClick={nextMonth}>&gt;</button>
            </div>
            <div css={s.calendarGrid}>
                {daysOfWeek.map((day) => (
                    <div key={day} css={s.calendarWeekday}>{day}</div>
                ))}
                {days}
            </div>
        </div>
    );
}

export default Calendar;
