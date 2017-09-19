import React from 'react';
import '../style/components/PlayerSearchBox.css';

export default function PlayerSearchBox(props) {
  return (
    <div className='PlayerSearchBox'>
      <form>
        <input className='h3'
          type='text' name='playerSearch' placeholder={props.placeholderText}
        />
      </form>
    </div>
  );
}
