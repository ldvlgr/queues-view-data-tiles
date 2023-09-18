import * as Flex from '@twilio/flex-ui';
import { Icon } from '@twilio/flex-ui';
import { getChannelIcon } from '../../utils/helpers';
import { connect } from 'react-redux';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Content, Label, Metric, TaskCount, MetricsContainer } from './ChannelTaskCountTile.Components';
import { Channel, ChannelIcon } from '../ChannelSLATile/ChannelSLATile.Components';

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
  const { channelName, bgColor } = props;
  let taskCounts = props[channelName.toLowerCase()];

  return (
    <TileWrapper className="Twilio-AggregatedDataTile" bgColor={bgColor}>
      <Channel>
        <ChannelIcon>
          <Icon icon={getChannelIcon(channelName)} />
        </ChannelIcon>
        <Title className="Twilio-AggregatedDataTile-Title">
          {`${channelName} Active`}
        </Title>
      </Channel>
      <Content className="Twilio-AggregatedDataTile-Content">{taskCounts?.activeTasks || 0}</Content>
      <MetricsContainer>
        <TaskCount>
          <Label>Assigned</Label>
          <Metric>{taskCounts?.assignedTasks || 0}</Metric>
        </TaskCount>
        <TaskCount>
          <Label>Wrapping</Label>
          <Metric>{taskCounts?.wrappingTasks || 0}</Metric>
        </TaskCount>
      </MetricsContainer>
      <MetricsContainer>
        <TaskCount>
          <Label>Waiting</Label>
          <Metric>{taskCounts?.waitingTasks || 0}</Metric>
        </TaskCount>
      </MetricsContainer>
    </TileWrapper>
  );
});

export default ChannelTaskCountTile;