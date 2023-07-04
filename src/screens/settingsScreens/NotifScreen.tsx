import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";

const NotifScreen = ({ }) => {
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

export default NotifScreen;
