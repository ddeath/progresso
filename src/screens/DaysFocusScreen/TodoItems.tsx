import { Checkbox } from 'react-native-paper'

import { useDaysFocusStore } from '@store/daysFocusStore'

export const TodoItems = () => {
  const { tasks, createOrUpdate } = useDaysFocusStore()

  return (
    <>
      {Object.keys(tasks.items).map((taskId) => {
        const task = tasks.items[taskId]
        return (
          <Checkbox.Item
            key={task.id}
            label={task.label}
            status={task.checked ? 'checked' : 'unchecked'}
            position="leading"
            onPress={() =>
              createOrUpdate({
                ...task,
                checked: !task.checked,
              })
            }
          />
        )
      })}
    </>
  )
}
