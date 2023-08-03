import React, { useCallback, useEffect, useRef, useState } from "react";
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
  const [isSelectionStarted, setSelectionStarted] = useState(false);
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

  const onWordPress = useCallback((wordIndex: number, textIndex: number) => {
    setTexts(texts => texts.map((text, idx) => {
      if (idx === textIndex) {
        const newWords = [...text.content];
        const word = newWords[wordIndex];
        word.isCurrentSelection = !word.isCurrentSelection;
        if (word.isCurrentSelection) {
          word.color = 'bg-blue-200';
          setSelectionStarted(true);
        } else {
          delete word.color;
          setSelectionStarted(false);
        }
        return { ...text, content: newWords };
      }
      return text;
    }));
  }, []);


  const addSentenceSpecification = () => {
    setSelectionStarted(false);
    const selectedWords = texts[currentIndex].content.filter(word => word.isCurrentSelection);
    selectedWords.forEach(word => {
      word.sentenceId = nextId;
      word.isSelected = true;
      word.isCurrentSelection = false;
      delete word.color;
    });

    const startPosition = selectedWords[0].position;
    const endPosition = selectedWords[selectedWords.length - 1].position;

    // @ts-ignore
    setUserSentenceSpecifications([...userSentenceSpecifications, {
      id: nextId,
      user_id: user?.id,
      text_id: texts[currentIndex].id,
      type: 2,
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

  const removeUserSentenceSpecification = useCallback((sentenceId: number) => {
    setUserSentenceSpecifications(userSentenceSpecifications.filter(sentenceSpecification => sentenceSpecification.id !== sentenceId));

    setTexts(texts => texts.map(text => {
      let newText = { ...text };
      newText.content = newText.content.map(word => {
        if (word.sentenceId === sentenceId) {
          return { ...word, isSelected: false, isCurrentSelection: false };
        }
        return word;
      });
      return newText;
    }));
  }, [userSentenceSpecifications, texts]);

  interface WordProps {
    word: Word;
    index: number;
    onWordPress: () => void;
  }

  const WordComponent = React.memo(({ word, index, onWordPress }: WordProps) => {
    const tw = useTailwind();
    return (
      <TouchableOpacity
        key={index}
        onPress={onWordPress}
        style={tw(
          `m-0 p-[2px] ${word.isCurrentSelection ? word.color : word.isSelected ? getSentenceColor(word.sentenceId) : "bg-transparent"}`
        )}
      >
        <Text style={tw("text-2xl font-secondary text-gray-800")}>{word.text}</Text>
      </TouchableOpacity>
    )
  })

  const renderText = (text: SplitText, index: number) => {
    if (typeof text === "undefined") {
      return null;
    }
    return (
      <SafeAreaView style={tw("flex-1 ")}>
        <View
          style={[
            tw("bg-[#FFFEE0] rounded-xl justify-center mx-2 mt-4"),
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
              <WordComponent
                key={idx}
                word={word}
                index={idx}
                onWordPress={() => onWordPress(idx, index)}
              />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  interface UserSentenceSpecificationProps {
    sentenceSpecification: UserSentenceSpecification;
    removeUserSentenceSpecification: (id: number) => void;
  }

  const UserSentenceSpecificationComponent = React.memo(({ sentenceSpecification, removeUserSentenceSpecification }: UserSentenceSpecificationProps) => {
    const tw = useTailwind();
    return (
      <View key={sentenceSpecification.id} style={tw(`flex-row items-center m-1 max-w-[400px]`)}>
        <View style={tw("flex-shrink")}>
          <Text style={tw(`text-lg mr-2 ${sentenceSpecification.color ? sentenceSpecification.color : ''} font-primary`)}>{sentenceSpecification.content}</Text>
        </View>
        <TouchableOpacity onPress={() => removeUserSentenceSpecification(sentenceSpecification.id)}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
      </View>
    )
  });

  interface UserSentenceSpecificationsProps {
    userSentenceSpecifications: UserSentenceSpecification[];
    removeUserSentenceSpecification: (id: number) => void;
  }

  const UserSentenceSpecifications = ({ userSentenceSpecifications, removeUserSentenceSpecification }: UserSentenceSpecificationsProps) => (
    <View style={tw("mx-4")}>
      {userSentenceSpecifications.map(sentenceSpecification =>
        <UserSentenceSpecificationComponent
          key={sentenceSpecification.id}
          sentenceSpecification={sentenceSpecification}
          removeUserSentenceSpecification={removeUserSentenceSpecification}
        />
      )}
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
    <ImageBackground source={require('images/bg_room_1.jpeg')} style={tw('flex-1')}>

      <SafeAreaView style={tw("flex-1 ")}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={tw("")}>
          <CustomHeaderInGame title="Trouver les négations" backgroundColor="bg-whiteTransparent" />

          <View style={tw("mb-2 flex-1 justify-center items-center")}>
            {renderText(texts[currentIndex], currentIndex)}
          </View>
          <UserSentenceSpecifications
            userSentenceSpecifications={userSentenceSpecifications}
            removeUserSentenceSpecification={removeUserSentenceSpecification}
          />
        </ScrollView>

        <View style={tw('absolute bottom-4 right-4 flex-col')}>
          {isSelectionStarted &&
            <TouchableOpacity
              style={tw(`pr-2 pl-2 rounded-lg mx-4 h-10 mb-1 bg-blue-500 flex-row items-center`)}
              onPress={addSentenceSpecification}
            >
              <MaterialIcons name="add" size={22} color="white" />
              <Text style={tw("text-white font-primary text-lg")}>Valider la sélection</Text>
            </TouchableOpacity>
          }

          <TouchableOpacity
            style={tw("bg-primary px-4 rounded-lg mx-4 h-10 my-1 flex-row items-center")}
            onPress={onNextCard}
          >
            <Text style={tw("text-white font-primary text-lg")}>Phrase suivante</Text>
            <View style={tw('bg-primaryLighter rounded-full h-6 w-6 flex items-center justify-center ml-2')}>
              <Text style={tw('text-white font-bold')}>{userSentenceSpecifications.length}</Text>
            </View>
          </TouchableOpacity>
        </View>


      </SafeAreaView>
    </ImageBackground>
  );

};

export default NegationGameScreen;
