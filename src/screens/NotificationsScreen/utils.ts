import * as Notifications from 'expo-notifications'
import { Platform } from 'react-native'

import { NotificationCategoryType, NotificationKey } from '@store/notificationsStore'


const createLifeVisionMorningReminderNotification = async () => {
  const title = 'Vision clarity'
  const body = 'Read your Vision in the morning to gain clarity for your day!'

  return Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      hour: 8,
      minute: 0,
      repeats: true,
      channelId: 'default'
    },
  })
}

export const createNotification = async (category: NotificationCategoryType, notificationKey: NotificationKey) => {
  const { status } = await Notifications.getPermissionsAsync()
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Progresso notifications',
      importance: Notifications.AndroidImportance.MAX,
    })
  }
  await Notifications.requestPermissionsAsync()

  // Todo - show proper error
  if (status !== 'granted') {
    return
  }

  if (category === 'lifeVision' && notificationKey === NotificationKey.LifeVisionMorningReadReminder) {
    return createLifeVisionMorningReminderNotification()
  }
}

export const removeNotification = async (id: string) => {
  return Notifications.cancelScheduledNotificationAsync(id)
}

export const resetAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync()
}
