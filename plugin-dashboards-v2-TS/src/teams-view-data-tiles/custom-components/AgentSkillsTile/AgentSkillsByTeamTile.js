import { withTheme } from '@twilio/flex-ui';
import * as React from 'react';
import { TileWrapper } from './AgentSkillsTile.Components'
import { getSkillsCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { connect } from 'react-redux';
import AgentSkillsPieChart from './AgentSkillsPieChart';

/**
 * @param {props} props.teams All team names array (for example ['ABC123', 'XYZ987'])
 * @param {props} props.team Specific team name (for example 'ABC123' or 'XYZ987')
 */

const AgentSkillByTeamTile = connect((state, ownProps) => {
    const team = ownProps.team;
    //Note: max 200 workers will be loaded for teams view
    //const workers = state.flex.supervisor.workers;
    const workers = mockWorkersData;
    const teams = ownProps.teams;
    let skillsCounts = getSkillsCounts(workers, teams);
    //console.log('SkillsCounts:', activityCounts);
    return skillsCounts;
    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    let { team } = props;
    const skillsCounts = props[team];
    //If no team provided, show totals for All Workers
    if (!team) team = 'All';
    return (
        <TileWrapper>
            <AgentSkillsPieChart skillsCounts={skillsCounts} team={team} />
        </TileWrapper>
    )
});

export default withTheme(AgentSkillByTeamTile);
