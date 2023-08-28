import { useFlexSelector } from '@twilio/flex-ui';
import { getTasksAndCapacity } from '../../utils/WorkerDataUtil';
import { PieChart } from "react-minimal-pie-chart";
import { TileWrapper, Title, Content, Chart, TaskCount, Label, Metric, MetricsContainer } from './ChannelCapacityTile.Components';
import { TasksAndCapacity } from '../../types';
import { SupervisorWorkerState } from '@twilio/flex-ui/src/state/State.definition';
import { AppState } from '../../flex-hooks/states';

interface ComponentProps {
  channelName: string;
  bgColor?: string;
}

const ChannelCapacityTile = (props: ComponentProps) => {
  const { channelName, bgColor } = props;
  const tasksAndCapacity: TasksAndCapacity = useFlexSelector((state: AppState) => {
    const workers: SupervisorWorkerState[] = state.flex.supervisor.workers;
    const capacityData = getTasksAndCapacity(workers);
    return capacityData;
  });
  let taskCount = tasksAndCapacity.tasks[channelName];
  let capacity = tasksAndCapacity.capacity[channelName];
  const available = capacity - taskCount;

  const data = [];
  data.push({ title: "Busy", value: taskCount, color: "limegreen" });
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
};

export default ChannelCapacityTile;