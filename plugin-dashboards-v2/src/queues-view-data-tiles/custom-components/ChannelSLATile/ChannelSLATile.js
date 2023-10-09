import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { getChannelIcon } from '../../utils/helpers';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Channel, ChannelIcon, Content, Label, Metric, Handled, MetricsContainer } from './ChannelSLATile.Components';

const ChannelSLATileV2 = (props) => {
  const { channelName, channelList } = props;
  const sla = useFlexSelector((state) => {
    const queues = Object.values(state.flex.realtimeQueues.queuesList);
    const allSLMetrics = QueueDataUtil.getSLTodayByChannel(queues, channelList);
    return allSLMetrics[channelName.toLowerCase()];
  });

  let content = '-';
  if (sla?.handledTasks && sla?.handledTasks > 0) {
    content = `${sla.serviceLevelPct}%`;
  }

  return (
    <TileWrapper value={sla?.serviceLevelPct} count={sla?.handledTasks} className="Twilio-AggregatedDataTile">
      <Channel>
        <ChannelIcon>
          <Icon icon={getChannelIcon(channelName)} />
        </ChannelIcon>
        <Title className="Twilio-AggregatedDataTile-Title">{`${channelName} SLA`}</Title>
      </Channel>
      <Content className="Twilio-AggregatedDataTile-Content">{content}</Content>
      <Label>Today</Label>
      <MetricsContainer>
        <Handled>
          <Label>Handled</Label>
          <Metric>{sla?.handledTasks || 0}</Metric>
        </Handled>
        <Handled>
          <Label>Within&nbsp;SL</Label>
          <Metric>{sla?.handledTasksWithinSL || 0}</Metric>
        </Handled>
      </MetricsContainer>
    </TileWrapper>
  );
};

export default ChannelSLATileV2;