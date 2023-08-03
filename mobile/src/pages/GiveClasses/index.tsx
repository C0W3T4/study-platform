import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import giveClassesBgImage from '../../assets/images/give-classes-background.png'
import { StackNavigation } from '../../types/navigation'
import styles from './styles'

function GiveClasses() {
  const { goBack } = useNavigation<StackNavigation>()

  function handleNavigateBack(): void {
    goBack()
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="contain"
        source={giveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Want to be a teacher?</Text>
        <Text style={styles.description}>
          To get started, you need to register as a teacher on our web platform.
        </Text>
      </ImageBackground>
      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Alright</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses
