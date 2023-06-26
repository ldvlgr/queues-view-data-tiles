import { Manager, Icon, withTheme, StackedBarChart } from '@twilio/flex-ui';

import * as React from "react";
import { TileWrapper, Description, Title, AgentTeam, BarChart, Label, Legend } from "./AgentTeamActivityTile.Components"
import { cx } from "emotion";
import { getAgentStatusCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';

import { connect } from "react-redux";
const _manager = Manager.getInstance();


/**
 * @param {props} props.teams The team names (for example ["ABC123", "XYZ987"])
 */
const AgentTeamActivityTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    //const workers = state.flex.supervisor.workers;
    const workers = mockWorkersData;
    const teams = ownProps.teams;
    let activityCounts = getAgentStatusCounts(workers, teams);
    console.log('ActivityCounts:', activityCounts);
    return activityCounts;

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    const { className, theme, teams } = props;

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

    let totalAgents = props?.All?.totalAgentCount || 0;

    let barChartsProps = new Map;
    teams.forEach((team, index) => {
        let teamActivitydata = props[team];
        const teamBarCharProps = [
            { value: teamActivitydata.Idle || 0, label: labelStatusIdle, color: colors.idle },
            { value: teamActivitydata.Busy || 0, label: labelStatusBusy, color: colors.busy },
            { value: teamActivitydata.Break || 0, label: labelStatusBreak, color: colors.break },
            { value: teamActivitydata.Unavailable || 0, label: labelStatusUnavailable, color: colors.unavailable },
            { value: teamActivitydata.Offline || 0, label: labelStatusOffline, color: colors.offline }
        ];
        //Add to map
        barChartsProps.set(team, teamBarCharProps);
    });

    return (
        <TileWrapper className={cx("Twilio-AggregatedDataTile", className)}>
            <Title className="Twilio-AggregatedDataTile-Title">
                Activity by Team
            </Title>
            {teams.map((team) => {
                let chartProps = barChartsProps.get(team);
                let agentCount = 0;
                chartProps.forEach( (c)=> { agentCount += c.value } );
                return (
                    <AgentTeam key={team}>
                        <Label> {team} [{agentCount} Agents] </Label>
                        <BarChart agentCount={agentCount} totalAgents={totalAgents} >
                            <StackedBarChart key={team} items={chartProps} />
                        </BarChart>
                    </AgentTeam>
                );
            })
            }
            {/* <Description key="legend">
                <Legend bgColor={colors.idle}> {labelStatusIdle} </Legend>
                <Legend bgColor={colors.busy}> {labelStatusBusy} </Legend>
                <Legend bgColor={colors.break}> {labelStatusBreak} </Legend>
                <Legend bgColor={colors.unavailable}> {labelStatusUnavailable} </Legend>
                <Legend bgColor={colors.offline}> {labelStatusOffline} </Legend>
            </Description> */}
        </TileWrapper>
    )
});

export default withTheme(AgentTeamActivityTile);
