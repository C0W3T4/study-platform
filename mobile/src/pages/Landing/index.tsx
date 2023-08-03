import { useNavigation } from '@react-navigation/native'
import { AxiosError, AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import giveClassesIcon from '../../assets/icons/give-classes.png'
import heartIcon from '../../assets/icons/heart.png'
import studyIcon from '../../assets/icons/study.png'
import landingImg from '../../assets/images/landing.png'
import api from '../../services/api'
import { ConnectionsProps } from '../../types/connections'
import { StackNavigation } from '../../types/navigation'
import styles from './styles'

function Landing() {
  const { navigate } = useNavigation<StackNavigation>()

  const [totalConnections, setTotalConnections] = useState(0)

  async function getConnections(): Promise<void> {
    await api
      .get('/connections')
      .then((response: AxiosResponse<ConnectionsProps, unknown>) => {
        const { total } = response.data

        setTotalConnections(total)
      })
      .catch((error: AxiosError) => console.log(error))
  }

  useEffect(() => {
    getConnections()
  }, [])

  function handleNavigateToGiveClassesPage(): void {
    navigate('GiveClasses')
  }

  function handleNavigateToStudyPage(): void {
    navigate('Study')
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} alt="Landing" style={styles.banner} />
      <Text style={styles.title}>
        Welcome, {'\n'}
        <Text style={styles.titleBold}>What do you want to do?</Text>
      </Text>
      <View style={styles.buttonsContainer}>
        <RectButton
          onPress={handleNavigateToStudyPage}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} alt="Study" />
          <Text style={styles.buttonText}>Study</Text>
        </RectButton>
        <RectButton
          onPress={handleNavigateToGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} alt="Give classes" />
          <Text style={styles.buttonText}>Give classes</Text>
        </RectButton>
      </View>
      <Text style={styles.totalConnections}>
        Total of {totalConnections} connections already made!{' '}
        <Image source={heartIcon} alt="Heart" />
      </Text>
    </View>
  )
}

export default Landing
