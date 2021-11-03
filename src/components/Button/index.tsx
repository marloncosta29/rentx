import React from "react";
import { ActivityIndicator } from "react-native";

import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  onPress(): void;
  enabled?: boolean;
  loading?: boolean;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  return (
    <Container
      color={color}
      enabled={enabled}
      {...rest}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? <ActivityIndicator /> : <Title>{title}</Title>}
    </Container>
  );
}
