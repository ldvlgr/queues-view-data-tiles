import AgentActivityBarChartTile from '../AgentActivityBarChartTile/AgentActivityBarChartTile';
import TaskSummaryTile from '../TaskSummaryTile/TaskSummaryTile';
import ActivitySummaryTile from '../ActivitySummaryTile/ActivitySummaryTile';
import ChannelCapacityTile from '../ChannelCapacityTile/ChannelCapacityTile';
import { TeamsViewTilesContainer } from "./TeamsViewDataTiles.Components"

import {
  getTeamsConfig,
  isChannelChat_CapacityEnabled,
  isChannelSMS_CapacityEnabled,
  isTaskSummaryEnabled,
  isTeamActivityBarChartEnabled,
  isActivitySummaryEnabled
} from '../../config';


const TeamsViewDataTiles = () => {
  return (
    <TeamsViewTilesContainer>
      {isTaskSummaryEnabled() &&
        <TaskSummaryTile />
      }
      {isChannelChat_CapacityEnabled() &&
        <ChannelCapacityTile key="chat" channelName="Chat" />
      }
      {isChannelSMS_CapacityEnabled() &&
        <ChannelCapacityTile key="sms" channelName="SMS" />
      }
      {isActivitySummaryEnabled() &&
        <ActivitySummaryTile />
      }
      {isTeamActivityBarChartEnabled() &&
        <AgentActivityBarChartTile teamsData={getTeamsConfig()} />
      } 
      {/* {isSkillsByTeamEnabled() &&
        <SkillsByTeamTile teamsData={getTeamsConfig()} />
      } */}
    </TeamsViewTilesContainer>
  )
}

export default TeamsViewDataTiles;