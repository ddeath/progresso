import { View } from 'react-native'
import { Text } from 'react-native-paper'

import { NotificationCategory as NotificationCategoryType } from '@store/notificationsStore'

import { NotificationSetting } from './NotificationSetting'

type Props = {
  category: NotificationCategoryType
}

export const NotificationCategory = ({ category }: Props) => {
  return (
    <View>
      <Text variant='displaySmall'>{category.label}</Text>
      {Object.keys(category.notifications).map(notificationKey => (
        <NotificationSetting key={notificationKey} notification={category.notifications[notificationKey]} />
      ))}
    </View>
  )
}
