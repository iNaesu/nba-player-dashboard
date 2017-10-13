import React from 'react';
import PropTypes from 'prop-types';
import {
  VictoryChart, VictoryGroup, VictoryStack, VictoryBar, VictoryTooltip,
  VictoryAxis
} from 'victory';
import {
  highlightColor, midlightColor, lowlightColor, fgColor, accentColor, fontFamily
} from '../theme.js';
import '../style/components/LeagueComparisonCard.css';

const screenWidth = window.innerWidth;
const layoutBreakpoint = 1008;
let axisFontSize = 14;
let customLabelYPos = 375;
if (screenWidth >= layoutBreakpoint) {
  customLabelYPos = 525;
  axisFontSize = 20;
}

export default function LeagueComparisonCard(props) {
  const statList = [
    {
      'statType': 'ppg',
      'leagueLeaderName': props.ppgLeaderName,
      'leagueLeaderValue': props.leaderPpg,
      'leagueAverageValue': props.averagePpg,
      'playerValue': props.playerPpg
    },
    {
      'statType': 'apg',
      'leagueLeaderName': props.apgLeaderName,
      'leagueLeaderValue': props.leaderApg,
      'leagueAverageValue': props.averageApg,
      'playerValue': props.playerApg
    },
    {
      'statType': 'rpg',
      'leagueLeaderName': props.rpgLeaderName,
      'leagueLeaderValue': props.leaderRpg,
      'leagueAverageValue': props.averageRpg,
      'playerValue': props.playerRpg
    },
  ]

  let isHorizontalBars = true;

  if (screenWidth >= layoutBreakpoint) {
    isHorizontalBars = false;
  }

  const groupOfBarsList = statList.map((stat, idx) =>
    <VictoryGroup horizontal={isHorizontalBars}
      key={stat.statType} offset={20} style={{ data: {width: 15}}}
    >

      <VictoryBar
        labelComponent={<CustomLabel/>}
        labels={(d) => d.text}
        data={[
          {
            x: idx + 1, y: stat.playerValue,
            text: props.playerName + ' - ' + stat.playerValue.toFixed(1)
                  + stat.statType,
            fill: highlightColor
          }
        ]}
      />

      <VictoryStack>
        <VictoryBar
          labelComponent={<CustomLabel/>}
          labels={(d) => d.text}
          data={[
            {
              x: idx + 1, y: stat.leagueAverageValue,
              text: 'League Average - ' + stat.leagueAverageValue.toFixed(1)
                      + stat.statType,
              fill: lowlightColor
            }
          ]}
        />
        <VictoryBar
          labelComponent={<CustomLabel/>}
          labels={(d) => d.text}
          data={[
            {
              x: idx + 1,
              y: stat.leagueLeaderValue - stat.leagueAverageValue,
              text: stat.leagueLeaderName + ' - '
              + stat.leagueLeaderValue.toFixed(1) + stat.statType,
              fill: midlightColor
            }
          ]}
        />
      </VictoryStack>

    </VictoryGroup>
  );

  const yMax = 35;
  let leagueComparisonCard = {};

  if (screenWidth >= layoutBreakpoint) {
    (
      leagueComparisonCard = <div className='LeagueComparisonCard card'>
        <div className='card-title'>
          Vs. League
        </div>

        <div className='LeagueComparisonCard-graph-wrapper'>
          <VictoryChart
            domain={{x: [0.5, 3.5], y: [0, yMax]}}
            height={500}
            padding={{ top: 50, bottom: 75, left: 100, right: 70 }}
          >

            <VictoryAxis
              tickValues={statList.map((stat) => stat['statType'])}
              style={{
                axis: {stroke: 'none'},
                tickLabels: {
                  fill: fgColor,
                  fontSize: axisFontSize,
                  fontFamily: fontFamily
                }
              }}
            />

            <VictoryAxis
              dependentAxis tickValues={range(0, yMax, 5)}
              style={{
                axis: {stroke: 'none'},
                tickLabels: {
                  fill: fgColor,
                  fontSize: axisFontSize,
                  fontFamily: fontFamily
                },
                grid: {stroke: accentColor},
              }}
            />

            {groupOfBarsList}

          </VictoryChart>

        </div>
      </div>
    );
  } else {
    (
      leagueComparisonCard = <div className='LeagueComparisonCard card'>
        <div className='card-title'>
          Vs. League
        </div>

        <div className='LeagueComparisonCard-graph-wrapper'>
          <VictoryChart
            domain={{y: [0.5, 3.5], x: [0, yMax]}}
            height={350}
            padding={{ top: 25, bottom: 75, left: 70, right: 70 }}
          >

            <VictoryAxis dependentAxis
              tickValues={statList.map((stat) => stat['statType'])}
              style={{
                axis: {stroke: 'none'},
                tickLabels: {
                  fill: fgColor,
                  fontSize: axisFontSize,
                  fontFamily: fontFamily
                }
              }}
            />

            <VictoryAxis
              tickValues={range(0, yMax, 5)}
              style={{
                axis: {stroke: 'none'},
                tickLabels: {
                  fill: fgColor,
                  fontSize: axisFontSize,
                  fontFamily: fontFamily
                },
                grid: {stroke: accentColor},
              }}
            />

            {groupOfBarsList}

          </VictoryChart>

        </div>
      </div>
    );
  }
  return leagueComparisonCard;
}

class CustomLabel extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents;
  static propTypes = {text: PropTypes.string};

  render() {
    return (
      <g>
        <VictoryTooltip
          {...this.props}
          x={225} y={customLabelYPos}
          text={this.props.text}
          orientation='top'
          pointerLength={0}
          cornerRadius={0}
          height={70}
          style={{
            fill: fgColor,
            fontSize: axisFontSize,
            fontFamily: fontFamily
          }}
          flyoutStyle={{
            fill: 'none',
            stroke: 'none'
          }}
        />
      </g>
    );
  }
}

/**
 * Returns a list of numbers from start to end. Adjacent numbers in the list are
 * interval apart.
 **/
function range(start, end, interval) {
  let numbersList = [];

  if (end < start) {
  	return numbersList;
  }
  let number = start;
  while(number <= end) {
    numbersList.push(number);
    number = number + interval;
  }

  return numbersList;
}
