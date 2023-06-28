import { Manager, withTheme, StackedBarChart } from '@twilio/flex-ui';

import * as React from "react";
import { TileWrapper, Title, BarChart, Label, Legend } from "./AgentTeamActivityTile.Components"
import { cx } from "emotion";
import { getAgentStatusCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { Table, THead, TBody, Th, Tr, Td } from "@twilio-paste/core";

import { connect } from "react-redux";
const _manager = Manager.getInstance();


/**
 * @param {props} props.teamsData The teams data {"teamName": {color: "grey"}}
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
    const { className, teamsData, activityCounts } = props;
    const teams = Object.keys(teamsData);
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

    let totalAgents = activityCounts?.All?.totalAgentCount || 0;
    let maxAgents = 0;
    teams.forEach((tm) => {
        if (activityCounts[tm].totalAgentCount > maxAgents) maxAgents = activityCounts[tm].totalAgentCount;
    });

    const getChartProps = (tm) => {
        let teamActivitydata = activityCounts[tm];
        const teamBarCharProps = [
            { value: teamActivitydata.Idle || 0, label: labelStatusIdle, color: colors.idle },
            { value: teamActivitydata.Busy || 0, label: labelStatusBusy, color: colors.busy },
            { value: teamActivitydata.Break || 0, label: labelStatusBreak, color: colors.break },
            { value: teamActivitydata.Unavailable || 0, label: labelStatusUnavailable, color: colors.unavailable },
            { value: teamActivitydata.Offline || 0, label: labelStatusOffline, color: colors.offline }
        ];
        return teamBarCharProps;
    }

    return (
        <TileWrapper className={cx("Twilio-AggregatedDataTile", className)}>
            <Title className="Twilio-AggregatedDataTile-Title">
                Activity by Team
            </Title>
            <Table variant="default">
                <THead>
                    <Tr>
                        <Th><Label> Agent Team </Label></Th>
                        <Th textAlign="center"><Label> # </Label></Th>
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
                                <Td textAlign="center"><Label>{agentCount} </Label></Td>
                                <Td>
                                    <BarChart agentCount={agentCount} totalAgents={maxAgents} maxWidth={400}>
                                        <StackedBarChart key={team} items={chartProps} />
                                    </BarChart>
                                </Td>
                            </Tr>


                        );
                    })
                    }
                </TBody>
            </Table>
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
