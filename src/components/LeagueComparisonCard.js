import React from 'react';
import {
  VictoryChart, VictoryGroup, VictoryStack, 
  VictoryBar, VictoryTooltip, VictoryAxis
} from 'victory';

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

  const groupOfBarsList = statList.map((stat, idx) =>
    <VictoryGroup
      key={stat.statType} offset={20} style={{ data: {width: 15}}}
      labelComponent={<VictoryTooltip/>}
    >

      <VictoryBar data={[
        {
          x: idx + 1, y: stat.playerValue,
          label: props.playerName + ' - ' + stat.playerValue + stat.statType
        }
      ]} />

      <VictoryStack>
        <VictoryBar
          data={[
            {
              x: idx + 1, y: stat.leagueAverageValue,
              label: 'League Average - ' + stat.leagueAverageValue
                      + stat.statType
            }
          ]}
        />
        <VictoryBar
          data={[
            {
              x: idx + 1,
              y: stat.leagueLeaderValue - stat.leagueAverageValue,
              label: stat.leagueLeaderName + ' - ' +
                      stat.leagueLeaderValue + stat.statType
            }
          ]}
        />
      </VictoryStack>

    </VictoryGroup>
  );

  /* Round up to closest 5 */
  const yMax = Math.ceil(props.leaderPpg / 5) * 5;

  return (
    <div>

      <h3>Vs. League</h3>

      <VictoryChart domain={{x: [0, 4], y: [0, yMax]}}>
        {groupOfBarsList}
        <VictoryAxis tickValues={statList.map((stat) => stat['statType'])} />
        <VictoryAxis dependentAxis tickValues={range(0, yMax, 5)} />
      </VictoryChart>

    </div>
  );
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
