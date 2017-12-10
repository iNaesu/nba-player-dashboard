import React from 'react';
import '../style/components/AppStateScreen.css';

export default class AppStateScreen extends React.Component {
  render() {
    let text = 'Undefined app state';
    let className = 'AppStateScreen-undefined';

    switch(this.props.appState) {
      case 'loading':
        text = '';
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
        <i className="fas fa-3x fa-question-circle"></i>
        <i className="fas fa-3x fa-spin fa-circle-notch"></i>
        <h1>{text}</h1>
      </div>
    );
  }
}
