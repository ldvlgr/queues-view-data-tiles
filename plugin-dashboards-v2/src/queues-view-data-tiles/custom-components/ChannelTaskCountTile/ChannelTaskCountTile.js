import * as Flex from '@twilio/flex-ui';
import { connect } from 'react-redux';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { TileWrapper, Title, Content, Description } from './ChannelTaskCountTile.Components';
import { cx } from 'emotion';

import { mockQueuesData } from '../../utils/mockQueuesData';

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
    <TileWrapper className={cx('Twilio-AggregatedDataTile', className)} bgColor={bgColor}>
      <Title className='Twilio-AggregatedDataTile-Title'>
        {channelName + ' Active'}
      </Title>
      <Content className='Twilio-AggregatedDataTile-Content'>
        {taskCounts.activeTasks}
      </Content>
      <Description className='Twilio-AggregatedDataTile-Description'>
        {'Waiting: ' + taskCounts.waitingTasks}
      </Description>
    </TileWrapper>
  );
});

export default ChannelTaskCountTile;