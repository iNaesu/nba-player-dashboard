import React from 'react';
import '../style/components/AppStateScreen.css';

export default class AppStateScreen extends React.Component {
  render() {
    let text = 'Undefined app state';
    let className = 'AppStateScreen-undefined';

    switch(this.props.appState) {
      case 'loading':
        text = 'Loading...';
        className = 'AppStateScreen-loading';
        break;
      case 'error':
        text = 'Something went wrong :(';
        className = 'AppStateScreen-error';
        break;
      case 'ready':
        text = ' ';
        className = 'AppStateScreen-ready';
        break;
      default:
    }

    return(
      <div className={className}>
        <h1>{text}</h1>
      </div>
    );
  }
}
