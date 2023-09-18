import React from 'react';
import { Icon, useFlexSelector } from '@twilio/flex-ui';
import { TileWrapper, Summary, Chart, Title, AgentActivity, Label, Metric } from './AgentActivityTile.Components'
import { PieChart } from 'react-minimal-pie-chart';

const AgentActivityTile = (props) => {
    const { activityConfig } = props;
    const workerActivityCounts = useFlexSelector((state) => {
        const activityStats = state.flex.realtimeQueues.workspaceStats?.activity_statistics || [];
        return activityStats;
    });
    let activityCounts = {};
    let otherUnavailable = 0;
    let data = [];
    workerActivityCounts.forEach((activity) => {
        const count = activity.workers;
        if (count && activityConfig.activities[activity.friendly_name]) {
            activityCounts[activity.friendly_name] = count;
            const dataEntry = {
                title: activity.friendly_name,
                value: count,
                color: activityConfig.activities[activity.friendly_name]?.color,
            };
            data.push(dataEntry);
        } else otherUnavailable += count;
    });
    if (otherUnavailable > 0) {
        activityCounts.other = otherUnavailable;
        const other = { title: 'Other', value: otherUnavailable, color: activityConfig.other?.color };
        data.push(other);
    }
    const activityNames = Object.keys(activityConfig.activities);

    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Summary>
                {activityNames.map((activity) => {
                    const count = activityCounts[activity] || 0;
                    return (
                        <AgentActivity key={activity}>
                            <Icon icon={activityConfig.activities[activity]?.icon} />
                            <Label bgColor={activityConfig.activities[activity]?.color}>{activity}:</Label>
                            <Metric> {count} </Metric>
                        </AgentActivity>
                    );
                })}
                <AgentActivity key="other">
                    <Icon icon={activityConfig.other?.icon} />
                    <Label bgColor={activityConfig.other?.color}>
                        Other
                    </Label>
                    <Metric> {activityCounts.other} </Metric>
                </AgentActivity>
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
