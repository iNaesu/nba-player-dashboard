import React from 'react';
/* Import components */
import PlayerSearchBox from './PlayerSearchBox.js'
import ProfileCard from './ProfileCard.js'
import StatCard from './StatCard.js'
import SimilarPlayersCard from './SimilarPlayersCard.js'
import LeagueComparisonCard from './LeagueComparisonCard.js'
import '../style/components/App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <div className='content-wrapper'>
          <h1 className='title'>NBA Player Dashboard</h1>

          <div className='PlayerSearchBox-wrapper'>
            <PlayerSearchBox placeholderText='Player Search' />
          </div>

          <div className='all-data-cards-wrapper'>

            <div className='ProfileCard-StatCards-wrapper'>
              <ProfileCard
                playerName={this.props.currentPlayer.playerName}
                img={this.props.currentPlayer.img}
                team={this.props.currentPlayer.team}
                position={this.props.currentPlayer.position}
              />

              <div className='StatCards-wrapper'>
                <StatCard
                  id='ppg-card'
                  statName={['Points', 'Per Game']}
                  value={this.props.currentPlayer.ppg}
                  leagueLeaderValue={
                    this.props.leagueStats.ppg.leagueLeaderValue
                  }
                />
                <StatCard
                  id='apg-card'
                  statName={['Assists', 'Per Game']}
                  value={this.props.currentPlayer.apg}
                  leagueLeaderValue={
                    this.props.leagueStats.apg.leagueLeaderValue
                  }
                />
                <StatCard
                  id='rpg-card'
                  statName={['Rebounds', 'Per Game']}
                  value={this.props.currentPlayer.rpg}
                  leagueLeaderValue={
                    this.props.leagueStats.rpg.leagueLeaderValue
                  }
                />
              </div>
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
      </div>
    );
  }
}

App.defaultProps = {
  'currentPlayer': {
    'playerName': 'Giannis Antetokounmpo',
    'img': 'img/irving.png',
    'team': 'Minnesota Timberwolves',
    'position': 'Point Guard',
    'ppg': 21.0,
    'apg': 8.4,
    'rpg': 2.1,
  },
  'similarPlayersList': [
    {
      'playerName': 'Kentavious Caldwell-Pope',
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
      'ppg': 32.0,
      'apg': 10.0,
      'rpg': 11.8
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
