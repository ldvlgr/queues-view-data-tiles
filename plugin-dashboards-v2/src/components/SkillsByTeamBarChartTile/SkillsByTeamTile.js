import { withTheme, StackedBarChart } from '@twilio/flex-ui';
import * as React from "react";
import { TileWrapper, Title, BarChart, Label } from "./SkillsByTeamTile.Components"
import { cx } from "emotion";
import { getSkillsByTeamCounts } from '../../utils/WorkerDataUtil';
import { mockWorkersData } from '../../utils/mockWorkersData';
import { Table, THead, TBody, Th, Tr, Td } from "@twilio-paste/core";

import { connect } from "react-redux";

/**
 * @param {props} props.teamsData The teams data {"teamName": {color: "grey"}}
 */
const SkillsByTeamTile = connect((state, ownProps) => {
    //Note: max 200 workers will be loaded for teams view
    //const workers = state.flex.supervisor.workers;
    const workers = mockWorkersData;
    const teamsData = ownProps.teamsData;
    const teams = Object.keys(teamsData);
    let skillCounts = getSkillsByTeamCounts(workers, teams);
    console.log('SkillsByTeamCounts:', skillCounts);
    return { skillCounts };

    //object returned from connect is merged into component props
    //See https://react-redux.js.org/api/connect
})((props) => {
    const { className, teamsData, skillCounts, maxWidth } = props;
    const teams = Object.keys(teamsData);
    const skillNames = Object.keys(skillCounts);

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
                color: teamsData[tm].color
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
            <Table variant="default">
                <THead>
                    <Tr>
                        <Th><Label> Skill </Label></Th>
                        <Th textAlign="center"><Label> # </Label></Th>
                        <Th><Label> Agent Teams </Label></Th>
                    </Tr>
                </THead>
                <TBody>
                    {skillNames.map((sk) => {
                        let chartProps = getChartProps(sk);
                        let agentCount = 0;
                        chartProps.forEach((c) => { agentCount += c.value });
                        return (
                            <Tr key={sk}>
                                <Td><Label> {sk} </Label></Td>
                                <Td textAlign="center"><Label>{agentCount} </Label></Td>
                                <Td>
                                    <BarChart agentCount={agentCount} totalAgents={maxAgents} maxWidth={maxWidth || 300}>
                                        <StackedBarChart key={sk} items={chartProps} />
                                    </BarChart>
                                </Td>
                            </Tr>
                        );
                    })
                    }
                </TBody>
            </Table>
        </TileWrapper>
    )
});

export default withTheme(SkillsByTeamTile);
