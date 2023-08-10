import React from 'react';
import { useFlexSelector } from '@twilio/flex-ui';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Content, Description } from './ChannelTaskCountTile.Components';
import { AppState } from '../../flex-hooks/states';
import { ChannelTaskCounts, TaskCounts } from '../../types';

interface ComponentProps {
  channelName: string;
  bgColor?: string;
}

const ChannelTaskCountTile = (props: ComponentProps) => {
  const { channelName, bgColor } = props;
  const taskCounts: ChannelTaskCounts = useFlexSelector((state: AppState) => {
    const queues = Object.values(state.flex.realtimeQueues.queuesList);
    const allTaskCounts: TaskCounts = QueueDataUtil.getTaskCountsByChannel(queues);
    return allTaskCounts[channelName];
  });

  return (
    <TileWrapper className='Twilio-AggregatedDataTile' bgColor={bgColor}>
      <Title className='Twilio-AggregatedDataTile-Title'>
        {channelName + ' Active'}
      </Title>
      <Content className='Twilio-AggregatedDataTile-Content'>
        {taskCounts.activeTasks}
      </Content>
      <Description className='Twilio-AggregatedDataTile-Description'>
        {'Assigned: ' + taskCounts.assignedTasks}
      </Description>
      <Description className='Twilio-AggregatedDataTile-Description'>
        {'Wrapping: ' + taskCounts.wrappingTasks}
      </Description>
      <Title className='Twilio-AggregatedDataTile-Title'>
        {'Waiting: ' + taskCounts.waitingTasks}
      </Title>
    </TileWrapper>
  );
};

export default ChannelTaskCountTile;