import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { BaseDataEntry, Data } from 'react-minimal-pie-chart/types/commonTypes';
import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { AppState } from '../../flex-hooks/states';
import { ActivityStatistic } from '@twilio/flex-ui/src/state/QueuesState';

import { TileWrapper, Summary, Chart, Title, AgentActivity, Label, Metric } from './AgentActivityTile.Components';

interface ActivityCounts {
  [key: string]: number;
}

interface ComponentProps {
  activityConfig: {
    activities: {
      [key: string]: {
        color: string;
        icon: string;
      };
    };
    other: {
      color: string;
      icon: string;
    };
  };
}
const AgentActivityTile = (props: ComponentProps) => {
  const { activityConfig } = props;
  const workerActivityCounts: ActivityStatistic[] = useFlexSelector((state: AppState) => {
    return state.flex.realtimeQueues.workspaceStats?.activity_statistics || [];
  });
  const activityCounts: ActivityCounts = {};
  let otherUnavailable = 0;
  const data: Data = [];
  workerActivityCounts.forEach((activity) => {
    const count = activity.workers;
    if (count && activityConfig.activities[activity.friendly_name]) {
      activityCounts[activity.friendly_name] = count;
      const dataEntry: BaseDataEntry = {
        title: activity.friendly_name,
        value: count,
        color: activityConfig.activities[activity.friendly_name]?.color,
      };
      data.push(dataEntry);
    } else otherUnavailable += count;
  });
  if (otherUnavailable > 0) {
    activityCounts.other = otherUnavailable;
    const other: BaseDataEntry = { title: 'Other', value: otherUnavailable, color: activityConfig.other?.color };
    data.push(other);
  }
  const activityNames = Object.keys(activityConfig.activities);

  return (
    <TileWrapper className="Twilio-AggregatedDataTile">
      <Summary>
        {activityNames.map((activity) => {
          const count = activityCounts[activity] || 0;
          return (
            <AgentActivity key={activity}>
              <Icon icon={activityConfig.activities[activity]?.icon} />
              <Label bgColor={activityConfig.activities[activity]?.color}>{activity}:</Label>
              <Metric> {count} </Metric>
            </AgentActivity>
          );
        })}
        <AgentActivity key="other">
          <Icon icon={activityConfig.other?.icon} />
          <Label bgColor={activityConfig.other?.color}>
            Other
          </Label>
          <Metric> {activityCounts.other} </Metric>
        </AgentActivity>
      </Summary>
      <Chart>
        <Title>Agent Activity</Title>
        <PieChart
          labelStyle={{
            fontSize: '14px',
            fill: 'White',
          }}
          data={data}
          label={({ dataEntry }) => dataEntry.value}
        />
      </Chart>
    </TileWrapper>
  );
};

export default AgentActivityTile;
