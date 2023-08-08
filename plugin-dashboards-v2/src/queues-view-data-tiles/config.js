
const config = {
  'activeTasks': false,
  'waitingTasks': false,
  'longestWaitTime': true,
  'agentsByActivityBarChart': true,
  'channelVoice': {
    'SLA': true,
    'taskCounts': true
  },
  'channelChat': {
    'SLA': false,
    'taskCounts': false
  },
  'channelSMS': {
    'SLA': true,
    'taskCounts': true
  },
  'allChannelsSLA': false,
  'enhancedAgentByActivityPieChart': false
}

export const isActiveTasksEnabled = () => {
  return config.activeTasks;
};
export const isWaitingTasksEnabled = () => {
  return config.waitingTasks;
};
export const isLongestWaitTimeEnabled = () => {
  return config.longestWaitTime;
};
export const isAgentsByActivityEnabled = () => {
  return config.agentsByActivityBarChart;
};
export const isChannelVoice_CountsEnabled = () => {
  return config.channelVoice.taskCounts;
};
export const isChannelChat_CountsEnabled = () => {
  return config.channelChat.taskCounts;
};
export const isChannelSMS_CountsEnabled = () => {
  return config.channelSMS.taskCounts;
};
export const isChannelVoice_SLAEnabled = () => {
  return config.channelVoice.SLA;
};
export const isChannelChat_SLAEnabled = () => {
  return config.channelChat.SLA;
};
export const isChannelSMS_SLAEnabled = () => {
  return config.channelSMS.SLA;
};
export const isAllChannels_SLAEnabled = () => {
  return config.allChannelsSLA;
};
export const isQueueGroups_SLAEnabled = () => {
  return false;
};
export const isEnhancedAgentsByActivityPieChartEnabled = () => {
  return config.enhancedAgentByActivityPieChart;
};