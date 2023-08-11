import * as Flex from '@twilio/flex-ui';
import { connect } from 'react-redux';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Content, Label } from './ChannelTaskCountTile.Components';
import { Table, TBody, Tr, Td } from '@twilio-paste/core';

/**
 * @param {props} props.channelName The channelName ('voice', 'chat', 'sms' etc.)
 * @param {props} props.bgColor The tile background color
 */
const ChannelTaskCountTile = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return QueueDataUtil.getTaskCountsByChannel(queues);
  //object returned from connect is merged into component props
  //See https://react-redux.js.org/api/connect
})((props) => {
  const { channelName, className, bgColor } = props;
  let taskCounts = props[channelName];

  return (
    <TileWrapper className='Twilio-AggregatedDataTile' bgColor={bgColor}>
      <Title className='Twilio-AggregatedDataTile-Title'>
        {channelName + ' Active'}
      </Title>
      <Content className='Twilio-AggregatedDataTile-Content'>
        {taskCounts.activeTasks}
      </Content>
      <Table variant='default'>
        <TBody>
          <Tr>
            <Td> <Label>Assigned:</Label>  </Td>
            <Td textAlign='center'> <Label> {taskCounts.assignedTasks} </Label></Td>
          </Tr>
          <Tr>
            <Td> <Label>Wrapping:</Label>  </Td>
            <Td textAlign='center'> <Label> {taskCounts.wrappingTasks} </Label></Td>
          </Tr>
          <Tr><Td colSpan={2}><hr/></Td></Tr> 
          <Tr>
            <Td> <Label>Waiting:</Label>  </Td>
            <Td textAlign='center'> <Label> {taskCounts.waitingTasks} </Label></Td>
          </Tr>
        </TBody>
      </Table>
    </TileWrapper>
  );
});

export default ChannelTaskCountTile;