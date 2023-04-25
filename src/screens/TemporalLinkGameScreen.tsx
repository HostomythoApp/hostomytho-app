import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import FunctionButton from "components/FunctionButton";

const TemporalLinkGameScreen = () => {
  const tw = useTailwind();
  const [sentence, setSentence] = useState("");
  const [entities, setEntities] = useState([]);
  const [temporalLinks, setTemporalLinks] = useState([]);

  useEffect(() => {
    setEntities(data.sentences[1].temporalEntities);
    setSentence(data.sentences[1].content);
    setTemporalLinks(data.temporalLinks);
  });

  const nextSentence = () => {
    console.log("nextSentence");
  };

  return (
    <View style={tw("flex-1 bg-white p-4")}>
      <View style={tw("flex-row justify-end mb-2")}>
        <FunctionButton text={"Phrase suivante"} func={nextSentence} />
      </View>
      <View style={tw("m-4 p-2 bg-gray-100 rounded ")}>
        <Text style={tw("text-lg italic px-5")}>{sentence}</Text>
      </View>
      <View style={tw("flex-row flex-wrap justify-center")}>
        {entities.map((entity, index) => (
          <TouchableOpacity
            key={index}
            style={[tw("m-2 p-2 py-4 bg-yellow-300"), myStyles.postIt]}
          >
            <Text style={tw("text-2xl font-HandleeRegular")}>{entity.content}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={tw("flex-row flex-wrap justify-center")}>
        {temporalLinks.map((link, index) => (
          <TouchableOpacity
            key={index}
            style={[tw("m-2 p-2 py-2 bg-blue-300"), myStyles.postIt]}
          >
            <Text style={tw("text-2xl font-HandleeRegular")}>{link.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const myStyles = StyleSheet.create({
  postIt: {
    shadowColor: "#212121",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default TemporalLinkGameScreen;
