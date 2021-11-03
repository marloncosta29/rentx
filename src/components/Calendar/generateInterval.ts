import { eachDayOfInterval, format } from "date-fns";
import { DateData } from "react-native-calendars/src/types";

import { MarkedDatesProps } from ".";
import theme from "../../styles/theme";
import { getPlataformDate } from "../../utils/getPlataformDate";

export function generateInterval(start: DateData, end: DateData) {
  let interval: MarkedDatesProps = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp),
  }).forEach((item) => {
    const date = format(getPlataformDate(item), "yyyy-MM-dd");
    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,
        textColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.shape
            : theme.colors.main,
      },
    };
  });
  return interval;
}
