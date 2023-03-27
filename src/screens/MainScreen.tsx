import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";

const MainScreen = ({}) => {
  const navigation = useNavigation();
  const tw = useTailwind();

  return (
    <View style={styles.container}>
      <Text style={[tw("text-black text-lg font-semibold mb-5")]}>
        Bonjour {data.login}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={tw("bg-secondary py-2 px-12 my-2 font-medium rounded-xl")}
        >
          <Text style={tw("text-white text-center  text-lg")}>Jouer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={tw("bg-secondary py-2 px-12 my-2 font-medium rounded-xl")}
        >
          <Text style={tw("text-white text-center  text-lg")}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Leaderboard")}
          style={tw("bg-secondary py-2 px-12 my-2 font-medium rounded-xl")}
        >
          <Text style={tw("text-white text-center  text-lg")}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    zIndex: 1,
  },
});
