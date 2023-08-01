import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Landing: undefined;
  GiveClasses: undefined;
  Study: undefined;
}

export type BottomTabParamList = {
  TeacherList: undefined;
  Favorites: undefined;
}

export type StackNavigation = StackNavigationProp<StackParamList>;

export type BottomTabNavigation = BottomTabNavigationProp<BottomTabParamList>;
