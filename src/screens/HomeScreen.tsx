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
      <View style={styles.upperBackground}></View>
      <View style={styles.lowerBackground}></View>

      <Text style={[tw("font-semibold"), styles.title]}>
        Bonjour {data.login}
      </Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={tw("bg-eeb993 p-4 rounded-md shadow-lg")}
        >
          <Text style={tw("text-black text-lg font-semibold")}>Jouer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={tw("bg-eeb993 p-4 rounded-md shadow-lg mt-4")}>
          <Text style={tw("text-black text-lg font-semibold")}>Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Leaderboard")}
          style={tw("bg-eeb993 p-4 rounded-md shadow-lg mt-4")}
        >
          <Text style={tw("text-black text-lg font-semibold")}>Classement</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Rules")}
          style={tw("bg-eeb993 p-4 rounded-md shadow-lg mt-4")}
        >
          <Text style={tw("text-black text-lg font-semibold")}>
            Règles et explications
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Settings")}
          style={tw("bg-eeb993 p-4 rounded-md shadow-lg mt-4")}
        >
          <Text style={tw("text-black text-lg         font-semibold")}>
            Paramètres
          </Text>
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
  upperBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#045551",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  lowerBackground: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    backgroundColor: "#4f2000",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 30,
    zIndex: 1,
  },
  buttonsContainer: {
    zIndex: 1,
  },
});
