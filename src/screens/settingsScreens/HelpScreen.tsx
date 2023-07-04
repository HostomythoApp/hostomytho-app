import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";

const HelpScreen = ({ }) => {
  const tw = useTailwind();

  return (
    <View style={tw("flex-1")}>
      <ScrollView style={tw('w-full')}>
        <CustomHeaderEmpty title="Paramètres" />
        <View style={tw('mx-auto min-w-[1200px] pt-20')}>
          <Text>En dev</Text>
        </View>
      </ScrollView>
    </View>);
};

export default HelpScreen;

