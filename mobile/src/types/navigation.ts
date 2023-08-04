import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { StackNavigationProp } from '@react-navigation/stack'

export type StackScreens = 'Landing' | 'GiveClasses' | 'Study'

export type BottomTabScreens = 'TeacherList' | 'Favorites'

export type StackParamList = Record<StackScreens, object | undefined>

export type BottomTabParamList = Record<BottomTabScreens, object | undefined>

export type StackNavigation = StackNavigationProp<StackParamList>

export type BottomTabNavigation = BottomTabNavigationProp<BottomTabParamList>
