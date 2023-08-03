import { AxiosError, AxiosResponse } from 'axios'
import { FormEvent, useState } from 'react'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import TeacherItem from '../../components/TeacherItem'
import api from '../../services/api'
import { Teacher } from '../../types/teacher'
import './styles.css'

function TeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  const [subject, setSubject] = useState('')
  const [weekDay, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  const searchTeachers = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await api
      .get('/classes', {
        params: {
          subject,
          weekDay,
          time,
        },
      })
      .then((response: AxiosResponse<Teacher[], unknown>) => {
        const teachers = response.data
        setTeachers(teachers)
      })
      .catch((error: AxiosError<unknown, unknown>) => {
        if (error.response?.status === 400) {
          alert('Fill all filters!')
        } else {
          alert('Something went wrong, please try again!')
        }
      })
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="These are the available teachers!">
        <form
          id="search-teachers"
          onSubmit={(e) => {
            searchTeachers(e).finally(undefined)
          }}
        >
          <Select
            name="subject"
            label="Subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value)
            }}
            options={[
              { value: 'Art', label: 'Art' },
              { value: 'Biology', label: 'Biology' },
              { value: 'Sciences', label: 'Sciences' },
              { value: 'Physical education', label: 'Physical education' },
              { value: 'Physics', label: 'Physics' },
              { value: 'Geography', label: 'Geography' },
              { value: 'History', label: 'History' },
              { value: 'Math', label: 'Math' },
              { value: 'Portuguese', label: 'Portuguese' },
              { value: 'Chemistry', label: 'Chemistry' },
            ]}
          />
          <Select
            name="weekDay"
            label="Week day"
            value={weekDay}
            onChange={(e) => {
              setWeekDay(e.target.value)
            }}
            options={[
              { value: '0', label: 'Sunday' },
              { value: '1', label: 'Monday' },
              { value: '2', label: 'Tuesday' },
              { value: '3', label: 'Wednesday' },
              { value: '4', label: 'Thursday' },
              { value: '5', label: 'Friday' },
              { value: '6', label: 'Saturday' },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hour"
            value={time}
            onChange={(e) => {
              setTime(e.target.value)
            }}
          />
          <button type="submit">Search</button>
        </form>
      </PageHeader>

      <main>
        {teachers && teachers.length === 0 && (
          <h3 className="no-data">
            There is no data to display! Fill or change filters.
          </h3>
        )}
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />
        })}
      </main>
    </div>
  )
}

export default TeacherList
