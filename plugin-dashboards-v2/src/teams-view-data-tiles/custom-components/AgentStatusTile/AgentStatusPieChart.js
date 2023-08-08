import { Manager, Icon, withTheme } from '@twilio/flex-ui';
import * as React from 'react';
import { TeamTile, Summary, Chart, Description, Title, Label, Metric } from './AgentStatusTile.Components'
import PieChart from 'react-minimal-pie-chart';
import { Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';

/**
 * @param {props} props.agentStatusCounts Agent Status Counts
 * @param {props} props.team Specific team name (for example 'ABC123' or 'XYZ987')
 */

const AgentStatusPieChart = (props) => {
    const { agentStatusCounts, team, hideSummary, bgColor } = props;

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

    let data = [];
    activityNames.forEach((activity) => {
        let count = agentStatusCounts[activity] || 0;
        if ((count) && activityConfig[activity]) data.push({ title: activity, value: count, color: activityConfig[activity].color });
    })

    return (
        <TeamTile>
            {!hideSummary && <Summary>
                <Table>
                    <TBody>
                        {activityNames.map((activity) => {
                            let count = agentStatusCounts[activity] || 0;
                            return (
                                <Tr key={activity}>
                                   <Td> <Icon icon={activityConfig[activity]?.icon} /> </Td>
                                    <Td>
                                        <Label bgColor={activityConfig[activity]?.color}>
                                            {activity}:
                                        </Label>
                                    </Td>
                                    <Td textAlign='center'><Metric>{count} </Metric></Td>
                                </Tr>
                            )
                        })}
                    </TBody>
                </Table>
            </Summary>}
            <Chart>
                <Title>
                    Activity (Status)
                </Title>
                <PieChart
                    labelStyle={{
                        fontSize: '14px', fill: 'White'
                    }}
                    data={data}
                    label={true}
                />
                <Description bgColor={bgColor}>
                    <div> {team ? 'Team: ' + team : 'All Agents'} </div>
                </Description>
            </Chart>

        </TeamTile>
    )
};

export default withTheme(AgentStatusPieChart);
