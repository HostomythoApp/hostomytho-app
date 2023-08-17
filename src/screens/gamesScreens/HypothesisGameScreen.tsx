import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { useUser } from 'services/context/UserContext';
import { getTextWithTokens } from "services/api/texts";
import { createUserSentenceSpecification } from 'services/api/userSentenceSpecifications';
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import { TextWithTokens } from "interfaces/TextWithTokens";
import { checkUserSelection } from 'utils/gameFunctions';

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-indigo-300",
  "bg-pink-300",
];

const HypothesisGameScreen = ({ }) => {
  const tw = useTailwind();
  const [text, setText] = useState<TextWithTokens>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSentenceSpecifications, setUserSentenceSpecifications] = useState<UserSentenceSpecification[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  const { incrementPoints } = useUser();
  const [isSelectionStarted, setSelectionStarted] = useState(false);
  const [nextId, setNextId] = useState(0);
  const { user } = useUser();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await getTextWithTokens(user?.id, 'hypothesis');
        setText(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchText();
  }, []);

  const onTokenPress = useCallback((wordIndex: number) => {
    setText(currentText => {
      if (!currentText) return currentText;

      const newTokens = [...currentText.tokens];
      const token = newTokens[wordIndex];
      token.isCurrentSelection = !token.isCurrentSelection;

      if (token.isCurrentSelection) {
        token.color = 'bg-blue-200';
        setSelectionStarted(true);
      } else {
        delete token.color;
        setSelectionStarted(false);
      }

      return { ...currentText, tokens: newTokens };
    });
  }, []);


  const addSentenceSpecification = () => {
    setSelectionStarted(false);
    if (!text) return;

    const selectedTokens = text.tokens.filter(token => token.isCurrentSelection);

    selectedTokens.forEach(token => {
      token.sentenceId = nextId;
      token.isSelected = true;
      token.isCurrentSelection = false;
      delete token.color;
    });

    const wordPositions = selectedTokens.map(token => token.position).join(', ');
    console.log("wordPositions");
    console.log(wordPositions);

    setUserSentenceSpecifications([...userSentenceSpecifications, {
      id: nextId,
      user_id: user?.id,
      text_id: text.id,
      type: "hypothesis",
      content: selectedTokens.map(token => token.content).join(' '),
      word_positions: wordPositions,
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

    setText(currentText => {
      if (!currentText) return currentText;

      let newText = { ...currentText };
      newText.tokens = newText.tokens.map(token => {
        if (token.sentenceId === sentenceId) {
          return { ...token, isSelected: false, isCurrentSelection: false };
        }
        return token;
      });
      return newText;
    });
  }, [userSentenceSpecifications]);



  const renderText = (text: TextWithTokens, index: number) => {
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
            {text.tokens.map((token: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => onTokenPress(idx, index)}
                style={tw(
                  `m-0 p-[2px] ${token.isCurrentSelection ? token.color : token.isSelected ? getSentenceColor(token.sentenceId) : "bg-transparent"}`
                )}
              >
                <Text style={tw("text-2xl font-secondary text-gray-800")}>{token.content}</Text>
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

  const fetchTextFromAPI = async () => {
    try {
      const response = await getTextWithTokens(user?.id, 'hypothesis');
      setText(response);
    } catch (error) {
      console.error(error);
    }
  };

  const onNextCard = async () => {
    setLoading(true);

    // Vérifiez si le texte actuel est un test de spécification
    if (text?.is_hypothesis_specification_test) {
      if (!(await checkUserSelection(text.id, userSentenceSpecifications, 'hypothesis'))) {
        setLoading(false);
        return;
      }
    } else {
      //TODO Comparez avec les réponses des autres utilisateurs, donner plus ou moins de point
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      incrementPoints(5);

    }

    for (let userSentenceSpecification of userSentenceSpecifications) {
      const { id, ...rest } = userSentenceSpecification;
      // await createUserSentenceSpecification(rest);
    }

    setUserSentenceSpecifications([]);

    await fetchTextFromAPI();
    setLoading(false);

  };


  return (
    <ImageBackground source={require('images/bg_room_2.jpeg')} style={tw('flex-1')}>

      <SafeAreaView style={tw("flex-1 ")}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={tw("")}>
          <CustomHeaderInGame title="Trouver les hypothèses" backgroundColor="bg-whiteTransparent" />

          <View style={tw("mb-2 flex-1 justify-center items-center")}>
            {renderText(text, currentIndex)}
          </View>
          <View style={tw("mx-4")}>
            {userSentenceSpecifications.map(sentenceSpecification => renderUserSentenceSpecification(sentenceSpecification))}
          </View>
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

export default HypothesisGameScreen;
