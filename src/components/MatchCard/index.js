// Write your code here

import './index.css'

const MatchCard = props => {
  const {eachItem} = props
  const {result, competingTeam, competingTeamLogo, matchStatus} = eachItem

  return (
    <li className="each-recent-card-bg">
      <img
        className="recent-img"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p className="recent-team-name">{competingTeam}</p>
      <p className="recent-team-result">{result}</p>
      {matchStatus === 'Won' ? (
        <p className="recent-team-status">{matchStatus}</p>
      ) : (
        <p className="recent-style-status">{matchStatus}</p>
      )}
    </li>
  )
}

export default MatchCard
