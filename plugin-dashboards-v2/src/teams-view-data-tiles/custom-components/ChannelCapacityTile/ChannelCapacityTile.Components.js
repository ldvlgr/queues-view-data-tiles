import { styled } from '@twilio/flex-ui';

export const TileWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.tokens.spacings.space40};
    margin-left: ${({ theme }) => theme.tokens.spacings.space40};
    margin-right: ${({ theme }) => theme.tokens.spacings.space40};
    border-style: solid;
    border-width: ${({ theme }) => theme.tokens.borderWidths.borderWidth20};
    border-radius: ${({ theme }) => theme.tokens.radii.borderRadius20};
    border-color: ${({ theme }) => theme.tokens.borderColors.colorBorderWeaker};
    background-color: ${(props) => props.theme.tokens.backgroundColors.colorBackground};
    color: ${({ theme }) => theme.tokens.textColors.colorText};
    max-width: 200px;
`;

export const Title = styled('p')`
    min-height: ${({ theme }) => theme.tokens.sizings.sizeSquare70};
    margin-top: ${({ theme }) => theme.tokens.spacings.space0};
    margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize30};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight40};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
    color: #121C2D;
    justify-content: center;
    display: flex;
`;

export const Content = styled('div')`
    margin-top: ${({ theme }) => theme.tokens.spacings.space10};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize90};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight90};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
    color: ${({ theme }) => theme.tokens.textColors.colorText};
    justify-content: center;
    display: flex;
`;

export const Description = styled('div')`
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize20};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight10};
`;

export const Channel = styled('div')`
  color: #121c2d;
  background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
  margin-bottom: ${({ theme }) => theme.tokens.spacings.space20};
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-width: 0px;
  border-radius: 12px;
  height: 24px;
  min-width: 24px;
`;

export const ChannelIcon = styled('div')`
  color: #121c2d;
  margin-top: 0px;
  margin-bottom: 0px;
  height: 24px;
`;

export const Chart = styled('div')`
  display: flex;
  max-width: 130px;
  justify-content: center;
`;

export const MetricsContainer = styled('div')`
  flex-direction: row;
  display: flex;
  justify-content: center;
  padding: 2px;
`;

export const TaskCount = styled('div')`
  flex-direction: column;
  justify-content: center;
  border-width: 1px;
  border-radius: 6px;
  border-style: solid;
  border-color: grey;
  margin-left: 2px;
  margin-right: 2px;
`;

export const Label = styled('div')`
  color: ${({ theme }) => theme.tokens.textColors.colorText};
  font-size: 11px;
  padding: 2px 8px;
  text-align: center;
`;

export const Metric = styled('div')`
  color: ${({ theme }) => theme.tokens.textColors.colorText};
  font-size: 14px;
  font-weight: bold;
  padding: 2px;
  text-align: center;
`;
