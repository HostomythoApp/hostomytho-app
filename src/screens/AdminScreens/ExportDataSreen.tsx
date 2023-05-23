import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

const ExportDataSreen = ({}) => {
  const tw = useTailwind();

  return (
    <Text>Exporter les données de l'application</Text>
  );
};

export default ExportDataSreen;