import { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import warningIcon from '../../assets/icons/warning.svg'
import Input from '../../components/Input'
import PageHeader from '../../components/PageHeader'
import Select from '../../components/Select'
import Textarea from '../../components/Textarea'
import api from '../../services/api'
import { ClassSchedule } from '../../types/class'
import './styles.css'

function TeacherForm() {
  const history = useHistory()

  const [name, setName] = useState<string>('')
  const [avatar, setAvatar] = useState<string>('')
  const [whatsapp, setWhatsapp] = useState<string>('')
  const [bio, setBio] = useState<string>('')

  const [subject, setSubject] = useState<string>('')
  const [cost, setCost] = useState<string>('')

  const [scheduleItems, setScheduleItems] = useState<ClassSchedule[]>([
    { weekDay: 0, from: '', to: '' },
  ])

  function addNewScheduleItem(): void {
    setScheduleItems([...scheduleItems, { weekDay: 0, from: '', to: '' }])
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ): void {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })
    return setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(e: FormEvent): void {
    e.preventDefault()

    api
      .post('/classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Thanks for sign up!')
        history.push('/')
      })
      .catch(() => {
        alert('Registration error, please try again!')
      })
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="How amazing you want to teach!"
        description="The first step is to complete this registration form"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Your data</legend>
            <Input
              name="name"
              label="Full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value)
              }}
            />
            <Input
              name="whatsapp"
              label="WhatsApp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value)
              }}
            />
            <Textarea
              name="bio"
              label="Biography"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value)
              }}
            />
          </fieldset>
          <fieldset>
            <legend>About class</legend>
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
            <Input
              name="cost"
              label="Cost per hour of class"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value)
              }}
            />
          </fieldset>
          <fieldset>
            <legend>
              Available schedules
              <button type="button" onClick={addNewScheduleItem}>
                + New schedule
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.weekDay} className="schedule-item">
                  <Select
                    name="weekDay"
                    label="Week day"
                    value={scheduleItem.weekDay}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'weekDay', e.target.value)
                    }
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
                    name="from"
                    label="From"
                    type="time"
                    value={scheduleItem.from}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'from', e.target.value)
                    }
                  />
                  <Input
                    name="to"
                    label="To"
                    type="time"
                    value={scheduleItem.to}
                    onChange={(e) =>
                      setScheduleItemValue(index, 'to', e.target.value)
                    }
                  />
                </div>
              )
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Notice important" />
              Important! <br />
              Fill all data
            </p>
            <button type="submit">Sign up</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm
