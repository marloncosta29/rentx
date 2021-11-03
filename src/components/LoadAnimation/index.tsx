import React from "react";
import LottieView from "lottie-react-native";
import { Container } from "./styles";

import carLoad from "../../assets/car_loading.json";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={carLoad}
        autoPlay
        style={{ height: 150 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
