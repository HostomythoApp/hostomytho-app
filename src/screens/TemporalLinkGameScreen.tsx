import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const TemporalLinkGameScreen = ({ }) => {
  const tw = useTailwind();
  const [sentence, setSentence] = useState();
  const [entities, setEntities] = useState([]);
  const [temporalLinks, setTemporalLinks] = useState([]);

  useEffect(() => {
    setEntities(data.sentences[1].temporalEntities);
    setSentence(data.sentences[1].content);
    setTemporalLinks(data.temporalLinks);
    console.log(sentence);
    console.log(entities);
    console.log(temporalLinks);
  });

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
    </SafeAreaView>
  );
};

export default TemporalLinkGameScreen;