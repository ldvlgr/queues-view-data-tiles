import { Icon } from '@twilio/flex-ui';
import * as React from 'react';
import { TileWrapper, Summary, Chart, Title, AgentActivity, Label, Metric } from './AgentActivityTile.Components'
import { connect } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';

const AgentActivityTile = connect((state) => {
    let workerActivityCounts = {};
    const activityStats = state.flex.realtimeQueues.workspaceStats?.activity_statistics || [];
    activityStats.forEach((activity) => {
        workerActivityCounts[activity.friendly_name] = activity.workers;
    });
    return { workerActivityCounts };
    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    const { workerActivityCounts, activityConfig } = props;
    const activityNames = Object.keys(activityConfig);

    let data = [];
    activityNames.forEach((activity) => {
        let count = workerActivityCounts[activity] || 0;
        const dataEntry = { title: activity, value: count, color: activityConfig[activity].color };
        if ((count) && activityConfig[activity]) data.push(dataEntry);
    })

    return (
        <TileWrapper className='Twilio-AggregatedDataTile'>
            <Summary>
                {activityNames.map((activity) => {
                    let count = workerActivityCounts[activity] || 0;
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
});

export default AgentActivityTile;
