import { styled } from '@twilio/flex-ui';

export const TileWrapper = styled('div')`
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

export const Title = styled('p')`
    min-height: ${({ theme }) => theme.tokens.sizings.sizeSquare70};
    margin-top: ${({ theme }) => theme.tokens.spacings.space0};
    margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize40};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight40};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
    color: #121C2D;
    justify-content: center;
    display: flex;
`;

export const Content = styled('div')`
    margin-top: ${({ theme }) => theme.tokens.spacings.space50};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize90};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight90};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
    color: #121C2D;
    justify-content: center;
    display: flex;
`;

export const Description = styled('div')`
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize20};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight10};
`;

export const TaskCount = styled('div')`
  display: flex;
  flex-direction: row;
  height: 25px;
`;

export const Label = styled('div')`
  color: #121c2d;
  font-size: 12px;
  font-weight: bold;
  width: 100px;
  padding: 2px;
`;

export const Metric = styled('div')`
  color: #121c2d;
  font-size: 12px;
  font-weight: bold;
  width: 50px;
  padding: 2px;
  text-align: right;
`;
