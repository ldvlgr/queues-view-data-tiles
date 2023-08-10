import React from 'react';
import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { TileWrapper, Summary, Chart, Description, Title, Label, Metric } from './AgentActivityTile.Components'
import { PieChart } from 'react-minimal-pie-chart';
import { Table, THead, TBody, Th, Tr, Td } from '@twilio-paste/core';
import { AppState } from '../../flex-hooks/states';
import { ActivityStatistic } from '@twilio/flex-ui/src/state/QueuesState';
import { BaseDataEntry, Data } from 'react-minimal-pie-chart/types/commonTypes';

interface ActivityCounts {
    [key: string]: number;
}

interface ActivityConfig {
    [key: string]: {
        color: string;
        icon: string;
    };
}

const AgentActivityTile = () => {
    const workerActivityCounts: ActivityCounts = useFlexSelector((state: AppState) => {
        let activityCounts: ActivityCounts = {};
        const activityStats = state.flex.realtimeQueues.workspaceStats?.activity_statistics || [];
        activityStats.forEach((activity: ActivityStatistic) => {
            activityCounts[activity.friendly_name] = activity.workers;
        });
        return activityCounts;
    });
    //Available Flex icons:
    //https://www.twilio.com/docs/flex/developer/ui/v1/icons
    const activityConfig: ActivityConfig = {
        Available: { color: 'green', icon: 'Accept' },
        Outbound: { color: 'greenyellow', icon: 'Call' },
        Break: { color: 'goldenrod', icon: 'Hold' },
        Lunch: { color: 'darkorange', icon: 'Hamburger' },
        Training: { color: 'red', icon: 'Bulb' },
        Unavailable: { color: 'darkred', icon: 'Close' },
        Offline: { color: 'grey', icon: 'Minus' },
    }
    const activityNames = Object.keys(activityConfig);
    
    let data: Data = [];
    activityNames.forEach((activity) => {
        let count = workerActivityCounts[activity] || 0;
        const dataEntry: BaseDataEntry = { title: activity, value: count, color: activityConfig[activity].color };
        if ((count) && activityConfig[activity]) data.push(dataEntry);
    })

    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Summary>
                <Table>
                    <TBody>
                        {activityNames.map((activity) => {
                            let count = workerActivityCounts[activity] || 0;
                            return (
                                <Tr key={activity} verticalAlign='middle'>
                                    <Td> <Icon icon={activityConfig[activity]?.icon} /></Td>
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
            </Summary>
            <Chart>
                <Title>
                    Agent Activity
                </Title>
                <PieChart
                    labelStyle={{
                        fontSize: '14px', fill: 'White'
                    }}
                    data={data}
                    label={({ dataEntry }) => dataEntry.value}
                />
            </Chart>
        </TileWrapper>
    )
}

export default AgentActivityTile;
