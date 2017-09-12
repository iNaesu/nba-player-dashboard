import React, { Component } from 'react';
import {
  VictoryPie, VictoryLabel, VictoryChart, VictoryGroup,
  VictoryStack, VictoryBar, VictoryTooltip
} from 'victory';
import './App.css';

function ProfileCard(props) {
  return (
    <div>

      <h1>{props.name}</h1>
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
          text={this.props.name}
        />

      </svg>
    );
  }
}

function PlayerAvatar(props) {
  return (
    <div>

      <p>{props.name}</p>

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
  return (
    <div>

      <h3>Similar Players</h3>

      <PlayerAvatar name='Stephen Curry' ppg='22.3' apg='6.6' rpg='2.1' />
      <PlayerAvatar name='John Wall' ppg='22.3' apg='6.6' rpg='2.1' />
      <PlayerAvatar name='Russell Westbrook' ppg='22.3' apg='6.6' rpg='2.1' />
      <PlayerAvatar name='Isaiah Thomas' ppg='22.3' apg='6.6' rpg='2.1' />

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

  /* Create group of bar charts. One each for ppg, apg and rpg. Each bar chart
   * group is to have 1 bar for the player's stat, as well as another bar which
   * represents the league leader and league average for that stat
   */
  const groupOfBarsList = []
  for (var i = 0; i < statList.length; i++) {
    /* Tooltip text for each bar chart */
    const playerLabel =
      props.playerName + ' - ' + statList[i].playerValue + statList[i].statType;
    const leagueLeaderLabel =
        statList[i].leagueLeaderName
        + ' - ' + statList[i].leagueLeaderValue + statList[i].statType;
    const leagueAverageLabel =
        'League Average - '
        + statList[i].leagueAverageValue + statList[i].statType;

    /* The group of bar charts */
    const groupOfBars = (
      <VictoryGroup
        offset={20} style={{ data: {width: 15}}}
        labelComponent={<VictoryTooltip/>}
      >

        <VictoryBar data={[
          {x: i + 1, y: statList[i].playerValue, label: playerLabel}
        ]} />

        <VictoryStack>
          <VictoryBar
            data={[
              {
                x: i + 1, y: statList[i].leagueAverageValue,
                label: leagueAverageLabel
              }
            ]}
          />
          <VictoryBar
            data={[
              {
                x: i + 1,
                y: statList[i].leagueLeaderValue - statList[i].leagueAverageValue,
                label: leagueLeaderLabel
              }
            ]}
          />
        </VictoryStack>

      </VictoryGroup>
    );

    /* Add bar chart group to list */
    groupOfBarsList.push(groupOfBars);
  }

  return (
    <div>

      <h3>Vs. League</h3>

      <VictoryChart domain={{x: [0, 4], y: [0, 35]}}>
        {groupOfBarsList}
      </VictoryChart>

    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>NBA Player Dashboard</h1>

        <ProfileCard
          name='Kyrie Irving' team='Cleveland Cavaliers' position='point guard'
        />

        <div className='stats-wrapper'>
          <StatCard name='ppg' value={21.4} leagueLeaderValue={30} />
          <StatCard name='apg' value={8.4} leagueLeaderValue={12} />
          <StatCard name='rpg' value={2.1} leagueLeaderValue={15} />
        </div>

        <SimilarPlayersCard name='Kyrie Irving'/>

        <LeagueComparisonCard
          playerName='Kyrie Irving'

          ppgLeaderName='Russell Westbrook'
          leaderPpg={30} playerPpg={21.4} averagePpg={5.4}

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
