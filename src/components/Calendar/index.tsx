import React from "react";
import {
  Calendar as CustomCalendar,
  LocaleConfig,
} from "react-native-calendars";

import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { ptBR } from "./localeConfig";
import { DateData } from "react-native-calendars/src/types";
import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface DatePRops extends MarkingProps {
  textColor: string;
}

export interface MarkedDatesProps {
  [date: string]: DatePRops;
}

interface CalendarProps {
  markedDates: MarkedDatesProps;
  onDayPress: (date: DateData) => void;
}

export function Calendar({ onDayPress, markedDates }: CalendarProps) {
  const theme = useTheme();

  return (
    <CustomCalendar
      firstDay={1}
      minDate={new Date()}
      headerStyle={{
        backgroundColor: theme.colors.background_secondary,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.text_detail,
        paddingBottom: 10,
        marginBottom: 10,
      }}
      theme={{
        textDayFontFamily: theme.fonts.inter.regular,
        textDayHeaderFontFamily: theme.fonts.inter.medium,
        textMonthFontFamily: theme.fonts.archivo.semiBold,
        monthTextColor: theme.colors.title,
        textMonthFontSize: 20,
        textDayFontSize: 10,
        arrowStyle: {
          marginHorizontal: -15,
        },
      }}
      renderArrow={(direction) => (
        <Feather
          sixe={24}
          color={theme.colors.text}
          name={direction === "left" ? "chevron-left" : "chevron-right"}
        />
      )}
      markingType="period"
      markedDates={markedDates}
      onDayPress={onDayPress}
    />
  );
}
