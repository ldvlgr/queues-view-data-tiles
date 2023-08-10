import * as Flex from '@twilio/flex-ui';

import { ColumnDefinition } from '@twilio/flex-ui';
import QueueFilters from '../../custom-components/QueueFilters/QueueFilters';

import GroupTasksTile from '../../custom-components/GroupTasksTile/GroupTasksTile';
import ChannelTaskCountTile from '../../custom-components/ChannelTaskCountTile/ChannelTaskCountTile';
import ChannelSLATile from '../../custom-components/ChannelSLATile/ChannelSLATile';
import GroupSLATile from '../../custom-components/GroupSLATile/GroupSLATile';
import AllChannelsSLATile from '../../custom-components/AllChannelsSLATile/AllChannelsSLATile';
import GroupsChartTile from '../../custom-components/GroupsChartTile/GroupsChartTile';
import AgentActivityTile from '../../custom-components/AgentActivityTile/AgentActivityTile';
const PLUGIN_NAME = 'DashboardsPlugin';

import {
  isActiveTasksEnabled,
  isWaitingTasksEnabled,
  isLongestWaitTimeEnabled,
  isAgentsByActivityEnabled,
  getChannelVoice_Color,
  getChannelChat_Color,
  getChannelSMS_Color,
  isChannelVoice_CountsEnabled,
  isChannelChat_CountsEnabled,
  isChannelSMS_CountsEnabled,
  isChannelVoice_SLAEnabled,
  isChannelChat_SLAEnabled,
  isChannelSMS_SLAEnabled,
  isAllChannels_SLAEnabled,
  isQueueGroups_SLAEnabled,
  isEnhancedAgentsByActivityPieChartEnabled
} from '../../config';

const tileColors = {
  'voice': getChannelVoice_Color(),
  'chat': getChannelChat_Color(),
  'sms': getChannelSMS_Color()
}

export default (manager) => {
  //setVisibleQueues(manager);
  customizeQueueStats();
  console.log(PLUGIN_NAME, 'Adding Tiles');
  addTiles();
  //addFilters();
}

const addFilters = () => {

  Flex.QueuesStatsView.Content.add(<QueueFilters key='queue-filters' />, {
    align: 'start',
    sortOrder: 0,
  })
}


const addTiles = () => {
  //Add custom tile
  if (isChannelVoice_CountsEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelTaskCountTile key='voice-tasks' channelName='voice' bgColor={tileColors.voice} />,
      { sortOrder: -6 }
    );
  }
  if (isChannelChat_CountsEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelTaskCountTile key='chat-tasks' channelName='chat' bgColor={tileColors.chat} />,
      { sortOrder: -5 }
    );
  }
  if (isChannelSMS_CountsEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelTaskCountTile key='sms-tasks' channelName='sms' bgColor={tileColors.sms} />,
      { sortOrder: -4 }
    );
  }
  if (isChannelVoice_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelSLATile key='voice-sla-tile' channelName='voice' />,
      { sortOrder: -3 }
    );
  }
  if (isChannelChat_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelSLATile key='chat-sla-tile' channelName='chat' />,
      { sortOrder: -2 }
    );
  }
  if (isChannelSMS_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelSLATile key='sms-sla-tile' channelName='sms' />,
      { sortOrder: -1 }
    );
  }
  if (isAllChannels_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <AllChannelsSLATile key='combo-data-tile' colors={tileColors} />,
      { sortOrder: 0 }
    );
  }
  if (isQueueGroups_SLAEnabled()) {
    const groupColors = ['#D8BFD8', '#DDA0DD', '#DA70D6', '#9370DB'];
    const queueGroups = ['sales', 'service', 'care', 'fraud'];
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <GroupsChartTile key='groups-data-tile' colors={groupColors} groups={queueGroups} />,
      { sortOrder: 1 }
    );
  }
  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <GroupTasksTile key='tasks-tile-1' group='sales' />,
  //   { sortOrder: 2 }
  // );
  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <GroupSLATile key='sales-sla-tile' group='sales' />,
  //   { sortOrder: 3 }
  // );
  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <GroupTasksTile key='tasks-tile-2' group='service' />,
  //   { sortOrder: 4 }
  // );
  // Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
  //   <GroupSLATile key='service-sla-tile' group='service' />,
  //   { sortOrder: 5 }
  // );
  if (isEnhancedAgentsByActivityPieChartEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <AgentActivityTile key='agent-activity-tile' />,
      { sortOrder: 6 }
    );
  }

  //Remove original tiles
  if (!isActiveTasksEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('active-tasks-tile');
  }
  if (!isWaitingTasksEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('waiting-tasks-tile');
  }
  if (!isLongestWaitTimeEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('longest-wait-time-tile');
  }
  if (!isAgentsByActivityEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.remove('agents-by-activity-chart-tile');
  }
}

const setVisibleQueues = (manager) => {
  const TEAM_TWILIO = 'TwilioPS';
  const TEAM_BPO1 = 'BPO1';
  const TEAM_BPO2 = 'BPO2';

  let team_name = manager.workerClient.attributes?.team_name || 'None';
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
    //QueuesStats.setSubscriptionFilter((queue) => queue.friendly_name == 'Everyone');

  }
}


const customizeQueueStats = () => {
  Flex.QueuesStats.QueuesDataTable.Content.add(
    <ColumnDefinition
      key='assigned-tasks'
      header='Assigned'
      subHeader='Now'
      content={(queue) => {
        const assignedTasks  = queue.tasks_by_status?.assigned || 0;
        return <span>{assignedTasks}</span>;
      }}
    />,
    { sortOrder: -10 }
  );
  Flex.QueuesStats.QueuesDataTable.Content.add(
    <ColumnDefinition
      key='wrapping-tasks'
      header='Wrapping'
      subHeader='Now'
      content={(queue) => {
        const wrappingTasks  = queue.tasks_by_status?.wrapping || 0;
        return <span>{wrappingTasks}</span>;
      }}
    />,
    { sortOrder: -9 }
  );
}


