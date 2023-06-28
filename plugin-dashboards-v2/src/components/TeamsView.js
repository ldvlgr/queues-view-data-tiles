import * as Flex from "@twilio/flex-ui";
import { styled } from "@twilio/flex-ui";

import AgentTeamActivityTile from "./AgentTeamActivityTile/AgentTeamActivityTile";
import AgentStatusByTeamTile from "./AgentActivityTile/AgentStatusByTeamTile";
import AgentStatusAllTeamsTile from "./AgentActivityTile/AgentStatusAllTeamsTile";
import AgentSkillsAllTeamsTile from './AgentSkillsTile/AgentSkillsAllTeamsTile';
import SkillsByTeamTile from "./SkillsByTeamBarChartTile/SkillsByTeamTile";

const teamsData = {
  ABC123: { color: "wheat" },
  DEF456: { color: "peachpuff" },
  XYZ789: { color: "tan" }
}
const teams = Object.keys(teamsData);

export default (manager) => {
  addTeamsViewTiles();
}

const TeamsWrapper = styled("div")`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 12px;
  `;

const TeamsViewDataTiles = styled("div")`
  
  display: flex;
  width: 100%;
  margin-top: ${({ theme }) => theme.tokens.spacings.space0};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
  height: auto;
  box-sizing: border-box;
  flex: 0 0 auto;
  > * {
      flex: 1 1 25%;
  }
  > * + * {
      margin-left: ${({ theme }) => theme.tokens.spacings.space50};
  }
  ${(props) => props.theme.QueuesStats.TilesGrid}
`;

const addTeamsViewTiles = () => {

  Flex.TeamsView.Content.addWrapper(
    (OriginalComponent) => (originalProps) => {
      const updatedProps = { ...originalProps };

      return (
        <TeamsWrapper>
          <TeamsViewDataTiles>
            <AgentTeamActivityTile teamsData={teamsData} />
            <SkillsByTeamTile teamsData={teamsData} />
          </TeamsViewDataTiles>

          {/* <TeamsViewDataTiles>
            <AgentStatusByTeamTile team="All" teams={teams} />
            <AgentStatusByTeamTile team="ABC123" teams={teams} />
            <AgentStatusByTeamTile team="DEF456" teams={teams} />
            <AgentStatusByTeamTile team="XYZ789" teams={teams} />
          </TeamsViewDataTiles> */}

          <TeamsViewDataTiles>
            <AgentStatusAllTeamsTile teamsData={teamsData} />
          </TeamsViewDataTiles>

          <OriginalComponent {...updatedProps} />
        </TeamsWrapper>
      );
    }
  );

}