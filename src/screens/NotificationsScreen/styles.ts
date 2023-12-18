import { StyleSheet } from 'react-native'

const white = '#fff'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20,
    paddingTop: 40,
  },
  notificationSettingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  notificationSettingLabel: {
    flex: 1,
    justifyContent: 'center',
  }
})
