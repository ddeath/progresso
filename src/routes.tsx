import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { BottomNavigationBar } from '@components/BottomNavigationBar/BottomNavigationBar'

const Stack = createNativeStackNavigator()

export const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomNavigationBar} />
    </Stack.Navigator>
  )
}
