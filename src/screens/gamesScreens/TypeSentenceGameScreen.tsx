import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { TemporalEntity } from "models/TemporalEntity";
import { Token } from "models/Token";
import { useUser } from 'services/context/UserContext';
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import { splitText } from "utils/functions";

const colors = [
  "bg-yellow-300",
];

export interface Sentence {
  id: number;
  content: Token[];
  temporalEntities: TemporalEntity[];
  selectedType: string | null;
}

const TypeSentenceGameScreen = ({ }) => {
  const tw = useTailwind();
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temporalEntities, setTemporalEntities] = useState<TemporalEntity[]>([]);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const { updateUserStats } = useUser();
  const [startWordIndex, setStartWordIndex] = useState<number | null>(null);
  const [endWordIndex, setEndWordIndex] = useState<number | null>(null);

  function shuffleArray(array: any) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  useEffect(() => {
    // @ts-ignore
    const shuffledSentences = shuffleArray(data.sentences);
    setSentences(shuffledSentences.slice(0, 10).map((sentence) => {

      const words = splitText(sentence)
      return words;

    }));
  }, []);

  const onWordPress = (wordIndex: number, sentenceIndex: number) => {
    const newSentences = sentences.map((sentence, idx) => {
      if (idx === sentenceIndex) {
        const newWords = sentence.content.map((word: Token, idx: number) => {
          if (startWordIndex === null) { // Si c'est le premier clic
            if (idx === wordIndex) {
              return { ...word, isSelected: true, sentenceId: word.isSelected ? null : temporalEntities.length };
            }
          } else if (endWordIndex === null) { // Si c'est le deuxième clic
            if (idx >= Math.min(startWordIndex, wordIndex) && idx <= Math.max(startWordIndex, wordIndex)) {
              return { ...word, isSelected: true, sentenceId: word.isSelected ? null : temporalEntities.length };
            }
          } else { // Si on a déjà sélectionné une plage de mots
            if (idx === wordIndex) { // Si c'est le début d'une nouvelle sélection
              return { ...word, isSelected: true, sentenceId: null };
            } else { // Si c'est un mot précédemment sélectionné
              return { ...word, isSelected: false, sentenceId: null };
            }
          }
          return word;
        });
        return { ...sentence, content: newWords };
      }
      return sentence;
    });
    // @ts-ignore
    setSentences(newSentences);

    if (startWordIndex === null) {
      setStartWordIndex(wordIndex);
    } else if (endWordIndex === null) {
      setEndWordIndex(wordIndex);
    } else {
      setStartWordIndex(wordIndex);
      setEndWordIndex(null);
    }
  };


  const onButtonPress = (type: string) => {
    setSelectedButton(type);
    const newSentences = sentences.map((sentence, index) => {
      if (index === currentIndex) {
        if (type === 'none') {
          const newWords = sentence.content.map(word => {
            return { ...word, isSelected: false, sentenceId: null }; // Désélectionner tous les mots
          });
          return { ...sentence, content: newWords, selectedType: type };
        } else {
          return { ...sentence, selectedType: type };
        }
      }
      return sentence;
    });
    // @ts-ignore
    setSentences(newSentences);

    // Réinitialiser la sélection de mot
    if (type === 'none') {
      setStartWordIndex(null);
      setEndWordIndex(null);
    }
  };


  const sentenceHasSelectedWord = sentences[currentIndex]?.content.some(word => word.isSelected);

  const renderSentence = (sentence: Sentence, index: number) => {
    if (typeof sentence === "undefined") {
      return null;
    }
    return (
      <SafeAreaView style={tw("flex-1 bg-white")}>

        <View style={tw("flex-row justify-end items-center mb-4 mr-2")}>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg flex-row items-center ${selectedButton !== null && (sentenceHasSelectedWord || selectedButton === 'none') ? 'bg-blue-500' : 'bg-gray-300'}`)}
            onPress={onNextCard}
            disabled={selectedButton === null}
          >
            <Text style={tw('font-primary mr-2 text-white text-base')}>Phrase suivante</Text>
            <MaterialIcons name="navigate-next" size={28} color="white" />
          </TouchableOpacity>

        </View>

        <View
          style={[
            tw("bg-[#FFFEE0] rounded-xl justify-center mx-2 mt-4"),
            {
              minHeight: 150,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            },
          ]}
        >
          <View style={tw("flex-row flex-wrap mb-2 m-7")}>
            {sentence.content.map((word: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onWordPress(idx, index)}
                style={tw(
                  `m-0 p-[2px] ${word.isSelected ? colors[word.sentenceId % colors.length] : "bg-transparent"}`
                )}
              >
                <Text style={tw("text-2xl font-secondary")}>{word.text + " "}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const onNextCard = () => {
    const sentenceHasSelectedWord = sentences[currentIndex].content.some(word => word.isSelected);
    if (currentIndex < sentences.length - 1 && selectedButton !== null && (sentenceHasSelectedWord || selectedButton === 'none')) {
      setCurrentIndex(currentIndex + 1);
      setSelectedButton(null);
      setTemporalEntities([]);
      // updateUserStats(5, 1);
    }
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView contentContainerStyle={tw("")}>
        <CustomHeaderInGame title="Définir les types de phrases" />

        <View style={tw("flex-1 justify-center items-center")}>
          {renderSentence(sentences[currentIndex], currentIndex)}
        </View>

        <View style={tw("flex-row justify-around mt-4")}>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg border border-blue-500 ${selectedButton === 'hypothèse' ? 'bg-blue-500' : 'bg-white'}`)}
            onPress={() => onButtonPress('hypothèse')}
          >
            <Text style={tw(`${selectedButton === 'hypothèse' ? 'text-white' : 'text-blue-500'} font-primary text-lg`)}>Hypothèse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg border border-blue-500 ${selectedButton === 'condition' ? 'bg-blue-500' : 'bg-white'}`)}
            onPress={() => onButtonPress('condition')}
          >
            <Text style={tw(`${selectedButton === 'condition' ? 'text-white' : 'text-blue-500'} font-primary text-lg`)}>Condition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg border border-blue-500 ${selectedButton === 'négation' ? 'bg-blue-500' : 'bg-white'}`)}
            onPress={() => onButtonPress('négation')}
          >
            <Text style={tw(`${selectedButton === 'négation' ? 'text-white' : 'text-blue-500'} font-primary text-lg`)}>Négation</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg border border-blue-500 ${selectedButton === 'none' ? 'bg-blue-500' : 'bg-white'}`)}
            onPress={() => onButtonPress('none')}
          >
            <Text style={tw(`${selectedButton === 'none' ? 'text-white' : 'text-blue-500'} font-primary text-lg`)}>Aucun</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default TypeSentenceGameScreen;
