import { Icon, useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { Box, Table, THead, TBody, Th, Tr, Td, Tooltip } from '@twilio-paste/core';
import { EmojiIcon } from '@twilio-paste/icons/esm/EmojiIcon';

import { getTeamNames, getIdleStatusConfig, getBusyStatusConfig } from '../../config';
import { TileWrapper, AgentActivity, Label, Heading } from './ActivitySummaryTile.Components';
import { getAgentStatusCounts } from '../../utils/WorkerDataUtil';
import { getAgentActivityConfig } from '../../../queues-view-data-tiles/config';

const ActivitySummaryTile = () => {
  const teams = getTeamNames();
  const workerActivityCounts = useFlexSelector((state) => {
    const workers = state.flex.supervisor.workers;
    return getAgentStatusCounts(workers, teams);
  });
  const activityConfig = getAgentActivityConfig();
  const statusIdle = getIdleStatusConfig();
  const statusBusy = getBusyStatusConfig();
  const activityNames = Object.keys(activityConfig.activities);

  return (
    <TileWrapper className="Twilio-AggregatedDataTile">
      <Box overflowY="auto" maxHeight="240px">
        <Table variant="borderless">
          <THead stickyHeader top={0}>
            <Tr key="headerRow">
              <Th element="COMPACT_TABLE">
                <Heading> Team </Heading>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip text="Total Agents" placement="top">
                  <Heading>
                    <Icon icon="Agents" />
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE">
                <AgentActivity bgColor={statusIdle.color}>
                  <Tooltip text={statusIdle.label} placement="top">
                    <Heading>
                      <EmojiIcon decorative={true} />
                    </Heading>
                  </Tooltip>
                </AgentActivity>
              </Th>
              <Th element="COMPACT_TABLE">
                <AgentActivity bgColor={statusBusy.color}>
                  <Tooltip text={statusBusy.label} placement="top">
                    <Heading>
                      <Icon icon="GenericTask" />
                    </Heading>
                  </Tooltip>
                </AgentActivity>
              </Th>
              {activityNames.map((activity) => {
                return (
                  <Th element="COMPACT_TABLE" key={activity}>
                    <AgentActivity bgColor={activityConfig.activities[activity].color}>
                      <Tooltip text={activity} placement="top">
                        <Heading>
                          <Icon icon={activityConfig.activities[activity]?.icon} />
                        </Heading>
                      </Tooltip>
                    </AgentActivity>
                  </Th>
                );
              })}
            </Tr>
          </THead>
          <TBody>
            <Tr key="All">
              <Td element="COMPACT_TABLE">
                <Heading> Total (All) </Heading>
              </Td>
              <Td element="COMPACT_TABLE" textAlign="center">
                <Label>{workerActivityCounts.All.totalAgentCount} </Label>
              </Td>
              <Td element="COMPACT_TABLE_BG30" textAlign="center">
                <Label>{workerActivityCounts.All.activities.Idle} </Label>
              </Td>
              <Td element="COMPACT_TABLE_BG20" textAlign="center">
                <Label>{workerActivityCounts.All.activities.Busy} </Label>
              </Td>
              {activityNames.map((activity) => {
                return (
                  <Td element="COMPACT_TABLE" textAlign="center" key={activity}>
                    <Label> {workerActivityCounts.All.activities[activity] || 0} </Label>
                  </Td>
                );
              })}
            </Tr>
            {teams.map((team) => {
              const agentCount = workerActivityCounts[team].totalAgentCount;
              return (
                <Tr key={team}>
                  <Td element="COMPACT_TABLE">
                    <Label> {team} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE" textAlign="center">
                    <Label>{agentCount} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE_BG30" textAlign="center">
                    <Label>{workerActivityCounts[team].activities.Idle} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE_BG20" textAlign="center">
                    <Label>{workerActivityCounts[team].activities.Busy} </Label>
                  </Td>
                  {activityNames.map((activity) => {
                    return (
                      <Td element="COMPACT_TABLE" textAlign="center" key={activity}>
                        <Label>{workerActivityCounts[team].activities[activity]}</Label>
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </Box>
    </TileWrapper>
  );
};

export default ActivitySummaryTile;
