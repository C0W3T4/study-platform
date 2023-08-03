import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import GiveClasses from '../pages/GiveClasses'
import Landing from '../pages/Landing'
import { StackParamList } from '../types/navigation'
import StudyTabs from './StudyTabs'

const { Navigator, Screen } = createStackNavigator<StackParamList>()

function AppStack() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  )
}

export default AppStack
