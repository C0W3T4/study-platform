import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ScrollView, View } from 'react-native'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import { Teacher } from '../../types/teacher'
import styles from './styles'

function Favorites() {
  const [favorites, setFavorites] = useState<Teacher[]>([])

  function loadFavorites(): void {
    AsyncStorage.getItem('favorites').then((response) => {
      if (response) {
        const favoriteTeachers: Teacher[] = JSON.parse(response)

        setFavorites(favoriteTeachers)
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, []),
  )

  return (
    <View style={styles.container}>
      <PageHeader title="My favorite teachers" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} favorite={true} />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default Favorites
