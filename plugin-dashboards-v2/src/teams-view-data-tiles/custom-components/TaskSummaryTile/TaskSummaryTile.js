import { Icon } from '@twilio/flex-ui';
import * as React from 'react';
import { TileWrapper, Title, Label } from './TaskSummaryTile.Components'
import { getTasksByTeamCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';

import { connect } from 'react-redux';

import {
    getChannelVoice_Color,
    getChannelChat_Color,
    getChannelSMS_Color,
} from '../../config';

const channelColors = {
    'voice': getChannelVoice_Color(),
    'chat': getChannelChat_Color(),
    'sms': getChannelSMS_Color()
}

/**
 * @param {props} props.teamsData The teams data {'teamName': {color: 'grey'}}
 */
const TaskSummaryTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    const workers = state.flex.supervisor.workers;
    //const workers = mockWorkersData;
    const teamsData = ownProps.teamsData;
    const teams = Object.keys(teamsData);
    let taskCounts = getTasksByTeamCounts(workers, teams);
    console.log('TaskCounts:', taskCounts);
    return { taskCounts };

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    const { teamsData, taskCounts } = props;
    const teams = Object.keys(teamsData);
    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Title className='Twilio-AggregatedDataTile-Title'>
                Tasks by Team & Channel
            </Title>
            <Table variant='default'>
                <THead>
                    <Tr>
                        <Th><Label> Agent Team </Label></Th>
                        <Th textAlign='center'><Label bgColor={channelColors.voice}> <Icon icon='Call' /> IN </Label></Th>
                        <Th textAlign='center'><Label bgColor={channelColors.voice}> <Icon icon='Call' /> OUT </Label></Th>
                        <Th textAlign='center'><Label bgColor={channelColors.chat}> <Icon icon='Message' /> Chat </Label></Th>
                        <Th textAlign='center'><Label bgColor={channelColors.sms}> <Icon icon='Sms' /> SMS </Label></Th>

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
                        <Td textAlign='center'><Label> {taskCounts.All.tasks.chat} </Label></Td>
                        <Td textAlign='center'><Label> {taskCounts.All.tasks.sms} </Label></Td>
                    </Tr>
                </TBody>
            </Table>
        </TileWrapper>
    )
});

export default TaskSummaryTile;
