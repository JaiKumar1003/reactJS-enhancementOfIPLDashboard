// Write your code here

import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const updatedMatch = {
    id: latestMatchDetails.id,
    umpires: latestMatchDetails.umpires,
    result: latestMatchDetails.result,
    date: latestMatchDetails.date,
    venue: latestMatchDetails.venue,
    manOfTheMatch: latestMatchDetails.man_of_the_match,
    competingTeam: latestMatchDetails.competing_team,
    competingTeamLogo: latestMatchDetails.competing_team_logo,
    firstInnings: latestMatchDetails.first_innings,
    secondInnings: latestMatchDetails.second_innings,
    matchStatus: latestMatchDetails.match_status,
  }

  const renderLastestMatchInningsCard = () => {
    const {umpires, manOfTheMatch, firstInnings, secondInnings} = updatedMatch

    return (
      <div className="recent-match-innings-umpire-card">
        <p className="recent-match-inning-player-heading">First Innings</p>
        <p className="recent-match-team-player-name">{firstInnings}</p>
        <p className="recent-match-inning-player-heading">Second Innings</p>
        <p className="recent-match-team-player-name">{secondInnings}</p>
        <p className="recent-match-inning-player-heading">Man Of The Match</p>
        <p className="recent-match-team-player-name">{manOfTheMatch}</p>
        <p className="recent-match-inning-player-heading">Umpires</p>
        <p className="recent-match-team-player-name">{umpires}</p>
      </div>
    )
  }

  const renderLastestMatchLogoCard = () => {
    const {result, date, venue, competingTeam, competingTeamLogo} = updatedMatch

    return (
      <div className="team-result-logo-card">
        <div className="recent-team-result-card">
          <p className="competing-team">{competingTeam}</p>
          <p className="date">{date}</p>
          <p className="venue">{venue}</p>
          <p className="result">{result}</p>
        </div>
        <img
          className="recent-match-logo"
          src={competingTeamLogo}
          alt={competingTeam}
        />
      </div>
    )
  }

  return (
    <div className="team-latest-match-card">
      {renderLastestMatchLogoCard()}
      {renderLastestMatchInningsCard()}
    </div>
  )
}

export default LatestMatch
