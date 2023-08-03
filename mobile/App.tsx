// eslint-disable-next-line camelcase
import { Archivo_400Regular, Archivo_700Bold } from '@expo-google-fonts/archivo'
import {
  // eslint-disable-next-line camelcase
  Poppins_400Regular,
  // eslint-disable-next-line camelcase
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { View } from 'react-native'
import AppStack from './src/routes/AppStack'

export default function App() {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Archivo_400Regular,
    // eslint-disable-next-line camelcase
    Archivo_700Bold,
    // eslint-disable-next-line camelcase
    Poppins_400Regular,
    // eslint-disable-next-line camelcase
    Poppins_600SemiBold,
  })

  const prepare = async () => await SplashScreen.preventAutoHideAsync()

  useEffect(() => {
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <AppStack />
      <StatusBar style="light" />
    </View>
  )
}
