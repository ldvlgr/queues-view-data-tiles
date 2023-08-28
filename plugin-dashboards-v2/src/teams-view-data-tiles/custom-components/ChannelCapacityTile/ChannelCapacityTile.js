import * as Flex from '@twilio/flex-ui';
import { connect } from 'react-redux';
import { getTasksAndCapacity } from '../../utils/WorkerDataUtil';
import { PieChart } from "react-minimal-pie-chart";
import { TileWrapper, Title, Content, Chart, TaskCount, Label, Metric, MetricsContainer } from './ChannelCapacityTile.Components';

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
  const available = capacity - taskCount;

  const data = [];
  if (taskCount > 0) data.push({ title: "Busy", value: taskCount, color: "limegreen" });
  data.push({ title: "Available", value: available, color: "green" });

  let used = '-';
  if (capacity > 0) {
    const pct = Math.round(taskCount / capacity * 100);
    used = `${pct}%`;
  }

  return (
    <TileWrapper className='Twilio-AggregatedDataTile' bgColor={bgColor}>
      <Title className='Twilio-AggregatedDataTile-Title'>
        {channelName + ' Capacity'}
      </Title>
      <Content className='Twilio-AggregatedDataTile-Content'>
        {capacity}
      </Content>
      <MetricsContainer>
        <Chart>
          <PieChart
            labelStyle={{
              fontSize: '10px',
              fill: 'Black',
            }}
            startAngle={180}
            lengthAngle={180}
            viewBoxSize={[100, 50]}
            data={data}
            label={({ dataEntry }) => dataEntry.value}
          />
        </Chart>
      </MetricsContainer>
      <MetricsContainer>
        <TaskCount>
          <Label> {channelName} Tasks</Label>
          <Metric> {taskCount} </Metric>
        </TaskCount>
        <TaskCount>
          <Label> Occupied </Label>
          <Metric> {used} </Metric>
        </TaskCount>
      </MetricsContainer>
    </TileWrapper>
  );
});

export default ChannelCapacityTile;