import React from "react";

import {
  Container,
  Detail,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

import { RectButtonProps } from "react-native-gesture-handler";
import { CarInterface } from "../../interfaces/Car";
import { getAccessorieIcon } from "../../utils/getAccessorieIcon";

interface Props extends RectButtonProps {
  data: CarInterface;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessorieIcon(data.fuel_type);
  return (
    <Container {...rest}>
      <Detail>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>
        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{data.rent.price}</Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Detail>
      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}
