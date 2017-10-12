import React from 'react';

import PlayerSearchBox from './PlayerSearchBox.js'
import ProfileCard from './ProfileCard.js'
import StatCard from './StatCard.js'
import SimilarPlayersCard from './SimilarPlayersCard.js'
import LeagueComparisonCard from './LeagueComparisonCard.js'
import lastSeasonData from '../2016-2017-data.js'

/* Import Style */
import '../style/components/App.css';

/* Import images */
import curryImg from '../img/curry.png';
import irvingImg from '../img/irving.png';
import wallImg from '../img/wall.png';
import westbrookImg from '../img/westbrook.png';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      'nbaData': lastSeasonData.playerstatsentry,
      'currentPlayer': {
        'playerName': 'Giannis Antetokounmpo',
        'img': irvingImg,
        'team': 'Minnesota Timberwolves',
        'position': 'Point Guard',
        'ppg': 21.0,
        'apg': 8.4,
        'rpg': 2.1,
      },
      'similarPlayersList': [
        {
          'playerName': 'Kentavious Caldwell-Pope',
          'img': curryImg,
          'ppg': 22.3,
          'apg': 6.6,
          'rpg': 2.1
        },
        {
          'playerName': 'John Wall',
          'img': wallImg,
          'ppg': 20.3,
          'apg': 6.6,
          'rpg': 5.1
        },
        {
          'playerName': 'Russell Westbrook',
          'img': westbrookImg,
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
  }

  /* Fetch data & trigger rest of the app */
  componentDidMount() {
    const nbaDataUrl = 'https://api.mysportsfeeds.com/v1.1/pull/nba/'
                       + '2016-2017-regular/cumulative_player_stats.json?'
                       + 'playerstats=PTS/G,AST/G,REB/G';
    fetch(nbaDataUrl, {
       method: 'get',
       headers: {
         'Authorization': 'Basic '+btoa('iNaesu:mysportsfeeds'),
         'Content-Type': 'application/x-www-form-urlencoded'
       }
    })
    .then(response => {
      return response.json();
    })
    .then(nbaData => {
      this.setState({
        'nbaData': nbaData.cumulativeplayerstats.playerstatsentry
      });
    })
    .then(() => {
      const data = this.state.nbaData;

      const pointsLeader = getLeagueLeader(data, 'PtsPerGame');
      const assistsLeader = getLeagueLeader(data, 'AstPerGame');
      const reboundsLeader = getLeagueLeader(data, 'RebPerGame');

      this.setState({
        'leagueStats': {
          'ppg': {
            'leagueLeaderName': pointsLeader.name,
            'leagueLeaderValue': pointsLeader.value,
            'leagueAverageValue': getLeagueAverage(data, 'PtsPerGame')
          },
          'apg': {
            'leagueLeaderName': assistsLeader.name,
            'leagueLeaderValue': assistsLeader.value,
            'leagueAverageValue': getLeagueAverage(data,'AstPerGame')
          },
          'rpg': {
            'leagueLeaderName': reboundsLeader.name,
            'leagueLeaderValue': reboundsLeader.value,
            'leagueAverageValue': getLeagueAverage(data,'RebPerGame')
          }
        }
      });
    });
  }

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
                playerName={this.state.currentPlayer.playerName}
                img={this.state.currentPlayer.img}
                team={this.state.currentPlayer.team}
                position={this.state.currentPlayer.position}
              />

              <div className='StatCards-wrapper'>
                <StatCard
                  id='ppg-card'
                  statName={['Points', 'Per Game']}
                  value={this.state.currentPlayer.ppg}
                  leagueLeaderValue={
                    this.state.leagueStats.ppg.leagueLeaderValue
                  }
                />
                <StatCard
                  id='apg-card'
                  statName={['Assists', 'Per Game']}
                  value={this.state.currentPlayer.apg}
                  leagueLeaderValue={
                    this.state.leagueStats.apg.leagueLeaderValue
                  }
                />
                <StatCard
                  id='rpg-card'
                  statName={['Rebounds', 'Per Game']}
                  value={this.state.currentPlayer.rpg}
                  leagueLeaderValue={
                    this.state.leagueStats.rpg.leagueLeaderValue
                  }
                />
              </div>
            </div>

            <SimilarPlayersCard
              similarPlayer0={this.state.similarPlayersList[0].playerName}
              img0={this.state.similarPlayersList[0].img}
              ppg0={this.state.similarPlayersList[0].ppg}
              apg0={this.state.similarPlayersList[0].apg}
              rpg0={this.state.similarPlayersList[0].rpg}

              similarPlayer1={this.state.similarPlayersList[1].playerName}
              img1={this.state.similarPlayersList[1].img}
              ppg1={this.state.similarPlayersList[1].ppg}
              apg1={this.state.similarPlayersList[1].apg}
              rpg1={this.state.similarPlayersList[1].rpg}

              similarPlayer2={this.state.similarPlayersList[2].playerName}
              img2={this.state.similarPlayersList[2].img}
              ppg2={this.state.similarPlayersList[2].ppg}
              apg2={this.state.similarPlayersList[2].apg}
              rpg2={this.state.similarPlayersList[2].rpg}
            />

            <LeagueComparisonCard
              playerName={this.state.currentPlayer.playerName}

              ppgLeaderName={this.state.leagueStats.ppg.leagueLeaderName}
              leaderPpg={this.state.leagueStats.ppg.leagueLeaderValue}
              playerPpg={this.state.currentPlayer.ppg}
              averagePpg={this.state.leagueStats.ppg.leagueAverageValue}

              apgLeaderName={this.state.leagueStats.apg.leagueLeaderName}
              leaderApg={this.state.leagueStats.apg.leagueLeaderValue}
              playerApg={this.state.currentPlayer.apg}
              averageApg={this.state.leagueStats.apg.leagueAverageValue}

              rpgLeaderName={this.state.leagueStats.rpg.leagueLeaderName}
              leaderRpg={this.state.leagueStats.rpg.leagueLeaderValue}
              playerRpg={this.state.currentPlayer.rpg}
              averageRpg={this.state.leagueStats.rpg.leagueAverageValue}
            />

          </div>
        </div>
      </div>
    );
  }
}

function errorMessage(message) {
  return 'Error: ' + message;
}

/**
 * Get the player name and stat value of the league leader of a given stat.
 * @param {Object} nbaData - Data fetched from sports API
 * @param {string} statDesc - Description of the stat (must match sports API)
 */
function getLeagueLeader(nbaData, statDesc) {
  if (!Array.isArray(nbaData)) {
    console.log(errorMessage('nbaData is not an array'));
  }
  if (typeof(statDesc) !== 'string') {
    console.log(errorMessage('statDesc is not a string'));
  }

  let leagueLeader = {
    'name': '',
    'value': 0
  };

  nbaData.forEach((datum, idx) => {
    if (!datum.hasOwnProperty('player')) {
      console.log(errorMessage('nbaData[' + idx + '] | No player property'));
    }
    if (!datum.hasOwnProperty('stats')) {
      console.log(errorMessage('nbaData[' + idx + '] | No stats property'));
    }

    const value = parseFloat(datum.stats[statDesc]['#text']);
    if (value > leagueLeader.value) {
      leagueLeader.value = value;
      leagueLeader.name = datum.player.FirstName + ' ' + datum.player.LastName;
    }
  });

  return leagueLeader;
}

/**
 * Get the leavue average value of a given stat.
 * @param {Object} nbaData - Data fetched from sports API
 * @param {string} statDesc - Description of the stat (must match sports API)
 */
function getLeagueAverage(nbaData, statDesc) {
  return 6.8;
}
