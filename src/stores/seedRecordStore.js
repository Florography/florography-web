import { create } from "zustand";

export const useSeedRecordStore = create((set) => ({
  // 오늘의 AI 코멘트
  todayAiComment: "",
  setTodayAiComment: (comment) => set({ todayAiComment: comment }),
}));
