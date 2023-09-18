import { Icon } from '@twilio/flex-ui';
import { connect } from 'react-redux';
import { getChannelIcon } from '../../utils/helpers';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { mockQueuesData } from '../../utils/mockQueuesData';
import { TileWrapper, Title, Channel, ChannelIcon, Content, Label, Metric, Handled, MetricsContainer } from './ChannelSLATile.Components';

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
  let sla = props[channelName.toLowerCase()];

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
          <Metric>{sla?.handledTasks}</Metric>
        </Handled>
        <Handled>
          <Label>Within&nbsp;SL</Label>
          <Metric>{sla?.handledTasksWithinSL}</Metric>
        </Handled>
      </MetricsContainer>
    </TileWrapper>
  );
});

export default ChannelSLATileV2;