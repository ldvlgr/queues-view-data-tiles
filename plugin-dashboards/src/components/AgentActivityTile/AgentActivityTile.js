import { Manager, Icon, withTheme } from '@twilio/flex-ui';

import * as React from "react";
import { TileWrapper, Summary, Chart, Description, Title, AgentActivity, Label, Metric } from "./AgentActivityTile.Components"
import { cx } from "emotion";

import { connect } from "react-redux";
import PieChart from 'react-minimal-pie-chart';
const _manager = Manager.getInstance();

/**
 * @param {props} props.teamName The teamName (for example "XYZ")
 */
const AgentActivityTile = connect((state, ownProps) => {
    if (!ownProps.agentTeamName) {
        //No teamName, use Workspace stats 
        let workerActivityCounts = {};
        const activityStats = state.flex.realtimeQueues.workspaceStats?.activity_statistics || [];
        activityStats.forEach((activity) => {
            workerActivityCounts[activity.friendly_name] = activity.workers;
        });
        return workerActivityCounts;
    } else {
        //teamName provided, filter worker data on teamName
        //Note: max 200 workers will be loaded for teams view
        let activityCounts = {};
        const workers = state.flex.supervisor.workers;
        workers.forEach((wk) => {
            if (wk.worker?.attributes?.team_name == ownProps.agentTeamName) {
                let activity = wk.worker.activityName;
                let count = activityCounts[activity] ? activityCounts[activity] : 0;
                activityCounts[activity] = count + 1;
            }
        });
        return activityCounts;
    }

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {

    const { className, theme, agentTeamName } = props;
    const agentsAvailable = props.Available || 0;
    const agentsUnavailable = props.Unavailable || 0;
    const agentsOffline = props.Offline || 0;
    // const agentsOffline = props["custom activity"] || 0;
    // Other custom status values
    const agentsBreak = props.Break || 0;

    const colors = {
        available: theme.colors.agentAvailableColor,
        unavailable: theme.colors.agentUnavailableColor,
        offline: theme.colors.agentOfflineColor,
        break: "orange"
    }
    const labelStatusAvailable = _manager.strings.AgentStatusAvailable;
    const labelStatusUnavailable = _manager.strings.AgentStatusUnavailable;
    const labelStatusOffline = _manager.strings.AgentStatusOffline;
    const labelStatusBreak = "Break";

    let data = [];
    if (agentsAvailable) data.push({ title: labelStatusAvailable, value: agentsAvailable, color: colors.available });
    if (agentsUnavailable) data.push({ title: labelStatusUnavailable, value: agentsUnavailable, color: colors.unavailable });
    if (agentsOffline) data.push({ title: labelStatusOffline, value: agentsOffline, color: colors.offline });
    if (agentsBreak) data.push({ title: labelStatusBreak, value: agentsBreak, color: colors.break });

    return (
        <TileWrapper className={cx("Twilio-AggregatedDataTile", className)}>
            <Summary>
                {/* <Description className="Twilio-AggregatedDataTile-Description">  */}
                <Title className="Twilio-AggregatedDataTile-Title">
                    {agentTeamName ?
                        <div> {_manager.strings.QueuesStatsHeaderAgentsActivity}: {agentTeamName} </div> :
                        <div> {_manager.strings.QueuesStatsHeaderAgentsActivity}: All </div>
                    }
                    {/* </Description> */}
                </Title>
                <AgentActivity>
                    <Icon icon='Accept' />
                    <Label bgColor={colors.available}> {labelStatusAvailable}:</Label>
                    <Metric> {agentsAvailable} </Metric>
                </AgentActivity>
                <AgentActivity>
                    <Icon icon='Close' />
                    <Label bgColor={colors.unavailable}> {labelStatusUnavailable}:</Label>
                    <Metric> {agentsUnavailable} </Metric>
                </AgentActivity>
                <AgentActivity>
                    <Icon icon='Close' />
                    <Label bgColor={colors.break}> {labelStatusBreak}:</Label>
                    <Metric> {agentsBreak} </Metric>
                </AgentActivity>
                <AgentActivity>
                    <Icon icon='Minus' />
                    <Label bgColor={colors.offline}> {labelStatusOffline}:</Label>
                    <Metric> {agentsOffline} </Metric>
                </AgentActivity>

            </Summary>
            <Chart>
                <PieChart
                    labelStyle={{
                        fontSize: '14px', fill: 'White'
                    }}
                    data={data}
                    label={true}
                />
            </Chart>

        </TileWrapper>
    )
});

export default withTheme(AgentActivityTile);
