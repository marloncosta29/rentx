import React, { useState } from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../Accessory";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";
import { Feather } from "@expo/vector-icons";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  AccessoryContainer,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import {
  SchedulingDetailsRouteParams,
  StackParamList,
} from "../../routes/stack.routes";
import { getAccessorieIcon } from "../../utils/getAccessorieIcon";
import { api } from "../../services/Axios";
import { Alert } from "react-native";

export function SchedulingDetails() {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation<NavigationProp<StackParamList>>();
  const route = useRoute();
  const { car, dates } = route.params as SchedulingDetailsRouteParams;

  const [loading, setLoading] = useState(false);

  async function handleCompleteScheduling() {
    setLoading(true);

    const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
    const unavailable_dates = [
      ...schedulesByCar.data.unavailable_dates,
      ...dates.datesArray,
    ];

    await api.post("/schedules_byuser", {
      user_id: 1,
      car,
    });

    await api
      .put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      })
      .then(() => {
        navigate("SchedulingComplete");
      })
      .catch(() => {
        setLoading(false);
        Alert.alert("Ops!", "Houve um erro no agendamento, tente novamente!");
      });
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <AccessoryContainer>
          {car.accessories.map((accessorie) => {
            return (
              <Accessory
                key={accessorie.type}
                name={accessorie.name}
                icon={getAccessorieIcon(accessorie.type)}
              />
            );
          })}
        </AccessoryContainer>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          <DateInfo>
            <DateTitle>De</DateTitle>
            <DateValue>{dates.start}</DateValue>
          </DateInfo>
          <Feather
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.text}
          />
          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{dates.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.rent.price} x{dates.totaldays} diarias
            </RentalPriceQuota>
            <RentalPriceTotal>
              R$ {car.rent.price * dates.totaldays}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          color={theme.colors.success}
          title="Alugar agora"
          onPress={handleCompleteScheduling}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
