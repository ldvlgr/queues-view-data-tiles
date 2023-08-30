import React from 'react';
import * as Flex from '@twilio/flex-ui';
import { styled } from '@twilio/flex-ui';
import TeamsViewDataTiles from '../../custom-components/TeamsViewDataTiles/TeamsViewDataTiles';
import {
  isTeamColumnEnabled,
  isDepartmentColumnEnabled,
  isLocationColumnEnabled,
  isAgentSkillsColumnEnabled,
  isAgentCapacityColumnEnabled,
} from '../../config';

export default (manager) => {
  addTeamsViewTiles();
  addWorkersDataTableColumns(manager);
  // default string
  // manager.strings.SupervisorTaskCardHeader = '{{task.defaultFrom}}';
  manager.strings.SupervisorTaskCardHeader = '{{task.queueName}}';
}

const TeamsWrapper = styled('div')`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 12px;
  `;

const addTeamsViewTiles = () => {

  Flex.TeamsView.Content.addWrapper(
    (OriginalComponent) => (originalProps) => {
      const updatedProps = { ...originalProps };
      return (
        <TeamsWrapper>
          <TeamsViewDataTiles />
          <OriginalComponent {...updatedProps} />
        </TeamsWrapper>
      );
    }
  );
}

const getSkills = (item) => {
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
const getCapacity = (item) => {
  let chatCapacity, smsCapacity;
  let wkCh = item.worker?.attributes?.channels;
  if (wkCh) {
    chatCapacity = (wkCh?.chat?.available && wkCh?.chat?.capacity) ? wkCh.chat.capacity : 0;
    smsCapacity = (wkCh?.sms?.available && wkCh?.sms?.capacity) ? wkCh.sms.capacity : 0;
  }
  return <span>Chat: {chatCapacity} <br /> SMS: {smsCapacity} </span>
};



const addWorkersDataTableColumns = (manager) => {
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="team"
      header="Team Name"
      content={(item) => item.worker.attributes.team_name}
    />,
    { sortOrder: 4, if: () => isTeamColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="department"
      header="Department"
      content={(item) => item.worker.attributes.department_name}
    />,
    { sortOrder: 5, if: () => isDepartmentColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="location"
      header="Location"
      content={(item) => item.worker.attributes.location}
    />,
    { sortOrder: 6, if: () => isLocationColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="skills"
      header="Skills"
      content={(item) => getSkills(item)}
    />,
    { sortOrder: 7, if: () => isAgentSkillsColumnEnabled() },
  );
  Flex.WorkersDataTable.Content.add(
    <Flex.ColumnDefinition
      key="capacity"
      header="Capacity"
      content={(item) => getCapacity(item)}
    />,
    { sortOrder: 8, if: () => isAgentCapacityColumnEnabled() },
  );
};

