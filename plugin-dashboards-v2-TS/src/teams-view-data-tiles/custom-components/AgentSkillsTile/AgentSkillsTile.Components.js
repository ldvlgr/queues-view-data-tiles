import { styled } from '@twilio/flex-ui';

export const TileWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    min-width: 275px;
    padding: ${({ theme }) => theme.tokens.spacings.space40};
    border-style: solid;
    border-width: ${({ theme }) => theme.tokens.borderWidths.borderWidth20};
    border-radius: ${({ theme }) => theme.tokens.radii.borderRadius20};
    border-color: ${({ theme }) => theme.tokens.borderColors.colorBorderWeaker};
    background-color: ${({ theme }) => theme.tokens.backgroundColors.colorBackgroundBody};
    color: ${({ theme }) => theme.tokens.textColors.colorText};
`;

export const TeamTile = styled('div')`
    margin: 2px;
    display: flex;
    flex-direction: row;
    
    padding: ${({ theme }) => theme.tokens.spacings.space40};
    border-style: solid;
    border-width: ${({ theme }) => theme.tokens.borderWidths.borderWidth20};
    border-radius: ${({ theme }) => theme.tokens.radii.borderRadius20};
    border-color: ${({ theme }) => theme.tokens.borderColors.colorBorderWeaker};
    background-color: ${({ theme }) => theme.tokens.backgroundColors.colorBackgroundBody};
    color: ${({ theme }) => theme.tokens.textColors.colorText};
`;

export const Title = styled('p')`
    min-height: ${({ theme }) => theme.tokens.sizings.sizeSquare70};
    margin-top: ${({ theme }) => theme.tokens.spacings.space0};
    margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize30};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight40};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
    justify-content: center;
    display: flex;
`;

export const Content = styled('div')`
    margin-top: ${({ theme }) => theme.tokens.spacings.space50};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize90};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight90};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
`;
export const Description = styled('div')`
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize20};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight10};
    justify-content: center;
    display: flex;
    padding: 4px;
`;

export const Summary = styled('div')`
  flex-direction: column;
  padding-right: 16px;
`;

export const Chart = styled('div')`
  display: flex;
  flex-direction: column;
  width: 130px;
  display: flex;
  justify-content: center;
`;


export const Label = styled('div')`
  background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
  font-size: 10px;
  font-weight: bold;
  width: 90px;
  padding: 2px 2px 2px 4px;
  margin: 1px;
  color: #ffffff
`;


export const AgentSkill = styled('div')`
display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  font-size: 12px;
  margin-bottom: 1px;
  margin-top: 1px;
`;

export const Metric = styled('div')`
  font-size: 10px;
  padding: 2px;
  width: 20px;
  text-align: right;
  margin: 1px;
  font-weight: bold;
`;

