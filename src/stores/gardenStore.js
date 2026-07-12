import { create } from "zustand";

export const useGardenStore = create((set, get) => ({
  // FreeformGarden 정원 데이터
  freeformFlowers: [],
  setFreeformFlowers: (flowers) => set({ freeformFlowers: flowers }),

  // GridGarden 정원 데이터 (향후 사용)
  gridGardenData: {},
  setGridGardenData: (data) => set({ gridGardenData: data }),

  // 모든 정원 데이터를 한 번에 가져오기
  getAllGardenData: () => {
    const { freeformFlowers, gridGardenData } = get();
    return {
      freeformFlowers,
      gridGardenData,
    };
  },

  // 정원 데이터 초기화
  resetGardenData: () =>
    set({ freeformFlowers: [], gridGardenData: {} }),
}));
