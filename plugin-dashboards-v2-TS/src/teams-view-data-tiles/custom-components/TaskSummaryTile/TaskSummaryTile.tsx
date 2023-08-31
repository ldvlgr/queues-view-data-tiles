import { Icon, useFlexSelector } from '@twilio/flex-ui';
import * as React from 'react';
import { TileWrapper, Title, Label } from './TaskSummaryTile.Components'
import { getTasksByTeamCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';
import { SupervisorWorkerState } from '@twilio/flex-ui/src/state/State.definition';
import { AppState } from '../../flex-hooks/states';
import { TeamsData, TaskCounts } from '../../types';

import {
    getChannelVoice_Color,
    getChannelChat_Color,
    getChannelSMS_Color,
} from '../../config';

interface ComponentProps {
    teamsData: TeamsData;
}

const TaskSummaryTile = (props: ComponentProps) => {
    const { teamsData } = props;
    const teams = Object.keys(teamsData);
    const taskCounts: TaskCounts = useFlexSelector((state: AppState) => {
        const workers: SupervisorWorkerState[] = state.flex.supervisor.workers;
        const taskData = getTasksByTeamCounts(workers, teams);
        return taskData;
    });
    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Title className='Twilio-AggregatedDataTile-Title'>
                Tasks by Team & Channel
            </Title>
            <Table variant='default'>
                <THead>
                    <Tr>
                        <Th><Label> Agent Team </Label></Th>
                        <Th textAlign='center'><Label bgColor={getChannelVoice_Color()}> <Icon icon='Call' /> IN </Label></Th>
                        <Th textAlign='center'><Label bgColor={getChannelVoice_Color()}> <Icon icon='Call' /> OUT </Label></Th>
                        <Th textAlign='center'><Label bgColor={getChannelChat_Color()}> <Icon icon='Message' /> Chat </Label></Th>
                        <Th textAlign='center'><Label bgColor={getChannelSMS_Color()}> <Icon icon='Sms' /> SMS </Label></Th>

                    </Tr>
                </THead>
                <TBody>
                    {teams.map((team) => {
                        return (
                            <Tr key={team}>
                                <Td><Label bgColor={teamsData[team].color}> {team}  </Label></Td>
                                <Td textAlign='center'><Label> {taskCounts[team].tasks.voice_inbound} </Label></Td>
                                <Td textAlign='center'><Label> {taskCounts[team].tasks.voice_outbound} </Label></Td>
                                <Td textAlign='center'><Label> {taskCounts[team].tasks.chat} </Label></Td>
                                <Td textAlign='center'><Label> {taskCounts[team].tasks.sms} </Label></Td>

                            </Tr>
                        );
                    })
                    }
                    <Tr key='Total'>
                        <Td><Label> Total (All) </Label></Td>
                        <Td textAlign='center'><Label> {taskCounts.All.tasks.voice_inbound} </Label></Td>
                        <Td textAlign='center'><Label> {taskCounts.All.tasks.voice_outbound} </Label></Td>
                        <Td textAlign='center'><Label> {taskCounts.All.tasks.sms} </Label></Td>
                        <Td textAlign='center'><Label> {taskCounts.All.tasks.chat} </Label></Td>
                    </Tr>
                </TBody>
            </Table>
        </TileWrapper>
    )
};

export default TaskSummaryTile;
