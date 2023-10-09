import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { WorkerQueue } from '@twilio/flex-ui/src/state/QueuesState';
import ChannelTaskCountTile from '../../custom-components/ChannelTaskCountTile/ChannelTaskCountTile';
import ChannelSLATile from '../../custom-components/ChannelSLATile/ChannelSLATile';
import AllChannelsSLATile from '../../custom-components/AllChannelsSLATile/AllChannelsSLATile';
import GroupsChartTile from '../../custom-components/GroupsChartTile/GroupsChartTile';
import AgentActivityTile from '../../custom-components/AgentActivityTile/AgentActivityTile';
import QueueGroupSummaryTile from '../../custom-components/QueueGroupSummaryTile/QueueGroupSummaryTile';

import {
  isActiveTasksEnabled,
  isWaitingTasksEnabled,
  isLongestWaitTimeEnabled,
  isAgentsByActivityEnabled,
  getChannelsConfig,
  getChannelColors,
  isChannelVoice_CountsEnabled,
  isChannelChat_CountsEnabled,
  isChannelSMS_CountsEnabled,
  isChannelVoice_SLAEnabled,
  isChannelChat_SLAEnabled,
  isChannelSMS_SLAEnabled,
  isAllChannels_SLAEnabled,
  isQueueGroups_SLAEnabled,
  isEnhancedAgentsByActivityPieChartEnabled,
  getAgentActivityConfig,
  isAssignedTasksColumnEnabled,
  isWrappingTasksColumnEnabled,
  isGroupsSummaryEnabled,
  getQueueGroups
} from '../../config';

const colors = getChannelColors();
const channelList = Object.keys(getChannelsConfig()).map((ch) => ch.toLowerCase());


export default (manager: Flex.Manager) => {
  customizeQueueStats();
  addTiles();
}

const addTiles = () => {
  //Add custom tile
  if (isGroupsSummaryEnabled()) {
    const groups = getQueueGroups();
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <QueueGroupSummaryTile key='queue-groups' groups={groups} />,
      { sortOrder: -7 }
    );
  }
  if (isChannelVoice_CountsEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelTaskCountTile key='voice-tasks' channelName='Voice' bgColor={colors.voice} channelList={channelList} />,
      { sortOrder: -6 }
    );
  }
  if (isChannelChat_CountsEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelTaskCountTile key='chat-tasks' channelName='Chat' bgColor={colors.chat} channelList={channelList} />,
      { sortOrder: -5 }
    );
  }
  if (isChannelSMS_CountsEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelTaskCountTile key='sms-tasks' channelName='SMS' bgColor={colors.sms} channelList={channelList} />,
      { sortOrder: -4 }
    );
  }
  if (isChannelVoice_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelSLATile key='voice-sla-tile' channelName='Voice' channelList={channelList} />,
      { sortOrder: -3 }
    );
  }
  if (isChannelChat_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelSLATile key='chat-sla-tile' channelName='Chat' channelList={channelList} />,
      { sortOrder: -2 }
    );
  }
  if (isChannelSMS_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <ChannelSLATile key='sms-sla-tile' channelName='SMS' channelList={channelList} />,
      { sortOrder: -1 }
    );
  }
  if (isAllChannels_SLAEnabled()) {
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <AllChannelsSLATile key='combo-data-tile' colors={colors} channelList={channelList} />,
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
    const agentActivityConfig = getAgentActivityConfig();
    Flex.QueuesStats.AggregatedQueuesDataTiles.Content.add(
      <AgentActivityTile key='agent-activity-tile' activityConfig={agentActivityConfig} />,
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
        description='The number of assigned tasks.'
        content={(queue: WorkerQueue) => {
          const assignedTasks = queue.tasks_by_status?.assigned || 0;
          return <span>{assignedTasks}</span>;
        }}
      />,
      { sortOrder: 0 }
    );
  }
  if (isWrappingTasksColumnEnabled()) {
    Flex.QueuesStats.QueuesDataTable.Content.add(
      <Flex.ColumnDefinition
        key='wrapping-tasks'
        header='Wrapping'
        subHeader='Now'
        description='The number of wrapping tasks.'
        content={(queue: WorkerQueue) => {
          const wrappingTasks = queue.tasks_by_status?.wrapping || 0;
          return <span>{wrappingTasks}</span>;
        }}
      />,
      { sortOrder: 0 }
    );
  }
}