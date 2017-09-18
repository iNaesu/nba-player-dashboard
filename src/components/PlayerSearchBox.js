import React from 'react';

export default function PlayerSearchBox(props) {
  return (
    <form>
      <input
        type="text" name="playerSearch" placeholder={props.placeholderText}
      />
    </form>
  );
}
