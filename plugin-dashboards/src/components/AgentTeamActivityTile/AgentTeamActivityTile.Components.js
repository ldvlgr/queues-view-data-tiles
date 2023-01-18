import styled from "react-emotion";

export const TileWrapper = styled("div")`
    background-color: ${(props) => props.theme.colors.base2};
    color: ${(props) => props.theme.calculated.textColor};
    padding: 12px;
    box-shadow: ${(props) => props.theme.colors.base4} 0 -1px 0 inset;
    display: flex;
    flex-direction: column;
    min-width: 250px;
    flex: 1 1 auto;
`; 

export const Title = styled("h3")`
    margin-top: 0;
    margin-bottom: 4px;
    letter-spacing: 2px;
    font-size: 10px;
    min-height: 14px;
    text-transform: uppercase;
    font-weight: bold;
`; 

export const Description = styled("div")`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  font-size: 10px;
  line-height: 14px;
`;

export const AgentTeam = styled("div")`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  font-size: 12px;
  margin-bottom: 1px;
  margin-top: 1px;
`;

export const Label = styled("div")`
  background-color: ${(props) => props.bgColor || props.theme.colors.base2};
  font-size: 10px;
  font-weight: bold;
  width: 60px;
  padding: 2px;
  margin-left: 1px;
`;

export const Legend = styled("div")`
  background-color: ${(props) => props.bgColor || props.theme.colors.base2};
  font-size: 10px;
  font-weight: bold;
  padding: 2px;
  margin-right: 8px;
  color: #ffffff;
`;


export const BarChart = styled("div")`
background-color: ${(props) => props.bgColor || props.theme.colors.base2};
width: 160px;
`;



