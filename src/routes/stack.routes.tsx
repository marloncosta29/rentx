import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { CarInterface } from "../interfaces/Car";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

interface SchedulingDates {
  start: string;
  end: string;
  totaldays: number;
  datesArray: string[];
}
export interface SchedulingDetailsRouteParams {
  car: CarInterface;
  dates: SchedulingDates;
}
export type StackParamList = {
  Home: undefined;
  CarDetails: { car: CarInterface };
  Scheduling: { car: CarInterface };
  SchedulingDetails: SchedulingDetailsRouteParams;
  SchedulingComplete: undefined;
  MyCars: undefined;
  Splash: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<StackParamList>();

export function StackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
