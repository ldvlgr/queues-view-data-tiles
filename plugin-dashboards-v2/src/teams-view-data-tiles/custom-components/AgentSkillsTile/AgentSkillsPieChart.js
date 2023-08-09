import { Manager, withTheme } from '@twilio/flex-ui';
import * as React from 'react';
import { TeamTile, Summary, Chart, Description, Title, AgentSkill, Label, Metric } from './AgentSkillsTile.Components'
import { PieChart } from 'react-minimal-pie-chart';
const _manager = Manager.getInstance();

/**
 * @param {props} props.skillsCounts Agent Skill Counts
 */

const AgentSkillsPieChart = (props) => {
    const { skillsCounts, team, hideSummary } = props;
    const colors = ['wheat', 'tan', 'sandybrown', 'peru', 'sienna', 'saddlebrown', 'maroon',];
    let skillsData = [];
    let skills = Object.keys(skillsCounts);
    skills.forEach((sk, index) => {
        let color = colors[index % colors.length];
        skillsData.push({ title: sk, value: skillsCounts[sk], color })
    })
    return (
        <TeamTile>
            {!hideSummary && <Summary>
                {skillsData.map((sd) => {
                    return (
                        <AgentSkill key={sd.title} >
                            <Label bgColor={sd.color}> {sd.title}:</Label>
                            <Metric> {sd.value} </Metric>
                        </AgentSkill>
                    )
                }
                )}
            </Summary>}
            <Chart>
                <Title>
                    Skills
                </Title>
                <PieChart
                    labelStyle={{
                        fontSize: '14px', fill: 'White'
                    }}
                    data={skillsData}
                    label={({ dataEntry }) => dataEntry.value}
                />
                <Description>
                    <div> {team ? 'Team: ' + team : 'All Agents'} </div>
                </Description>
            </Chart>
        </TeamTile>
    )
};

export default withTheme(AgentSkillsPieChart);
