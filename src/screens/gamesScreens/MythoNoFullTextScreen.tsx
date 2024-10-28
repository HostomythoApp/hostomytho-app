import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Linking } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { UserSentenceSpecification } from "models/UserSentenceSpecification";
import { useUser } from 'services/context/UserContext';
import { getTextTestNegation, getTextWithTokensNotPlayed, getTextWithTokensById, getTextWithTokensByGameType } from "services/api/texts";
import { createUserSentenceSpecification } from 'services/api/sentenceSpecifications';
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import { TextWithTokens } from "interfaces/TextWithTokens";
import { checkUserSelection } from 'utils/gameFunctions';
import InfoText from "components/InfoText";
import ModalDoctorsExplanation from "components/modals/ModalDoctorsExplanation";
import { getModalHelpContent, getTutorialContentForStep } from "tutorials/tutorialNegationGame";
import HelpButton from "components/button/HelpButton";
import CustomModal from "components/modals/CustomModal";
import { completeTutorialForUser, isTutorialCompleted } from "services/api/games";
import NextButton from "components/button/NextButton";
import { openWikipediaPageForWord, responsiveFontSize } from "utils/functions";
import SuccessModal from "components/modals/SuccessModal";
import WikiButton from "components/button/WikiButton";

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-indigo-300",
  "bg-pink-300",
];

