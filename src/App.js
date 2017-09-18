import React, { Component } from 'react';
import {
  VictoryPie, VictoryLabel, VictoryChart, VictoryGroup,
  VictoryStack, VictoryBar, VictoryTooltip, VictoryAxis
} from 'victory';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>NBA Player Dashboard</h1>

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

function PlayerSearchBox(props) {
  return (
    <form>
      <input
        type="text" name="playerSearch" placeholder={props.placeholderText}
      />
    </form>
  );
}

function ProfileCard(props) {
  return (
    <div>

      <h1>{props.playerName}</h1>
      <img src={props.img} alt={props.playerName} />
      <p>{props.team}</p>
      <p>{props.position}</p>

    </div>
  );
}

class StatCard extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      leagueLeaderValue: 1
    };
  }

  componentDidMount() {
    let value = this.props.value;
    let leagueLeaderValue = this.props.leagueLeaderValue;
    this.setState({value, leagueLeaderValue});
  }

  render() {
    return (
      <svg viewBox="0 0 400 400">

        <VictoryPie
          animate={{duration: 1000}}
          width={400} height={400}
          data={[
            {idx: 0, statValue: this.state.value},
            {
              idx: 1,
              statValue: this.state.leagueLeaderValue - this.state.value
            },
          ]}
          x="idx" y="statValue"
          innerRadius={120}
          labelRadius={150}
          labels={() => null}
        />

        <VictoryLabel
          textAnchor="middle"
          x={200} y={200}
          text={this.props.statName}
        />

      </svg>
    );
  }
}

function PlayerAvatar(props) {
  return (
    <div>

      <p>{props.playerName}</p>

      <img src={props.img} alt={props.playerName} />
      <h3>{props.ppg}</h3>
      <p>PPG</p>
      <h3>{props.apg}</h3>
      <p>APG</p>
      <h3>{props.rpg}</h3>
      <p>BPG</p>

    </div>
  );
}

function SimilarPlayersCard(props) {

  const similarPlayersList = [
    {
      'playerName': props.similarPlayer0,
      'img': props.img0,
      'ppg': props.ppg0,
      'apg': props.apg0,
      'rpg': props.rpg0
    },
    {
      'playerName': props.similarPlayer1,
      'img': props.img1,
      'ppg': props.ppg1,
      'apg': props.apg1,
      'rpg': props.rpg1
    },
    {
      'playerName': props.similarPlayer2,
      'img': props.img2,
      'ppg': props.ppg2,
      'apg': props.apg2,
      'rpg': props.rpg2
    },
    {
      'playerName': props.similarPlayer3,
      'img': props.img3,
      'ppg': props.ppg3,
      'apg': props.apg3,
      'rpg': props.rpg3
    },
  ];

  const playerAvatarList = similarPlayersList.map((player) =>
    <PlayerAvatar
      key={player.playerName}
      playerName={player.playerName} img={player.img}
      ppg={player.ppg} apg={player.apg} rpg={player.rpg}
    />
  );

  return (
    <div>
      <h3>Similar Players</h3>
      {playerAvatarList}
    </div>
  );
}

function LeagueComparisonCard(props) {
  const statList = [
    {
      'statType': 'ppg',
      'leagueLeaderName': props.ppgLeaderName,
      'leagueLeaderValue': props.leaderPpg,
      'leagueAverageValue': props.averagePpg,
      'playerValue': props.playerPpg
    },
    {
      'statType': 'apg',
      'leagueLeaderName': props.apgLeaderName,
      'leagueLeaderValue': props.leaderApg,
      'leagueAverageValue': props.averageApg,
      'playerValue': props.playerApg
    },
    {
      'statType': 'rpg',
      'leagueLeaderName': props.rpgLeaderName,
      'leagueLeaderValue': props.leaderRpg,
      'leagueAverageValue': props.averageRpg,
      'playerValue': props.playerRpg
    },
  ]

  const groupOfBarsList = statList.map((stat, idx) =>
    <VictoryGroup
      key={stat.statType} offset={20} style={{ data: {width: 15}}}
      labelComponent={<VictoryTooltip/>}
    >

      <VictoryBar data={[
        {
          x: idx + 1, y: stat.playerValue,
          label: props.playerName + ' - ' + stat.playerValue + stat.statType
        }
      ]} />

      <VictoryStack>
        <VictoryBar
          data={[
            {
              x: idx + 1, y: stat.leagueAverageValue,
              label: 'League Average - ' + stat.leagueAverageValue
                      + stat.statType
            }
          ]}
        />
        <VictoryBar
          data={[
            {
              x: idx + 1,
              y: stat.leagueLeaderValue - stat.leagueAverageValue,
              label: stat.leagueLeaderName + ' - ' +
                      stat.leagueLeaderValue + stat.statType
            }
          ]}
        />
      </VictoryStack>

    </VictoryGroup>
  );

  /* Round up to closest 5 */
  const yMax = Math.ceil(props.leaderPpg / 5) * 5;

  return (
    <div>

      <h3>Vs. League</h3>

      <VictoryChart domain={{x: [0, 4], y: [0, yMax]}}>
        {groupOfBarsList}
        <VictoryAxis tickValues={statList.map((stat) => stat['statType'])} />
        <VictoryAxis dependentAxis tickValues={range(0, yMax, 5)} />
      </VictoryChart>

    </div>
  );
}

/**
 * Returns a list of numbers from start to end. Adjacent numbers in the list are
 * interval apart.
 **/
function range(start, end, interval) {
  let numbersList = [];

  if (end < start) {
  	return numbersList;
  }
  let number = start;
  while(number <= end) {
    numbersList.push(number);
    number = number + interval;
  }

  return numbersList;
}
