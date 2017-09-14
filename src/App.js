import React, { Component } from 'react';
import {
  VictoryPie, VictoryLabel, VictoryChart, VictoryGroup,
  VictoryStack, VictoryBar, VictoryTooltip
} from 'victory';
import './App.css';

function ProfileCard(props) {
  return (
    <div>

      <h1>{props.playerName}</h1>
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

      <PlayerAvatar
        playerName='Stephen Curry' ppg='22.3' apg='6.6' rpg='2.1'
      />
      <PlayerAvatar
        playerName='John Wall' ppg='22.3' apg='6.6' rpg='2.1'
      />
      <PlayerAvatar
        playerName='Russell Westbrook' ppg='22.3' apg='6.6' rpg='2.1'
      />
      <PlayerAvatar
        playerName='Isaiah Thomas' ppg='22.3' apg='6.6' rpg='2.1'
      />

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
          playerName='Kyrie Irving'
          team='Cleveland Cavaliers'
          position='point guard'
        />

        <div className='stats-wrapper'>
          <StatCard statName='ppg' value={21.4} leagueLeaderValue={30} />
          <StatCard statName='apg' value={8.4} leagueLeaderValue={12} />
          <StatCard statName='rpg' value={2.1} leagueLeaderValue={15} />
        </div>

        <SimilarPlayersCard playerName='Kyrie Irving'/>

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
