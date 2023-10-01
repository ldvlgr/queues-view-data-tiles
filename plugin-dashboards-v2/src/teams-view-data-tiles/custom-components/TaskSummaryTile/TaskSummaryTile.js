import { Icon, useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { Box, Table, THead, TBody, Th, Tr, Td, Tooltip } from '@twilio-paste/core';
import { CallIncomingIcon } from '@twilio-paste/icons/esm/CallIncomingIcon';
import { CallOutgoingIcon } from '@twilio-paste/icons/esm/CallOutgoingIcon';

import { getTeamNames } from '../../config';
import { TileWrapper, Channel, Label, Heading } from './TaskSummaryTile.Components';
import { getTasksByTeamCounts } from '../../utils/WorkerDataUtil';
import { getChannelsConfig } from '../../config';

const TaskSummaryTile = () => {
  const teams = getTeamNames();
  const taskCounts = useFlexSelector((state) => {
    const workers = state.flex.supervisor.workers;
    return getTasksByTeamCounts(workers, teams);
  });
  const channels = getChannelsConfig();
  return (
    <TileWrapper className="Twilio-AggregatedDataTile">
      <Box overflowY="auto" maxHeight="240px">
        <Table variant="borderless">
          <THead stickyHeader top={0} element="STICKY_HEADER">
            <Tr>
              <Th element="COMPACT_TABLE">
                <Heading>
                  Team Name
                </Heading>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip text="Total Tasks" placement="top">
                  <Heading>
                    <Icon icon="GenericTask" />
                  </Heading>
                </Tooltip>
              </Th>
              {channels?.voice?.taskCount && (
                <Th element="COMPACT_TABLE" textAlign="center">
                  <Channel bgColor={channels.voice.color}>
                    <Tooltip text="Inbound Calls" placement="top">
                      <Heading>
                        <CallIncomingIcon decorative={true} />
                      </Heading>
                    </Tooltip>
                  </Channel>
                </Th>
              )}
              {channels?.voice?.taskCount && (
                <Th element="COMPACT_TABLE" textAlign="center">
                  <Channel bgColor={channels.voice.color}>
                    <Tooltip text="Outbound Calls" placement="top">
                      <Heading>
                        <CallOutgoingIcon decorative={true} />
                      </Heading>
                    </Tooltip>
                  </Channel>
                </Th>
              )}
              {channels?.chat?.taskCount && (
                <Th element="COMPACT_TABLE" textAlign="center">
                  <Channel bgColor={channels.chat.color}>
                    <Tooltip text="Chat" placement="top">
                      <Heading>
                        <Icon icon="Message" />
                      </Heading>
                    </Tooltip>
                  </Channel>
                </Th>
              )}
              {channels?.sms?.taskCount && (
                <Th element="COMPACT_TABLE" textAlign="center">
                  <Channel bgColor={channels.sms.color}>
                    <Tooltip text="SMS" placement="top">
                      <Heading>
                        <Icon icon="Sms" />
                      </Heading>
                    </Tooltip>
                  </Channel>
                </Th>
              )}
              {channels?.video?.taskCount && (
                <Th element="COMPACT_TABLE" textAlign="center">
                  <Channel bgColor={channels.video.color}>
                    <Tooltip text="Video" placement="top">
                      <Heading>
                        <Icon icon="Video" />
                      </Heading>
                    </Tooltip>
                  </Channel>
                </Th>
              )}
            </Tr>
          </THead>
          <TBody>
            <Tr key="Total">
              <Td element="COMPACT_TABLE">
                <Heading>
                   All Teams
                </Heading>
              </Td>
              <Td element="COMPACT_TABLE" textAlign="center">
                <Heading> {taskCounts.All.totalTaskCount} </Heading>
              </Td>
              {channels?.voice?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Heading> {taskCounts.All.tasks.voice_inbound} </Heading>
                </Td>
              )}
              {channels?.voice?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Heading> {taskCounts.All.tasks.voice_outbound} </Heading>
                </Td>
              )}
              {channels?.chat?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Heading> {taskCounts.All.tasks.chat} </Heading>
                </Td>
              )}
              {channels?.sms?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Heading> {taskCounts.All.tasks.sms} </Heading>
                </Td>
              )}
              {channels?.video?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Heading> {taskCounts.All.tasks.video} </Heading>
                </Td>
              )}
            </Tr>
            {teams.map((team) => {
              return (
                <Tr key={team}>
                  <Td element="COMPACT_TABLE">
                    <Label> {team} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE" textAlign="center">
                    <Label> {taskCounts[team].totalTaskCount} </Label>
                  </Td>
                  {channels?.voice?.taskCount && (
                    <Td element="COMPACT_TABLE" textAlign="center">
                      <Label> {taskCounts[team].tasks.voice_inbound} </Label>
                    </Td>
                  )}
                  {channels?.voice?.taskCount && (
                    <Td element="COMPACT_TABLE" textAlign="center">
                      <Label> {taskCounts[team].tasks.voice_outbound} </Label>
                    </Td>
                  )}
                  {channels?.chat?.taskCount && (
                    <Td element="COMPACT_TABLE" textAlign="center">
                      <Label> {taskCounts[team].tasks.chat} </Label>
                    </Td>
                  )}
                  {channels?.sms?.taskCount && (
                    <Td element="COMPACT_TABLE" textAlign="center">
                      <Label> {taskCounts[team].tasks.sms} </Label>
                    </Td>
                  )}
                  {channels?.video?.taskCount && (
                    <Td element="COMPACT_TABLE" textAlign="center">
                      <Label> {taskCounts[team].tasks.video} </Label>
                    </Td>
                  )}
                </Tr>
              );
            })}
            <Tr key="Other">
              <Td element="COMPACT_TABLE">
                <Label>
                  Other
                </Label>
              </Td>
              <Td element="COMPACT_TABLE" textAlign="center">
                <Label> {taskCounts.Other.totalTaskCount} </Label>
              </Td>
              {channels?.voice?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Label> {taskCounts.Other.tasks.voice_inbound} </Label>
                </Td>
              )}
              {channels?.voice?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Label> {taskCounts.Other.tasks.voice_outbound} </Label>
                </Td>
              )}
              {channels?.chat?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Label> {taskCounts.Other.tasks.chat} </Label>
                </Td>
              )}
              {channels?.sms?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Label> {taskCounts.Other.tasks.sms} </Label>
                </Td>
              )}
              {channels?.video?.taskCount && (
                <Td element="COMPACT_TABLE" textAlign="center">
                  <Label> {taskCounts.Other.tasks.video} </Label>
                </Td>
              )}
            </Tr>
          </TBody>
        </Table>
      </Box>
    </TileWrapper>
  );
};

export default TaskSummaryTile;
