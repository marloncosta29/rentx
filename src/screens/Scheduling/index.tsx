import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import ArrowLeftArrow from "../../assets/arrow.svg";
import { Calendar, MarkedDatesProps } from "../../components/Calendar";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/core";
import { StackParamList } from "../../routes/stack.routes";
import { DateData } from "react-native-calendars/src/types";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { format } from "date-fns";
import { getPlataformDate } from "../../utils/getPlataformDate";
import { CarInterface } from "../../interfaces/Car";
import { eachDayOfInterval } from "date-fns";
interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface RouteParams {
  car: CarInterface;
}

export function Scheduling() {
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as RouteParams;

  const { navigate, goBack } = useNavigation<NavigationProp<StackParamList>>();
  const [lastSelectDate, setLastSelectDate] = useState<DateData>(
    {} as DateData
  );
  const [markedDates, setMarkedDates] = useState<MarkedDatesProps>(
    {} as MarkedDatesProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  function handleCompleteScheduling() {
    if (!rentalPeriod.start || !rentalPeriod.end) {
      Alert.alert("Ops!", "Selecione um periodo valido para o agendamento");
      return;
    }
    navigate("SchedulingDetails", {
      car,
      dates: {
        datesArray: Object.keys(markedDates),
        start: rentalPeriod.startFormatted,
        end: rentalPeriod.endFormatted,
        totaldays: eachDayOfInterval({
          start: new Date(rentalPeriod.start),
          end: new Date(rentalPeriod.end),
        }).length,
      },
    });
  }
  function handleChangeDate(date: DateData) {
    let start = !lastSelectDate.timestamp ? date : lastSelectDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const dateKeys = Object.keys(interval);

    const firstDate = dateKeys[0];
    const endDate = dateKeys[dateKeys.length - 1];
    setRentalPeriod({
      start: start.timestamp,
      startFormatted: format(
        getPlataformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      end: end.timestamp,
      endFormatted: format(getPlataformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton color={theme.colors.shape} onPress={goBack} />
        <Title>
          Escolha uma {"\n"}data de inicio e {"\n"}fim do aluguel
        </Title>
        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>
          <ArrowLeftArrow />
          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>
      <Footer>
        <Button
          title="CONFIRMAR"
          onPress={handleCompleteScheduling}
          enabled={!!rentalPeriod.startFormatted}
        />
      </Footer>
    </Container>
  );
}
