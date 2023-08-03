import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import giveClassesIcon from '../../assets/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/icons/purple-heart.svg'
import studyIcon from '../../assets/icons/study.svg'
import landingImg from '../../assets/images/landing.svg'
import logoImg from '../../assets/images/logo.svg'
import api from '../../services/api'
import { ConnectionsProps } from '../../types/connections'
import './styles.css'

function Landing() {
  const [totalConnections, setTotalConnections] = useState<number>(0)

  const getConnections = async () => {
    await api
      .get('/connections')
      .then((response: AxiosResponse<ConnectionsProps, unknown>) => {
        const { total } = response.data

        setTotalConnections(total)
      })
      .catch(() => alert("Couldn't get total connections!"))
  }

  useEffect(() => {
    getConnections()
  }, [])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy" />
          <h2>Your online study platform</h2>
        </div>
        <img src={landingImg} alt="Study platform" className="hero-image" />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Study" />
            Study
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Give classes" />
            Give classes
          </Link>
        </div>
        <span className="total-connections">
          Total of {totalConnections} connections already made!
          <img src={purpleHeartIcon} alt="Purple heart" />
        </span>
      </div>
    </div>
  )
}

export default Landing
