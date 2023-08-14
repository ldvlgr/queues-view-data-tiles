import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { WorkerQueue } from '@twilio/flex-ui/src/state/QueuesState';

import ChannelTaskCountTile from '../../custom-components/ChannelTaskCountTile/ChannelTaskCountTile';
import ChannelSLATile from '../../custom-components/ChannelSLATile/ChannelSLATile';
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
  isEnhancedAgentsByActivityPieChartEnabled,
  isAssignedTasksColumnEnabled,
  isWrappingTasksColumnEnabled
} from '../../config';


const tileColors = {
  'voice': getChannelVoice_Color(),
  'chat': getChannelChat_Color(),
  'sms': getChannelSMS_Color()
}

export default (manager: Flex.Manager) => {
  customizeQueueStats();
  addTiles();
}

const addTiles = () => {
  //Add custom tile
  if (isChannelVoice_CountsEnabled()) {
    const options: Flex.ContentFragmentProps = { sortOrder: -6 };
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelTaskCountTile key='voice-tasks' channelName='voice' bgColor={tileColors.voice} />,
      options
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

const customizeQueueStats = () => {
  if (isAssignedTasksColumnEnabled()) {
    Flex.QueuesStats.QueuesDataTable.Content.add(
      <Flex.ColumnDefinition
        key='assigned-tasks'
        header='Assigned'
        subHeader='Now'
        content={(queue: WorkerQueue) => {
          const assignedTasks = queue.tasks_by_status?.assigned || 0;
          return <span>{assignedTasks}</span>;
        }}
      />,
      { sortOrder: -10 }
    );
  }
  if (isWrappingTasksColumnEnabled()) {
    Flex.QueuesStats.QueuesDataTable.Content.add(
      <Flex.ColumnDefinition
        key='wrapping-tasks'
        header='Wrapping'
        subHeader='Now'
        content={(queue: WorkerQueue) => {
          const wrappingTasks = queue.tasks_by_status?.wrapping || 0;
          return <span>{wrappingTasks}</span>;
        }}
      />,
      { sortOrder: -9 }
    );
  }
}