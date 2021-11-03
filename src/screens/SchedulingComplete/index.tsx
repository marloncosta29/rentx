import "react-native-gesture-handler";

import React from "react";

import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { Dimensions, StatusBar, useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { StackParamList } from "../../routes/stack.routes";

export function SchedulingComplete() {
  const { width } = useWindowDimensions();
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();

  function handleFinishScheduling() {
    navigate("Home");
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />
      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro alugado</Title>
        <Message>
          Agora voce só precisa ir {"\n"}até uma concessionaria da rentx {"\n"}{" "}
          pegar o seu autmóvel
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleFinishScheduling} />
      </Footer>
    </Container>
  );
}
