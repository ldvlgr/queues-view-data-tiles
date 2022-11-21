import * as Flex from "@twilio/flex-ui";
import { connect } from "react-redux";
import QueueDataUtil from "../utils/QueueDataUtil";
import { ColumnDefinition, QueuesStats } from '@twilio/flex-ui';
import QueueFilters from "./QueueFilters/QueueFilters";
import { CustomSLDataTile } from "./CustomSLDataTile/CustomSLDataTile";
import { PieChartTile } from "./PieChartTile/PieChartTile";

const PLUGIN_NAME = 'DashboardsPlugin';

export default (manager) => {
  setVisibleQueues(manager);
  //customizeQueueStats();
  console.log(PLUGIN_NAME, 'Adding Tiles');
  addTiles();
  addFilters();
}

const addFilters = () => {

  Flex.QueuesStatsView.Content.add(<QueueFilters key="queue-filters" />, {
    align: 'start',
    sortOrder: 0,
  })
}


const TasksTile1 = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return QueueDataUtil.getTasksByGroup(queues, "sales");
})((props) => (
  <Flex.AggregatedDataTile title="Sales (Active)" content={props.activeTasks}
    description={"Waiting: " + props.waitingTasks} />
));

const GroupTasksTile = connect((state, ownProps) => {
  //console.log('Own Props: ', ownProps);
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return QueueDataUtil.getTasksByGroup(queues, ownProps.group);
})((props) => {
  return (
    <Flex.AggregatedDataTile
      title={props.group + " (Active)"}
      content={props.activeTasks}
      description={"Waiting: " + props.waitingTasks} />
  )
});

const TaskCountTile = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return QueueDataUtil.getTaskCountsByChannel(queues);
  //object returned from connect is merged into component props
  //See https://react-redux.js.org/api/connect
})((props) => {
  let channelName = props.channelName;
  let taskCounts = props[channelName];
  return (<Flex.AggregatedDataTile
    title={channelName + " Active"}
    content={taskCounts.activeTasks}
    description={"Waiting: " + taskCounts.waitingTasks} />
  )
});


const HandledTasksByChannelPieChart = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return QueueDataUtil.getSLTodayByChannel(queues);
  //object returned from connect is merged into component props
  //See https://react-redux.js.org/api/connect
})((props) => {
  //props has all task counts

  let handledVoice = props["voice"].handledTasks;
  let handledChat = props["chat"].handledTasks;
  let handledSms = props["sms"].handledTasks;

  let data = [];
  if (handledVoice) data.push({ title: 'voice', value: handledVoice, color: '#ADD8E6' });
  if (handledChat) data.push({ title: 'chat', value: handledChat, color: '#87CEFA' });
  if (handledSms) data.push({ title: 'sms', value: handledSms, color: '#4682B4' });
  return (<PieChartTile
    title="Tasks Pie Chart"
    content={data}
    description="Tasks Today by Channel" />
  )
});


const CustomSLATile = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return QueueDataUtil.getSLTodayByChannel(queues);
  //object returned from connect is merged into component props
  //See https://react-redux.js.org/api/connect
})((props) => {
  let channelName = props.channelName;
  let sla = props[channelName];
  return (<CustomSLDataTile
    title={channelName + " SLA"}
    content={sla.serviceLevelPct}
    description={sla.handledTasksWithinSL + " / " + sla.handledTasks} >
  </CustomSLDataTile>)
});


const addTiles = () => {
  //Add custom tile
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <HandledTasksByChannelPieChart key="custom-chart-tile" channelName="new" />,
    { sortOrder: -7 }
  );

  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <TaskCountTile key="chat-tasks-tile" channelName="chat" />,
    { sortOrder: -6 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <CustomSLATile key="chat-sla-tile" channelName="chat" />,
    { sortOrder: -5 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <TaskCountTile key="voice-tasks-tile" channelName="voice" />,
    { sortOrder: -4 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <CustomSLATile key="voice-sla-tile" channelName="voice" />,
    { sortOrder: -3 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <TasksTile1 key="tasks-tile-1" />,
    { sortOrder: -2 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <GroupTasksTile key="tasks-tile-2" group="service" />,
    { sortOrder: -1 }
  );

  //Remove original tiles
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('active-tasks-tile');
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('waiting-tasks-tile');
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('longest-wait-time-tile');
}




const setVisibleQueues = (manager) => {
  const TEAM_TWILIO = 'TwilioPS';
  const TEAM_BPO1 = 'BPO1';
  const TEAM_BPO2 = 'BPO2';

  let team_name = manager.workerClient.attributes?.team_name || "None";
  console.log(PLUGIN_NAME, 'Worker team:', team_name);

  if (team_name == TEAM_TWILIO) {
    //No filter - Show All Queues
    console.log(PLUGIN_NAME, 'Show all queues');
  } else if (team_name == TEAM_BPO1) {
    let prefix = TEAM_BPO1;
    QueuesStats.setFilter((queue) => queue.friendly_name.substring(0, prefix.length) == prefix);
  } else if (team_name == TEAM_BPO2) {
    let prefix = TEAM_BPO2;
    QueuesStats.setFilter((queue) => queue.friendly_name.substring(0, prefix.length) == prefix);
  } else {
    //Only show Anyone queue
    //QueuesStats.setSubscriptionFilter((queue) => queue.friendly_name == "Everyone");

  }
}


