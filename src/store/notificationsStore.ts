/* eslint-disable no-use-before-define */
import setHours from 'date-fns/setHours'
import setMinutes from 'date-fns/setMinutes'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { getStorage } from './storage'

enum NotificationType {
  EveryDay
}

export type Notification = {
  label: string
  id: string | undefined
  time?: Date
  key: NotificationKey
  category: NotificationCategoryType
  type: NotificationType
}

export type NotificationCategory = {
  label: string
  notifications: Record<NotificationKey, Notification>
}

type State = {
  categories: {
    lifeVision: NotificationCategory
  },
}

export type NotificationCategoryType = keyof State['categories']
export enum NotificationKey {
  LifeVisionMorningReadReminder = 'LifeVisionMorningReadReminder'
}

type SwitchNotificationFnParams = {
  notificationCategory: NotificationCategoryType
  notificationKey: NotificationKey
  id: string | undefined
}

type Actions = {
  setNotificationId: (params: SwitchNotificationFnParams) => void
}

export const useNotificationStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      categories: {
        lifeVision: {
          label: 'Life vision',
          notifications: {
            LifeVisionMorningReadReminder: {
              id: undefined,
              key: NotificationKey.LifeVisionMorningReadReminder,
              category: 'lifeVision',
              label: 'Morning vision read reminder',
              time: setHours(setMinutes(new Date(), 0), 8),
              type: NotificationType.EveryDay
            }
          }
        },
      },
      setNotificationId: ({ notificationCategory, notificationKey, id }: SwitchNotificationFnParams ) =>
        set((state) => {
          state.categories[notificationCategory].notifications[notificationKey].id = id
        }),
    })),
    {
      name: 'progresso-notifications-storage',
      storage: getStorage<State>(),
      version: 2,
    },
  ),
)
