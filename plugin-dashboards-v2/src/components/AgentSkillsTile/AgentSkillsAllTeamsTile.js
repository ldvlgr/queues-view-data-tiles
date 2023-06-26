import { withTheme } from '@twilio/flex-ui';
import * as React from "react";
import { TileWrapper } from "./AgentSkillsTile.Components"
import { getSkillsCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { connect } from "react-redux";
import AgentSkillsPieChart from './AgentSkillsPieChart'

/**
 * @param {props} props.teams All team names array (for example ["ABC123", "XYZ987"])
 */

const AgentSkillsAllTeamsTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    //const workers = state.flex.supervisor.workers;
    const workers = mockWorkersData;
    const teams = ownProps.teams;
    let skillsCounts = getSkillsCounts(workers, teams);
    //console.log('SkillsCounts:', skillsCounts);
    return skillsCounts;
    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    let { teams } = props;
    const totalSkillsCounts = props.All;
    return (
        <TileWrapper>
            <AgentSkillsPieChart
                key="All"
                skillsCounts={totalSkillsCounts}
                team="All"
            />
            {teams?.map((tm) => {
                const skillsCounts = props[tm];
                return (
                    <AgentSkillsPieChart
                        key={tm}
                        skillsCounts={skillsCounts}
                        team={tm}
                        hideSummary="true" />
                )
            })}
        </TileWrapper>
    )
});

export default withTheme(AgentSkillsAllTeamsTile);
