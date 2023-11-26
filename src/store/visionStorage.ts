import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from "zustand/middleware"

type State = {
  lifeVision: string | undefined
  lifeVisionDraft: string | undefined
}

type Actions = {
  updateLifeVision: (vision: string | undefined) => void
  updateLifeVisionDraft: (draft: string | undefined) => void
}

export const useVisionStore = create<State & Actions>()(persist(
  immer((set) => ({
    lifeVision: undefined,
    lifeVisionDraft: undefined,
    updateLifeVision: (vision: string | undefined) =>
      set((state) => {
        state.lifeVision = vision
      }),
    updateLifeVisionDraft: (draft: string | undefined) =>
      set((state) => {
        state.lifeVisionDraft = draft
      }),
  })),
  {
    name: "progresso-life-vision-storage",
    storage: createJSONStorage(() => AsyncStorage),
    version: 0,
  }
))
