import * as Flex from "@twilio/flex-ui";
import { styled } from "@twilio/flex-ui";

import AgentTeamActivityTile from "./AgentTeamActivityTile/AgentTeamActivityTile";
import AgentStatusByTeamTile from "./AgentActivityTile/AgentStatusByTeamTile";
import AgentStatusAllTeamsTile from "./AgentActivityTile/AgentStatusAllTeamsTile";

const teams = ["ABC123", "DEF456", "XYZ789"];

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
            {/* <AgentStatusByTeamTile team="All" teams={teams} />
            <AgentStatusByTeamTile team="ABC123" teams={teams} />
            <AgentStatusByTeamTile team="DEF456" teams={teams} />
            <AgentStatusByTeamTile team="XYZ789" teams={teams} /> */}
            {/* <AgentTeamActivityTile teams={teams} /> */}
          </TeamsViewDataTiles>

          <TeamsViewDataTiles>
            <AgentStatusAllTeamsTile teams={teams} />
          </TeamsViewDataTiles>
          <OriginalComponent {...updatedProps} />
        </TeamsWrapper>
      );
    }
  );

}