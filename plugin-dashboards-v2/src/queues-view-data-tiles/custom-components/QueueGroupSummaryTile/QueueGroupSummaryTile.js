import { useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { Box, Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';

import Tooltip from '@material-ui/core/Tooltip';
import QueueDataUtil from '../../utils/QueueDataUtil';
import { TileWrapper, Label, Heading } from './QueueGroupSummaryTile.Components';

const QueueGroupSummaryTile = (props) => {
  const { groups, filter } = props;
  const metrics = useFlexSelector((state) => {
    const queues = Object.values(state.flex.realtimeQueues.queuesList);
    return QueueDataUtil.getQueueGroupMetrics(queues, groups, filter);
  });
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
                <Tooltip title="Conversations" placement="top" arrow={true}>
                  <Heading>
                    Assigned
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip title="Wrapping" placement="top" arrow={true}>
                  <Heading>
                    Wrap
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip title="Waiting in Queues" placement="top" arrow={true}>
                  <Heading>
                    Wait
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip title="Handled Today" placement="top" arrow={true}>
                  <Heading>
                    Handled
                  </Heading>
                </Tooltip>
              </Th>
              <Th element="COMPACT_TABLE" textAlign="center">
                <Tooltip title="SLA Today" placement="top" arrow={true}>
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
                    <Tooltip title={"Queues: " + metrics[group].queues.join(', ')} placement="right" arrow={true}>
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
