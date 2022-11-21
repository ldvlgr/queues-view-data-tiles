import * as Flex from "@twilio/flex-ui";
import { connect } from "react-redux";

import { ColumnDefinition, QueuesStats } from '@twilio/flex-ui';
import QueueFilters from "./QueueFilters/QueueFilters";
import ServiceLevelTile from "./ServiceLevelTile/ServiceLevelTile";

const PLUGIN_NAME = 'DashboardsPlugin';
const channelList = ["chat", "sms", "voice"];

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

const getTasksByGroup = (queues, group) => {
  let activeTasks = 0;
  let waitingTasks = 0;
  if (queues && queues.length > 0) {
    queues.forEach(q => {
      if (q.friendly_name.toLowerCase().includes(group)) {
        if (q.tasks_by_status) {
          activeTasks += q.tasks_by_status.assigned + q.tasks_by_status.wrapping;
          waitingTasks += q.tasks_by_status.pending + q.tasks_by_status.reserved;
        }
      }
    })
  }
  return { activeTasks, waitingTasks }
}

const TasksTile1 = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return getTasksByGroup(queues, "sales");
})((props) => (
  <Flex.AggregatedDataTile title="Sales (Active)" content={props.activeTasks}
    description={"Waiting: " + props.waitingTasks} />
));

const GroupTasksTile = connect((state, ownProps) => {
  //console.log('Own Props: ', ownProps);
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return getTasksByGroup(queues, ownProps.group);
})((props) => {
  return (
    <Flex.AggregatedDataTile
      title={props.group + " (Active)"}
      content={props.activeTasks}
      description={"Waiting: " + props.waitingTasks} />
  )
});

const getTaskCounts = (queues) => {
  let taskCounts = {
    chat: { activeTasks: 0, waitingTasks: 0 },
    sms: { activeTasks: 0, waitingTasks: 0 },
    voice: { activeTasks: 0, waitingTasks: 0 }
  };
  if (queues && queues.length > 0) {
    queues.forEach(q => {
      if (q.channels) {
        q.channels.forEach(ch => {
          //Only aggregate counts for configured channels
          if (channelList.includes(ch.unique_name)) {
            if (ch.tasks_now) {
              taskCounts[ch.unique_name].activeTasks += ch?.tasks_now?.active_tasks;
              taskCounts[ch.unique_name].waitingTasks += ch?.tasks_now?.waiting_tasks;
            }
          }
        })
      }
    })
  }
  return taskCounts;
}


const getSLToday = (queues) => {
  let slMetrics = {
    chat: { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 },
    sms: { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 },
    voice: { handledTasks: 0, handledTasksWithinSL: 0, serviceLevelPct: 0 }
  };
  if (queues && queues.length > 0) {
    queues.forEach(q => {
      if (q.channels) {
        q.channels.forEach(ch => {
          if (channelList.includes(ch.unique_name)) {
            //Not all queues/channels have SLA
            if (ch.sla_today) {
              slMetrics[ch.unique_name].handledTasks += ch?.sla_today?.handled_tasks_count;
              slMetrics[ch.unique_name].handledTasksWithinSL += ch?.sla_today?.handled_tasks_within_sl_threshold_count;
            }
          }
        })
      }
    })
  }
  channelList.forEach(ch => {
    if (slMetrics[ch].handledTasks > 0)
      slMetrics[ch].serviceLevelPct = Math.floor((slMetrics[ch].handledTasksWithinSL / slMetrics[ch].handledTasks) * 100);
  })
  return slMetrics;
}


const TaskCountTile = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return getTaskCounts(queues);
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


const SLATile = connect((state) => {
  const queues = Object.values(state.flex.realtimeQueues.queuesList);
  return getSLToday(queues);
  //object returned from connect is merged into component props
  //See https://react-redux.js.org/api/connect
})((props) => {
  let channelName = props.channelName;
  let sla = props[channelName];
  return (<Flex.AggregatedDataTile
    title={channelName + " SLA"}
    description={sla.handledTasksWithinSL + " / " + sla.handledTasks} >
    <ServiceLevelTile sla={sla} />
  </Flex.AggregatedDataTile>)
});


const addTiles = () => {
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <TaskCountTile key="chat-tasks-tile" channelName="chat" />,
    { sortOrder: -6 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <SLATile key="chat-sla-tile" channelName="chat" />,
    { sortOrder: -5 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <TaskCountTile key="voice-tasks-tile" channelName="voice" />,
    { sortOrder: -4 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <SLATile key="voice-sla-tile" channelName="voice" />,
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

const RenderWaitingTasks = (workerQueue) =>
  // QueuesDataTableCell component helps us render additional expandable rows with channel specific data
  <QueuesStats.QueuesDataTableCell
    // Pass the queue data down 
    queue={workerQueue}

    // Render the queue level value
    renderQueueData={(queue) => {
      if (!queue.friendly_name.includes("Everyone")) {
        // Calculate number of waiting tasks by adding pending and reserved
        const { pending, reserved } = queue.tasks_by_status;
        const waitingTasks = pending + reserved;
        // Return the element to render
        return <span>{waitingTasks}</span>;
      } else {
        return <span> </span>;
      }
    }}
    // Render a value for each active channel in the queue
    renderChannelData={(channel, queue) => {
      if (!queue.friendly_name.includes("Everyone")) {
        // Calculate number of waiting tasks by adding pending and reserved
        const { pending, reserved } = queue.tasks_by_status;
        const waitingTasks = pending + reserved;
        // Return the element to render
        return <span>{waitingTasks}</span>;
      } else {
        return <span> </span>;
      }
    }}
  />

const customizeQueueStats = () => {
  QueuesStats.QueuesDataTable.Content.remove("waiting-tasks");
  // Create a new column with custom formatting
  QueuesStats.QueuesDataTable.Content.add(
    <ColumnDefinition
      key="my-waiting-tasks"
      header="Waiting"
      subHeader="Now"
      content={RenderWaitingTasks}
    />,
    { sortOrder: 1 } // Put this after the second column
  );
}