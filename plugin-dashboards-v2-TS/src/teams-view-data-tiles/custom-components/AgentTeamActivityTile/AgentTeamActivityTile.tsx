import { useFlexSelector, StackedBarChart } from '@twilio/flex-ui';
import * as React from 'react';
import { TileWrapper, Title, BarChart, Label, Legend } from './AgentTeamActivityTile.Components'
import { getAgentStatusCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';
import { SupervisorWorkerState } from '@twilio/flex-ui/src/state/State.definition';
import { AppState } from '../../flex-hooks/states';
import { TeamsData, ActivityCounts } from '../../types';
// import { connect } from 'react-redux';

interface StackedBarChartItem {
    value: number;
    color: string;
    label: string;
}

interface ActivityConfig {
    [key: string]: {
        color: string;
        icon: string;
    };
};
interface ComponentProps {
    teamsData: TeamsData;
    maxWidth?: number;
}

const AgentTeamActivityTile = (props: ComponentProps) => {
    const { teamsData, maxWidth } = props;
    const teams = Object.keys(teamsData);
    const activityCounts: ActivityCounts = useFlexSelector((state: AppState) => {
        const workers: SupervisorWorkerState[] = state.flex.supervisor.workers;
        const workerData = getAgentStatusCounts(workers, teams);
        return workerData;
    });
    // Move into feature config
    const activityConfig: ActivityConfig = {
        Idle: { color: 'green', icon: 'Accept' },
        Busy: { color: 'limegreen', icon: 'GenericTask' },
        Outbound: { color: 'greenyellow', icon: 'Call' },
        Break: { color: 'goldenrod', icon: 'Hold' },
        Lunch: { color: 'darkorange', icon: 'Hamburger' },
        Training: { color: 'red', icon: 'Bulb' },
        OTHER: { color: 'darkred', icon: 'More' },
        Offline: { color: 'grey', icon: 'Minus' },
    }
    //Note: Idle and Busy are special Status values based on agent task counts

    let totalAgents = activityCounts?.All?.totalAgentCount || 0;
    let maxAgents = 0;
    teams.forEach((tm) => {
        if (activityCounts[tm].totalAgentCount > maxAgents) maxAgents = activityCounts[tm].totalAgentCount;
    });

    const getChartProps = (tm: string) => {
        let otherUnavailable = 0;
        let teamActivities = activityCounts[tm].activities;
        let teamBarCharProps: StackedBarChartItem[] = [];
        const activityNames = Object.keys(teamActivities);
        activityNames.forEach((activity) => {
            const count = teamActivities[activity] || 0;
            if (count && activityConfig[activity]) {
                const barChartItem: StackedBarChartItem = { label: activity, value: count, color: activityConfig[activity].color }
                if ((count) && activityConfig[activity]) teamBarCharProps.push(barChartItem);
            } else otherUnavailable += count;
        });
        if (otherUnavailable > 0) {
            const barChartItem: StackedBarChartItem = { label: 'OTHER', value: otherUnavailable, color: activityConfig.OTHER?.color }
            teamBarCharProps.push(barChartItem);
        }
        return teamBarCharProps;
    }

    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Title className='Twilio-AggregatedDataTile-Title'>
                Activity by Team
            </Title>
            <Table variant='default'>
                <THead>
                    <Tr>
                        <Th><Label> Agent Team </Label></Th>
                        <Th textAlign='center'><Label> # </Label></Th>
                        <Th><Label> Status/Activity </Label></Th>
                    </Tr>
                </THead>
                <TBody>
                    {teams.map((team) => {
                        let chartProps = getChartProps(team);
                        let agentCount = 0;
                        chartProps.forEach((c) => { agentCount += c.value });
                        return (
                            <Tr key={team}>
                                <Td>
                                    <Label bgColor={teamsData[team].color}> {team}  </Label>
                                </Td>
                                <Td textAlign='center'><Label>{agentCount} </Label></Td>
                                <Td>
                                    <BarChart agentCount={agentCount} totalAgents={maxAgents} maxWidth={maxWidth || 300}>
                                        <StackedBarChart key={team} items={chartProps} />
                                    </BarChart>
                                </Td>
                            </Tr>
                        );
                    })
                    }
                </TBody>
            </Table>
        </TileWrapper>
    )
};

export default AgentTeamActivityTile;
