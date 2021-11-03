import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { CarInterface } from "../../interfaces/Car";
import { api } from "../../services/Axios";
import { AntDesign } from "@expo/vector-icons";
import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appoitments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { Load } from "../../components/Load";
import { LoadAnimation } from "../../components/LoadAnimation";

interface CarProps {
  car: CarInterface;
  user_id: number;
  id: string;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const theme = useTheme();
  const { navigate, goBack } = useNavigation();

  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCarsUser = async () => {
    const schuduling = api
      .get("/schedules_byuser/?user_id=1")
      .then((response) => response.data);
    return schuduling;
  };

  useEffect(() => {
    try {
      loadCarsUser()
        .then((cars) => {
          setCars(cars);
        })
        .then(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={goBack} />
        <Title>Seus agendamentos, {"\n"}estão aqui.</Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <Content>
          <Appoitments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appoitments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Periodo</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.text_detail}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
