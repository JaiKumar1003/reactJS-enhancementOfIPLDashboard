// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamCardList: [], isLoading: true}

  componentDidMount() {
    this.getTeamCardList()
  }

  getTeamCardList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({teamCardList: updatedData, isLoading: false})
  }

  renderLoader = () => (
    <div>
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {teamCardList, isLoading} = this.state
    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="ipl-logo-card">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="main-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            this.renderLoader()
          ) : (
            <div className="team-card-list">
              {teamCardList.map(eachTeam => (
                <TeamCard eachTeam={eachTeam} key={eachTeam.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
