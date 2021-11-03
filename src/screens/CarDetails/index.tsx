import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../Accessory";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  Container,
  Header,
  CarImages,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  AccessoryContainer,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import { StackParamList } from "../../routes/stack.routes";
import { CarInterface } from "../../interfaces/Car";
import { getAccessorieIcon } from "../../utils/getAccessorieIcon";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { StatusBar, StyleSheet } from "react-native";
import { useTheme } from "styled-components";

interface Params {
  car: CarInterface;
}

export function CarDetails() {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute();
  const { car } = route.params as Params;
  const scrollY = useSharedValue(0);
  const scrollHandle = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const headerStyleAnimeted = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });
  const slideCarsStyleAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });
  function handleGoToScheduling() {
    navigate("Scheduling", { car });
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          [
            headerStyleAnimeted,
            styles.header,
            { backgroundColor: theme.colors.background_secondary },
          ],
        ]}
      >
        <Header>
          <BackButton onPress={goBack} />
        </Header>

        <Animated.View style={slideCarsStyleAnimated}>
          <CarImages>
            <ImageSlider imagesUrl={car.photos} />
          </CarImages>
        </Animated.View>
      </Animated.View>
      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: "center",
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>{`R$ ${car.rent.price}`}</Price>
          </Rent>
        </Details>

        <AccessoryContainer>
          {car.accessories.map((accessorie, index) => {
            return (
              <Accessory
                key={index}
                name={accessorie.name}
                icon={getAccessorieIcon(accessorie.type)}
              />
            );
          })}
        </AccessoryContainer>

        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="escolher periodo do aluguel"
          onPress={handleGoToScheduling}
        />
      </Footer>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
  back: {
    marginTop: 24,
  },
});
