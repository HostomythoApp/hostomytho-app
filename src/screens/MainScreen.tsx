import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import PrimaryButton from "components/PrimaryButton";

const MainScreen = ({}) => {
  const navigation = useNavigation();
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 justify-center items-center")}>
      <Text style={[tw("text-black text-lg font-semibold mb-5")]}>
        Bonjour {data.login}
      </Text>

      <View>
        <PrimaryButton title="Jouer" destination="Profile" />
        <PrimaryButton title="Profil" destination="Profile" />
        <PrimaryButton title="Paramètre" destination="Settings" />
      </View>
    </View>
  );
};

export default MainScreen;
