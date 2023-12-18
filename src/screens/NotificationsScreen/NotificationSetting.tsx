import { View } from 'react-native'
import { Switch, Text } from 'react-native-paper'

import { Notification, useNotificationStore } from '@store/notificationsStore'

import { styles } from './styles'
import { createNotification, removeNotification } from './utils'

type Props = {
  notification: Notification
}

export const NotificationSetting = ({ notification }: Props) => {
  const { label, id, category, key} = notification
  const isEnabled = id !== undefined

  const { setNotificationId } = useNotificationStore()

  return (
    <View style={styles.notificationSettingContainer}>
      <View style={styles.notificationSettingLabel}>
        <Text variant="labelSmall">{label}</Text>
      </View>
      <Switch value={isEnabled} onValueChange={async () => {
        if (isEnabled) {
          // TODO: Add loading bar
          void removeNotification(id)
          setNotificationId({
            notificationCategory: category,
            notificationKey: key,
            id: undefined,
          })
        } else {
          const newNotificationId = await createNotification(category, key)
          setNotificationId({
            notificationCategory: category,
            notificationKey: key,
            id: newNotificationId,
          })
        }
      }} />
    </View>
  )
}
