import React from 'react';
import Autosuggest from 'react-autosuggest';
import '../style/components/PlayerSearchBox.css';

//export default function PlayerSearchBox(props) {
//  return (
//    <div className='PlayerSearchBox card'>
//      <form>
//        <input className='h3'
//          type='text' name='playerSearch' placeholder={props.placeholderText}
//        />
//      </form>
//    </div>
//  );
//}

export default class PlayerSearchBox extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    }
  }

  recalculateSuggestions = ({ value }) => {
    this.setState({
      suggestions: filterNbaDataByPlayerName(value, this.props.nbaData)
    });
  };

  clearSuggestions = () => {
    this.setState({
      suggestions: []
    });
  };

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Player Search',
      value,
      onChange: this.onChange
    }

    return (
      <div className='PlayerSearchBox card'>
        <Autosuggest
          inputProps={inputProps}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.recalculateSuggestions}
          onSuggestionsClearRequested={this.clearSuggestions}
          getSuggestionValue={getFullName}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={this.props.callback}
        />
      </div>
    );
  }
}

/**
 * Filter nbaData based on whether the player's full name contains the given
 * string.
 *
 * @param {String} str
 * @param {Object} nbaData - nbaData fetched from sports API
 */
function filterNbaDataByPlayerName(str, nbaData) {
  const filteredData = nbaData.filter(datum => {
    const fullName = datum.player.FirstName + datum.player.LastName;
    return (fullName.toLowerCase().indexOf(str.toLowerCase()) !== -1);
  });

  return filteredData;
}

function getFullName(suggestion) {
  return suggestion.player.FirstName + ' ' + suggestion.player.LastName;
}

function renderSuggestion(suggestion) {
  return (
    <span>
      {getFullName(suggestion)}
    </span>
  );
}
