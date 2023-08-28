import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { styled } from '@twilio/flex-ui';
import Worker from '../../types/worker';

import AgentTeamActivityTile from '../../custom-components/AgentTeamActivityTile/AgentTeamActivityTile';
import SkillsByTeamTile from '../../custom-components/SkillsByTeamBarChartTile/SkillsByTeamTile';
import TaskSummaryTile from '../../custom-components/TaskSummaryTile/TaskSummaryTile';
import ChannelCapacityTile from '../../custom-components/ChannelCapacityTile/ChannelCapacityTile';
import {
  getChannelVoice_Color,
  getChannelChat_Color,
  getChannelSMS_Color,
  getTeamsConfig,
  isChannelVoice_CapacityEnabled,
  isChannelChat_CapacityEnabled,
  isChannelSMS_CapacityEnabled,
  isTeamColumnEnabled,
  isDepartmentColumnEnabled,
  isLocationColumnEnabled,
  isAgentSkillsColumnEnabled,
  isAgentCapacityColumnEnabled,
  isTaskSummaryEnabled,
  isTeamActivityBarChartEnabled,
  isSkillsByTeamEnabled
} from '../../config';

interface WorkerItem {
  worker: Worker;
}

export default (manager: Flex.Manager) => {
  addTeamsViewTiles();
  addWorkersDataTableColumns(manager);
  // default string
  // manager.strings.SupervisorTaskCardHeader = '{{task.defaultFrom}}';
  manager.strings.SupervisorTaskCardHeader = '{{task.queueName}}';
}

export interface ThemeOnlyProps {
  theme?: any;
}

const TeamsWrapper = styled('div')`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 12px;
  `;

const TeamsViewDataTiles = styled('div')<ThemeOnlyProps>`
  
  display: flex;
  width: 100%;
  margin-top: ${({ theme }) => theme.tokens.spacings.space0};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
  height: auto;
  box-sizing: border-box;
  flex: 0 0 auto;
  > * {
      flex: 1 1 25%;
  }
  > * + * {
      margin-left: ${({ theme }) => theme.tokens.spacings.space50};
  }
  ${(props) => props.theme.QueuesStats.TilesGrid}
`;

const addTeamsViewTiles = () => {

  Flex.TeamsView.Content.addWrapper(
    (OriginalComponent) => (originalProps) => {
      const updatedProps = { ...originalProps };

      return (
        <TeamsWrapper>
          <TeamsViewDataTiles>
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
          </TeamsViewDataTiles>
          <OriginalComponent {...updatedProps} />
        </TeamsWrapper>
      );
    }
  );
}

const getSkills = (item: WorkerItem) => {
  return item.worker.attributes.routing ? item.worker?.attributes?.routing?.skills?.join(', ') : '-';
};

// Assume worker has copy of Worker Channels config in attributes like this:
// {
//   "channels": {
//     "default": {
//       "worker_channel_sid": "WCaaa",
//       "capacity": 2,
//       "available": "true"
//     },
//     "voice": {
//       "worker_channel_sid": "WCbbb",
//       "capacity": 1,
//       "available": "true"
//     },
//     "chat": {
//       "worker_channel_sid": "WCccc",
//       "capacity": 3,
//       "available": "true"
//     },
//     "sms": {
//       "worker_channel_sid": "WCddd",
//       "capacity": 3,
//       "available": "true"
//     }
//   }
// }
const getCapacity = (item: WorkerItem) => {
  let chatCapacity, smsCapacity;
  let wkCh = item.worker?.attributes?.channels;
  if (wkCh) {
    chatCapacity = (wkCh?.chat?.available && wkCh?.chat?.capacity) ? wkCh.chat.capacity : 0;
    smsCapacity = (wkCh?.sms?.available && wkCh?.sms?.capacity) ? wkCh.sms.capacity : 0;
  }
  return <span>Chat: {chatCapacity} <br /> SMS: {smsCapacity} </span>
};



const addWorkersDataTableColumns = (manager: Flex.Manager) => {
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="team"
      header="Team Name"
      content={(item: WorkerItem) => item.worker.attributes.team_name}
    />,
    { sortOrder: 4, if: () => isTeamColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="department"
      header="Department"
      content={(item: WorkerItem) => item.worker.attributes.department_name}
    />,
    { sortOrder: 5, if: () => isDepartmentColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="location"
      header="Location"
      content={(item: WorkerItem) => item.worker.attributes.location}
    />,
    { sortOrder: 6, if: () => isLocationColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="skills"
      header="Skills"
      content={(item: WorkerItem) => getSkills(item)}
    />,
    { sortOrder: 7, if: () => isAgentSkillsColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="capacity"
      header="Capacity"
      content={(item: WorkerItem) => getCapacity(item)}
    />,
    { sortOrder: 8, if: () => isAgentCapacityColumnEnabled() },
  );
};

