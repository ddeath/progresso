import * as Notifications from 'expo-notifications'
import { useState } from 'react'
import { Button, Text, TextInput } from 'react-native'

import { useVisionStore } from '../../store'

const sendLocalNotification = async () => {
  const title = 'Vision clarity'
  const body = 'Read your Vision in the morning to gain clarity for your day!'

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
            title='Edit'
            onPress={() => {
              updateLifeVisionDraft(lifeVision)
              setIsEditting(true)
            }}
          />
        </>
      )}

      {showForm && (
        <>
          <TextInput value={lifeVisionDraft} onChangeText={updateLifeVisionDraft} />
          <Button
            title='Save'
            onPress={async () => {
              updateLifeVision(lifeVisionDraft)
              updateLifeVisionDraft(undefined)
              setIsEditting(false)

              if (!notificationId) {
                const id = await sendLocalNotification()
                updateMorningNotificationId(id)
              }
            }}
          />
        </>
      )}
    </>
  )
}
