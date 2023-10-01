import TeamsViewDataTilesConfig from "./types/ServiceConfiguration";

const config: TeamsViewDataTilesConfig = {
  channels: {
    voice: {
      color: '#ADD8E6',
      taskCount: true,
      capacityDataTile: false,
    },
    chat: {
      color: '#87CEFA',
      taskCount: true,
      capacityDataTile: true,
    },
    sms: {
      color: '#59cef8',
      taskCount: true,
      capacityDataTile: true,
    },
    video: {
      color: '#00CED1',
      taskCount: true,
      capacityDataTile: false,
    },
  },
  teams: {
    Sales: { color: 'beige' },
    Magic: { color: 'wheat' },
    Service: { color: 'tan' },
    Support: { color: 'grey' },
    Galaxy: { color: 'white' },
    USA: { color: 'white' },
  },
  taskSummaryDataTile: true,
  teamActivityBarChart: false,
  activitySummaryTile: true,
  idle_status: { color: 'limegreen' },
  busy_status: { color: 'royalblue' },
  skillsByTeamDataTile: false,
  columns: {
    team: true,
    department: false,
    location: false,
    agent_skills: false,
    capacity: true
  }
}

export const getChannelsConfig = () => {
  return config.channels;
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
export const getChannelVideo_Color = () => {
  return config.channels.video.color;
};
export const getTeamsConfig = () => {
  return config.teams;
};
export const getTeamNames = () => {
  return Object.keys(config.teams);
};
export const isChannelVoice_CapacityEnabled = () => {
  return config.channels.voice.capacityDataTile;
};
export const isChannelChat_CapacityEnabled = () => {
  return config.channels.chat.capacityDataTile;
};
export const isChannelSMS_CapacityEnabled = () => {
  return config.channels.sms.capacityDataTile;
};
export const isTaskSummaryEnabled = () => {
  return config.taskSummaryDataTile;
};
export const isTeamActivityBarChartEnabled = () => {
  return config.teamActivityBarChart;
};
export const isActivitySummaryEnabled = () => {
  return config.activitySummaryTile;
};
export const getIdleStatusConfig = () => {
  return config.idle_status;
};
export const getBusyStatusConfig = () => {
  return config.busy_status;
};
export const isSkillsByTeamEnabled = () => {
  return config.skillsByTeamDataTile;
};
export const isTeamColumnEnabled = () => {
  return config.columns.team;
};
export const isDepartmentColumnEnabled = () => {
  return config.columns.department;
};
export const isLocationColumnEnabled = () => {
  return config.columns.location;
};
export const isAgentSkillsColumnEnabled = () => {
  return config.columns.agent_skills;
};
export const isAgentCapacityColumnEnabled = () => {
  return config.columns.capacity;
};