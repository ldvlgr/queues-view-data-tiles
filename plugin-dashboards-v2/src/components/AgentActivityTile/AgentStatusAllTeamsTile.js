import { withTheme } from '@twilio/flex-ui';
import * as React from "react";
import { TileWrapper } from "./AgentActivityTile.Components"
import { getAgentStatusCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { connect } from "react-redux";
import AgentStatusPieChart from './AgentStatusPieChart';

/**
 * @param {props} props.teamsData The teams data {"teamName": {color: "grey"}}
 */

const AgentStatusAllTeamsTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    //const workers = state.flex.supervisor.workers;
    const workers = mockWorkersData;
    const teamsData = ownProps.teamsData;
    const teams = Object.keys(teamsData);
    let activityCounts = getAgentStatusCounts(workers, teams);
    //console.log('ActivityCounts:', activityCounts);
    return { activityCounts };
    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    let { teamsData, activityCounts } = props;
    const teams = Object.keys(teamsData);
    const totalStatusCounts = activityCounts.All;
    return (
        <TileWrapper>
            <AgentStatusPieChart
                key="All"
                agentStatusCounts={totalStatusCounts}
                team="All"
            />
            {teams?.map((tm) => {
                const agentStatusCounts = activityCounts[tm];
                return (
                    <AgentStatusPieChart
                        key={tm}
                        agentStatusCounts={agentStatusCounts}
                        team={tm}
                        hideSummary="true"
                        bgColor={teamsData[tm].color} />
                )
            })}
        </TileWrapper>
    )
});

export default withTheme(AgentStatusAllTeamsTile);
