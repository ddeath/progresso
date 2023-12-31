import { useState } from 'react'
import { View } from 'react-native'
import { FAB, Portal, Text } from 'react-native-paper'

import { EdittingForm, ItemsList } from '@components/DaysFocusForm'
import { useDaysFocusStore } from '@store/daysFocusStore'

import { styles } from './styles'

export const DaysFocusScreen = () => {
  const { finishDay } = useDaysFocusStore()

  const [isEditing, setIsEditing] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <Portal.Host>
      <View style={styles.container}>
        <Text>Today`s most important task for My Vision</Text>
        {isEditing ? <EdittingForm /> : <ItemsList />}
        {isEditing ? (
          <FAB icon="check" style={styles.editButton} onPress={() => setIsEditing(!isEditing)} />
        ) : (
          <Portal>
            <FAB.Group
              open={isMenuOpen}
              visible={true}
              icon={isMenuOpen ? 'close' : 'menu'}
              style={styles.optionsButton}
              backdropColor="#ffffffaa"
              actions={[
                {
                  icon: 'check',
                  label: 'Finish day',
                  onPress: () => finishDay(),
                },
                {
                  icon: 'pencil-outline',
                  label: 'Edit',
                  onPress: () => setIsEditing(!isEditing),
                },
              ]}
              onStateChange={({ open }) => setIsMenuOpen(open)}
            />
          </Portal>
        )}
      </View>
    </Portal.Host>
  )
}
