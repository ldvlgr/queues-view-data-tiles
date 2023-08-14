import { styled } from '@twilio/flex-ui';

export interface OwnProps {
  theme?: any;
  bgColor?: string;
  value: number;
  count?: number;
  greenLine?: number;
  yellowLine?: number;
}

export interface ThemeOnlyProps {
  theme?: any;
  bgColor?: string;
}
export const TileWrapper = styled('div')<ThemeOnlyProps>`
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

export const Title = styled('p')<ThemeOnlyProps>`
    min-height: ${({ theme }) => theme.tokens.sizings.sizeSquare70};
    margin-top: ${({ theme }) => theme.tokens.spacings.space0};
    margin-bottom: ${({ theme }) => theme.tokens.spacings.space0};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize30};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight40};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
    justify-content: center;
    display: flex;
`;

export const Content = styled('div')<ThemeOnlyProps>`
    margin-top: ${({ theme }) => theme.tokens.spacings.space50};
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize90};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight90};
    font-weight: ${({ theme }) => theme.tokens.fontWeights.fontWeightBold};
`;
export const Description = styled('div')<ThemeOnlyProps>`
    font-size: ${({ theme }) => theme.tokens.fontSizes.fontSize20};
    line-height: ${({ theme }) => theme.tokens.lineHeights.lineHeight10};
`;

export const Summary = styled('div')`
  flex-direction: column;
  padding-right: 16px;
`;

export const Chart = styled('div')`
  display: flex;
  flex-direction: column;
  width: 130px;
  justify-content: center;
`;

export const Group = styled('div')`
  display: flex;
  flex: 1 1 auto;
  flex-direction: row;
  font-size: 12px;
  margin-bottom: 1px;
  margin-top: 1px;
`;

export const Label = styled('div')<ThemeOnlyProps>`
  background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
  font-size: 12px;
  font-weight: bold;
  width: 55px;
  padding: 2px 2px 2px 4px;
  margin: 1px;
`;

export const Metric = styled('div')`
  font-size: 12px;
  padding: 2px;
  width: 40px;
  text-align: right;
  margin: 1px;

`;

export const SLPct = styled('div')<OwnProps>`
  background-color: ${(props) => getColor(props)};
  font-size: 12px;
  font-weight: bold;
  padding: 2px;
  width: 40px;
  text-align: right;
  margin: 1px;
`;

function getColor(props: OwnProps) {
  let {value, greenLine, yellowLine} = props;
  if (!greenLine) greenLine = 90;
  if (!yellowLine) yellowLine = 60;
  if (value >= greenLine) {
    return '#d0f4d1';
  } else if (value > yellowLine) {
    return '#ffe3b9';
  } else {
    return '#feced3';
  }
}

