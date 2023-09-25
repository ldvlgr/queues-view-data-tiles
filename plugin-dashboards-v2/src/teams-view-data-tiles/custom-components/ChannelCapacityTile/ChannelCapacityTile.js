import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { getTasksAndCapacity } from '../../utils/WorkerDataUtil';
import { PieChart } from "react-minimal-pie-chart";
import { TileWrapper, Title, Content, Chart, TaskCount, Label, Metric, MetricsContainer, Channel, ChannelIcon } from './ChannelCapacityTile.Components';

import { getChannelColors } from '../../../queues-view-data-tiles/config';
import { getChannelIcon } from '../../utils/helpers';


const ChannelCapacityTile = (props) => {
  const { channelName } = props;
  const tasksAndCapacity = useFlexSelector((state) => {
    const workers = state.flex.supervisor.workers;
    const capacityData = getTasksAndCapacity(workers);
    return capacityData;
  });
  let taskCount = tasksAndCapacity.tasks[channelName.toLowerCase()];
  let capacity = tasksAndCapacity.capacity[channelName.toLowerCase()];
  const available = capacity - taskCount;

  const data = [];
  if (taskCount > 0) data.push({ title: "Busy", value: taskCount, color: "yellow" });
  data.push({ title: "Available", value: available, color: "limegreen" });

  let used = '-';
  if (capacity > 0) {
    const pct = Math.round(taskCount / capacity * 100);
    used = `${pct}%`;
  }
  const bgColor = getChannelColors()[channelName.toLowerCase()];
  return (
    <TileWrapper className='Twilio-AggregatedDataTile'>
      <Channel bgColor={bgColor}>
        <ChannelIcon>
          <Icon icon={getChannelIcon(channelName)} />
        </ChannelIcon>
        <Title className='Twilio-AggregatedDataTile-Title'>
          {channelName + ' Capacity'}
        </Title>
      </Channel>
      {/* <Content className='Twilio-AggregatedDataTile-Content'>
        {capacity}
      </Content> */}
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
          <Label> Tasks</Label>
          <Metric> {taskCount} </Metric>
        </TaskCount>
        <TaskCount>
          <Label> Used </Label>
          <Metric> {used} </Metric>
        </TaskCount>
        <TaskCount>
          <Label> Max </Label>
          <Metric> {capacity} </Metric>
        </TaskCount>
      </MetricsContainer>
    </TileWrapper>
  );
};

export default ChannelCapacityTile;