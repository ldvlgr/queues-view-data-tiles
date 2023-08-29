import React from 'react';
import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { TileWrapper, Summary, Chart, Title, AgentActivity, Label, Metric } from './AgentActivityTile.Components'
import { PieChart } from 'react-minimal-pie-chart';
import { AppState } from '../../flex-hooks/states';
import { ActivityStatistic } from '@twilio/flex-ui/src/state/QueuesState';
import { BaseDataEntry, Data } from 'react-minimal-pie-chart/types/commonTypes';

interface ActivityCounts {
    [key: string]: number;
}

interface ComponentProps {
    activityConfig: {
        [key: string]: {
            color: string;
            icon: string;
        };
    }
}
const AgentActivityTile = (props: ComponentProps) => {
    const { activityConfig } = props;
    const workerActivityCounts: ActivityStatistic[] = useFlexSelector((state: AppState) => {
        const activityStats = state.flex.realtimeQueues.workspaceStats?.activity_statistics || [];
        return activityStats;
    });
    let activityCounts: ActivityCounts = {};
    let otherUnavailable = 0;
    let data: Data = [];
    workerActivityCounts.forEach((activity) => {
        let count = activity.workers;
        if (count && activityConfig[activity.friendly_name]) {
            activityCounts[activity.friendly_name] = count;
            const dataEntry: BaseDataEntry = { title: activity.friendly_name, value: count, color: activityConfig[activity.friendly_name]?.color };
            data.push(dataEntry);
        }
        else otherUnavailable += count;
    })
    if (otherUnavailable > 0) {
        activityCounts.OTHER  = otherUnavailable;
        const other: BaseDataEntry = { title: "OTHER", value: otherUnavailable, color: activityConfig.OTHER?.color };
        data.push(other);
    }
    const activityNames = Object.keys(activityConfig);

    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Summary>
                {activityNames.map((activity) => {
                    let count = activityCounts[activity] || 0;
                    return (
                        <AgentActivity>
                            <Icon icon={activityConfig[activity]?.icon} />
                            <Label bgColor={activityConfig[activity]?.color}>
                                {activity}:
                            </Label>
                            <Metric> {count} </Metric>
                        </AgentActivity>
                    )
                })}
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
