import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";

const ManageTextsScreen = ({}) => {
  const tw = useTailwind();

  return (
    <Text>Gestion des textes en cours</Text>
  );
};

export default ManageTextsScreen;