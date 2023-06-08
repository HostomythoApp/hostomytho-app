import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTailwind } from "tailwind-rn";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { Word } from "models/Word";
import { useUser } from 'services/context/UserContext';
import { getAllTexts } from "services/api/texts";
import shuffleArray from "utils/functions";

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-blue-300",
  "bg-indigo-300",
  "bg-pink-300",
];

export interface SplitText {
  id: number;
  content: Word[];
  selectedType: string | null;
}

// export interface Sentence {
//   id: number;
//   content: Word[];
//   temporalEntities: UserSentenceSpecification[];
// }

const HypothesisGameScreen = ({ }) => {
  const tw = useTailwind();
  const [texts, setTexts] = useState<SplitText[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [temporalEntities, setUserSentenceSpecifications] = useState<UserSentenceSpecification[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const { incrementPoints } = useUser();
  const [startWordIndex, setStartWordIndex] = useState<number | null>(null); // Nouvel état pour le début de la sélection
  const [endWordIndex, setEndWordIndex] = useState<number | null>(null); // Nouvel état pour la fin de la sélection
  const [wordsSelected, setWordsSelected] = useState(false);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await getAllTexts();
        const shuffledTexts = shuffleArray(response);
        const newtexts = shuffledTexts.slice(0, 10).map((text) => {
          const words = text.content.split(' ').map((word: string) => {
            // Ajouter un marqueur de fin de ligne à chaque saut de ligne
            if (word.includes("\n")) {
              return [
                { text: word.replace("\n", ""), isSelected: false, entityId: null },
                { text: "<EOL>", isSelected: false, entityId: null } // Marqueur de fin de ligne
              ];
            } else {
              return { text: word, isSelected: false, entityId: null };
            }
          }).flat();
          return { ...text, content: words };
        });

        setTexts(newtexts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTexts();
  }, []);

  const onWordPress = (wordIndex: number, textIndex: number) => {
    const newTexts = texts.map((text, idx) => {
      if (idx === textIndex) {
        const newWords = text.content.map((word: Word, idx: number) => {
          if (startWordIndex === null) { // Si c'est le premier clic
            if (idx === wordIndex) {
              return { ...word, isSelected: true, entityId: word.isSelected ? null : temporalEntities.length };
            }
          } else if (startWordIndex !== null && endWordIndex === null) { // Si c'est le deuxième clic
            if (idx >= Math.min(startWordIndex, wordIndex) && idx <= Math.max(startWordIndex, wordIndex)) {
              return { ...word, isSelected: true, entityId: word.isSelected ? null : temporalEntities.length };
            }
          } else { // Si on a déjà sélectionné une plage de mots
            if (idx === wordIndex) { // Si c'est le début d'une nouvelle sélection
              return { ...word, isSelected: true, entityId: null };
            } else { // Si c'est un mot précédemment sélectionné
              return { ...word, isSelected: false, entityId: null };
            }
          }
          return word;
        });

        // Réinitialiser les indices de début et de fin lorsqu'un mot est sélectionné après une plage de mots
        if (startWordIndex !== null && endWordIndex !== null) {
          setStartWordIndex(wordIndex);
          setEndWordIndex(null);
        } else if (startWordIndex !== null && endWordIndex === null) { // Après le deuxième clic
          setEndWordIndex(wordIndex);
        } else { // Après le premier clic
          setStartWordIndex(wordIndex);
        }

        return { ...text, content: newWords };
      }
      return text;
    });
    setTexts(newTexts);
    setWordsSelected(true);
  };

  const addSentenceSpecification = () => {
    const selectedWords = texts[currentIndex].content.filter(word => word.isSelected && word.entityId === temporalEntities.length);
    const entityText = selectedWords.map(word => word.text).join(' ');

    if (entityText) {
      // @ts-ignore
      setUserSentenceSpecifications([...temporalEntities, { id: temporalEntities.length, content: entityText }]);
      setColorIndex((colorIndex + 1) % colors.length);
    }
  };

  const removeUserSentenceSpecification = (entityId: number) => {
    setUserSentenceSpecifications(temporalEntities.filter(entity => entity.id !== entityId));

    const newTexts = texts.map(text => {
      const newWords = text.content.map(word => {
        if (word.entityId === entityId) {
          return { ...word, isSelected: false, entityId: null };
        }
        return word;
      });
      return { ...text, content: newWords };
    });

    setTexts(newTexts);
  };

  const renderText = (text: SplitText, index: number) => {
    if (typeof text === "undefined") {
      return null;
    }
    return (
      <SafeAreaView style={tw("flex-1 bg-white")}>

        <View style={tw("flex-row justify-end items-center mb-4 mr-2")}>
          <TouchableOpacity
            style={tw("bg-blue-500 py-2 px-4 rounded-lg flex-row items-center")}
            onPress={onNextCard}
          >
            <Text style={tw('font-primary mr-2 text-white text-base')}>Text suivant</Text>
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
            {text.content.map((word: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onWordPress(idx, index)}
                style={tw(
                  `m-1 ${word.isSelected ? colors[word.entityId % colors.length] : "bg-transparent"}`
                )}
              >
                <Text style={
                  tw("text-2xl font-HandleeRegular")}
                >{word.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderUserSentenceSpecification = (entity: any) => (
    <View key={entity.id} style={tw(`flex-row items-center m-1 `)}>
      <Text style={tw(`text-lg mr-2 ${colors[entity.id % colors.length]} font-primary`)}>{entity.content}</Text>
      <TouchableOpacity onPress={() => removeUserSentenceSpecification(entity.id)}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const onNextCard = () => {
    if (currentIndex < texts.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserSentenceSpecifications([]); // Réinitialiser le récapitulatif des entités
      incrementPoints(5);
    }
  };

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      <ScrollView contentContainerStyle={tw("")}>

        <View style={tw("flex-1 justify-center items-center")}>
          {renderText(texts[currentIndex], currentIndex)}
        </View>
        <View style={tw("flex-row mb-4 mt-8 justify-center")}>
          <View style={tw("mx-4")}>
            {temporalEntities.map(entity => renderUserSentenceSpecification(entity))}
          </View>
          <TouchableOpacity
            style={tw("bg-blue-500 px-4 rounded-lg mx-4 h-10")}
            onPress={addSentenceSpecification}
          >
            <View style={tw("py-2")}>
              <Text style={tw("text-white font-primary text-lg")}>Nouvelle hypothèse</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HypothesisGameScreen;
