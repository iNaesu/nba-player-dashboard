import React from 'react';
import PlayerAvatar from './PlayerAvatar.js'
import '../style/components/SimilarPlayersCard.css';

export default function SimilarPlayersCard(props) {

  const similarPlayersList = [
    {
      'firstName': props.firstName0,
      'lastName': props.lastName0,
      'img': props.img0,
      'ppg': props.ppg0,
      'apg': props.apg0,
      'rpg': props.rpg0
    },
    {
      'firstName': props.firstName1,
      'lastName': props.lastName1,
      'img': props.img1,
      'ppg': props.ppg1,
      'apg': props.apg1,
      'rpg': props.rpg1
    },
    {
      'firstName': props.firstName2,
      'lastName': props.lastName2,
      'img': props.img2,
      'ppg': props.ppg2,
      'apg': props.apg2,
      'rpg': props.rpg2
    }
  ];

  const playerAvatarList = similarPlayersList.map((player, idx) =>
    <PlayerAvatar
      key={idx}
      playerName={player.firstName + ' ' + player.lastName} img={player.img}
      ppg={player.ppg} apg={player.apg} rpg={player.rpg}
    />
  );

  return (
    <div className='SimilarPlayersCard card'>
      <div className='card-title'>
        Similar Players
      </div>

      {playerAvatarList}
    </div>
  );
}
