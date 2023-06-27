import { Manager, Icon, withTheme, StackedBarChart } from '@twilio/flex-ui';

import * as React from "react";
import { TileWrapper, Description, Title, Skill, BarChart, Label } from "./SkillsByTeamTile.Components"
import { cx } from "emotion";
import { getSkillsByTeamCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';

import { connect } from "react-redux";
const _manager = Manager.getInstance();


/**
 * @param {props} props.teams The team names (for example ["ABC123", "XYZ987"])
 */
const SkillsByTeamTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    //const workers = state.flex.supervisor.workers;
    const workers = mockWorkersData;
    const teams = ownProps.teams;
    let skillCounts = getSkillsByTeamCounts(workers, teams);
    console.log('SkillsByTeamCounts:', skillCounts);
    return { skillCounts };

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    const { className, teams, skillCounts } = props;
    const skillNames = Object.keys(skillCounts);

    const teamColors = {
        ABC123: "wheat",
        DEF456: "tan",
        XYZ789: "sienna"
    }

    //Calc max agents per skill
    let maxAgents = 0;
    skillNames.forEach((sk) => {
        if (skillCounts[sk].All > maxAgents) maxAgents = skillCounts[sk].All;
    })

    const getChartProps = (sk) => {
        let skillBarChart = [];
        teams.forEach((tm) => {
            let barChartSection = {
                value: skillCounts[sk][tm] || 0,
                label: tm,
                color: teamColors[tm]
            }
            skillBarChart.push(barChartSection);
        })
        return skillBarChart;
    }

    return (
        <TileWrapper className={cx("Twilio-AggregatedDataTile", className)}>
            <Title className="Twilio-AggregatedDataTile-Title">
                Skills Summary
            </Title>
            {skillNames.map((sk) => {
                let chartProps = getChartProps(sk);
                let agentCount = 0;
                chartProps.forEach((c) => { agentCount += c.value });
                return (
                    <Skill key={sk}>
                        <Label> {sk} [{agentCount}] </Label>
                        <BarChart agentCount={agentCount} totalAgents={maxAgents} maxWidth={400}>
                            <StackedBarChart key={sk} items={chartProps} />
                        </BarChart>
                    </Skill>
                );
            })
            }
        </TileWrapper>
    )
});

export default withTheme(SkillsByTeamTile);
