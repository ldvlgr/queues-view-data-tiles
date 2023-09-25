import { styled } from '@twilio/flex-ui';

export const TileWrapper = styled('div')`
  max-height: 220px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.tokens.spacings.space40};
  margin-left: ${({ theme }) => theme.tokens.spacings.space40};
  margin-right: ${({ theme }) => theme.tokens.spacings.space40};
  border-style: solid;
  border-width: ${({ theme }) => theme.tokens.borderWidths.borderWidth20};
  border-radius: ${({ theme }) => theme.tokens.radii.borderRadius20};
  border-color: ${({ theme }) => theme.tokens.borderColors.colorBorderWeaker};
  background-color: ${(props) => props.bgColor || props.theme.tokens.backgroundColors.colorBackgroundBody};
  color: ${({ theme }) => theme.tokens.textColors.colorText};
`;

export const Label = styled('div')`
  font-size: 12px;
`;

export const Heading = styled('div')`
  font-size: 12px;
  font-weight: bold;
`;
