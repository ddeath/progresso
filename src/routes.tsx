import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { DashboardScreen } from './screens/DashboardScreen/DashboardScreen'

const Stack = createNativeStackNavigator()

export const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  )
}
