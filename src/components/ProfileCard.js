import React from 'react';
import '../style/components/ProfileCard.css';

export default function ProfileCard(props) {
  return (
    <div className='ProfileCard card'>

      <h1>{props.playerName}</h1>
      <img src={props.img} alt={props.playerName} />
      <p>{props.team}</p>
      <p>{props.position}</p>

    </div>
  );
}
