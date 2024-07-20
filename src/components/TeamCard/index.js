// Write your code here

import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam
  return (
    <li className="team-card-item">
      <Link to={`/ipl/${id}`} className="team-card-link">
        <div className="team-card">
          <img className="team-card-img" src={teamImageUrl} alt={name} />
          <p className="team-card-name">{name}</p>
        </div>
      </Link>
    </li>
  )
}

export default TeamCard
