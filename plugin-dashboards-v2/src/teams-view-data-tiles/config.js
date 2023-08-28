const config = {
  channels: {
    voice: {
      color: '#ADD8E6',
      capacityDataTile: true,
    },
    chat: {
      color: '#87CEFA',
      capacityDataTile: true,
    },
    sms: {
      color: '#4682B4',
      capacityDataTile: true,
    },
  },
  teams: {
    Sales: { color: 'beige' },
    Magic: { color: 'wheat' },
    Service: { color: 'tan' }
  },
  taskSummaryDataTile: true,
  teamActivityBarChart: true,
  skillsByTeamDataTile: false,
  columns: {
    team: true,
    department: false,
    location: false,
    agent_skills: false,
    capacity: true
  }
}


export const getChannelVoice_Color = () => {
  return config.channels.voice.color;
};
export const getChannelChat_Color = () => {
  return config.channels.chat.color;
};
export const getChannelSMS_Color = () => {
  return config.channels.sms.color;
};
export const getTeamsConfig = () => {
  return config.teams;
}
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