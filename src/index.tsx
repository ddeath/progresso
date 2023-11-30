import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'

import { LifeVisionForm } from '@components/LifeVisionForm'

const white = '#fff'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
})

export const App = () => {
  return (
    <View style={styles.container}>
      <LifeVisionForm />
      <StatusBar style='auto' />
    </View>
  )
}
