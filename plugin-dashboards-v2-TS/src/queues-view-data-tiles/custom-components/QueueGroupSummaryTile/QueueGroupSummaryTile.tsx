import { useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { Box, Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';

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
                <Heading>
                  Assigned
                </Heading>                  
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Heading>
                  Wrap
                </Heading>                  
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Heading>
                  Wait
                </Heading>                  
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Heading>
                  Handled
                </Heading>                  
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Heading>
                  SLA
                </Heading>                  
              </Th>
            </Tr>
          </THead>
          <TBody>
            {groupNames.map((group) => {
              return (
                <Tr key={group}>
                  <Td element="COMPACT_TABLE">
                    <Label> {group} {filter} </Label>
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
