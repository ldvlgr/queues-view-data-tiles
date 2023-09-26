import { useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { Box, Table, THead, TBody, Th, Tr, Td, Tooltip } from '@twilio-paste/core';

import { AppState } from '../../flex-hooks/states';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { TileWrapper, Label, Heading } from './QueueGroupSummaryTile.Components';
import { QueueGroupMetrics } from '../../types';

interface ComponentProps {
  groups: string[];
  filter?: string;
}

const QueueGroupSummaryTile = (props: ComponentProps) => {
  const { groups, filter } = props;
  const metrics: QueueGroupMetrics = useFlexSelector((state: AppState) => {
    const queues = Object.values(state.flex.realtimeQueues.queuesList);
    return QueueDataUtil.getQueueGroupMetrics(queues, groups, filter);
  });
  console.log('GROUP METRICS:', metrics);
  const groupNames = Object.keys(metrics);
  // Columns: Assigned, Wrapping, Waiting, Handled, SLA Today
  return (
    <TileWrapper className="Twilio-AggregatedDataTile">
      <Box overflowY="auto" maxHeight="240px">
        <Table variant="borderless">
          <THead stickyHeader top={0}>
            <Tr>
              <Th element="COMPACT_TABLE">
                <Heading> Group </Heading>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip text="Conversations" placement="top">
                  <Heading>
                    Assigned
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip text="Wrapping" placement="top">
                  <Heading>
                    Wrap
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip text="Waiting in Queues" placement="top">
                  <Heading>
                    Wait
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip text="Handled Today" placement="top">
                  <Heading>
                    Handled
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip text="SLA Today" placement="top">
                  <Heading>
                    SLA
                  </Heading>
                </Tooltip>
              </Th>
            </Tr>
          </THead>
          <TBody>
            {groupNames.map((group) => {
              return (
                <Tr key={group}>
                  <Td element="COMPACT_TABLE">
                    <Tooltip text={"Queues: " + metrics[group].queues.join(', ')} placement="right">
                      <Label> {group} {filter} </Label>
                    </Tooltip>
                  </Td>
                  <Td element="COMPACT_TABLE" textAlign="center">
                    <Label> {metrics[group].tasksNow.assignedTasks} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE" textAlign="center">
                    <Label> {metrics[group].tasksNow.wrappingTasks} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE" textAlign="center">
                    <Label> {metrics[group].tasksNow.waitingTasks} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE" textAlign="center">
                    <Label> {metrics[group].slaToday.handledTasks} </Label>
                  </Td>
                  <Td element="COMPACT_TABLE" textAlign="center">
                    <Label> {metrics[group].slaToday.serviceLevelPct}% </Label>
                  </Td>
                </Tr>
              );
            })}
          </TBody>
        </Table>
      </Box>
    </TileWrapper>
  );
};

export default QueueGroupSummaryTile;
