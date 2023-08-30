import AgentTeamActivityTile from '../AgentTeamActivityTile/AgentTeamActivityTile';
import SkillsByTeamTile from '../SkillsByTeamBarChartTile/SkillsByTeamTile';
import TaskSummaryTile from '../TaskSummaryTile/TaskSummaryTile';
import ChannelCapacityTile from '../ChannelCapacityTile/ChannelCapacityTile';
import { TeamsViewTilesContainer } from "./TeamsViewDataTiles.Components"

import {
  getChannelVoice_Color,
  getChannelChat_Color,
  getChannelSMS_Color,
  getTeamsConfig,
  isChannelVoice_CapacityEnabled,
  isChannelChat_CapacityEnabled,
  isChannelSMS_CapacityEnabled,
  isTaskSummaryEnabled,
  isTeamActivityBarChartEnabled,
  isSkillsByTeamEnabled
} from '../../config';


const TeamsViewDataTiles = () => {
  return (
    <TeamsViewTilesContainer>
      {isChannelChat_CapacityEnabled() &&
        <ChannelCapacityTile key="chat" channelName="chat" bgColor={getChannelChat_Color()} />
      }
      {isChannelSMS_CapacityEnabled() &&
        <ChannelCapacityTile key="sms" channelName="sms" bgColor={getChannelSMS_Color()} />
      }
      {isTaskSummaryEnabled() &&
        <TaskSummaryTile teamsData={getTeamsConfig()} />
      }
      {/* {isTeamActivityBarChartEnabled() &&
        <AgentTeamActivityTile teamsData={getTeamsConfig()} />
      } 
      {isSkillsByTeamEnabled() &&
        <SkillsByTeamTile teamsData={getTeamsConfig()} />
      } */}
    </TeamsViewTilesContainer>
  )
}

export default TeamsViewDataTiles;