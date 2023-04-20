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

const TemporalEntityScreen = ({ }) => {
  const tw = useTailwind();
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      const words = sentence.content.split(' ').map((word) => ({ text: word, isSelected: false }));
      return { ...sentence, content: words };
    }));
  }, []);

  const onWordPress = (wordIndex, sentenceIndex) => {
    const newSentences = sentences.map((sentence, idx) => {
      if (idx === sentenceIndex) {
        const newWords = sentence.content.map((word, idx) => {
          if (idx === wordIndex) {
            return { ...word, isSelected: !word.isSelected };
          }
          return word;
        });
        return { ...sentence, content: newWords };
      }
      return sentence;
    });

    setSentences(newSentences);
  };

  const renderSentence = (sentence, index) => {
    if (!sentence) return null;

    return (
      <View
        style={[
          tw("bg-[#FFFEE0] rounded-xl justify-center"),
          {
            minHeight: 400,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
        ]}
      >
        <View style={tw("flex-row flex-wrap")}>
          {sentence.content.map((word, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => onWordPress(idx, index)}
              style={tw(
                `m-1 ${word.isSelected ? "bg-yellow-300" : "bg-transparent"}`
              )}
            >
              <Text>{word.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  const onNextCard = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <View style={tw("flex-1 justify-center items-center")}>
        {renderSentence(sentences[currentIndex], currentIndex)}
      </View>
      <TouchableOpacity
        style={tw("bg-blue-500 py-2 px-4 rounded-lg self-center mb-4")}
        onPress={onNextCard}
      >
        <Text style={tw("text-white")}>Carte suivante</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TemporalEntityScreen;
