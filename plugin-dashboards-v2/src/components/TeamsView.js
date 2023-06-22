import * as Flex from "@twilio/flex-ui";
import AgentTeamActivityTile from "./AgentTeamActivityTile/AgentTeamActivityTile";
//import AgentActivityTile from "./AgentActivityTile/AgentActivityTile";
import AgentStatusPieChartTile from "./AgentActivityTile/AgentStatusPieChartTile";

//import styled from "react-emotion";
import { styled } from "@twilio/flex-ui";
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
            {/* <AgentTeamActivityTile teams={teams}/> */}
            <AgentStatusPieChartTile team="ABC123" teams={teams}/>
            <AgentStatusPieChartTile team="DEF456" teams={teams}/>
            <AgentStatusPieChartTile team="XYZ789" teams={teams}/>
          </TeamsViewDataTiles>
          <OriginalComponent {...updatedProps} />
        </TeamsWrapper>
      );
    }
   );

}