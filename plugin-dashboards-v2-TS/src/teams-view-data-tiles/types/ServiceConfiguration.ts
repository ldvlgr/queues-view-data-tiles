export default interface TeamsViewDataTilesConfig {
  enabled: boolean;
  channels: Channels;
  teams: {
    [key: string]: { color: string},
  },
  taskSummaryDataTile: boolean;
  teamActivityBarChart: boolean;
  skillsByTeamDataTile: boolean;
  columns: {
    team: boolean,
    department: boolean,
    location: boolean,
    agent_skills: boolean,
    capacity: boolean
  }
}

export interface Channels {
  [key: string]: ChannelConfig;
}

export interface ChannelConfig {
  color: string;
  capacityDataTile: boolean;
}

