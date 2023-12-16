import { useVisionStore } from '@store'
import * as Notifications from 'expo-notifications'
import { useState } from 'react'
import { Button, Text, TextInput } from 'react-native'

import { styles } from './styles'

const sendLocalNotification = async () => {
  const title = 'Vision clarity'
  const body = 'Read your Vision in the morning to gain clarity for your day!'

  const { status: existingStatus } = await Notifications.getPermissionsAsync()

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      // Failed to get push token for push notification!
      return null
    }
  }

  return Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: {
        name: 'arun',
      },
    },
    trigger: {
      hour: 8,
      minute: 0,
      repeats: true,
    },
  })
}

export const LifeVisionForm = () => {
  const [isEditting, setIsEditting] = useState(false)
  Notifications.usePermissions()

  const lifeVision = useVisionStore((state) => state.lifeVision)
  const lifeVisionDraft = useVisionStore((state) => state.lifeVisionDraft)
  const notificationId = useVisionStore((state) => state.morningNotificationId)

  const updateLifeVision = useVisionStore((state) => state.updateLifeVision)
  const updateLifeVisionDraft = useVisionStore((state) => state.updateLifeVisionDraft)
  const updateMorningNotificationId = useVisionStore((state) => state.updateMorningNotificationId)

  const showForm = isEditting || !lifeVision

  return (
    <>
      {!showForm && (
        <>
          <Text>{lifeVision}</Text>
          <Button
            title="Edit"
            onPress={() => {
              updateLifeVisionDraft(lifeVision)
              setIsEditting(true)
            }}
          />
        </>
      )}

      {showForm && (
        <>
          <TextInput
            value={lifeVisionDraft}
            onChangeText={updateLifeVisionDraft}
            editable={true}
            multiline={true}
            style={styles.visionTextInput}
          />
          <Button
            title="Save"
            onPress={async () => {
              updateLifeVision(lifeVisionDraft)
              updateLifeVisionDraft(undefined)
              setIsEditting(false)

              if (!notificationId) {
                const id = await sendLocalNotification()
                if (id) {
                  updateMorningNotificationId(id)
                }
              }
            }}
          />
        </>
      )}
    </>
  )
}
