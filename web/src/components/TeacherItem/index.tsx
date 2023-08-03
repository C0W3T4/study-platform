import whatsappIcon from '../../assets/icons/whatsapp.svg'
import api from '../../services/api'
import { Teacher } from '../../types/teacher'
import './styles.css'

interface TeacherItemProps {
  teacher: Teacher
}

const TeacherItem = ({ teacher }: TeacherItemProps) => {
  const createNewConnection = async () =>
    await api
      .post('/connections', {
        userId: teacher.id,
      })
      .then(() => alert('Connection made!'))
      .catch(() => alert("Could'nt made a connection!"))

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>
      <p>{teacher.bio}</p>
      <footer>
        <p>
          Price/Hour
          <strong>{teacher.cost} €</strong>
        </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            createNewConnection()
          }}
          href={`https://wa.me/${teacher.whatsapp}`}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Get in touch
        </a>
      </footer>
    </article>
  )
}

export default TeacherItem
