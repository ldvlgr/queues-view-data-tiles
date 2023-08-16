
import QueuesViewDataTilesConfig from "./types/ServiceConfiguration";

const config: QueuesViewDataTilesConfig = {
  activeTasksDataTile: false,
  enabled: true,
  waitingTasksDataTile: false,
  longestWaitTimeDataTile: false,
  agentsByActivityBarChart: false,
  channels: {
    voice: {
      color: '#ADD8E6',
      SLADataTile: true,
      taskCountsDataTile: true
    },
    chat: {
      color: '#87CEFA',
      SLADataTile: false,
      taskCountsDataTile: false
    },
    sms: {
      color: '#4682B4',
      SLADataTile: true,
      taskCountsDataTile: true
    },
    video: {
      color: '#00FFFF',
      SLADataTile: true,
      taskCountsDataTile: true
    },
  },
  allChannelsDataTile: true,
  groupsChartTile: false,
  enhancedAgentByActivityPieChart: true,
  agentActivityConfiguration: {
    Available: { color: 'green', icon: 'Accept' },
    Outbound: { color: 'greenyellow', icon: 'Call' },
    Break: { color: 'goldenrod', icon: 'Hold' },
    Lunch: { color: 'darkorange', icon: 'Hamburger' },
    Training: { color: 'red', icon: 'Bulb' },
    Unavailable: { color: 'darkred', icon: 'Close' },
    Offline: { color: 'grey', icon: 'Minus' },
  },
  queuesStatsColumns: {
    assignedTasksColumn: true,
    wrappingTasksColumn: true
  }
}


export const isActiveTasksEnabled = () => {
  return config.activeTasksDataTile;
};
export const isWaitingTasksEnabled = () => {
  return config.waitingTasksDataTile;
};
export const isLongestWaitTimeEnabled = () => {
  return config.longestWaitTimeDataTile;
};
export const isAgentsByActivityEnabled = () => {
  return config.agentsByActivityBarChart;
};
export const getChannelColors = () => {
  const channelNames = Object.keys(config.channels);
  const colors: { [key: string]: string } = {};
  channelNames.forEach((ch) => {
    colors[ch] = config.channels[ch].color;
  });
  return colors;
};
export const getChannelNames = () => {
  return Object.keys(config.channels);
};
export const getChannelVoice_Color = () => {
  return config.channels.voice.color;
};
export const getChannelChat_Color = () => {
  return config.channels.chat.color;
};
export const getChannelSMS_Color = () => {
  return config.channels.sms.color;
};
export const isChannelVoice_CountsEnabled = () => {
  return config.channels.voice.taskCountsDataTile;
};
export const isChannelChat_CountsEnabled = () => {
  return config.channels.chat.taskCountsDataTile;
};
export const isChannelSMS_CountsEnabled = () => {
  return config.channels.sms.taskCountsDataTile;
};
export const isChannelVoice_SLAEnabled = () => {
  return config.channels.voice.SLADataTile;
};
export const isChannelChat_SLAEnabled = () => {
  return config.channels.chat.SLADataTile;
};
export const isChannelSMS_SLAEnabled = () => {
  return config.channels.sms.SLADataTile;
};
export const isAllChannels_SLAEnabled = () => {
  return config.allChannelsDataTile;
};
export const isQueueGroups_SLAEnabled = () => {
  return config.groupsChartTile;
};
export const isEnhancedAgentsByActivityPieChartEnabled = () => {
  return config.enhancedAgentByActivityPieChart;
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