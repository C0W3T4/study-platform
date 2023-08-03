import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Favorites from '../pages/Favorites'
import TeacherList from '../pages/TeacherList'
import { BottomTabParamList } from '../types/navigation'

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>()

function StudyTabs() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarInactiveBackgroundColor: '#fafafc',
        tabBarActiveBackgroundColor: '#ebebf5',
        tabBarInactiveTintColor: '#c1bccc',
        tabBarActiveTintColor: '#32264d',
        tabBarItemStyle: {
          height: '100%',
          width: '100%',
        },
        tabBarStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarLabelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
        },
        tabBarIconStyle: {
          flex: 1,
          width: 20,
          height: 20,
        },
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-easel"
                size={size}
                color={focused ? '#8257e5' : color}
              />
            )
          },
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <Ionicons
                name="ios-heart"
                size={size}
                color={focused ? '#8257e5' : color}
              />
            )
          },
        }}
      />
    </Navigator>
  )
}

export default StudyTabs
