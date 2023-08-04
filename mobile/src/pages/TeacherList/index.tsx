import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { useFocusEffect } from '@react-navigation/native'
import { AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { BorderlessButton, RectButton } from 'react-native-gesture-handler'
import PageHeader from '../../components/PageHeader'
import TeacherItem from '../../components/TeacherItem'
import api from '../../services/api'
import { Teacher } from '../../types/teacher'
import { formatDate } from '../../utils/format'
import styles from './styles'

function TeacherList() {
  const [isFiltersVisible, setIsFiltersVisible] = useState<boolean>(false)
  const [timePicker, setTimePicker] = useState<boolean>(false)

  const [teachers, setTeachers] = useState<Teacher[]>([])

  const [favorites, setFavorites] = useState<number[]>([])

  const [subject, setSubject] = useState<string>('')
  const [weekDay, setWeekDay] = useState<string>('')
  const [date, setDate] = useState<Date>(new Date())
  const [time, setTime] = useState<string>(formatDate(date))

  function loadFavorites(): void {
    AsyncStorage.getItem('favorites').then((res) => {
      if (res) {
        const favoriteTeachers = JSON.parse(res)

        const favoriteTeachersIds = favoriteTeachers.map((teacher: Teacher) => {
          return teacher.id
        })

        setFavorites(favoriteTeachersIds)
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, []),
  )

  function handleToggleFiltersVisible(): void {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit(): Promise<void> {
    loadFavorites()

    await api
      .get('/classes', {
        params: {
          subject,
          weekDay,
          time,
        },
      })
      .then((response: AxiosResponse<Teacher[], unknown>) => {
        setTeachers(response.data)
        setIsFiltersVisible(false)
      })
      .catch(() => Alert.alert("Couldn't get classes!"))
  }

  const handleWeekDayOnChange = (text: string) =>
    setWeekDay(text.replace(/[^0-9]/g, ''))

  const handleTimeOnChange = (event: DateTimePickerEvent, date?: Date) => {
    const { type } = event

    if (type === 'set' && date) {
      setDate(date)

      const formattedTime: string = formatDate(date)
      setTime(formattedTime)
    }

    setTimePicker(false)
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Available teachers"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <>
            <View style={styles.searchForm}>
              <Text style={styles.label}>Subject</Text>
              <TextInput
                style={styles.input}
                value={subject}
                onChangeText={(text) => setSubject(text)}
                placeholder="What is the subject?"
                placeholderTextColor="#c1bccc"
              />
              <View style={styles.inputGroup}>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Weekday</Text>
                  <TextInput
                    inputMode="numeric"
                    style={styles.input}
                    value={weekDay}
                    onChangeText={(text) => handleWeekDayOnChange(text)}
                    placeholder="0=Sunday ... 6=Saturday"
                    placeholderTextColor="#c1bccc"
                  />
                </View>
                <View style={styles.inputBlock}>
                  <Text style={styles.label}>Schedule</Text>
                  <TouchableOpacity onPress={() => setTimePicker(true)}>
                    <TextInput
                      editable={false}
                      inputMode="text"
                      style={styles.input}
                      value={time}
                      onChangeText={(text) => setTime(text)}
                      placeholder="What time?"
                      placeholderTextColor="#c1bccc"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <RectButton
                onPress={handleFiltersSubmit}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Filter</Text>
              </RectButton>
            </View>
            {timePicker && (
              <DateTimePicker
                onChange={handleTimeOnChange}
                value={date}
                mode="time"
                display="clock"
                is24Hour={true}
              />
            )}
          </>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers && teachers.length === 0 && (
          <Text style={{ marginTop: 50, textAlign: 'center' }}>
            There is no data to display! Fill all or change filters.
          </Text>
        )}
        {teachers.map((teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorite={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default TeacherList
