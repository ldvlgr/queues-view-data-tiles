import * as Flex from '@twilio/flex-ui';
import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { getChannelIcon } from '../../utils/helpers';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Content, Label, Metric, TaskCount, MetricsContainer } from './ChannelTaskCountTile.Components';
import { Channel, ChannelIcon } from '../ChannelSLATile/ChannelSLATile.Components';

const ChannelTaskCountTile = (props) => {
  const { channelName, channelList, bgColor } = props;
  const taskCounts = useFlexSelector((state) => {
    const queues = Object.values(state.flex.realtimeQueues.queuesList);
    const allTaskCounts = QueueDataUtil.getTaskCountsByChannel(queues, channelList);
    return allTaskCounts[channelName.toLowerCase()];
  });

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
};

export default ChannelTaskCountTile;