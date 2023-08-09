import { withTheme, StackedBarChart } from '@twilio/flex-ui';
import * as React from 'react';
import { TileWrapper, Title, BarChart, Label, Legend } from './AgentTeamActivityTile.Components'
import { cx } from 'emotion';
import { getAgentStatusCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';

import { connect } from 'react-redux';

/**
 * @param {props} props.teamsData The teams data {'teamName': {color: 'grey'}}
 */
const AgentTeamActivityTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    //const workers = state.flex.supervisor.workers;
    const workers = mockWorkersData;
    const teamsData = ownProps.teamsData;
    const teams = Object.keys(teamsData);
    let activityCounts = getAgentStatusCounts(workers, teams);
    console.log('ActivityCounts:', activityCounts);
    return { activityCounts };

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    const { className, teamsData, activityCounts, maxWidth } = props;
    const teams = Object.keys(teamsData);

    //Available Flex icons:
    //https://www.twilio.com/docs/flex/developer/ui/v1/icons
    const activityConfig = {
        Idle: { color: 'green', icon: 'Accept' },
        Busy: { color: 'limegreen', icon: 'GenericTask' },
        Outbound: { color: 'greenyellow', icon: 'Call' },
        Break: { color: 'goldenrod', icon: 'Hold' },
        Lunch: { color: 'darkorange', icon: 'Hamburger' },
        Training: { color: 'red', icon: 'Bulb' },
        Unavailable: { color: 'darkred', icon: 'Close' },
        Offline: { color: 'grey', icon: 'Minus' },
    }
    const activityNames = Object.keys(activityConfig);
    //Note: Idle and Busy are special Status values based on agent task counts

    let totalAgents = activityCounts?.All?.totalAgentCount || 0;
    let maxAgents = 0;
    teams.forEach((tm) => {
        if (activityCounts[tm].totalAgentCount > maxAgents) maxAgents = activityCounts[tm].totalAgentCount;
    });

    const getChartProps = (tm) => {
        let teamActivitydata = activityCounts[tm];
        let teamBarCharProps = [];
        activityNames.forEach((activity) => {
            let count = teamActivitydata[activity] || 0;
            if ((count) && activityConfig[activity]) teamBarCharProps.push({ label: activity, value: count, color: activityConfig[activity].color });
        })
        return teamBarCharProps;
    }

    return (
        <TileWrapper className={cx('Twilio-AggregatedDataTile', className)}>
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
});

export default withTheme(AgentTeamActivityTile);
