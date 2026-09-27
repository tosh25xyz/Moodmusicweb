import { create } from "zustand";

interface MoodState {
  selectedMood: string | null;
  answers: string[];
  setMood: (mood: string) => void;
  addAnswer: (answer: string) => void;
  reset: () => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  selectedMood: null,
  answers: [],
  setMood: (mood) => set({ selectedMood: mood }),
  addAnswer: (answer) =>
    set((state) => ({ answers: [...state.answers, answer] })),
  reset: () => set({ selectedMood: null, answers: [] }),
}));