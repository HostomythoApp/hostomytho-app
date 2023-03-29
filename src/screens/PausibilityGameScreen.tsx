import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainTitle from "components/MainTitle";
import PrimaryButton from "components/PrimaryButton";

const PausibilityGameScreen = ({}) => {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <MainTitle title="Pausibility Game Screen" />
      <PrimaryButton title="Menu principal" destination="Main" />
    </View>
  );
};

export default PausibilityGameScreen;
