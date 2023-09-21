import { styled } from '@twilio/flex-ui';

export interface OwnProps {
  theme?: any;
  bgColor?: string;
  agentCount: number;
  totalAgents: number;
  maxWidth: number
}

export interface ThemeOnlyProps {
  theme?: any;
  bgColor?: string;
}

export const TileWrapper = styled('div')<ThemeOnlyProps>`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.tokens.spacings.space40};
    border-style: solid;
    border-width: ${({ theme }) => theme.tokens.borderWidths.borderWidth20};
    border-radius: ${({ theme }) => theme.tokens.radii.borderRadius20};
    border-color: ${({ theme }) => theme.tokens.borderColors.colorBorderWeaker};
    background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
    color: ${({ theme }) => theme.tokens.textColors.colorText};
`;

export const Title = styled('p')<ThemeOnlyProps>`
    min-height: ${({ theme }) => theme.tokens.sizings.sizeSquare70};
    margin-top: ${({ theme }) => theme.tokens.spacings.space0};
    margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize40};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight40};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
`;

export const Content = styled('div')<ThemeOnlyProps>`
    margin-top: ${({ theme }) => theme.tokens.spacings.space50};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize90};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight90};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
`;

export const Label = styled('div')<ThemeOnlyProps>`
  background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
  font-size: 12px;
  font-weight: bold;
  padding: 4px;
`;

export const Legend = styled('div')<ThemeOnlyProps>`
  background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
  font-size: 10px;
  font-weight: bold;
  padding: 2px;
  margin-right: 8px;
  color: #ffffff;
`;


export const BarChart = styled('div')<OwnProps>`
  background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
  width : ${(props) => getWidth(props)};
`;


function getWidth(props: OwnProps) {
  const {agentCount, totalAgents} = props;
  let { maxWidth} = props;
  
  //console.log('BarChart props:', props);
  if (!maxWidth) maxWidth = 900;
  return ((agentCount / totalAgents) * maxWidth) + 'px';

}
