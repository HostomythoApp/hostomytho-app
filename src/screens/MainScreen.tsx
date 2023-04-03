import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";

const MainScreen = ({}) => {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 justify-center items-center bg-white")}>
      <MainTitle title={"Bonjour " + data.member.login} />
      <View>
        <PrimaryButton title="Jouer" destination="PlausibilityGame" />
        <PrimaryButton title="Profil" destination="Profile" />
        <PrimaryButton title="Paramètre" destination="Settings" />
      </View>
    </View>
  );
};

export default MainScreen;
