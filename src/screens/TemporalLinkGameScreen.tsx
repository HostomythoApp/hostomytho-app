import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import FunctionButton from "components/FunctionButton";
import { TemporalEntity } from "models/TemporalEntity";
import { TemporalLink } from "models/TemporalLink";

const TemporalLinkGameScreen = () => {
  const tw = useTailwind();
  const [sentence, setSentence] = useState("");
  const [entities, setEntities] = useState<TemporalEntity[]>([]);
  const [temporalLinks, setTemporalLinks] = useState<TemporalLink[]>([]);
  const upperEntities = entities.slice(0, Math.ceil(entities.length / 2));
  const lowerEntities = entities.slice(Math.ceil(entities.length / 2));
  const sortedEntities = entities.sort((a, b) => a.startIndex - b.startIndex);

  useEffect(() => {
    setEntities(data.sentences[3].temporalEntities);
    setSentence(data.sentences[3].content);
    setTemporalLinks(data.temporalLinks);
    console.log(lowerEntities);

  });

  const nextSentence = () => {
    console.log("nextSentence");
  };

  const colors = [
    "bg-yellow-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-indigo-300",
    "bg-pink-300",
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
    <View style={tw("flex-1 bg-white p-4")}>
      <View style={tw("flex-row justify-end mb-2")}>
        <FunctionButton text={"Phrase suivante"} func={nextSentence} />
      </View>

      <View style={tw("m-4 p-2 bg-gray-100 rounded flex-row flex-wrap mb-6")}>
        {sentenceSegments.map((segment, index) => (
          <Text
            key={index}
            style={[
              tw("text-lg italic"),
              segment.isEntity
                ? tw(
                  `${colors[index % colors.length]} px-1 py-0.5 rounded`
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
            style={[tw("m-2 p-2 py-4 bg-yellow-300"), myStyles.postIt]}
          >
            <Text style={tw("text-2xl font-HandleeRegular")}>
              {sentence.slice(entity.startIndex, entity.endIndex)}
            </Text>
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

      <View style={tw("flex-row flex-wrap justify-center mt-12")}>
        {lowerEntities.map((entity, index) => (
          <TouchableOpacity
            key={index}
            style={[tw("m-2 p-2 py-4 bg-yellow-300"), myStyles.postIt]}
          >
            <Text style={tw("text-2xl font-HandleeRegular")}>
              {sentence.slice(entity.startIndex, entity.endIndex)}
            </Text>
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


