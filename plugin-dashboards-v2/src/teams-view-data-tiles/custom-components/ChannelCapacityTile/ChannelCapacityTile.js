import * as Flex from '@twilio/flex-ui';
import { connect } from 'react-redux';
import { getTasksAndCapacity } from '../../utils/WorkerDataUtil';
import { TileWrapper, Title, Content, TaskCount, Label, Metric } from './ChannelCapacityTile.Components';

/**
 * @param {props} props.channelName The channelName ('voice', 'chat', 'sms' etc.)
 * @param {props} props.bgColor The tile background color
 */
const ChannelCapacityTile = connect((state, ownProps) => {
  //Note: max 200 workers will be loaded for teams view
  const workers = state.flex.supervisor.workers;
  let tasksAndCapacity = getTasksAndCapacity(workers);
  return { tasksAndCapacity };
  //object returned from connect is merged into component props
  //See https://react-redux.js.org/api/connect
})((props) => {
  const { channelName, tasksAndCapacity, bgColor } = props;
  let taskCount = tasksAndCapacity.tasks[channelName];
  let capacity = tasksAndCapacity.capacity[channelName];

  return (
    <TileWrapper className='Twilio-AggregatedDataTile' bgColor={bgColor}>
      <Title className='Twilio-AggregatedDataTile-Title'>
        {channelName + ' Capacity'}
      </Title>
      <Content className='Twilio-AggregatedDataTile-Content'>
        {capacity}
      </Content>
      <TaskCount>
        <Label> {channelName} Tasks:</Label>
        <Metric> {taskCount} </Metric>
      </TaskCount>
    </TileWrapper>
  );
});

export default ChannelCapacityTile;