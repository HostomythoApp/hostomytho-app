import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const ThemeScreen = ({ }) => {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1 items-center")}>
      <ScrollView style={tw('w-full')}>
        <CustomHeaderEmpty title="Paramètres" />
        <View style={tw('mx-auto min-w-[1200px] pt-20')}>
          <Text>En dev</Text>
        </View>
      </ScrollView>
    </View>);
};

export default ThemeScreen;
