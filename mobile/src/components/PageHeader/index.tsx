import { useNavigation } from '@react-navigation/native'
import React, { ReactNode } from 'react'
import { Image, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import backIcon from '../../assets/icons/back.png'
import logoImg from '../../assets/images/logo.png'
import { StackNavigation } from '../../types/navigation'
import styles from './styles'

interface PageHeaderProps {
  title: string
  headerRight?: ReactNode
  children?: ReactNode
}

const PageHeader = ({ title, headerRight, children }: PageHeaderProps) => {
  const { navigate } = useNavigation<StackNavigation>()

  function handleGoBack(): void {
    navigate('Landing')
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={backIcon} alt="Back" resizeMode="contain" />
        </BorderlessButton>
        <Image source={logoImg} alt="Logo" resizeMode="contain" />
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>
      {children}
    </View>
  )
}

export default PageHeader
