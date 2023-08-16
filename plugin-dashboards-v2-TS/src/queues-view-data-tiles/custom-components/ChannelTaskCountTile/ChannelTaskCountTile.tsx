import React from 'react';
import { useFlexSelector } from '@twilio/flex-ui';
import { AppState } from '../../flex-hooks/states';

import QueueDataUtil from '../../utils/QueueDataUtil';
import { TileWrapper, Title, Content, Label, Metric, TaskCount } from './ChannelTaskCountTile.Components';
import { ChannelTaskCounts, TaskCounts } from '../../types';

interface ComponentProps {
  channelName: string;
  channelList: string[];
  bgColor?: string;
}

const ChannelTaskCountTile = (props: ComponentProps) => {
  const { channelName, channelList, bgColor } = props;
  const taskCounts: ChannelTaskCounts = useFlexSelector((state: AppState) => {
    const queues = Object.values(state.flex.realtimeQueues.queuesList);
    const allTaskCounts: TaskCounts = QueueDataUtil.getTaskCountsByChannel(queues, channelList);
    return allTaskCounts[channelName];
  });

  return (
    <TileWrapper className="Twilio-AggregatedDataTile" bgColor={bgColor}>
      <Title className="Twilio-AggregatedDataTile-Title">{`${channelName} Active`}</Title>
      <Content className="Twilio-AggregatedDataTile-Content">{taskCounts.activeTasks}</Content>
      <TaskCount>
        <Label>Assigned: </Label>
        <Metric>{taskCounts.assignedTasks}</Metric>
      </TaskCount>
      <TaskCount>
        <Label>Wrapping: </Label>
        <Metric>{taskCounts.wrappingTasks}</Metric>
      </TaskCount>
      <TaskCount>
        <Label>Waiting: </Label>
        <Metric>{taskCounts.waitingTasks}</Metric>
      </TaskCount>
    </TileWrapper>
  );
};

export default ChannelTaskCountTile;
