// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import {PieChart, Pie, Sector, Cell, ResponsiveContainer} from 'recharts'

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
    <div data-testid="loader">
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

  onClickBackBtn = () => {
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const teamMatchBg = `team-match-${id.toLowerCase()}`
    const {teamMatchesObject, isLoading} = this.state
    const {latestMatchDetails, recentMatches, teamBannerUrl} = teamMatchesObject
    console.log(recentMatches)
    const updatedRecentMatch =
      recentMatches !== undefined
        ? this.getRecentMatchesList(recentMatches)
        : []

    let wonCount = 0
    let lostCount = 0
    let drawCount = 0

    updatedRecentMatch.forEach(eachMatch => {
      if (eachMatch.matchStatus === 'Won') {
        wonCount += 1
      } else if (eachMatch.matchStatus === 'Lost') {
        lostCount += 1
      } else {
        drawCount += 1
      }
    })

    const data = [
      {name: 'Won', value: wonCount},
      {name: 'Lost', value: lostCount},
    ]

    const COLORS = ['#41c95a', '#de2124']

    if (drawCount !== 0) {
      data.push({name: 'Drawn', value: drawCount})
      COLORS.push('#27afbe')
    }

    const RADIAN = Math.PI / 180
    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent,
      index,
    }: any) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5
      const x = cx + radius * Math.cos(-midAngle * RADIAN)
      const y = cy + radius * Math.sin(-midAngle * RADIAN)

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      )
    }

    return (
      <div className={`team-match-container ${teamMatchBg}`}>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <div className="team-match-card">
            <button
              type="button"
              className="back-button"
              onClick={this.onClickBackBtn}
            >
              Back
            </button>
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
            <div className="piechart-card">
              <div className="piechart-heading-statistics-card">
                <p className="piechart-heading">Pie Chart</p>
                <ul className="piechart-statistics-list">
                  <li className="statistics-item won-item">Won</li>
                  <li className="statistics-item lost-item">Lost</li>
                  <li className="statistics-item drawn-item">Drawn</li>
                </ul>
              </div>
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
