import React from 'react';
import { useFlexSelector } from '@twilio/flex-ui';
import { Icon } from '@twilio/flex-ui';
import { WorkerQueue } from '@twilio/flex-ui/src/state/QueuesState';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Channel, ChannelIcon, Content, Description } from './ChannelSLATile.Components';
import { AppState } from '../../flex-hooks/states';
import { ChannelSLMetrics, SLMetrics } from '../../types';

interface ComponentProps {
  channelName: string;
}

const ChannelSLATileV2 = (props: ComponentProps) => {
  const { channelName } = props;
  const sla: ChannelSLMetrics = useFlexSelector((state: AppState) => {
    const queues: WorkerQueue[] = Object.values(state.flex.realtimeQueues.queuesList);
    const allSLMetrics: SLMetrics = QueueDataUtil.getSLTodayByChannel(queues);
    return allSLMetrics[channelName];
  });

  let content = '-';
  if (sla.handledTasks && sla.handledTasks > 0) {
    content = sla.serviceLevelPct + '%';
  }

  return (
    //Pass value to TileWrapper for changing color
    <TileWrapper value={sla.serviceLevelPct} count={sla.handledTasks} className='Twilio-AggregatedDataTile'>
      <Channel>
        <ChannelIcon>
          {channelName == 'voice' && <Icon icon='Call' />}
          {channelName == 'chat' && <Icon icon='Message' />}
          {channelName == 'sms' && <Icon icon='Sms' />}
        </ChannelIcon>
        <Title className='Twilio-AggregatedDataTile-Title'>{channelName + ' SLA'}</Title>
      </Channel>
      <Content className='Twilio-AggregatedDataTile-Content'>{content}</Content>
      <Description className='Twilio-AggregatedDataTile-Description'>
        {sla.handledTasksWithinSL + ' / ' + sla.handledTasks}
      </Description>
    </TileWrapper>
  );
}

export default ChannelSLATileV2;