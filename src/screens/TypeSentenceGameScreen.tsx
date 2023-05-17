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
import { Word } from "models/Word";
import { useUser } from 'services/auth/UserContext';

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-indigo-300",
  "bg-pink-300",
];

export interface Sentence {
  id: number;
  content: Word[];
  temporalEntities: TemporalEntity[];
  selectedType: string | null;
}

const TypeSentenceGameScreen = ({ }) => {
  const tw = useTailwind();
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temporalEntities, setTemporalEntities] = useState<TemporalEntity[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const { incrementPoints } = useUser();
  const [startWordIndex, setStartWordIndex] = useState<number | null>(null); // Nouvel état pour le début de la sélection
  const [endWordIndex, setEndWordIndex] = useState<number | null>(null); // Nouvel état pour la fin de la sélection

  function shuffleArray(array: any) {
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
      const words = sentence.content.split(' ').map((word: Word) => ({ text: word, isSelected: false, entityId: null }));
      return { ...sentence, content: words };
    }));
  }, []);

  const onWordPress = (wordIndex: number, sentenceIndex: number) => {
    // TODO changer couleur au premier clic et surligner les espaces
    const newSentences = sentences.map((sentence, idx) => {
      if (idx === sentenceIndex) {
        const newWords = sentence.content.map((word: Word, idx: number) => {
          if (startWordIndex === null) { // Si c'est le premier clic
            if (idx === wordIndex) {
              return { ...word, isSelected: true, entityId: word.isSelected ? null : temporalEntities.length };
            }
          } else if (endWordIndex === null) { // Si c'est le deuxième clic
            if (idx >= Math.min(startWordIndex, wordIndex) && idx <= Math.max(startWordIndex, wordIndex)) {
              return { ...word, isSelected: !word.isSelected, entityId: word.isSelected ? null : temporalEntities.length };
            }
          } else { // Si on a déjà sélectionné une plage de mots
            if (word.isSelected) { // Si le mot est sélectionné, le dé-sélectionner
              return { ...word, isSelected: false, entityId: null };
            }
          }
          return word;
        });
        return { ...sentence, content: newWords };
      }
      return sentence;
    });

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
        return { ...sentence, selectedType: type };
      }
      return sentence;
    });
    setSentences(newSentences);
  }

  const addTemporalEntity = () => {
    const selectedWords = sentences[currentIndex].content.filter(word => word.isSelected && word.entityId === temporalEntities.length);
    const entityText = selectedWords.map(word => word.text).join(' ');

    if (entityText) {
      // @ts-ignore
      setTemporalEntities([...temporalEntities, { id: temporalEntities.length, content: entityText }]);
      setColorIndex((colorIndex + 1) % colors.length);
    }
  };

  const removeTemporalEntity = (entityId: number) => {
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

  const renderSentence = (sentence: Sentence, index: number) => {
    if (typeof sentence === "undefined") {
      return null;
    }
    return (
      <SafeAreaView style={tw("flex-1 bg-white")}>

        <View style={tw("flex-row justify-end items-center mb-4 mr-2")}>
          <TouchableOpacity
            style={tw("bg-blue-500 py-2 px-4 rounded-lg flex-row items-center")}
            onPress={onNextCard}
          >
            <Text style={tw('font-primary mr-2 text-white text-base')}>Phrase suivante</Text>
            <MaterialIcons name="navigate-next" size={28} color="white" />
          </TouchableOpacity>
        </View>

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
            {sentence.content.map((word: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onWordPress(idx, index)}
                style={tw(
                  `m-1 ${word.isSelected ? colors[word.entityId % colors.length] : "bg-transparent"}`
                )}
              >
                <Text style={tw("text-2xl font-HandleeRegular")}>{word.text + " "}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderTemporalEntity = (entity: any) => (
    <View key={entity.id} style={tw(`flex-row items-center m-1 `)}>
      <Text style={tw(`text-lg mr-2 ${colors[entity.id % colors.length]} font-primary`)}>{entity.content}</Text>
      <TouchableOpacity onPress={() => removeTemporalEntity(entity.id)}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const onNextCard = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTemporalEntities([]);
      incrementPoints(5);
    }
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView contentContainerStyle={tw("")}>

        <View style={tw("flex-1 justify-center items-center")}>
          {renderSentence(sentences[currentIndex], currentIndex)}
        </View>

        <View style={tw("flex-row justify-around mt-4")}>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg ${selectedButton === 'hypothèse' ? 'bg-blue-500' : 'bg-blue-300'}`)}
            onPress={() => onButtonPress('hypothèse')}
          >
            <Text style={tw("text-white font-primary text-lg")}>Hypothèse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg ${selectedButton === 'condition' ? 'bg-blue-500' : 'bg-blue-300'}`)}
            onPress={() => onButtonPress('condition')}
          >
            <Text style={tw("text-white font-primary text-lg")}>Condition</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw(`py-2 px-4 rounded-lg ${selectedButton === 'négation' ? 'bg-blue-500' : 'bg-blue-300'}`)}
            onPress={() => onButtonPress('négation')}
          >
            <Text style={tw("text-white font-primary text-lg")}>Négation</Text>
          </TouchableOpacity>
        </View>

        <View style={tw("flex-row mb-4 mt-8 justify-center")}>
          <View style={tw("mx-4")}>
            {temporalEntities.map(entity => renderTemporalEntity(entity))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TypeSentenceGameScreen;
