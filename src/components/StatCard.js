import React from 'react';
import { VictoryPie, VictoryLabel } from 'victory';
import {
  highlightColor, lowlightColor, fgColor, pFontSize, h2FontSize, fontFamily
} from '../theme.js';
import '../style/components/StatCard.css';

export default class StatCard extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      leagueLeaderValue: 1
    };
  }

  componentDidMount() {
    this.state = {
      value: this.props.value,
      leagueLeaderValue: this.props.leagueLeaderValue
    };
  }

  componentWillReceiveProps(newProps) {
    this.state = {
      value: newProps.value,
      leagueLeaderValue: newProps.leagueLeaderValue
    };
  }

  render() {
    return (
      <svg viewBox='0 0 400 400' className='StatCard card' id={this.props.id}>

        <VictoryPie
          animate={{duration: 1000}}
          width={400} height={400}
          data={[
            {idx: 0, statValue: this.state.value, fill: highlightColor},
            {
              idx: 1,
              statValue: this.state.leagueLeaderValue - this.state.value,
              fill: lowlightColor
            },
          ]}
          x='idx' y='statValue'
          innerRadius={145}
          labels={() => null}
        />

        <VictoryLabel
          textAnchor='middle'
          x={200} y={160}
          text={this.state.value.toFixed(1)}
          style={{
            fill: highlightColor,
            fontSize: h2FontSize,
            fontFamily: fontFamily
          }}
        />
        <VictoryLabel
          textAnchor='middle'
          x={200} y={240}
          text={this.props.statName}
          style={{
            fill: fgColor,
            fontSize: pFontSize,
            fontFamily: fontFamily
          }}
        />

      </svg>
    );
  }
}
