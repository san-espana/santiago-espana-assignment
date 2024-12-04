import { create } from 'zustand';

interface ActivityState {
  selectedMonth: string | null;
  setSelectedMonth: (month: string | null) => void; 
}

const useActivityStore = create<ActivityState>((set) => ({
  selectedMonth: null,
  setSelectedMonth: (month) => set({ selectedMonth: month }), 
}));

export default useActivityStore;