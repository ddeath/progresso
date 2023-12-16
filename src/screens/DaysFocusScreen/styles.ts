import { StyleSheet } from 'react-native'

const white = '#fff'
export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  optionsButton: {
    bottom: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
})
