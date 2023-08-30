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

const NegationGameScreen = ({ }) => {
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fetchText = async () => {
      try {
        if (user) {
          const response = await getTextWithTokens(user?.id, 'negation');
          setText(response);
        }
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
      } else {
        delete token.color;
      }

      const anyTokenSelected = newTokens.some(t => t.isCurrentSelection);
      setSelectionStarted(anyTokenSelected);

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
    setUserSentenceSpecifications([...userSentenceSpecifications, {
      id: nextId,
      user_id: user?.id,
      text_id: text.id,
      type: "negation",
      content: selectedTokens.map(token => token.content).join(' '),
      word_positions: wordPositions,
      specification_weight: 1,
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



  const renderText = (text: TextWithTokens) => {
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
                onPress={showMessage ? undefined : () => onTokenPress(idx)}
                style={tw(
                  `m-0 p-[2px] ${token.isCurrentSelection ? token.color : token.isSelected ? getSentenceColor(token.sentenceId) : "bg-transparent"}`
                )}
              >
                <Text
                  style={[
                    tw("text-2xl font-secondary text-gray-800"),
                    token.color ? tw(token.color) : null
                  ]}
                >
                  {token.content}
                </Text>
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
      if (user) {
        const response = await getTextWithTokens(user?.id, 'negation');
        setText(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const goToNextSentence = async () => {
    setUserSentenceSpecifications([]);
    setShowMessage(false);
    setMessageContent("");
    await fetchTextFromAPI();
    setLoading(false);
  };

  const updateTokensColor = (text: TextWithTokens, positions: number[]) => {
    const newTokens = [...text.tokens];
    newTokens.forEach((token, index) => {
      if (positions.includes(index + 1)) {
        token.color = 'text-red-500';
      }
    });
    return { ...text, tokens: newTokens };
  };


  const onNextCard = async () => {
    setLoading(true);
    if (text?.is_negation_specification_test) {
      const checkResult = await checkUserSelection(text.id, userSentenceSpecifications, 'negation');
      if (!checkResult.isValid) {
        const correctSpecification = checkResult.testSpecifications.map(spec => `• ${spec.content}`).join('\n');

        const allPositions = checkResult.testSpecifications.flatMap(spec => spec.word_positions.split(', ').map(pos => parseInt(pos)));
        setText(currentText => {
          if (!currentText) return currentText;
          return updateTokensColor(currentText, allPositions);
        });

        let messageHeader;
        if (checkResult.testSpecifications.length > 0) {
          messageHeader = "Oups, raté! Voilà les négations qu'il fallait trouver :";
        } else {
          messageHeader = "Oh non, il n'y avait rien à trouver ici";
        }

        setMessageContent(`${messageHeader}\n${correctSpecification}`);
        setShowMessage(true);
        setLoading(false);
        setSelectionStarted(false);
        return;
      } else {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
        setTimeout(() => {
          incrementPoints(5);
        }, 100);
      }
    } else {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      setTimeout(() => {
        incrementPoints(5);
      }, 100);
    }

    for (let userSentenceSpecification of userSentenceSpecifications) {
      const { id, ...rest } = userSentenceSpecification;
      // await createUserSentenceSpecification(rest);
    }

    setUserSentenceSpecifications([]);
    setShowMessage(false);
    setMessageContent("");

    await fetchTextFromAPI();
    setLoading(false);
  };

  return (
    <ImageBackground source={require('images/bg_room_2.jpeg')} style={tw('flex-1')}>
      <SafeAreaView style={tw("flex-1 ")}>
        <ScrollView ref={scrollViewRef} contentContainerStyle={tw("")}>
          <CustomHeaderInGame title="Trouver les négations" backgroundColor="bg-whiteTransparent" />
          {errorMessage && (
            <View style={tw("mx-4 mt-2 bg-red-300 p-2 rounded")}>
              <Text style={tw("text-white")}>{errorMessage}</Text>
            </View>
          )}
          <View style={tw("mb-2 flex-1 justify-center items-center")}>
            {text && renderText(text)}
          </View>
          <View style={tw("mx-4 pb-5")}>
            {userSentenceSpecifications.map(sentenceSpecification => renderUserSentenceSpecification(sentenceSpecification))}
          </View>
        </ScrollView>

        <View style={tw('absolute bottom-3 right-4 flex-col w-52')}>

          {isSelectionStarted &&
            <TouchableOpacity
              style={tw(`py-2 px-4 rounded-lg bg-blue-500 flex-row items-center justify-center mb-1 w-full`)}
              onPress={addSentenceSpecification}
            >
              <MaterialIcons name="add" size={22} color="white" />
              <Text style={tw("text-white font-primary text-lg")}>Valider la sélection</Text>
            </TouchableOpacity>
          }

          {!showMessage &&
            <TouchableOpacity
              style={tw("py-2 px-4 rounded-lg bg-primary flex-row items-center justify-center  w-full")}
              onPress={onNextCard}
            >
              <Text style={tw("text-white font-primary text-lg")}>Phrase suivante</Text>
              <View style={tw('bg-primaryLighter rounded-full h-6 w-6 flex items-center justify-center ml-2')}>
                <Text style={tw('text-white font-bold')}>{userSentenceSpecifications.length}</Text>
              </View>
            </TouchableOpacity>
          }
        </View>
        {userSentenceSpecifications.length > 0 && (
          <TouchableOpacity
            style={[
              tw('absolute bottom-3 left-4 w-9 h-9 bg-blue-500 rounded-full justify-center items-center'),
            ]}
            onPress={() => {
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }}
          >
            <MaterialIcons name="arrow-downward" size={25} color="white" />
          </TouchableOpacity>
        )}

        <View style={tw(' flex-col w-full bottom-0')}>
          {showMessage &&
            <View style={tw("bg-red-200 p-2 rounded-lg w-full flex-row justify-between items-center")}>
              <View>
                <Text style={tw("text-[#B22222] font-primary text-lg flex-shrink")}>{messageContent}</Text>
              </View>
              <TouchableOpacity
                style={tw("bg-red-500 px-4 rounded-lg h-8 my-1 flex-row items-center")}
                onPress={goToNextSentence}
              >
                <Text style={tw("text-white font-primary text-lg")}>Continuer</Text>
              </TouchableOpacity>
            </View>

          }
        </View>
      </SafeAreaView>
    </ImageBackground>
  );

};

export default NegationGameScreen;
