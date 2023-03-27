import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";

const HomeScreen = ({}) => {
  const navigation = useNavigation();
  const tw = useTailwind();

  const [opacity, setOpacity] = useState(1);
  
  return (
    <View>
      <Text style={tw("font-semibold ")}>Home Screen</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        onPressIn={() => setOpacity(0.7)}
        onPressOut={() => setOpacity(1)}
        activeOpacity={1}
        style={tw("bg-blue-500 p-3 rounded-xl self-center")}
      >
        <Text style={tw("text-white text-lg font-bold")}>
          Go to Main Screen
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default HomeScreen;
