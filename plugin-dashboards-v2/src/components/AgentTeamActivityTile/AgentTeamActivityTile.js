import { Manager, Icon, withTheme, StackedBarChart } from '@twilio/flex-ui';

import * as React from "react";
import { TileWrapper, Description, Title, AgentTeam, BarChart, Label, Legend } from "./AgentTeamActivityTile.Components"
import { cx } from "emotion";
import { getAgentActivityCounts } from '../../utils/ActivityUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';

import { connect } from "react-redux";
const _manager = Manager.getInstance();


/**
 * @param {props} props.teams The team names (for example ["ABC123", "XYZ987"])
 */
const AgentTeamActivityTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    const workers = state.flex.supervisor.workers;
    //const workers = mockWorkersData;
    const teams = ownProps.teams;
    let activityCounts = getAgentActivityCounts(workers, teams);
    console.log('ActivityCounts:', activityCounts);
    return activityCounts;

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    const { className, theme, teams } = props;

    const colors = {
        available: "green",
        unavailable:"red",
        offline: "grey",
        break: "orange"
    }

    //use for icon title or hover
    const labelStatusAvailable = _manager.strings.AgentStatusAvailable;
    const labelStatusUnavailable = _manager.strings.AgentStatusUnavailable;
    const labelStatusOffline = _manager.strings.AgentStatusOffline;
    const labelStatusBreak = "Break";

    let barChartsProps = new Map;
    teams.forEach((team, index) => {
        let teamActivitydata = props[team];
        const teamBarCharProps = [
            { value: teamActivitydata.Available, label: labelStatusAvailable, color: colors.available },
            { value: teamActivitydata.Break, label: labelStatusBreak, color: colors.break },
            { value: teamActivitydata.Unavailable, label: labelStatusUnavailable, color: colors.unavailable },
            { value: teamActivitydata.Offline, label: labelStatusOffline, color: colors.offline }
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
                return (
                    <AgentTeam key={team}>
                        <Label> {team} </Label>
                        <BarChart>
                            <StackedBarChart key={team} items={chartProps} />
                        </BarChart>
                    </AgentTeam>
                );
            })
            }
            <Description key="legend">
                <Legend bgColor={colors.available}> {labelStatusAvailable} </Legend>
                <Legend bgColor={colors.break}> {labelStatusBreak} </Legend>
                <Legend bgColor={colors.unavailable}> {labelStatusUnavailable} </Legend>
                <Legend bgColor={colors.offline}> {labelStatusOffline} </Legend>
            </Description>
        </TileWrapper>
    )
});

export default withTheme(AgentTeamActivityTile);
