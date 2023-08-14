import React from 'react';
import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { WorkerQueue } from '@twilio/flex-ui/src/state/QueuesState';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Channel, ChannelIcon, Content, Label } from './ChannelSLATile.Components';
import { AppState } from '../../flex-hooks/states';
import { ChannelSLMetrics, SLMetrics } from '../../types';
import { Table, TBody, Tr, Td } from '@twilio-paste/core';

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
      <Table variant='default'>
        <TBody>
          <Tr><Td colSpan={2}><hr/></Td></Tr> 
          <Tr>
            <Td> <Label>Handled Today:</Label>  </Td>
            <Td textAlign='center'> <Label> {sla.handledTasks} </Label></Td>
          </Tr>
          <Tr>
            <Td> <Label>Within SL:</Label>  </Td>
            <Td textAlign='center'> <Label> {sla.handledTasksWithinSL} </Label></Td>
          </Tr>
        </TBody>
      </Table>
    </TileWrapper>
  );
}

export default ChannelSLATileV2;