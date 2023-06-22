import { Manager, Icon, withTheme } from '@twilio/flex-ui';

import * as React from "react";
import { TileWrapper, Summary, Chart, Description, Title, AgentActivity, Label, Metric } from "./AgentActivityTile.Components"
import { cx } from "emotion";
import { getAgentActivityCounts, getAgentStatusCounts } from '../../utils/ActivityUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { connect } from "react-redux";
import PieChart from 'react-minimal-pie-chart';
const _manager = Manager.getInstance();

/**
 * @param {props} props.teams All team names array (for example ["ABC123", "XYZ987"])
 * @param {props} props.team Specific team name (for example "ABC123" or "XYZ987")
 */

const AgentStatusPieChartTile = connect((state, ownProps) => {
    const team = ownProps.team;
    
        //Note: max 200 workers will be loaded for teams view
        //const workers = state.flex.supervisor.workers;
        const workers = mockWorkersData;
        const teams = ownProps.teams;
        let activityCounts = getAgentStatusCounts(workers, teams);
        console.log('ActivityCounts:', activityCounts);
        return activityCounts[team];

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {

    const { className, team } = props;
    const agentsAvailable = props.Available || 0;
    const agentsUnavailable = props.Unavailable || 0;
    const agentsOffline = props.Offline || 0;
    // const agentsOffline = props["custom activity"] || 0;
    // Other custom status values
    const agentsBreak = props.Break || 0;

    const agentsBusy = props.Busy || 0;
    const agentsIdle = props.Idle || 0;

    const colors = {
        available: "green",
        unavailable: "red",
        offline: "grey",
        break: "orange",
        busy: "greenyellow",
        idle: "green"
    }

    const labelStatusAvailable = _manager.strings.AgentStatusAvailable;
    const labelStatusUnavailable = _manager.strings.AgentStatusUnavailable;
    const labelStatusOffline = _manager.strings.AgentStatusOffline;
    const labelStatusBreak = "Break";
    const labelStatusBusy = "Busy";
    const labelStatusIdle = "Idle";

    let data = [];
    if (agentsAvailable) data.push({ title: labelStatusAvailable, value: agentsAvailable, color: colors.available });
    if (agentsUnavailable) data.push({ title: labelStatusUnavailable, value: agentsUnavailable, color: colors.unavailable });
    if (agentsOffline) data.push({ title: labelStatusOffline, value: agentsOffline, color: colors.offline });
    if (agentsBreak) data.push({ title: labelStatusBreak, value: agentsBreak, color: colors.break });
    if (agentsBusy) data.push({ title: labelStatusBusy, value: agentsBusy, color: colors.busy });
    if (agentsIdle) data.push({ title: labelStatusIdle, value: agentsIdle, color: colors.idle });



    return (
        <TileWrapper className={cx("Twilio-AggregatedDataTile", className)}>
            <Summary>
                <Description className="Twilio-AggregatedDataTile-Description"> 
                    <div> { team ? "Team: " + team : "All Agents"} </div>
                </Description>
                <AgentActivity>
                    <Icon icon='Accept' />
                    <Label bgColor={colors.idle}> {labelStatusIdle}:</Label>
                    <Metric> {agentsIdle} </Metric>
                </AgentActivity>
                <AgentActivity>
                    <Icon icon='Accept' />
                    <Label bgColor={colors.busy}> {labelStatusBusy}:</Label>
                    <Metric> {agentsBusy} </Metric>
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

export default withTheme(AgentStatusPieChartTile);