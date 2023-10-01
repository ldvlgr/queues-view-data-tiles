export default interface TeamsViewDataTilesConfig {
  channels: Channels;
  teams: {
    [key: string]: { color: string},
  },
  taskSummaryDataTile: boolean;
  teamActivityBarChart: boolean;
  activitySummaryTile: boolean;
  idle_status: { color: string };
  busy_status: { color: string };
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
  [key: string]: { 
    color: string; 
    taskCount: boolean, 
    capacityDataTile: boolean 
  };
}
