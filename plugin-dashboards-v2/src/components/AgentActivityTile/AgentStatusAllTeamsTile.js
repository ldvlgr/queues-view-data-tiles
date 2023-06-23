import { withTheme } from '@twilio/flex-ui';

import * as React from "react";
import { TileWrapper } from "./AgentActivityTile.Components"
import { getAgentStatusCounts } from '../../utils/ActivityUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { connect } from "react-redux";
import AgentStatusPieChart from './AgentStatusPieChart';

/**
 * @param {props} props.teams All team names array (for example ["ABC123", "XYZ987"])
 */

const AgentStatusAllTeamsTile = connect((state, ownProps) => {
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
    let { teams } = props;
    const totalStatusCounts = props.All;
    return (
        <TileWrapper>
            <AgentStatusPieChart
                key="All"
                agentStatusCounts={totalStatusCounts}
                team="All"
            />
            {teams?.map((tm) => {
                const agentStatusCounts = props[tm];
                return (
                    <AgentStatusPieChart
                        key={tm}
                        agentStatusCounts={agentStatusCounts}
                        team={tm}
                        hideSummary="true" />
                )
            })}
        </TileWrapper>
    )
});

export default withTheme(AgentStatusAllTeamsTile);