const MythoNoFullTextScreen = ({ }) => {
  const tw = useTailwind();
  const [text, setText] = useState<TextWithTokens>();
  const [userSentenceSpecifications, setUserSentenceSpecifications] = useState<UserSentenceSpecification[]>([]);
  const [colorIndex, setColorIndex] = useState(0);
  // const { updateUserStats } = useUser();
  const [isSelectionStarted, setSelectionStarted] = useState(false);
  const [nextId, setNextId] = useState(0);
  const { user } = useUser();
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isTutorial, setIsTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isFirstClickValidate, setIsFirstClickValidate] = useState(true);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [tutorialFailed, setTutorialFailed] = useState(false);
  const window = Dimensions.get('window');
  const [resetTutorialFlag, setResetTutorialFlag] = useState(false);
  const [isTutorialCheckComplete, setIsTutorialCheckComplete] = useState(false);
  const [isInvisibleTest, setIsInvisibleTest] = useState(false);
  const [wikiMode, setWikiMode] = useState(false);


  useEffect(() => {
    async function checkTutorialCompletion() {
      if (user) {
        const completed = await isTutorialCompleted(user.id, 1);
        setIsTutorial(!completed);
        setIsTutorialCheckComplete(true);
      } else {
        // Si user pas connecté
        setIsTutorial(false);
        setIsTutorialCheckComplete(true);
      }
    }
    if (!isTutorial) {
      checkTutorialCompletion();
    }
  }, [user]);

  useEffect(() => {
    if (isTutorialCheckComplete) {
      if (isTutorial) {
        setTutorialStep(1);
        setIsFirstClickValidate(true);
        nextTutorialStep();
      } else {
        fetchNewText();
      }
    }
  }, [isTutorial, isTutorialCheckComplete, resetTutorialFlag]);

  useEffect(() => {
    if (resetTutorialFlag) {
      fetchNewText();
      const tutorialContent = getTutorialContentForStep(1, tw);
      if (tutorialContent) {
        showModal(tutorialContent);
      }
      setTutorialStep(0);
      setIsTutorial(true);

      setResetTutorialFlag(false);
    }
  }, [resetTutorialFlag]);

  const fetchNewText = async () => {
    try {
      let response;
      if (user) {
        response = await getTextWithTokensNotPlayed(user.id, 'plausibility');
        // response = await getTextWithTokensById(105);
      } else {
        response = await getTextWithTokensByGameType('plausibility');
      }
      setText(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du nouveau texte :", error);
    }
  };

  // *********** Gestion Tuto *******************
  const nextTutorialStep = async () => {
    if (!isTutorial) return;
    const nextStep = tutorialStep + 1;
    setTutorialStep(nextStep);

    if (nextStep <= 5) {
      let response;
      switch (nextStep) {
        case 1:
          response = await getTextWithTokensById(113);
          setText(response);
          break;
        case 3:
          response = await getTextWithTokensById(112);
          setText(response);
          break;
        case 4:
          response = await getTextWithTokensById(117);
          setText(response);
          break;
        case 5:
          response = await getTextTestNegation();
          setText(response);
          break;
      }
      const tutorialContent = getTutorialContentForStep(nextStep, tw);
      if (tutorialContent) {
        showModal(tutorialContent);
      }
    } else {
      if (questionsAsked < 7) {
        fetchTestText();
      } else {
        // Si nous avons posé les 3 questions, on vérifie si l'utilisateur a réussi le tutoriel.
        if (correctAnswers >= 4) {
          showModal(getTutorialContentForStep(98, tw));
          setIsTutorial(false);

          if (user) {
            completeTutorialForUser(user.id, 1);
          }
        } else {
          showModal(getTutorialContentForStep(99, tw));
          setIsFirstClickValidate(true);
          setCorrectAnswers(0);
          setQuestionsAsked(0);
          setTutorialStep(0);
          setTutorialFailed(true);
        }
      }
    }
  };

  const fetchTestText = async () => {
    try {
      const response = await getTextTestNegation();
      setText(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du texte de test.", error);
    }
  };

  const showModal = (content: any) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const showHelpModal = () => {
    setIsHelpModalVisible(true)
  };


  const launchTuto = async () => {
    setCorrectAnswers(0);
    setQuestionsAsked(0);
    setIsFirstClickValidate(true);
    setTutorialStep(0);
    setIsTutorial(true);
    setTutorialFailed(false);
    setUserSentenceSpecifications([]);
    const response = await getTextWithTokensById(113);
    setText(response);
    const tutorialContent = getTutorialContentForStep(1, tw);
    if (tutorialContent) {
      showModal(tutorialContent);
    }
  };

  // *****************************************************


  const onNextCard = async () => {
    if (!text) {
      console.error("Aucune erreur à traiter.");
      return;
    }

    setLoading(true);
    const addLengthPoints: number = text.length / 60;

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

        // if (user) setTimeout(() => updateUserStats(0, 0, -1), 100);
        setMessageContent(`${messageHeader}\n${correctSpecification}`);
        if (!isInvisibleTest) {
          setShowMessage(true);
        } else {
          goToNextSentence(false);
        }
        setLoading(false);
        setSelectionStarted(false);
        return;
      } else {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
        if (!isTutorial) {
          // if (user) setTimeout(() => updateUserStats(5 + addLengthPoints, 2, 2), 100);
        }
      }
    } else {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      if (!isTutorial) {
        // if (user) setTimeout(() => updateUserStats(5 + addLengthPoints, 2, 0), 100);
        // Création des specifications dans la bdd
        for (let userSentenceSpecification of userSentenceSpecifications) {
          const { id, ...rest } = userSentenceSpecification;
          await createUserSentenceSpecification(rest);
        }
      }
    }
    goToNextSentence();
  };

  const goToNextSentence = async (isCorrect = true) => {
    if (isTutorial) {
      setQuestionsAsked(questionsAsked + 1);
      if (isCorrect) {
        setSuccessModalVisible(true);
        setCorrectAnswers(correctAnswers + 1);
      }
    }

    setUserSentenceSpecifications([]);
    setShowMessage(false);
    setMessageContent("");
    setLoading(false);
    setColorIndex(0);
    toggleWikiMode(false);
    if (isTutorial) {
      nextTutorialStep();
    } else {
      if (isCorrect) {
        setIsInvisibleTest(false);
        fetchNewText();
      } else {
        fetchTestText();
        setIsInvisibleTest(true);
      }
    }
  };

  const handleDismissSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const toggleWikiMode = (newMode?: boolean) => { setWikiMode(newMode !== undefined ? newMode : !wikiMode); }

  const onTokenPress = useCallback((wordIndex: number) => {
    if (wikiMode) {
      const token = text!.tokens[wordIndex];
      const word = token.content;
      openWikipediaPageForWord(word);
      // toggleWikiMode(false);
    } else {
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
    }
  }, [wikiMode]);


  const addSentenceSpecification = () => {
    if (isTutorial && isFirstClickValidate) {
      nextTutorialStep();
      setIsFirstClickValidate(false);
    }

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
      content: selectedTokens.map(token => token.content).join(''),
      word_positions: wordPositions,
      specification_weight: user?.status === 'medecin' ? user?.trust_index + 30 : user?.trust_index,
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
      <SafeAreaView style={tw("flex-1")}>
        <View
          style={[
            tw("bg-[#DAEBDC] rounded-xl justify-center mx-2 mt-4"),
            {
              backgroundColor: 'rgba(255, 222, 173, 0.92)',
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
            {text.tokens.map((token: any, idx: number) => {
              const isPunctuation = token.is_punctuation;
              const isNewLine = token.content.includes('\n');

              if (isNewLine) {
                // Créer un élément pour chaque saut de ligne dans le token
                return token.content.split('\n').map((_: any, lineIdx: any) => (
                  <View key={`${idx}-${lineIdx}`} style={{ width: '100%', height: lineIdx === 0 ? 0 : 20 }} />
                ));
              } else if (isPunctuation) {
                // Pour la ponctuation, retourner simplement le texte
                return (
                  <Text
                    key={idx}
                    style={[
                      tw("font-primary text-gray-800"),
                      token.color ? tw(token.color) : null,
                      {
                        fontSize: responsiveFontSize(30)
                      }
                    ]}
                  >
                    {token.content}
                  </Text>
                );
              } else {
                // Pour les autres tokens, retourner un TouchableOpacity
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={showMessage ? undefined : () => onTokenPress(idx)}
                    style={tw(
                      `m-0 p-[1px] ${token.isCurrentSelection ? token.color : token.isSelected ? getSentenceColor(token.sentenceId) : "bg-transparent"}`
                    )}
                  >
                    <Text
                      style={[
                        tw("font-primary text-gray-800"),
                        token.color ? tw(token.color) : null,
                        {
                          fontSize: responsiveFontSize(30)
                        }
                      ]}
                    >
                      {token.content}
                    </Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const renderUserSentenceSpecification = (sentenceSpecification: any) => (
    <View key={sentenceSpecification.id} style={tw(`flex-row items-center m-1 max-w-[400px] ml-10`)}>
      <View style={tw("flex-shrink")}>
        <Text style={tw(`text-lg mr-2 ${sentenceSpecification.color ? sentenceSpecification.color : ''} font-primary`)}>{sentenceSpecification.content}</Text>
      </View>
      <TouchableOpacity onPress={() => removeUserSentenceSpecification(sentenceSpecification.id)}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );


  const updateTokensColor = (text: TextWithTokens, positions: number[]) => {
    const newTokens = [...text.tokens];
    newTokens.forEach((token, index) => {
      if (positions.includes(index)) {
        token.color = 'text-red-500';
      }
    });
    return { ...text, tokens: newTokens };
  };



  return (
    <ImageBackground source={require('images/bg_room_1.jpg')} style={tw('flex-1')}>
      <View style={tw("flex-1")}>
        <ScrollView ref={scrollViewRef}>
          {wikiMode && (
            <View style={tw('p-[13px] w-full bg-blue-100 absolute z-30')}>
              <Text style={tw('font-primary text-[16px] text-center text-blue-800')}>
                Mode Wiki activé : cliquez sur un mot pour voir sa page Wikipedia. Cliquez à nouveau dessus pour quitter ce mode.
                {"\n"}
                Attention, certaines pages peuvent contenir des images sensibles ou inappropriés.
              </Text>
            </View>
          )}
          <CustomHeaderInGame title="Mytho-No" backgroundColor="bg-whiteTransparent" />
          <View style={tw('flex-row justify-between z-40')}>
            <WikiButton func={() => toggleWikiMode()} />
            <View style={tw('flex-row')}>
              <NextButton func={goToNextSentence} isDisabled={isTutorial} />
              <HelpButton onHelpPress={showHelpModal} />
            </View>
          </View>
          <View style={tw("mb-2 flex-1 justify-center items-center")}>
            {text && renderText(text)}
          </View>
          {
            isTutorial &&
            <View style={tw('mx-4 p-4 bg-white rounded-lg w-72')}>
              <View style={tw('flex-row justify-between items-center mb-2')}>
                <Text style={tw('font-primary text-base text-gray-600')}>
                  Texte :
                </Text>
                <Text style={tw('font-primary text-lg font-bold text-blue-600')}>
                  {Math.min(questionsAsked, 7)} / 7
                </Text>
              </View>
              <View style={tw('flex-row justify-between items-center')}>
                <Text style={tw('font-primary text-base text-gray-600')}>
                  Bonnes réponses :
                </Text>
                <Text style={tw('font-primary text-lg font-bold text-green-600')}>
                  {correctAnswers}
                </Text>
              </View>
            </View>
          }

          {
            tutorialFailed && (
              <TouchableOpacity
                onPress={launchTuto}
                style={tw('bg-blue-500 px-4 py-2 rounded-lg w-96 self-center p-3')}
              >
                <Text style={tw('text-white text-center font-primary text-lg')}>Relancer le tutoriel</Text>
              </TouchableOpacity>
            )
          }
          <View style={tw("mx-4 pb-3")}>
            {userSentenceSpecifications.map(sentenceSpecification => renderUserSentenceSpecification(sentenceSpecification))}
          </View>
          <View>
            {user?.moderator && (
              <View style={tw("mb-4 mx-2")}>
                <InfoText
                  textId={text?.id ?? 0}
                  num={text?.num ?? ''}
                  origin={text?.origin ?? ''}
                  test_plausibility={text?.test_plausibility ?? 0}
                  is_negation_test={text?.is_negation_specification_test ?? false}
                />
              </View>
            )}
          </View>
        </ScrollView>

        <View style={tw('absolute bottom-3 right-4 flex-col w-52')}>

          {isSelectionStarted && !tutorialFailed && (
            <TouchableOpacity
              style={tw(`py-2 px-4 rounded-lg bg-blue-500 flex-row items-center justify-center mb-1 w-full`)}
              onPress={addSentenceSpecification}
            >
              <MaterialIcons name="add" size={22} color="white" />
              <Text style={tw("text-white font-primary text-lg")}>Valider la sélection</Text>
            </TouchableOpacity>
          )}

          {!showMessage &&
            <TouchableOpacity
              disabled={isTutorial && (isFirstClickValidate || tutorialFailed)}
              style={[
                tw("py-2 px-4 rounded-lg flex-row items-center justify-center w-full"),
                (isTutorial && (isFirstClickValidate || tutorialFailed)) ? tw("bg-green-200") : tw("bg-primary")
              ]}
              onPress={onNextCard}
            >
              <Text style={tw("text-white font-primary text-lg")}>Texte suivant</Text>
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

        <View style={tw('flex-col w-full bottom-0')}>
          {showMessage &&
            <View style={tw("bg-red-200 p-2 rounded-lg w-full flex-row justify-between items-center")}>
              <View>
                <Text style={tw("text-[#B22222] font-primary text-lg flex-shrink")}>{messageContent}</Text>
              </View>
              <TouchableOpacity
                style={tw("bg-red-500 px-4 rounded-lg h-8 my-1 flex-row items-center")}
                onPress={() => goToNextSentence(false)}
              >
                <Text style={tw("text-white font-primary text-lg")}>Continuer</Text>
              </TouchableOpacity>
            </View>

          }
        </View>
        <ModalDoctorsExplanation
          isVisible={isModalVisible}
          onClose={handleCloseModal}
        >
          {modalContent}
        </ModalDoctorsExplanation>

        <CustomModal
          isVisible={isHelpModalVisible}
          onClose={() => setIsHelpModalVisible(false)}
        >
          <View style={tw('flex-1')}>
            <ScrollView
              style={[tw('flex-1'), { maxHeight: window.height * 0.8 }]}
              contentContainerStyle={tw('p-4')}
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
            >
              {getModalHelpContent(tw)}
              <TouchableOpacity onPress={() => {
                launchTuto();
                setIsHelpModalVisible(false);
              }} style={tw('bg-primary py-2 px-4 rounded self-center')}>
                <Text style={tw('text-white font-bold text-center font-primary')}>Relancer le tutoriel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </CustomModal>

        <SuccessModal
          isVisible={successModalVisible}
          onDismiss={handleDismissSuccessModal}
        />
      </View>
    </ImageBackground>

  );
};

export default MythoNoFullTextScreen;
