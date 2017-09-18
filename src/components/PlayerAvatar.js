import React from 'react';

export default function PlayerAvatar(props) {
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
