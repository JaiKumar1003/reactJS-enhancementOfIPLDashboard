// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatchesObject: [], isLoading: true}

  componentDidMount() {
    this.getTeamMatchesObject()
  }

  getTeamMatchesObject = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
      teamBannerUrl: data.team_banner_url,
    }

    this.setState({teamMatchesObject: updatedData, isLoading: false})
  }

  renderLoader = () => (
    <div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  getRecentMatchesList = recentMatches => {
    const newRecentMatch = recentMatches.map(eachItem => ({
      id: eachItem.id,
      umpires: eachItem.umpires,
      result: eachItem.result,
      date: eachItem.date,
      venue: eachItem.venue,
      manOfTheMatch: eachItem.man_of_the_match,
      competingTeam: eachItem.competing_team,
      competingTeamLogo: eachItem.competing_team_logo,
      firstInnings: eachItem.first_innings,
      secondInnings: eachItem.second_innings,
      matchStatus: eachItem.match_status,
    }))

    return newRecentMatch
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const teamMatchBg = `team-match-${id.toLowerCase()}`
    const {teamMatchesObject, isLoading} = this.state
    const {latestMatchDetails, recentMatches, teamBannerUrl} = teamMatchesObject
    const updatedRecentMatch =
      recentMatches !== undefined
        ? this.getRecentMatchesList(recentMatches)
        : []

    return (
      <div className={`team-match-container ${teamMatchBg}`}>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="team-match-card">
            <img
              className="team-match-banner"
              src={teamBannerUrl}
              alt="team banner"
            />
            <p className="latest-match-heading">Latest Matches</p>
            <div className="latest-match-contianer">
              <LatestMatch latestMatchDetails={latestMatchDetails} />
            </div>
            <ul className="recent-card">
              {updatedRecentMatch.map(eachItem => (
                <MatchCard eachItem={eachItem} key={eachItem.id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
