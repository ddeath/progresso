import AsyncStorage from '@react-native-async-storage/async-storage'
import addDays from 'date-fns/addDays'
import formatISO from 'date-fns/formatISO'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type Task = {
  order: number
  label: string
  checked: boolean
  id: string
}

type Tasks = {
  items: Record<string, Task>
  forDate: Date
}

type DayFocusDate = string

type History = {
  items: Record<DayFocusDate, Tasks>
}

type State = {
  history: History
  tasks: Tasks
}

type Actions = {
  createOrUpdate: (task: Task) => void
  removeTask: (id: string) => void
  finishDay: () => void
}

export const useDaysFocusStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      tasks: { items: {}, forDate: new Date() },
      history: { items: {} },
      createOrUpdate: (task: Task) =>
        set((state) => {
          state.tasks.items[task.id] = task
        }),
      removeTask: (id: string) =>
        set((state) => {
          delete state.tasks.items[id]
        }),
      finishDay: () =>
        set((state) => {
          const dayKey = formatISO(state.tasks.forDate, { representation: 'date' })
          state.history.items[dayKey] = { ...state.tasks }

          let nextDayDate = new Date()
          const todayKey = formatISO(nextDayDate, { representation: 'date' })
          if (todayKey === dayKey) {
            nextDayDate = addDays(nextDayDate, 1)
          }
          state.tasks = { items: {}, forDate: nextDayDate }
        }),
    })),
    {
      name: 'progresso-days-focus-storage',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
)
