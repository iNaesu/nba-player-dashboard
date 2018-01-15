import React from 'react';

import PlayerSearchBox from './PlayerSearchBox.js'
import AppStateScreen from './AppStateScreen.js'
import ProfileCard from './ProfileCard.js'
import StatCard from './StatCard.js'
import SimilarPlayersCard from './SimilarPlayersCard.js'
import LeagueComparisonCard from './LeagueComparisonCard.js'
import { cachedData } from '../cachedData.js'

/* Import Style */
import '../style/components/App.css';

/* Import images */
import genericPlayerImg from '../img/generic-player.png';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      'appState': 'loading',
      'nbaData': cachedData.cumulativeplayerstats.playerstatsentry,
      'playerInfo': {
        'firstName': '',
        'lastName': '',
        'img': genericPlayerImg,
        'team': '',
        'position': '',
        'ppg': 0,
        'apg': 0,
        'rpg': 0,
      },
      'similarPlayersList': [
        {
          'firstName': '',
          'lastName': '',
          'img': genericPlayerImg,
          'ppg': 0,
          'apg': 0,
          'rpg': 0
        },
        {
          'firstName': '',
          'lastName': '',
          'img': genericPlayerImg,
          'ppg': 0,
          'apg': 0,
          'rpg': 0
        },
        {
          'firstName': '',
          'lastName': '',
          'img': genericPlayerImg,
          'ppg': 0,
          'apg': 0,
          'rpg': 0
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

  componentDidMount() {
    this.setState({
      'appState': 'loading'
    });
    /* Fetch data & trigger rest of the app */
    const nbaDataUrl = 'https://api.mysportsfeeds.com/v1.1/pull/nba/'
                       + '2017-2018-regular/cumulative_player_stats.json?'
                       + 'playerstats=PTS/G,AST/G,REB/G';
    const fetchOptions = {
      method: 'get',
      headers: {
        'Authorization': 'Basic '+btoa('iNaesu:mysportsfeeds'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    Promise.race([
      fetch(nbaDataUrl, fetchOptions),
      timeout(7500, 'NBA data fetch failed. Using cached data instead')
    ])
    .then(
      response => response.json(),
      /* Just log error to console. Dont tell the user */
      error => console.log(error)
    )
    /* save nbaData */
    .then(nbaData => {
      if (nbaData) {
        this.setState({
          'nbaData': nbaData.cumulativeplayerstats.playerstatsentry
        });
      }
    })
    .then(() => {
      const player = getRandomPlayerName();
      /* Get player info */
      const p1 = getPlayerInfo(
        this.state.nbaData, player.firstName, player.lastName
      );
      /* Get similar players list */
      const p2 = getSimilarPlayersList(
        this.state.nbaData, player.firstName, player.lastName
      );

      Promise.all([p1, p2])
      .then(values => {
        /* Get league stats */
        const leagueStats = getLeagueStats(this.state.nbaData);
        const playerInfo = values[0];
        const similarPlayersList = values[1];

        /* All the data is ready! Set state to trigger app render */
        this.setState({
          'appState': 'ready',
          'playerInfo': playerInfo,
          'similarPlayersList': similarPlayersList,
          'leagueStats': leagueStats
        });
      })
      .catch(error => {
        this.setState({
          'appState': 'error'
        });
        console.log('Error: ' + error);
      });
    });
  }

  /* Process current player:
   * - get player info
   * - compute similar players
   */
  processPlayer = (
    event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    const firstName = suggestion.player.FirstName;
    const lastName = suggestion.player.LastName;

    /* Display loading screen */
    this.setState({
      'appState': 'loading'
    });
    /* Get player info */
    const p1 = getPlayerInfo(this.state.nbaData, firstName, lastName);
    /* Get similar players list */
    const p2 = getSimilarPlayersList(this.state.nbaData, firstName, lastName);

    Promise.all([p1, p2])
    .then(values => {
      const playerInfo = values[0];
      const similarPlayersList = values[1];

      /* All the data is ready! Set state to trigger app render */
      this.setState({
        'playerInfo': playerInfo,
        'similarPlayersList': similarPlayersList,
        'appState': 'ready'
      });
    })
    .catch(error => {
      this.setState({
        'appState': 'error'
      });
      console.log('Error: ' + error);
    });
  }

  render() {
    return (
      <div className='App'>
        <AppStateScreen appState={this.state.appState} />

        <div className='content-wrapper'>
          <h1 className='title'>NBA Player Dashboard</h1>

          <div className='PlayerSearchBox-wrapper'>
            <PlayerSearchBox
              placeholderText='Player Search'
              nbaData={this.state.nbaData}
              callback={this.processPlayer}
            />
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

          <div className='about-wrapper'>
            {'Built with '}
            <a href='https://github.com/facebookincubator/create-react-app'
            target='_blank' rel='noopener noreferrer'>{'Create React App'}</a> {' & '}
            <a href='http://formidable.com/open-source/victory/' target='_blank' rel='noopener noreferrer'>
            {'Victory Charts'}</a>

            <div className='social-icons'>
              <a href='https://github.com/iNaesu/nba-player-dashboard' target='_blank' rel='noopener noreferrer'>
                <i className="fab fa-2x fa-github"></i>
              </a>
              <a href='https://seanlaw.io' target='_blank' rel='noopener noreferrer'>
                <i className="fas fa-2x fa-file-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Get the player name and stat value of the league leader of a given stat.
 *
 * @param {Object} nbaData - nbaData fetched from sports API
 * @param {string} statDesc - Description of the stat (must match sports API)
 * @return {Object} leagueLeader
 */
function getLeagueLeader(nbaData, statDesc) {
  if (!Array.isArray(nbaData)) {
    this.setState({
      'appState': 'error'
    });
    console.log('Error: getLeagueLeader() | nbaData is not an array');
  }
  if (typeof(statDesc) !== 'string') {
    this.setState({
      'appState': 'error'
    });
    console.log('Error: getLeagueLeader() | statDesc is not a string');
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
 *
 * @param {Object} nbaData
 * @param {string} statDesc - Description of the stat (must match sports API)
 * @return {Number} league average for a given stat
 */
function getLeagueAverage(nbaData, statDesc) {
  if (!Array.isArray(nbaData)) {
    this.setState({
      'appState': 'error'
    });
    console.log('Error: getLeagueAverage() | nbaData is not an array');
  }
  if (typeof(statDesc) !== 'string') {
    this.setState({
      'appState': 'error'
    });
    console.log('getLeagueAverage() | statDesc is not a string');
  }

  const total = nbaData.reduce((currentTotal, datum) => {
    return (currentTotal + parseFloat(datum.stats[statDesc]['#text']));
  }, 0);

  return total / nbaData.length;
}

/**
 * Get league stats (league leader name + stat & league average)
 *
 * @param {Object} nbaData
 * @return {Object} leagueStats - compatible with state.leagueStats
 */
function getLeagueStats(nbaData) {
  const pointsLeader = getLeagueLeader(nbaData, 'PtsPerGame');
  const assistsLeader = getLeagueLeader(nbaData, 'AstPerGame');
  const reboundsLeader = getLeagueLeader(nbaData, 'RebPerGame');

  return {
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
}

/**
 * Return the first and last name of a random player.
 *
 * @return {Object} player - Random player from a list
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
    { 'firstName': 'DeMarcus', 'lastName': 'Cousins' },
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
 * Return a promise that resolves with a player info object for the given player
 * (in a form that is compatible with state.playerInfo)
 *
 * @param {Object} nbaData
 * @param {String} firstName
 * @param {String} lastName
 * @return {Promise} resolve(playerInfo) - compatible with state.playerInfo
 */
function getPlayerInfo(nbaData, firstName, lastName) {
  return new Promise((resolve, reject) => {
    let playerInfo = {};

    /* Search for player */
    const p = getPlayerFromList(nbaData, firstName, lastName);
    if (!p) {
      reject('getPlayerInfo() | ' + firstName + ' ' + lastName +' not found');
    }
    playerInfo.firstName = p.player.FirstName;
    playerInfo.lastName = p.player.LastName;
    playerInfo.position = getFullPositionName(p.player.Position);
    playerInfo.team = p.team.City + ' ' + p.team.Name;
    playerInfo.ppg = parseFloat(p.stats.PtsPerGame['#text']);
    playerInfo.apg = parseFloat(p.stats.AstPerGame['#text']);
    playerInfo.rpg = parseFloat(p.stats.RebPerGame['#text']);
    playerInfo.img = genericPlayerImg;

    /* Try to fetch player image. Example request:
     * - https://nba-players.herokuapp.com/players/james/lebron
     * Important:
     * - The player name must not contain . or '
     * - Spaces in first/last names must be replaced with _ */
    const baseUrl = 'https://nba-players.herokuapp.com/players/';
    const fullUrl = baseUrl + stripPunctuation(lastName) + '/'
                    + stripPunctuation(firstName);
    Promise.race([
      fetch(fullUrl, { mode: 'cors' }),
      timeout(7500, firstName + ' ' + lastName + ' | Image fetch timeout')
    ])
    .then(
      response => response.blob()
    )
    .then(responseBlob => {
      playerInfo.img = URL.createObjectURL(responseBlob);
      resolve(playerInfo);
    })
    .catch(error => {
      /* Just log error to console. Dont tell the user */
      console.log(error);
      resolve(playerInfo);
    });
  });
}

/**
 * Return the full name for a given a position given it's acronym.
 *
 * @param {String} position - PG, SG, SF, PF or C
 * @return {String} fullPositionName
 */
function getFullPositionName(position) {
  let fullPositionName = 'Invalid';

  switch(position) {
    case 'G':
      fullPositionName = 'Guard';
      break;
    case 'PG':
      fullPositionName = 'Point Guard';
      break;
    case 'SG':
      fullPositionName = 'Shooting Guard';
      break;
    case 'F':
      fullPositionName = 'Forward';
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

/**
 * Returns a promise that rejects with the given error message after a given
 * time.
 *
 * @param {Number} ms - Time in milliseconds
 * @param {String} errorMsg
 * @return {Promise} reject(errorMsg)
 */
function timeout(ms, errorMsg) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(errorMsg), ms)
  });
}

/**
 * Return a promise that resolves with a list of similar player objects for the
 * given player (in a form that is compatible with state.similarPlayersList)
 *
 * @param {Object} nbaData
 * @param {String} firstName
 * @param {String} lastName
 * @return {Promise} resolve(similarPlayersList)
 */
function getSimilarPlayersList(nbaData, firstName, lastName) {
  return new Promise((resolve, reject) => {
    /* Get data of the reference player */
    const referencePlayer = getPlayerFromList(nbaData, firstName, lastName);
    if (!referencePlayer) {
      reject(
        'getSimilarPlayersList() | ' + firstName + ' ' + lastName + 'not found'
      );
    }

    nbaData.forEach(datum => {
      datum.differenceScore = getDifferenceScore(referencePlayer, datum);
    });
    /* Order nbaData by similarity & keep the 3 most similar players */
    const mostSimilarPlayers = nbaData.sort((a, b) => {
      return (a.differenceScore - b.differenceScore);
    }).slice(0, 3);

    /* Get playerInfo of the top 3 most similar players */
    let promiseList = [];
    mostSimilarPlayers.forEach(p => {
      promiseList.push(
        getPlayerInfo(nbaData, p.player.FirstName, p.player.LastName)
      );
    });

    /* Build similarPlayersList (compatible with state.similarPlayersList) */
    Promise.all(promiseList)
    .then(values => {
      let similarPlayersList = [];
      values.forEach(v => {
        similarPlayersList.push(
          {
            'firstName': v.firstName,
            'lastName': v.lastName,
            'img': v.img,
            'ppg': v.ppg,
            'apg': v.apg,
            'rpg': v.rpg
          },
        );
      });
      resolve(similarPlayersList);
    })
    .catch(error => {
      reject(error);
    });
  });
}

/**
 * Return the object for a player from the list of all the player objects given
 * the player's first and last name.
 *
 * @param {Object} nbaData
 * @param {String} firstName
 * @param {String} lastName
 * @return {Object} player
 */
function getPlayerFromList(nbaData, firstName, lastName) {
  let player = undefined;

  for (let i = 0; i < nbaData.length; i++) {
    if (
      (nbaData[i].player.FirstName === firstName)
      && (nbaData[i].player.LastName === lastName)
    ) {
      player = nbaData[i];
      break;
    }
  }

  return player;
}

/**
 * Returns the difference score of a player to a reference player. The closer
 * the score is to 0, the more similar the player is to the reference.
 *
 * @param {Object} reference - The reference player object
 * @param {Object} player - The player object to compare to reference
 * @return {Number} difference
 */
function getDifferenceScore(reference, player) {
  if (!compatiblePosition(reference.player.Position, player.player.Position)) {
    return 999;
  }

  if (reference.player.ID === player.player.ID) {
    return 999;
  }

  const referenceStatList = [
    parseFloat(reference.stats.PtsPerGame['#text']),
    parseFloat(reference.stats.AstPerGame['#text']),
    parseFloat(reference.stats.RebPerGame['#text']),
  ];

  const playerStatList = [
    parseFloat(player.stats.PtsPerGame['#text']),
    parseFloat(player.stats.AstPerGame['#text']),
    parseFloat(player.stats.RebPerGame['#text']),
  ];

  let scoreSum = 0;
  let score = 0;
  for (let i = 0; i < referenceStatList.length; i++) {
    /* Avoid 0/0 error */
    if (referenceStatList[i] === 0) {
      score = playerStatList[i];
    } else {
      score = playerStatList[i] / referenceStatList[i];
    }
    scoreSum += score;
  }

  return Math.abs(1 - (scoreSum / 3));
}

/**
 * Returns the given string, stripped of specific punctuations
 * @param {String} str
 * @return {String} string stripped of punctuation
 */
function stripPunctuation(str) {
  return str.toLowerCase().replace(/ /g, "_")
         .replace(/'/g, '').replace(/\./g, '');
}

/**
 * Returns a bool depending on whether the test position is compatible with the
 * reference position.
 *
 * @param {String} referencePos
 * @param {String} testPos
 * @return {Bool}
 */
function compatiblePosition(referencePos, testPos) {
  let isCompatible = false;

  switch (referencePos) {
    case 'G':
      if ((testPos === 'G') || (testPos === 'PG') || (testPos === 'SG')) {
        isCompatible = true;
      }
      break;
    case 'PG':
      if ((testPos === 'G') || (testPos === 'PG')) {
        isCompatible = true;
      }
      break;
    case 'SG':
      if ((testPos === 'G') || (testPos === 'SG')) {
        isCompatible = true;
      }
      break;
    case 'F':
      if ((testPos === 'F') || (testPos === 'SF') || (testPos === 'PF')) {
        isCompatible = true;
      }
      break;
    case 'SF':
      if ((testPos === 'F') || (testPos === 'SF')) {
        isCompatible = true;
      }
      break;
    case 'PF':
      if ((testPos === 'F') || (testPos === 'PF')) {
        isCompatible = true;
      }
      break;
    case 'C':
      if (testPos === 'C') {
        isCompatible = true;
      }
      break;
    default:
  }

  return isCompatible;
}
