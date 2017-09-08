import React, { Component } from 'react';
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

function StatCard(props) {
  return (
    <div>

      <h2>{props.name}</h2>
      <p>{props.value}</p>

    </div>
  );
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
          <StatCard name='ppg' value='21.4' />
          <StatCard name='apg' value='4.4' />
          <StatCard name='rpg' value='2.1' />
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
