import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeData.js";


const MainScreen = ({}) => {
  const navigation = useNavigation();
  const tw = useTailwind();

  const [opacity, setOpacity] = useState(1);
  return (
    <View>
      <Text style={tw("font-semibold ")}>Main screen</Text>

      <Text style={tw("font-semibold ")}>Bonjour {data.login}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        onPressIn={() => setOpacity(0.7)}
        onPressOut={() => setOpacity(1)}
        activeOpacity={1}
        style={tw("bg-red-500 p-3 rounded-xl self-center")}
      >
        <Text style={tw("text-white text-lg font-bold")}>
          Go to Home Screen
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainScreen;
