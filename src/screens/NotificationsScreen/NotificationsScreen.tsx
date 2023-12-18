import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

import { NotificationCategoryType, useNotificationStore } from '@store/notificationsStore'

import { NotificationCategory } from './NotificationCategory'
import { styles } from './styles'
import { resetAllNotifications } from './utils'


export const NotificationsScreen = () => {
  const { categories } = useNotificationStore()

  return (
    <View style={styles.container}>
      <Button mode='outlined' onPress={() => resetAllNotifications()}><Text>Reset notifications</Text></Button>
      {Object.keys(categories).map(categoryKey => <NotificationCategory key={categoryKey} category={categories[categoryKey as NotificationCategoryType]} />)}
    </View>
  )
}
