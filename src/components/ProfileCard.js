import React from 'react';

export default function ProfileCard(props) {
  return (
    <div>

      <h1>{props.playerName}</h1>
      <img src={props.img} alt={props.playerName} />
      <p>{props.team}</p>
      <p>{props.position}</p>

    </div>
  );
}

