import { Button, Text, TextInput } from "react-native"
import { useVisionStore } from "../../store"
import { useState } from "react"

export const LifeVisionForm = () => {
  const [isEditting, setIsEditting] = useState(false)

  const lifeVision = useVisionStore(state => state.lifeVision)
  const lifeVisionDraft = useVisionStore(state => state.lifeVisionDraft)

  const updateLifeVision = useVisionStore(state => state.updateLifeVision)
  const updateLifeVisionDraft = useVisionStore(state => state.updateLifeVisionDraft)

  const showForm = isEditting || !lifeVision

  return (
    <>
    {!showForm && (
      <>
        <Text>{lifeVision}</Text>
        <Button title="Edit" onPress={() => {
          updateLifeVisionDraft(lifeVision)
          setIsEditting(true)
        }} />
      </>
    )}

    {showForm && (
      <>
        <TextInput value={lifeVisionDraft} onChangeText={updateLifeVisionDraft} />
        <Button title="Save" onPress={() => {
          updateLifeVision(lifeVisionDraft)
          updateLifeVisionDraft(undefined)
          setIsEditting(false)
        }} />
      </>
    )}
    </>
  )
}
