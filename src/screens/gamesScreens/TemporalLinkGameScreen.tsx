import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import FunctionButton from "components/FunctionButton";
import { TemporalEntity } from "models/TemporalEntity";
import { TemporalLink } from "models/TemporalLink";
import { useUser } from 'services/context/UserContext';
import CustomHeaderInGame from "components/header/CustomHeaderInGame";

const TemporalLinkGameScreen = () => {
  const tw = useTailwind();
  const [sentence, setSentence] = useState("");
  const [entities, setEntities] = useState<TemporalEntity[]>([]);
  const [temporalLinks, setTemporalLinks] = useState<TemporalLink[]>([]);
  const sortedEntities = entities.sort((a, b) => a.startIndex - b.startIndex);
  const [entitiesWithColors, setEntitiesWithColors] = useState<(TemporalEntity & { color: string })[]>([]);
  const upperEntities = entitiesWithColors.slice(0, Math.ceil(entitiesWithColors.length / 2));
  const lowerEntities = entitiesWithColors.slice(Math.ceil(entitiesWithColors.length / 2));
  const { incrementPoints } = useUser();

  useEffect(() => {
    const entitiesWithAssignedColors = data.sentences[3].temporalEntities.map((entity, index) => ({
      ...entity,
      color: colors[index % colors.length],
    }));

    setEntities(data.sentences[3].temporalEntities);
    setSentence(data.sentences[3].content);
    setTemporalLinks(data.temporalLinks);
  });

  useEffect(() => {
    const entitiesWithAssignedColors = entities.map((entity, index) => ({
      ...entity,
      color: colors[index % colors.length],
    }));

    setEntitiesWithColors(entitiesWithAssignedColors);
  }, [entities]);


  const nextSentence = () => {
    incrementPoints(10);
  };

  const colors = [
    "bg-[#87CEFA]", // Jaune pastel
    "bg-[#FFB6B9]", // Rose pastel
    "bg-[#A2D9D3]", // Vert pastel
    "bg-[#C3B1E1]", // Violet pastel
    "bg-[#F5D5BA]", // Beige pastel
  ];


  const splitSentenceIntoSegments = (
    sentence: string,
    entities: { startIndex: number; endIndex: number }[]
  ) => {
    const segments: { text: string; isEntity: boolean; entityIndex?: number }[] = [];
    let currentIndex = 0;

    entities.forEach((entity, index) => {
      const entityIndex = entity.startIndex;

      if (entityIndex !== -1) {
        const nonEntityText = sentence.slice(currentIndex, entityIndex);
        if (nonEntityText) {
          segments.push({ text: nonEntityText, isEntity: false });
        }

        const entityText = sentence.slice(entity.startIndex, entity.endIndex);
        segments.push({ text: entityText, isEntity: true, entityIndex: index });
        currentIndex = entity.endIndex;
      }
    });

    if (currentIndex < sentence.length) {
      segments.push({
        text: sentence.slice(currentIndex),
        isEntity: false,
      });
    }

    return segments;
  };

  const sentenceSegments = splitSentenceIntoSegments(sentence, sortedEntities);

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView contentContainerStyle={tw("")}>
        <CustomHeaderInGame title="Définir les liens temporels" />


        <View style={tw("m-4 p-2 bg-gray-100 rounded flex-row flex-wrap mb-6")}>
          {sentenceSegments.map((segment, index) => (
            <Text
              key={index}
              style={[
                tw("text-lg italic"),
                segment.isEntity &&
                  segment.entityIndex !== undefined &&
                  entitiesWithColors[segment.entityIndex]
                  ? tw(
                    `${entitiesWithColors[segment.entityIndex].color} px-1 py-0.5 rounded`
                  )
                  : {},
              ]}
            >
              {segment.text}
            </Text>
          ))}
        </View>

        <View style={tw("flex-row flex-wrap justify-center mb-12")}>
          {upperEntities.map((entity, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw(`m-2 p-2 py-4 ${entity.color}`),
                myStyles.postIt,
              ]}
            >
              <Text style={tw("text-2xl font-secondary")}>
                {sentence.slice(entity.startIndex, entity.endIndex)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={tw("flex-row flex-wrap justify-center")}>
          {temporalLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={[tw("m-2 p-2 py-2 bg-[#FFE680]"), myStyles.postIt]}
            >
              <Text style={tw("text-2xl font-secondary")}>{link.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={tw("flex-row flex-wrap justify-center mt-12")}>
          {lowerEntities.map((entity, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw(`m-2 p-2 py-4 ${entity.color}`),
                myStyles.postIt,
              ]}
            >
              <Text style={tw("text-2xl font-secondary")}>
                {sentence.slice(entity.startIndex, entity.endIndex)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={tw("flex-row justify-end mb-2 mt-8")}>
          <FunctionButton text={"Phrase suivante"} func={nextSentence} />
        </View>
      </ScrollView>
    </SafeAreaView>
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


