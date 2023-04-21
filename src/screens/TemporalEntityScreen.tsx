import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import Icon from "react-native-vector-icons/FontAwesome";

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-indigo-300",
  "bg-pink-300",
];

const TemporalEntityScreen = ({ }) => {
  const tw = useTailwind();
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temporalEntities, setTemporalEntities] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);

  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  useEffect(() => {
    const shuffledSentences = shuffleArray(data.sentences);
    setSentences(shuffledSentences.slice(0, 10).map((sentence) => {
      const words = sentence.content.split(' ').map((word) => ({ text: word, isSelected: false, entityId: null }));
      return { ...sentence, content: words };
    }));
  }, []);

  const onWordPress = (wordIndex, sentenceIndex) => {
    const newSentences = sentences.map((sentence, idx) => {
      if (idx === sentenceIndex) {
        const newWords = sentence.content.map((word, idx) => {
          if (idx === wordIndex) {
            return { ...word, isSelected: !word.isSelected, entityId: word.isSelected ? null : temporalEntities.length };
          }
          return word;
        });
        return { ...sentence, content: newWords };
      }
      return sentence;
    });

    setSentences(newSentences);
  };

  const addTemporalEntity = () => {
    const selectedWords = sentences[currentIndex].content.filter(word => word.isSelected && word.entityId === temporalEntities.length);
    const entityText = selectedWords.map(word => word.text).join(' ');

    if (entityText) {
      setTemporalEntities([...temporalEntities, { id: temporalEntities.length, text: entityText }]);
      setColorIndex((colorIndex + 1) % colors.length);
    }
  };

  const removeTemporalEntity = (entityId) => {
    setTemporalEntities(temporalEntities.filter(entity => entity.id !== entityId));

    const newSentences = sentences.map(sentence => {
      const newWords = sentence.content.map(word => {
        if (word.entityId === entityId) {
          return { ...word, isSelected: false, entityId: null };
        }
        return word;
      });
      return { ...sentence, content: newWords };
    });

    setSentences(newSentences);
  };

  const renderSentence = (sentence, index) => {
    if (typeof sentence === "undefined") {
      return null;
    }
    return (
      <View
        style={[
          tw("bg-[#FFFEE0] rounded-xl justify-center mx-2"),
          {
            minHeight: 300,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
      >
        <View style={tw("flex-row flex-wrap mb-2 m-7")}>
          {sentence.content.map((word, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => onWordPress(idx, index)}
              style={tw(
                `m-1 ${word.isSelected ? colors[word.entityId % colors.length] : "bg-transparent"}`
              )}
            >
              <Text style={[
                tw("text-2xl"),
                {
                  fontFamily: "HandleeRegular",
                },
              ]}

              >{word.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const renderTemporalEntity = (entity) => (
    <View key={entity.id} style={tw("flex-row items-center")}>
      <Text style={tw("mr-2")}>{entity.text}</Text>
      <TouchableOpacity onPress={() => removeTemporalEntity(entity.id)}>
        <Text style={tw("text-red-500")}>×</Text>
      </TouchableOpacity>
    </View>
  );

  const onNextCard = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTemporalEntities([]); // Réinitialiser le récapitulatif des entités
    }
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("flex-1 justify-center items-center")}>
        {renderSentence(sentences[currentIndex], currentIndex)}
      </View>
      <View style={tw("mb-4")}>
        {temporalEntities.map(entity => renderTemporalEntity(entity))}
      </View>
      <View style={tw("flex-row justify-between items-center mb-4 mx-2")}>
        <TouchableOpacity
          style={tw("bg-blue-500 py-2 px-4 rounded-lg")}
          onPress={addTemporalEntity}
        >
          <Text style={tw("text-white")}>Nouvelle entité</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw("bg-blue-500 py-2 px-4 rounded-lg")}
          onPress={onNextCard}
        >
          <Icon name="arrow-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TemporalEntityScreen;
