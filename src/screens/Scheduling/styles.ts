import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_secondary};
`;
export const Header = styled.View`
  width: 100%;
  height: 325px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: center;
  padding: 25px;
  padding-top: ${getStatusBarHeight() + 30}px;
`;
export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.archivo.semiBold};
  font-size: ${RFValue(34)}px;
  margin-top: 24px;
`;

export const RentalPeriod = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 32px 0;
`;
export const DateInfo = styled.View`
  width: 30%;
`;
export const DateTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.archivo.medium};
  font-size: ${RFValue(10)}px;
`;

interface DateValueProps {
  selected: boolean;
}

export const DateValue = styled.Text<DateValueProps>`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.inter.medium};
  font-size: ${RFValue(15)}px;
  ${({ theme, selected }) => {
    if (selected) {
      return css``;
    }
    return css`
      border-bottom-width: 1px;
      border-bottom-color: ${({ theme }) => theme.colors.text_detail};
      padding-bottom: 5px;
    `;
  }}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 24, alignItems: "center" },
  showsVerticalScrollIndicator: false,
})``;
export const Footer = styled.View`
  padding: 24px;
`;
