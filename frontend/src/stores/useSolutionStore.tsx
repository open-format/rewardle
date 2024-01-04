import { create } from 'zustand'

interface SolutionStore {
  solution: string
  solutionGameDate: Date
  solutionIndex: number
  tomorrow: number
  setSolution: (s: string) => void
  setSolutionGameDate: (s: Date) => void
  setSolutionIndex: (s: number) => void
  setTomorrow: (s: number) => void
}

export const useSolutionStore = create<SolutionStore>((set) => ({
  solution: '',
  solutionGameDate: new Date(),
  solutionIndex: 0,
  tomorrow: 0,
  setSolution: (l) => set({ solution: l }),
  setSolutionGameDate: (l) => set({ solutionGameDate: l }),
  setSolutionIndex: (l) => set({ solutionIndex: l }),
  setTomorrow: (l) => set({ tomorrow: l }),
}))
