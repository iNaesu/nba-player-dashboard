import React from 'react';
import '../style/components/App.css';
/* Import components */
import PlayerSearchBox from './PlayerSearchBox.js'
import ProfileCard from './ProfileCard.js'
import StatCard from './StatCard.js'
import SimilarPlayersCard from './SimilarPlayersCard.js'
import LeagueComparisonCard from './LeagueComparisonCard.js'

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='content-wrapper'>
          <h1 className='title'>NBA Player Dashboard</h1>

          <PlayerSearchBox placeholderText='Player Search' />

          <ProfileCard
            playerName={this.props.currentPlayer.playerName}
            img={this.props.currentPlayer.img}
            team={this.props.currentPlayer.team}
            position={this.props.currentPlayer.position}
          />

          <div className='stats-wrapper'>
            <StatCard
              statName='ppg' value={this.props.currentPlayer.ppg}
              leagueLeaderValue={this.props.leagueStats.ppg.leagueLeaderValue}
            />
            <StatCard
              statName='apg' value={this.props.currentPlayer.apg}
              leagueLeaderValue={this.props.leagueStats.apg.leagueLeaderValue}
            />
            <StatCard
              statName='rpg' value={this.props.currentPlayer.rpg}
              leagueLeaderValue={this.props.leagueStats.rpg.leagueLeaderValue}
            />
          </div>

          <SimilarPlayersCard
            similarPlayer0={this.props.similarPlayersList[0].playerName}
            img0={this.props.similarPlayersList[0].img}
            ppg0={this.props.similarPlayersList[0].ppg}
            apg0={this.props.similarPlayersList[0].apg}
            rpg0={this.props.similarPlayersList[0].rpg}

            similarPlayer1={this.props.similarPlayersList[1].playerName}
            img1={this.props.similarPlayersList[1].img}
            ppg1={this.props.similarPlayersList[1].ppg}
            apg1={this.props.similarPlayersList[1].apg}
            rpg1={this.props.similarPlayersList[1].rpg}

            similarPlayer2={this.props.similarPlayersList[2].playerName}
            img2={this.props.similarPlayersList[2].img}
            ppg2={this.props.similarPlayersList[2].ppg}
            apg2={this.props.similarPlayersList[2].apg}
            rpg2={this.props.similarPlayersList[2].rpg}

            similarPlayer3={this.props.similarPlayersList[3].playerName}
            img3={this.props.similarPlayersList[3].img}
            ppg3={this.props.similarPlayersList[3].ppg}
            apg3={this.props.similarPlayersList[3].apg}
            rpg3={this.props.similarPlayersList[3].rpg}
          />

          <LeagueComparisonCard
            playerName={this.props.currentPlayer.playerName}

            ppgLeaderName={this.props.leagueStats.ppg.leagueLeaderName}
            leaderPpg={this.props.leagueStats.ppg.leagueLeaderValue}
            playerPpg={this.props.currentPlayer.ppg}
            averagePpg={this.props.leagueStats.ppg.leagueAverageValue}

            apgLeaderName={this.props.leagueStats.apg.leagueLeaderName}
            leaderApg={this.props.leagueStats.apg.leagueLeaderValue}
            playerApg={this.props.currentPlayer.apg}
            averageApg={this.props.leagueStats.apg.leagueAverageValue}

            rpgLeaderName={this.props.leagueStats.rpg.leagueLeaderName}
            leaderRpg={this.props.leagueStats.rpg.leagueLeaderValue}
            playerRpg={this.props.currentPlayer.rpg}
            averageRpg={this.props.leagueStats.rpg.leagueAverageValue}
          />
        </div>
      </div>
    );
  }
}

App.defaultProps = {
  'currentPlayer': {
    'playerName': 'Kyrie Irving',
    'img': 'img/irving.png',
    'team': 'Cleveland Cavaliers',
    'position': 'Point Guard',
    'ppg': 21.4,
    'apg': 8.4,
    'rpg': 2.1,
  },
  'similarPlayersList': [
    {
      'playerName': 'Stephen Curry',
      'img': 'img/curry.png',
      'ppg': 22.3,
      'apg': 6.6,
      'rpg': 2.1
    },
    {
      'playerName': 'John Wall',
      'img': 'img/wall.png',
      'ppg': 20.3,
      'apg': 6.6,
      'rpg': 5.1
    },
    {
      'playerName': 'Russell Westbrook',
      'img': 'img/westbrook.png',
      'ppg': 32,
      'apg': 10,
      'rpg': 11
    },
    {
      'playerName': 'Isaiah Thomas',
      'img': 'img/thomas.png',
      'ppg': 29,
      'apg': 6.6,
      'rpg': 1.1
    }
  ],
  'leagueStats': {
    'ppg': {
      'leagueLeaderName': 'Russell Westbrook',
      'leagueLeaderValue': 32,
      'leagueAverageValue': 5.4
    },
    'apg': {
      'leagueLeaderName': 'James Harden',
      'leagueLeaderValue': 12.8,
      'leagueAverageValue': 2.4
    },
    'rpg': {
      'leagueLeaderName': 'Hassan Whiteside',
      'leagueLeaderValue': 15,
      'leagueAverageValue': 6.4
    }
  }
}
