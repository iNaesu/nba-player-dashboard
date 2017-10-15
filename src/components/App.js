import React from 'react';

import PlayerSearchBox from './PlayerSearchBox.js'
import ProfileCard from './ProfileCard.js'
import StatCard from './StatCard.js'
import SimilarPlayersCard from './SimilarPlayersCard.js'
import LeagueComparisonCard from './LeagueComparisonCard.js'
import lastSeasonData from '../2016-2017-data.js'
import throwError from '../error.js'

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
      'playerInfo': {
        'firstName': '',
        'lastName': '',
        'img': irvingImg,
        'team': '',
        'position': '',
        'ppg': 0,
        'apg': 0,
        'rpg': 0,
      },
      'similarPlayersList': [
        {
          'firstName': 'Kentavious',
          'lastName': 'Caldwell-pope',
          'img': curryImg,
          'ppg': 22.3,
          'apg': 6.6,
          'rpg': 2.1
        },
        {
          'firstName': 'John',
          'lastName': 'Wall',
          'img': wallImg,
          'ppg': 20.3,
          'apg': 6.6,
          'rpg': 5.1
        },
        {
          'firstName': 'Russell',
          'lastName': 'Westbrook',
          'img': westbrookImg,
          'ppg': 32.0,
          'apg': 10.0,
          'rpg': 11.8
        }
      ],
      'leagueStats': {
        'ppg': {
          'firstName': '',
          'lastName': '',
          'leagueLeaderValue': 0,
          'leagueAverageValue': 0
        },
        'apg': {
          'firstName': '',
          'lastName': '',
          'leagueLeaderValue': 0,
          'leagueAverageValue': 0
        },
        'rpg': {
          'firstName': '',
          'lastName': '',
          'leagueLeaderValue': 0,
          'leagueAverageValue': 0
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
    /* save nbaData */
    .then(nbaData => {
      this.setState({
        'nbaData': nbaData.cumulativeplayerstats.playerstatsentry
      });
    })
    /* get league stats */
    .then(() => {
      const nbaData = this.state.nbaData;

      const pointsLeader = getLeagueLeader(nbaData, 'PtsPerGame');
      const assistsLeader = getLeagueLeader(nbaData, 'AstPerGame');
      const reboundsLeader = getLeagueLeader(nbaData, 'RebPerGame');

      const leagueStats = {
        'ppg': {
          'firstName': pointsLeader.firstName,
          'lastName': pointsLeader.lastName,
          'leagueLeaderValue': pointsLeader.value,
          'leagueAverageValue': getLeagueAverage(nbaData, 'PtsPerGame')
        },
        'apg': {
          'firstName': assistsLeader.firstName,
          'lastName': assistsLeader.lastName,
          'leagueLeaderValue': assistsLeader.value,
          'leagueAverageValue': getLeagueAverage(nbaData,'AstPerGame')
        },
        'rpg': {
          'firstName': reboundsLeader.firstName,
          'lastName': reboundsLeader.lastName,
          'leagueLeaderValue': reboundsLeader.value,
          'leagueAverageValue': getLeagueAverage(nbaData,'RebPerGame')
        }
      };
      this.setState({
        'leagueStats': leagueStats,
      });
      console.log(leagueStats);
    })
    /* Get player info and similar players */
    .then(() => {
      const player = getRandomPlayerName();
      getPlayerInfo(
        this.state.nbaData, player.firstName, player.lastName
      )
      .then(playerInfo => {
        console.log(playerInfo);
        this.setState({
          'playerInfo': playerInfo,
        });
      })
      .catch(error => {
        throwError('getPlayerInfo() | ' + error);
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
                firstName={this.state.playerInfo.firstName}
                lastName={this.state.playerInfo.lastName}
                img={this.state.playerInfo.img}
                team={this.state.playerInfo.team}
                position={this.state.playerInfo.position}
              />

              <div className='StatCards-wrapper'>
                <StatCard
                  id='ppg-card'
                  statName={['Points', 'Per Game']}
                  value={this.state.playerInfo.ppg}
                  leagueLeaderValue={
                    this.state.leagueStats.ppg.leagueLeaderValue
                  }
                />
                <StatCard
                  id='apg-card'
                  statName={['Assists', 'Per Game']}
                  value={this.state.playerInfo.apg}
                  leagueLeaderValue={
                    this.state.leagueStats.apg.leagueLeaderValue
                  }
                />
                <StatCard
                  id='rpg-card'
                  statName={['Rebounds', 'Per Game']}
                  value={this.state.playerInfo.rpg}
                  leagueLeaderValue={
                    this.state.leagueStats.rpg.leagueLeaderValue
                  }
                />
              </div>
            </div>

            <SimilarPlayersCard
              firstName0={this.state.similarPlayersList[0].firstName}
              lastName0={this.state.similarPlayersList[0].lastName}
              img0={this.state.similarPlayersList[0].img}
              ppg0={this.state.similarPlayersList[0].ppg}
              apg0={this.state.similarPlayersList[0].apg}
              rpg0={this.state.similarPlayersList[0].rpg}

              firstName1={this.state.similarPlayersList[1].firstName}
              lastName1={this.state.similarPlayersList[1].lastName}
              img1={this.state.similarPlayersList[1].img}
              ppg1={this.state.similarPlayersList[1].ppg}
              apg1={this.state.similarPlayersList[1].apg}
              rpg1={this.state.similarPlayersList[1].rpg}

              firstName2={this.state.similarPlayersList[2].firstName}
              lastName2={this.state.similarPlayersList[2].lastName}
              img2={this.state.similarPlayersList[2].img}
              ppg2={this.state.similarPlayersList[2].ppg}
              apg2={this.state.similarPlayersList[2].apg}
              rpg2={this.state.similarPlayersList[2].rpg}
            />

            <LeagueComparisonCard
              firstName={this.state.playerInfo.firstName}
              lastName={this.state.playerInfo.lastName}

              ppgLeaderFirstName={this.state.leagueStats.ppg.firstName}
              ppgLeaderLastName={this.state.leagueStats.ppg.lastName}
              leaderPpg={this.state.leagueStats.ppg.leagueLeaderValue}
              playerPpg={this.state.playerInfo.ppg}
              averagePpg={this.state.leagueStats.ppg.leagueAverageValue}

              apgLeaderFirstName={this.state.leagueStats.apg.firstName}
              apgLeaderLastName={this.state.leagueStats.apg.lastName}
              leaderApg={this.state.leagueStats.apg.leagueLeaderValue}
              playerApg={this.state.playerInfo.apg}
              averageApg={this.state.leagueStats.apg.leagueAverageValue}

              rpgLeaderFirstName={this.state.leagueStats.rpg.firstName}
              rpgLeaderLastName={this.state.leagueStats.rpg.lastName}
              leaderRpg={this.state.leagueStats.rpg.leagueLeaderValue}
              playerRpg={this.state.playerInfo.rpg}
              averageRpg={this.state.leagueStats.rpg.leagueAverageValue}
            />

          </div>
        </div>
      </div>
    );
  }
}

/**
 * Get the player name and stat value of the league leader of a given stat.
 * @param {Object} nbaData - nbaData fetched from sports API
 * @param {string} statDesc - Description of the stat (must match sports API)
 */
function getLeagueLeader(nbaData, statDesc) {
  if (!Array.isArray(nbaData)) {
    throwError('getLeagueLeader() | nbaData is not an array');
  }
  if (typeof(statDesc) !== 'string') {
    throwError('getLeagueLeader() | statDesc is not a string');
  }

  let leagueLeader = {
    'firstName': '',
    'lastName': '',
    'value': 0
  };

  nbaData.forEach((datum, idx) => {
    const value = parseFloat(datum.stats[statDesc]['#text']);
    if (value > leagueLeader.value) {
      leagueLeader.value = value;
      leagueLeader.firstName = datum.player.FirstName;
      leagueLeader.lastName = datum.player.LastName;
    }
  });

  return leagueLeader;
}

/**
 * Get the league average value of a given stat.
 * @param {Object} nbaData - Data fetched from sports API
 * @param {string} statDesc - Description of the stat (must match sports API)
 */
function getLeagueAverage(nbaData, statDesc) {
  if (!Array.isArray(nbaData)) {
    throwError('getLeagueAverage() | nbaData is not an array');
  }
  if (typeof(statDesc) !== 'string') {
    throwError('getLeagueAverage() | statDesc is not a string');
  }

  const total = nbaData.reduce((currentTotal, datum) => {
    return (currentTotal + parseFloat(datum.stats[statDesc]['#text']));
  }, 0);

  return total / nbaData.length;
}

/**
 * Return the first and last name of a random player.
 */
function getRandomPlayerName() {
  const playerList = [
    { 'firstName': 'LeBron', 'lastName': 'James' },
    { 'firstName': 'Stephen', 'lastName': 'Curry' },
    { 'firstName': 'Kevin', 'lastName': 'Durant' },
    { 'firstName': 'Russell', 'lastName': 'Westbrook' },
    { 'firstName': 'James', 'lastName': 'Harden' },
    { 'firstName': 'Kawhi', 'lastName': 'Leonard' },
    { 'firstName': 'Anthony', 'lastName': 'Davis' },
    { 'firstName': 'Chris', 'lastName': 'Paul' },
    { 'firstName': 'Jimmy', 'lastName': 'Butler' },
    { 'firstName': 'Kyrie', 'lastName': 'Irving' },
  ];

  const i = Math.floor(Math.random() * (playerList.length - 1));
  return {
    'firstName': playerList[i].firstName,
    'lastName':playerList[i].lastName
  };
}

/**
 * Return info for the given player
 * @param {Object} nbaData - Data fetched from sports API
 * @param {String} firstName
 * @param {String} lastName
 */
function getPlayerInfo(nbaData, firstName, lastName) {
  return new Promise(function(resolve, reject) {
    const baseUrl = 'http://localhost:8000/players/';
    const fullUrl = baseUrl + lastName + '/' + firstName;
    let playerInfo = {
      'firstName': '',
      'lastName': '',
      'img': '',
      'team': '',
      'position': '',
      'ppg': 0,
      'apg': 0,
      'rpg': 0
    };

    /* Fetch image first before getting other details because the image takes
     * the longest */
    fetch(fullUrl, { mode: 'cors' })
    .then(response => {
      return response.blob();
    })
    .then(responseBlob => {
      playerInfo.img = URL.createObjectURL(responseBlob);

      for (let i = 0; i < nbaData.length; i++) {
        if (
          (nbaData[i].player.FirstName === firstName)
          && (nbaData[i].player.LastName === lastName)
        ) {
          playerInfo.firstName = nbaData[i].player.FirstName;
          playerInfo.lastName = nbaData[i].player.LastName;
          playerInfo.position = getFullPositionName(nbaData[i].player.Position);
          playerInfo.team = nbaData[i].team.City + ' ' + nbaData[i].team.Name;
          playerInfo.ppg = parseFloat(nbaData[i].stats.PtsPerGame['#text']);
          playerInfo.apg = parseFloat(nbaData[i].stats.AstPerGame['#text']);
          playerInfo.rpg = parseFloat(nbaData[i].stats.RebPerGame['#text']);
        }
      }
      resolve(playerInfo);
    })
    .catch(error => {
      reject(error);
    });
  });
}

/**
 * Return the full name for a given a position given it's acronym.
 * @param {String} position - PG, SG, SF, PF or C
 */
function getFullPositionName(position) {
  let fullPositionName = 'Invalid';

  switch(position) {
    case 'PG':
      fullPositionName = 'Point Guard';
      break;
    case 'SG':
      fullPositionName = 'Shooting Guard';
      break;
    case 'SF':
      fullPositionName = 'Small Forward';
      break;
    case 'PF':
      fullPositionName = 'Power Forward';
      break;
    case 'C':
      fullPositionName = 'Center';
      break;
    default:
  }

  return fullPositionName;
}
