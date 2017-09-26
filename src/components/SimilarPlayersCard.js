import React from 'react';
import PlayerAvatar from './PlayerAvatar.js'
import '../style/components/SimilarPlayersCard.css';

export default function SimilarPlayersCard(props) {

  const similarPlayersList = [
    {
      'playerName': props.similarPlayer0,
      'img': props.img0,
      'ppg': props.ppg0,
      'apg': props.apg0,
      'rpg': props.rpg0
    },
    {
      'playerName': props.similarPlayer1,
      'img': props.img1,
      'ppg': props.ppg1,
      'apg': props.apg1,
      'rpg': props.rpg1
    },
    {
      'playerName': props.similarPlayer2,
      'img': props.img2,
      'ppg': props.ppg2,
      'apg': props.apg2,
      'rpg': props.rpg2
    },
    {
      'playerName': props.similarPlayer3,
      'img': props.img3,
      'ppg': props.ppg3,
      'apg': props.apg3,
      'rpg': props.rpg3
    },
  ];

  const playerAvatarList = similarPlayersList.map((player) =>
    <PlayerAvatar
      key={player.playerName}
      playerName={player.playerName} img={player.img}
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
