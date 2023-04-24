import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';

const TemporalLinkGameScreen = ({ }) => {
  const tw = useTailwind();
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    setEntities(data.sentences[1].temporalEntities);
    console.log(entities);
    

  });

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
    </SafeAreaView>
  );
};

export default TemporalLinkGameScreen;
