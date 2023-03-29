import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainTitle from "components/MainTitle";
import PrimaryButton from "components/PrimaryButton";
import data from "data/fakeUserData.js";

const PausibilityGameScreen = ({}) => {
  const tw = useTailwind();
  const [listTexts, setListTexts] = useState<any>(null);
    // setListTexts(data.texts);
 ;

  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <MainTitle title="Pausibility Game Screen" />
      <PrimaryButton title="Menu principal" destination="Main" />
    </View>
  );
};

export default PausibilityGameScreen;
