import { Manager, Icon, withTheme } from '@twilio/flex-ui';

import * as React from "react";
import { TeamTile, Summary, Chart, Description, AgentActivity, Label, Metric } from "./AgentActivityTile.Components"
import PieChart from 'react-minimal-pie-chart';
const _manager = Manager.getInstance();

/**
 * @param {props} props.agentStatusCounts Agent Status Counts
 * @param {props} props.team Specific team name (for example "ABC123" or "XYZ987")
 */

const AgentStatusPieChart = (props) => {
    const { agentStatusCounts, team, hideSummary } = props;
    const agentsAvailable = agentStatusCounts.Available || 0;
    const agentsUnavailable = agentStatusCounts.Unavailable || 0;
    const agentsOffline = agentStatusCounts.Offline || 0;
    // const agentsOffline = props["custom activity"] || 0;
    // Other custom status values
    const agentsBreak = agentStatusCounts.Break || 0;

    const agentsBusy = agentStatusCounts.Busy || 0;
    const agentsIdle = agentStatusCounts.Idle || 0;

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
        <TeamTile>
            { !hideSummary && <Summary>
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
            </Summary> }
            <Chart>
                <PieChart
                    labelStyle={{
                        fontSize: '14px', fill: 'White'
                    }}
                    data={data}
                    label={true}
                />
                <Description>
                    <div> {team ? "Team: " + team : "All Agents"} </div>
                </Description>
            </Chart>

        </TeamTile>
    )
};

export default withTheme(AgentStatusPieChart);
