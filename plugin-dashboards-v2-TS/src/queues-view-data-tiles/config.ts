
import DataTilesConfig from "./types/ServiceConfiguration";

const config: DataTilesConfig = {
  enabled: true,
  queuesViewTiles: {
    activeTasksDataTile: false,
    waitingTasksDataTile: false,
    longestWaitTimeDataTile: false,
    agentsByActivityBarChart: false,
    allChannelsDataTile: true,
    enhancedAgentByActivityPieChart: true,
    groupsChartTile: false,
    groupsSummaryTile: true,
  },
  channels: {
    Voice: {
      color: '#ADD8E6',
      SLADataTile: false,
      taskCountsDataTile: true
    },
    Chat: {
      color: '#87CEFA',
      SLADataTile: false,
      taskCountsDataTile: true
    },
    SMS: {
      color: '#59cef8',
      SLADataTile: false,
      taskCountsDataTile: false
    },
    Video: {
      color: '#00FFFF',
      SLADataTile: true,
      taskCountsDataTile: true
    },
  },
  queueGroups: ['Sales', 'Service', 'Magic'],
  
  agentActivityConfiguration: {
    activities: {
      Available: { color: 'green', icon: 'Accept' },
      Outbound: { color: 'darkgreen', icon: 'Call' },
      Break: { color: 'goldenrod', icon: 'Hold' },
      Lunch: { color: 'darkorange', icon: 'Hamburger' },
      Training: { color: 'red', icon: 'Bulb' },
      Offline: { color: 'grey', icon: 'Minus' },
    },
    other: { color: 'darkred', icon: 'More' },
  },
  queuesStatsColumns: {
    assignedTasksColumn: true,
    wrappingTasksColumn: true
  }
}


export const isActiveTasksEnabled = () => {
  return config.queuesViewTiles.activeTasksDataTile;
};
export const isWaitingTasksEnabled = () => {
  return config.queuesViewTiles.waitingTasksDataTile;
};
export const isLongestWaitTimeEnabled = () => {
  return config.queuesViewTiles.longestWaitTimeDataTile;
};
export const isAgentsByActivityEnabled = () => {
  return config.queuesViewTiles.agentsByActivityBarChart;
};
export const getChannelColors = () => {
  const channelNames = Object.keys(config.channels);
  const colors: { [key: string]: string } = {};
  channelNames.forEach((ch) => {
    colors[ch.toLowerCase()] = config.channels[ch].color;
  });
  return colors;
};
export const getChannelsConfig = () => {
  return config.channels;
};
export const isChannelVoice_CountsEnabled = () => {
  return config.channels?.Voice?.taskCountsDataTile;
};
export const isChannelChat_CountsEnabled = () => {
  return config.channels?.Chat?.taskCountsDataTile;
};
export const isChannelSMS_CountsEnabled = () => {
  return config.channels?.SMS?.taskCountsDataTile;
};
export const isChannelVoice_SLAEnabled = () => {
  return config.channels?.Voice?.SLADataTile;
};
export const isChannelChat_SLAEnabled = () => {
  return config.channels?.Chat?.SLADataTile;
};
export const isChannelSMS_SLAEnabled = () => {
  return config.channels?.SMS?.SLADataTile;
};
export const isAllChannels_SLAEnabled = () => {
  return config.queuesViewTiles.allChannelsDataTile;
};
export const isQueueGroups_SLAEnabled = () => {
  return config.queuesViewTiles.groupsChartTile;
};
export const isGroupsSummaryEnabled = () => {
  return config.queuesViewTiles.groupsSummaryTile;
};
export const getQueueGroups = () => {
  return config.queueGroups;
}
export const isEnhancedAgentsByActivityPieChartEnabled = () => {
  return config.queuesViewTiles.enhancedAgentByActivityPieChart;
};
export const getAgentActivityConfig = () => {
  return config.agentActivityConfiguration;
};
export const isAssignedTasksColumnEnabled = () => {
  return config.queuesStatsColumns.assignedTasksColumn;
};
export const isWrappingTasksColumnEnabled = () => {
  return config.queuesStatsColumns.wrappingTasksColumn;
};