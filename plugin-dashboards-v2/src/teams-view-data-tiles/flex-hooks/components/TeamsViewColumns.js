import React from 'react';
import * as Flex from '@twilio/flex-ui';

import {
  isTeamColumnEnabled,
  isDepartmentColumnEnabled,
  isLocationColumnEnabled,
  isAgentSkillsColumnEnabled,
  isAgentCapacityColumnEnabled,
} from '../../config';


const getSkills = (item) => {
  return item.worker.attributes.routing ? item.worker?.attributes?.routing?.skills?.join(', ') : '-';
};

const getCapacity = (item) => {
  let chatCapacity, smsCapacity;
  let wkCh = item.worker?.attributes?.channels;
  if (wkCh) {
    chatCapacity = (wkCh?.chat?.available && wkCh?.chat?.capacity) ? wkCh.chat.capacity : 0;
    smsCapacity = (wkCh?.sms?.available && wkCh?.sms?.capacity) ? wkCh.sms.capacity : 0;
  }
  return <span>Chat: {chatCapacity} <br /> SMS: {smsCapacity} </span>
};

export const addWorkersDataTableColumns = () => {
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
