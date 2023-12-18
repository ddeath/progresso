import MaterialIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import { DaysFocusScreen } from '@screens/DaysFocusScreen/DaysFocusScreen'
import { LifeVisionScreen } from '@screens/LifeVisionScreen/LifeVisionScreen'
import { NotificationsScreen } from '@screens/NotificationsScreen/NotificationsScreen'

const Tab = createBottomTabNavigator()

export const BottomNavigationBar = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Life Vision"
        options={{ tabBarIcon: () => <MaterialIcons name="palm-tree" size={20} /> }}
        component={LifeVisionScreen}
      />

      <Tab.Screen
        name="Day's Focus"
        options={{ tabBarIcon: () => <MaterialIcons name="target-account" size={20} /> }}
        component={DaysFocusScreen}
      />

      <Tab.Screen
        name="Notifications"
        options={{ tabBarIcon: () => <MaterialIcons name="bell-ring-outline" size={20} /> }}
        component={NotificationsScreen}
      />
    </Tab.Navigator>
  )
}
