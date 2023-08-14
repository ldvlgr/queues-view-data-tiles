import { Icon } from '@twilio/flex-ui';
import { connect } from 'react-redux';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { TileWrapper, Title, Channel, ChannelIcon, Content, Label } from './ChannelSLATile.Components';
import { Table, TBody, Tr, Td } from '@twilio-paste/core';

import { mockQueuesData } from '../../utils/mockQueuesData';

/**
 * @param {props} props.channelName The channelName ('voice', 'chat', 'sms' etc.)
 */
const ChannelSLATileV2 = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return QueueDataUtil.getSLTodayByChannel(queues);
  //object returned from connect is merged into component props
  //See https://react-redux.js.org/api/connect
})((props) => {
  const { channelName } = props;
  let sla = props[channelName];

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
          <Tr><Td colSpan={2}><hr /></Td></Tr>
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
});

export default ChannelSLATileV2;