import { View } from 'react-native'
import { IconButton, TextInput } from 'react-native-paper'
import { v4 as uuidv4 } from 'uuid'

import { useDaysFocusStore } from '@store/daysFocusStore'

import { styles } from './styles'


export const EdittingForm = () => {
  const { tasks, createOrUpdate, removeTask } = useDaysFocusStore()

  return (
    <>
      {Object.keys(tasks.items).map((taskId) => {
        const task = tasks.items[taskId]
        return (
          <View key={taskId} style={styles.itemContainer}>
            <TextInput
              mode="outlined"
              value={task.label}
              onChangeText={(text) => {
                createOrUpdate({ ...task, label: text })
              }}
            />
            <IconButton
              icon="trash-can-outline"
              mode="outlined"
              animated={true}
              size={20}
              onPress={() => removeTask(taskId)}
            />
          </View>
        )
      })}

      <IconButton
        icon="plus"
        mode="outlined"
        animated={true}
        size={20}
        onPress={() => {
          const totalTasks = Object.keys(tasks.items).length

          createOrUpdate({
            id: uuidv4(),
            checked: false,
            order: totalTasks,
            label: `Task ${totalTasks + 1}`,
          })
        }}
      />
    </>
  )
}
