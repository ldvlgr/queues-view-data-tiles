
const config = {
  activeTasks: false,
  waitingTasks: false,
  longestWaitTime: false,
  agentsByActivityBarChart: false,
  channels: {
    voice: {
      color: '#ADD8E6',
      SLA: true,
      taskCounts: true
    },
    chat: {
      color: '#87CEFA',
      SLA: false,
      taskCounts: false
    },
    sms: {
      color: '#4682B4',
      SLA: true,
      taskCounts: true
    },
  },
  allChannelsSLA: true,
  enhancedAgentByActivityPieChart: true
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
  return config.channels.voice.taskCounts;
};
export const isChannelChat_CountsEnabled = () => {
  return config.channels.chat.taskCounts;
};
export const isChannelSMS_CountsEnabled = () => {
  return config.channels.sms.taskCounts;
};
export const isChannelVoice_SLAEnabled = () => {
  return config.channels.voice.SLA;
};
export const isChannelChat_SLAEnabled = () => {
  return config.channels.chat.SLA;
};
export const isChannelSMS_SLAEnabled = () => {
  return config.channels.sms.SLA;
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