import React from 'react';
import '../style/components/ProfileCard.css';

export default function ProfileCard(props) {
  return (
    <div className='ProfileCard card'>

      <div>
        <hr className='ProfileCard-strong-line'/>
      </div>

      <div className='ProfileCard-content-wrapper'>
        <div className='ProfileCard-text-wrapper'>
          <h1>{props.playerName}</h1>
          <hr className='ProfileCard-line'/>
          <p>{props.team}</p>
          <p>{props.position}</p>
        </div>
        <div className='ProfileCard-img-wrapper'>
          <img src={props.img} alt={props.playerName} />
        </div>
      </div>

    </div>
  );
}
