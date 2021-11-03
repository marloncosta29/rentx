import React, { useEffect, useCallback, useState } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarButton,
} from "./styles";
import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";
import { BackHandler, StatusBar, StyleSheet } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { StackParamList } from "../../routes/stack.routes";
import { api } from "../../services/Axios";
import { CarInterface } from "../../interfaces/Car";
import { Load } from "../../components/Load";

import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { LoadAnimation } from "../../components/LoadAnimation";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

export function Home() {
  const theme = useTheme();
  const { navigate } = useNavigation<NavigationProp<StackParamList>>();
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });
  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.posX = positionX.value;
      ctx.posY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.posX + event.translationX;
      positionY.value = ctx.posY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  function handleGoCarDetail(car: CarInterface) {
    navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigate("MyCars");
  }

  async function getAllCards() {
    const cars = await api.get("cars").then((response) => {
      return response.data;
    });
    return cars;
  }

  useEffect(() => {
    try {
      getAllCards().then((cars) => setCars(cars));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          keyExtractor={(item) => item.id}
          data={cars}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleGoCarDetail(item)} />
          )}
        />
      )}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", right: 22, bottom: 13 },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
