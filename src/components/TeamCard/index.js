// Write your code here

import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {eachTeam} = props
  const {id, name, teamImageUrl} = eachTeam
  return (
    <Link to={`/ipl/${id}`} className="team-card-link">
      <div className="team-card">
        <img className="team-card-img" src={teamImageUrl} alt={name} />
        <p className="team-card-name">{name}</p>
      </div>
    </Link>
  )
}

export default TeamCard
