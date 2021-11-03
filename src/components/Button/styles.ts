import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface ContainerProps {
  color: string;
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  ${({ color, theme }) => {
    if (color) {
      return css`
        background-color: ${color};
      `;
    }
    return css`
      background-color: ${theme.colors.main};
    `;
  }}
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.inter.medium};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
