import * as Flex from "@twilio/flex-ui";

import { ColumnDefinition, QueuesStats } from '@twilio/flex-ui';
import QueueFilters from "./QueueFilters/QueueFilters";

import GroupTasksTile from "./GroupTasksTile";
import ChannelTaskCountTile from "./ChannelTaskCountTile";
import HandledTasksPieChart from "./HandledTasksPieChart";
import ChannelSLATile from "./ChannelSLATile/ChannelSLATile";
import GroupSLATile from "./GroupSLATile";
import AllChannelsSLATile from "./AllChannelsSLATile/AllChannelsSLATile";
import GroupsChartTile from "./GroupsChartTile/GroupsChartTile";
import AgentActivityTile from "./AgentActivityTile/AgentActivityTile";
import AgentTeamActivityTile from "./AgentTeamActivityTile/AgentTeamActivityTile";

const PLUGIN_NAME = 'DashboardsPlugin';

const tileColors = {
  "voice": '#ADD8E6',
  "chat": '#87CEFA',
  "sms": '#4682B4'
}

const groupColors = ['#D8BFD8', '#DDA0DD', '#DA70D6', '#9370DB'];
const queueGroups = ["sales", "service", "care", "fraud"];
const teams = ["ABC123", "XYZ987", "Twilio"];

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


const addTiles = () => {
  //Add custom tile
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <AllChannelsSLATile key="combo-data-tile" colors={tileColors} />,
    { sortOrder: -10 }
  );

  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <ChannelTaskCountTile key="chat-tasks-tile" channelName="chat" bgColor={tileColors.chat} />,
    { sortOrder: -9 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <ChannelSLATile key="chat-sla-tile" channelName="chat" />,
    { sortOrder: -8 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <ChannelTaskCountTile key="voice-tasks-tile" channelName="voice" bgColor={tileColors.voice} />,
    { sortOrder: -7 }
  );
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <ChannelSLATile key="voice-sla-tile" channelName="voice" />,
    { sortOrder: -6 }
  );
  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <ChannelSLATile key="sms-sla-tile" channelName="sms" />,
  //   { sortOrder: -6 }
  // );

  //GROUPS TILE
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <GroupsChartTile key="groups-data-tile" colors={groupColors} groups={queueGroups} />,
    { sortOrder: -5 }
  );

  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <GroupTasksTile key="tasks-tile-1" group="sales" />,
    { sortOrder: -4 }
  );

  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <GroupSLATile key="sales-sla-tile" group="sales" />,
    { sortOrder: -3 }
  );

  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <GroupTasksTile key="tasks-tile-2" group="service" />,
  //   { sortOrder: -2 }
  // );

  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <GroupSLATile key="service-sla-tile" group="service" />,
  //   { sortOrder: -1 }
  // );

  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <AgentActivityTile key="agents-tile-1" />,
  //   { sortOrder: -1 }
  // );

  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
    <AgentTeamActivityTile key="agents-team-tile" teams={teams}/>,
    { sortOrder: -1 }
  );


  //Remove original tiles
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('active-tasks-tile');
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('waiting-tasks-tile');
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('longest-wait-time-tile');
  Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('agents-by-activity-chart-tile');
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

}
