import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { Word } from "models/Word";
import { useUser } from 'services/context/UserContext';
import { getAllTexts } from "services/api/texts";
import { shuffleArray, splitText } from "utils/functions";
import { createUserSentenceSpecification } from 'services/api/userSentenceSpecifications';
import CustomHeaderInGame from "components/header/CustomHeaderInGame";

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

const NegationGameScreen = ({ }) => {
  const tw = useTailwind();
  const [texts, setTexts] = useState<SplitText[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSentenceSpecifications, setUserSentenceSpecifications] = useState<UserSentenceSpecification[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const { incrementPoints } = useUser();
  const [startWordIndex, setStartWordIndex] = useState<number | null>(null);
  // const [selectionFinished, setSelectionFinished] = useState(false);
  const [nextId, setNextId] = useState(0);
  const { user } = useUser();
  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    const fetchTexts = async () => {
      try {
        const response = await getAllTexts();
        const shuffledTexts = shuffleArray(response);
        const newtexts = shuffledTexts.map((text) => {
          return splitText(text);
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
              // Cancel the previous selection if not added
              const wordsToDeselect = text.content.filter(w => w.isCurrentSelection && w.sentenceId === userSentenceSpecifications.length);
              wordsToDeselect.forEach(w => {
                w.isCurrentSelection = false;
                w.isSelected = false;  // Also reset isSelected
              });
              // Begin the new selection
              setStartWordIndex(wordIndex);
              return { ...word, isCurrentSelection: true, sentenceId: userSentenceSpecifications.length, color: colors[colorIndex] };
            }
          } else {
            // Si un index de départ a été défini, sélectionnez tous les mots entre l'index de départ et l'index du mot cliqué
            if ((idx >= startWordIndex && idx <= wordIndex) || (idx <= startWordIndex && idx >= wordIndex)) {
              // Réinitialisez l'index de départ à null seulement si un deuxième mot a été cliqué
              if (startWordIndex !== null && startWordIndex !== wordIndex) {
                setStartWordIndex(null);
              }
              const isSelected = (idx >= startWordIndex && idx <= wordIndex) || (idx <= startWordIndex && idx >= wordIndex);
              return { ...word, isSelected, isCurrentSelection: isSelected, sentenceId: userSentenceSpecifications.length, color: colors[colorIndex] };
            }
          }
          return word;
        });
        return { ...text, content: newWords };
      }
      return text;
    });
    setTexts(newTexts);
  };


  const addSentenceSpecification = () => {
    const selectedWords = texts[currentIndex].content.filter(word => word.isCurrentSelection);
    selectedWords.forEach(word => {
      word.sentenceId = nextId;
      word.isSelected = true;
      word.isCurrentSelection = false;
      delete word.color; // Remove the temporary color from the word
    });

    const startPosition = selectedWords[0].position;
    const endPosition = selectedWords[selectedWords.length - 1].position;

    // @ts-ignore
    setUserSentenceSpecifications([...userSentenceSpecifications, {
      id: nextId,
      user_id: user?.id,
      text_id: texts[currentIndex].id,
      type: 1,
      content: selectedWords.map(word => word.text).join(' '),
      startPosition: startPosition,
      endPosition: endPosition,
      color: colors[colorIndex]
    }]);

    setNextId(nextId + 1);
    setColorIndex((colorIndex + 1) % colors.length);
  };


  const getSentenceColor = (sentenceId: number | null) => {
    if (sentenceId === null) {
      return "bg-transparent";
    }

    const sentence = userSentenceSpecifications.find(spec => spec.id === sentenceId);
    return sentence ? sentence.color : "bg-transparent";
  };

  const removeUserSentenceSpecification = (sentenceId: number) => {
    setUserSentenceSpecifications(userSentenceSpecifications.filter(sentenceSpecification => sentenceSpecification.id !== sentenceId));

    const newTexts = texts.map(text => {
      const newWords = text.content.map(word => {
        if (word.sentenceId === sentenceId) {
          return { ...word, isSelected: false, isCurrentSelection: false };
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
      <SafeAreaView style={tw("flex-1 ")}>

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
                  `m-0 p-[2px] ${word.isCurrentSelection ? word.color : word.isSelected ? getSentenceColor(word.sentenceId) : "bg-transparent"}`
                )}

              >
                <Text style={tw("text-2xl font-secondary text-gray-800")}>{word.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </SafeAreaView>
    );
  };

  const renderUserSentenceSpecification = (sentenceSpecification: any) => (
    <View key={sentenceSpecification.id} style={tw(`flex-row items-center m-1 max-w-[400px]`)}>
      <View style={tw("flex-shrink")}>
        <Text style={tw(`text-lg mr-2 ${sentenceSpecification.color ? sentenceSpecification.color : ''} font-primary`)}>{sentenceSpecification.content}</Text>
      </View>
      <TouchableOpacity onPress={() => removeUserSentenceSpecification(sentenceSpecification.id)}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );


  const onNextCard = async () => {
    if (currentIndex < texts.length - 1) {
      for (let userSentenceSpecification of userSentenceSpecifications) {
        const { id, ...rest } = userSentenceSpecification;
        await createUserSentenceSpecification(rest);
      }
      setCurrentIndex(currentIndex + 1);
      setUserSentenceSpecifications([]); // Réinitialiser le récapitulatif des entités
      incrementPoints(5);
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  };


  return (
    <ImageBackground source={require('images/Hospital_Room.jpeg')} style={tw('flex-1')}>

      <SafeAreaView style={tw("flex-1 ")}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={tw("")}>
          <CustomHeaderInGame title="Trouver les négations" backgroundColor="bg-transparent" textColor="white" />

          <View style={tw("flex-1 justify-center items-center")}>
            {renderText(texts[currentIndex], currentIndex)}
          </View>
          <View style={tw("flex-row mb-4 mt-8 justify-center")}>
            <View style={tw("mx-4")}>
              {userSentenceSpecifications.map(sentenceSpecification => renderUserSentenceSpecification(sentenceSpecification))}
            </View>
            <View style={tw(' flex')}
            >
              <TouchableOpacity
                style={tw("bg-blue-500 px-4 rounded-lg mx-4 h-10 mb-1")}
                onPress={addSentenceSpecification}
              >
                <View style={tw("py-2 text-center")}>
                  <Text style={tw("text-white font-primary text-lg")}>Nouvelle négation</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw("bg-primary px-4 rounded-lg mx-4 h-10 my-1")}
                onPress={onNextCard}
              >
                <View style={tw("py-2 text-center")}>
                  <Text style={tw("text-white font-primary text-lg")}>Phrase suivante</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>

  );
};

export default NegationGameScreen;
