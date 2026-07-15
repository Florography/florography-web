import { create } from "zustand";

export const useGardenStore = create((set, get) => ({
  // FreeformGarden 정원 데이터
  freeformFlowers: [],
  setFreeformFlowers: (flowers) => set({ freeformFlowers: flowers }),

  // 모든 정원 데이터를 한 번에 가져오기
  getAllGardenData: () => {
    const { freeformFlowers } = get();
    return {
      freeformFlowers,
    };
  },

  // 정원 데이터 초기화
  resetGardenData: () =>
    set({ freeformFlowers: [] }),
}));
