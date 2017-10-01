import React from 'react';
import '../style/components/PlayerAvatar.css';

export default function PlayerAvatar(props) {
  return (
    <div className='PlayerAvatar'>

      <div className='PlayerAvatar-img-wrapper'>
        <img src={props.img} alt={props.playerName} />
      </div>

      <div className='PlayerAvatar-text-wrapper'>

        <div className='PlayerAvatar-name-wrapper'>
          <p>{props.playerName}</p>
        </div>

        <div className='PlayerAvatar-stat-list-wrapper'>

          <div className='PlayerAvatar-stat-wrapper'>
            <h3>{props.ppg.toFixed(1)}</h3>
            <p>PPG</p>
          </div>

          <div className='PlayerAvatar-stat-wrapper'>
            <h3>{props.apg.toFixed(1)}</h3>
            <p>APG</p>
          </div>

          <div className='PlayerAvatar-stat-wrapper'>
            <h3>{props.rpg.toFixed(1)}</h3>
            <p>RPG</p>
          </div>

        </div>
      </div>
    </div>
  );
}
