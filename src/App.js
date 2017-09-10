import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VictoryPie, VictoryLabel } from 'victory';
import './App.css';

const playerStats = [
  {quarter: 1, earnings: 13000},
  {quarter: 2, earnings: 16500},
  {quarter: 3, earnings: 14250},
  {quarter: 4, earnings: 19000}
];

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
            {idx: 1, statValue: this.state.leagueLeaderValue},
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
  return (
    <div>

      <h3>Vs. League</h3>

      {props.ppgLeaderName}
      {props.leaderPpg}
      {props.playerPpg}
      {props.avgPpg}

      {props.apgLeaderName}
      {props.leaderApg}
      {props.playerApg}
      {props.avgApg}

      {props.rpgLeaderName}
      {props.leaderRpg}
      {props.playerRpg}
      {props.avgRpg}

    </div>
  );
}

class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>NBA Player Dashboard</h1>

        <ProfileCard name='Kyrie Irving' team='Cleveland Cavaliers' position='point guard' />

        <div className='stats-wrapper'>
          <StatCard name='ppg' value={21.4} leagueLeaderValue={30 - 21.4} />
          <StatCard name='apg' value={8.4} leagueLeaderValue={12 - 8.4} />
          <StatCard name='rpg' value={2.1} leagueLeaderValue={15 - 2.1} />
        </div>

        <SimilarPlayersCard name='Kyrie Irving'/>

        <LeagueComparisonCard
          ppgLeaderName='Russell Westbrook'
          leaderPpg='30' playerPpg='21.4' avgPpg='5.4'

          apgLeaderName='James Harden'
          leaderApg='11' playerApg='4.4' avgApg='2.4'

          rpgLeaderName='Hassan Whiteside'
          leaderRpg='15' playerRpg='2.1' avgRpg='5.4'
        />

      </div>
    );
  }
}

export default App;
