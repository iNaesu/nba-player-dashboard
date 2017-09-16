import React, { Component } from 'react';
import {
  VictoryPie, VictoryLabel, VictoryChart, VictoryGroup,
  VictoryStack, VictoryBar, VictoryTooltip, VictoryAxis
} from 'victory';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>NBA Player Dashboard</h1>

        <PlayerSearchBox placeholderText='Player Search' />
        <ProfileCard
          playerName='Kyrie Irving'
          img='img/irving.png'
          team='Cleveland Cavaliers'
          position='point guard'
        />

        <div className='stats-wrapper'>
          <StatCard statName='ppg' value={21.4} leagueLeaderValue={30} />
          <StatCard statName='apg' value={8.4} leagueLeaderValue={12} />
          <StatCard statName='rpg' value={2.1} leagueLeaderValue={15} />
        </div>

        <SimilarPlayersCard
          playerName='Kyrie Irving'

          similarPlayer1='Stephen Curry' img1='img/curry.png'
          ppg1='22.3' apg1='6.6' rpg1='2.1'

          similarPlayer2='John Wall' img2='img/wall.png'
          ppg2='20.3' apg2='6.6' rpg2='5.1'

          similarPlayer3='Russell Westbrook' img3='img/westbrook.png'
          ppg3='32' apg3='10' rpg3='11'

          similarPlayer4='Isaiah Thomas' img4='img/thomas.png'
          ppg4='29' apg4='6.6' rpg4='1.1'
        />

        <LeagueComparisonCard
          playerName='Kyrie Irving'

          ppgLeaderName='Russell Westbrook'
          leaderPpg={32} playerPpg={21.4} averagePpg={5.4}

          apgLeaderName='James Harden'
          leaderApg={11} playerApg={8.4} averageApg={2.4}

          rpgLeaderName='Hassan Whiteside'
          leaderRpg={15} playerRpg={2.1} averageRpg={5.4}
        />

      </div>
    );
  }
}

export default App;

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
    {
      'playerName': props.similarPlayer4,
      'img': props.img4,
      'ppg': props.ppg4,
      'apg': props.apg4,
      'rpg': props.rpg4
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
