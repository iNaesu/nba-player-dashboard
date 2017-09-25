import React from 'react';
import '../style/components/ProfileCard.css';

export default function ProfileCard(props) {
  return (
    <div className='ProfileCard card'>

      <div className='ProfileCard-text'>
        <h1>{props.playerName}</h1>
        <p>{props.team}</p>
        <p>{props.position}</p>
      </div>
      <img src={props.img} alt={props.playerName} />

    </div>
  );
}
