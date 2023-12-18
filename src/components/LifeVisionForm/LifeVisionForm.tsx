import { useVisionStore } from '@store'
import * as Notifications from 'expo-notifications'
import { useState } from 'react'
import { Button, Text, TextInput } from 'react-native'

import { styles } from './styles'

export const LifeVisionForm = () => {
  const [isEditting, setIsEditting] = useState(false)
  Notifications.usePermissions()

  const lifeVision = useVisionStore((state) => state.lifeVision)
  const lifeVisionDraft = useVisionStore((state) => state.lifeVisionDraft)

  const updateLifeVision = useVisionStore((state) => state.updateLifeVision)
  const updateLifeVisionDraft = useVisionStore((state) => state.updateLifeVisionDraft)

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
            }}
          />
        </>
      )}
    </>
  )
}
