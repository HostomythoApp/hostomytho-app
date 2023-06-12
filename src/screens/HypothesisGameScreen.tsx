import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
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

const HypothesisGameScreen = ({ }) => {
  const tw = useTailwind();
  const [texts, setTexts] = useState<SplitText[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSentenceSpecifications, setUserSentenceSpecifications] = useState<UserSentenceSpecification[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const { incrementPoints } = useUser();
  const [startWordIndex, setStartWordIndex] = useState<number | null>(null);

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
                { text: word.replace("\n", ""), isSelected: false, sentenceId: null },
                { text: "<EOL>", isSelected: false, sentenceId: null } // Marqueur de fin de ligne
              ];
            } else {
              return { text: word, isSelected: false, sentenceId: null };
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
          // Si l'index de départ n'a pas encore été défini
          if (startWordIndex === null) {
            // Si l'index du mot cliqué est l'index de départ
            if (idx === wordIndex) {
              setStartWordIndex(wordIndex);
              // Ne pas changer le statut de sélection ou l'ID de la phrase pour le premier mot cliqué
              return word;
            }
          } else {
            // Si un index de départ a été défini, sélectionnez tous les mots entre l'index de départ et l'index du mot cliqué
            if ((idx >= startWordIndex && idx <= wordIndex) || (idx <= startWordIndex && idx >= wordIndex)) {
              return { ...word, isSelected: true, sentenceId: word.isSelected ? null : userSentenceSpecifications.length };
            }
          }
          return word;
        });
        // Réinitialisez l'index de départ à null seulement si un deuxième mot a été cliqué
        if (startWordIndex !== null && startWordIndex !== wordIndex) {
          setStartWordIndex(null);
        }
        return { ...text, content: newWords };
      }
      return text;
    });

    setTexts(newTexts);
};


  const addSentenceSpecification = () => {
    const selectedWords = texts[currentIndex].content.filter(word => word.isSelected && word.sentenceId === userSentenceSpecifications.length);
    const sentenceSpecification = selectedWords.map(word => word.text).join(' ');

    if (sentenceSpecification) {
      // @ts-ignore
      setUserSentenceSpecifications([...userSentenceSpecifications, { id: userSentenceSpecifications.length, content: sentenceSpecification }]);
      setColorIndex((colorIndex + 1) % colors.length);
    }
  };

  const removeUserSentenceSpecification = (sentenceId: number) => {
    setUserSentenceSpecifications(userSentenceSpecifications.filter(sentenceSpecification => sentenceSpecification.id !== sentenceId));

    const newTexts = texts.map(text => {
      const newWords = text.content.map(word => {
        if (word.sentenceId === sentenceId) {
          return { ...word, isSelected: false, sentenceId: null };
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
                  `m-1 ${word.isSelected ? colors[word.sentenceId % colors.length] : "bg-transparent"}`
                )}
              >
                <Text style={tw("text-2xl font-HandleeRegular")}>{word.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </SafeAreaView>
    );
  };

  const renderUserSentenceSpecification = (sentenceSpecification: any) => (
    <View key={sentenceSpecification.id} style={tw(`flex-row items-center m-1 `)}>
      <Text style={tw(`text-lg mr-2 ${colors[sentenceSpecification.id % colors.length]} font-primary`)}>{sentenceSpecification.content}</Text>
      <TouchableOpacity onPress={() => removeUserSentenceSpecification(sentenceSpecification.id)}>
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
            {userSentenceSpecifications.map(sentenceSpecification => renderUserSentenceSpecification(sentenceSpecification))}
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
