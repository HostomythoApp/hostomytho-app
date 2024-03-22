import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Dimensions, ImageBackground, LogBox } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useUser } from 'services/context/UserContext';
import { Token } from "models/Token";
import CustomHeaderInGame from 'components/header/CustomHeaderInGame';
import PlausibilityButton from 'components/button/PlausibilityButton';
import { ErrorDetail } from "models/ErrorDetail";
import { createUserTextRating, getTextTestPlausibility, getTextWithTokensByGameType, getTextWithTokensById, getTextWithTokensNotPlayed } from "services/api/texts";
import { TextWithTokens } from "interfaces/TextWithTokens";
import { checkUserSelectionPlausibility } from "utils/gameFunctions";
import InfoText from 'components/InfoText';
import { ButtonConfig } from "interfaces/ButtonConfig";
import { plausibilityConfigs } from "utils/plausibilityConfigs";
import CustomModal from "components/modals/CustomModal";
import { getModalHelpContent, getTutorialContentForStep } from "tutorials/tutorialPlausibilityGame";
import HelpButton from "components/button/HelpButton";
import NextButton from "components/button/NextButton";
import { completeTutorialForUser, isTutorialCompleted } from "services/api/games";
import ModalDoctorsExplanation from "components/modals/ModalDoctorsExplanation";
import { createUserErrorDetail } from "services/api/errors";
import { UserErrorDetail } from "models/UserErrorDetail";
import { responsiveFontSize } from "utils/functions";
import SuccessModal from "components/modals/SuccessModal";

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-indigo-300",
  "bg-pink-300",
];

const MythoOuPasScreen = () => {
  const tw = useTailwind();
  const [isModalPlausibilityVisible, setIsModalPlausibilityVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(false);
  const [errorSpecifying, setErrorSpecifying] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSelectionStarted, setSelectionStarted] = useState(false);
  const [errorDetails, setErrorDetails] = useState<UserErrorDetail[]>([]);
  const [nextId, setNextId] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const window = Dimensions.get('window');
  const { user, updateUserStats } = useUser();
  const [text, setText] = useState<TextWithTokens>();
  const [selectedWords, setSelectedWords] = useState<number[]>([]);
  const [messageContent, setMessageContent] = useState<JSX.Element>(<></>);
  const [showMessage, setShowMessage] = useState(false);
  const [noMoreTexts, setNoMoreTexts] = useState(false);
  const [userRateSelected, setUserRateSelected] = useState(100);
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isTutorial, setIsTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [tutorialFailed, setTutorialFailed] = useState(false);
  const [isTutorialCheckComplete, setIsTutorialCheckComplete] = useState(false);
  const [resetTutorialFlag, setResetTutorialFlag] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInvisibleTest, setIsInvisibleTest] = useState(false);

  useEffect(() => {
    async function checkTutorialCompletion() {
      if (user) {
        const completed = await isTutorialCompleted(user.id, 2);
        setIsTutorial(!completed);
        setIsTutorialCheckComplete(true);
      } else {
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
        // response = await getTextWithTokensById(299);
      } else {
        response = await getTextWithTokensByGameType('plausibility');
      }
      setText(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du nouveau texte :", error);
    }
  };

  const fetchTestText = async () => {
    try {
      const response = await getTextTestPlausibility();
      setText(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du texte de test.", error);
    }
  };

  // *********** Gestion Tuto *******************
  const nextTutorialStep = async () => {
    if (!isTutorial) return;
    const nextStep = tutorialStep + 1;
    setTutorialStep(nextStep);

    if (nextStep <= 3) {
      let response;
      switch (nextStep) {
        case 1:
          response = await getTextWithTokensById(344);
          setText(response);
          break;
        case 2:
          response = await getTextWithTokensById(349);
          setText(response);
          break;
        case 3:
          response = await getTextWithTokensById(351);
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
        // Si nous avons posé toutes les questions, on vérifie si l'utilisateur a réussi le tutoriel.
        if (correctAnswers >= 4) {
          showModal(getTutorialContentForStep(98, tw));
          setIsTutorial(false);

          if (user) {
            completeTutorialForUser(user.id, 2);
          }
        } else {
          showModal(getTutorialContentForStep(99, tw));
          setCorrectAnswers(0);
          setQuestionsAsked(1);
          setTutorialStep(0);
          setTutorialFailed(true);
        }
      }
    }
  };

  const showModal = (content: any) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleCloseModalPlausibility = () => {
    setIsModalPlausibilityVisible(false);
  };

  const launchTuto = () => {
    setResetTutorialFlag(true);
    setShowMessage(false);
    setMessageContent(<></>);
    setCorrectAnswers(0);
    setQuestionsAsked(1);
    setTutorialFailed(false);
  };

  const showHelpModal = () => {
    setIsHelpModalVisible(true)
  };
  // *****************************************************

  const onNextCard = async () => {

    if (!text) {
      console.error("Aucun texte à traiter.");
      return;
    }

    if (text?.is_plausibility_test) {
      const checkResult = await checkUserSelectionPlausibility(text.id, errorDetails, userRateSelected);
      const noErrorSpecified = errorDetails.length === 0;
      const noErrorInDatabase = !checkResult.testPlausibilityError || checkResult.testPlausibilityError.length === 0;

      let messageHeader: JSX.Element = <></>;

      if (noErrorSpecified || noErrorInDatabase) {
        if (checkResult.testPlausibilityPassed) {
          if (!isTutorial) animationGainPoints(7, 1, 1);
          goToNextSentence(true);
          return;
        } else {
          if (!isTutorial) animationGainPoints(0, -1, -1);
          messageHeader = (
            <View style={tw('flex-row items-center')}>
              <Text style={tw('text-[#B22222] font-primary text-lg')}
              >Hmm ce texte était plutôt </Text>
              <Text style={tw('text-[#B22222] font-primary text-lg')}>{getPlausibilityConfig(checkResult.correctPlausibility).description}</Text>
              <PlausibilityButton config={getPlausibilityConfig(checkResult.correctPlausibility).buttonConfig as ButtonConfig} />
            </View>
          );
        }
      } else {
        const correctSpecification = checkResult.testPlausibilityError.map(spec => `• ${spec.content}`).join('\n');

        const allPositions = checkResult.testPlausibilityError.flatMap(spec => spec.word_positions.split(', ').map(pos => parseInt(pos)));
        setText(currentText => {
          if (!currentText) return currentText;
          return updateTokensColor(currentText, allPositions);
        });

        if (checkResult.isErrorDetailsCorrect && !checkResult.testPlausibilityPassed) {
          <Text>
            {plausibilityDescription(checkResult.correctPlausibility)}
          </Text>;
          messageHeader = (
            <View style={tw('flex-row items-center')}>
              <Text style={tw('text-[#B22222] font-primary text-lg')}
              >Vous avez bien identifié les zones de doute, mais le texte était plutôt {getPlausibilityConfig(checkResult.correctPlausibility).description}</Text>
              <PlausibilityButton config={getPlausibilityConfig(checkResult.correctPlausibility).buttonConfig as ButtonConfig} />
            </View>
          );
          if (!isTutorial) animationGainPoints(7, 0, 1);
        } else if (!checkResult.isErrorDetailsCorrect && !checkResult.testPlausibilityPassed) {
          messageHeader = (
            <View>
              <Text style={tw('text-[#B22222] font-primary text-lg')}
              >Oups, raté! Voilà les erreurs qu'il fallait trouver: {'\n'}{correctSpecification}. {'\n'}</Text>
              <View style={tw('flex-row items-center')}>
                <Text style={tw('text-[#B22222] font-primary text-lg')}>Et le texte était {getPlausibilityConfig(checkResult.correctPlausibility).description}</Text>
                <PlausibilityButton config={getPlausibilityConfig(checkResult.correctPlausibility).buttonConfig as ButtonConfig} />
              </View>
            </View>
          );
          if (!isTutorial) animationGainPoints(0, -1, -1);
        } else if (!checkResult.isErrorDetailsCorrect && checkResult.testPlausibilityPassed) {
          messageHeader = (
            <View>
              <Text style={tw('text-[#B22222] font-primary text-lg')}
              >Oups, raté! Voilà les erreurs qu'il fallait trouver: {'\n'}{correctSpecification}. {'\n'}</Text>
              <Text style={tw('text-[#B22222] font-primary text-lg')}>Par contre, vous avez trouvé la bonne plausibilité!</Text>
            </View>
          );
          if (!isTutorial) animationGainPoints(7, 0, 1);
        } else if (checkResult.isErrorDetailsCorrect && checkResult.testPlausibilityPassed) {
          if (!isTutorial) animationGainPoints(12, 2, 2);
          goToNextSentence(true);
          return;
        }
      }

      if (!checkResult.isValid) {
        setMessageContent(messageHeader);
        if (!isInvisibleTest) {
          setShowMessage(true);
        } else {
          goToNextSentence(false);
        }
        setSelectionStarted(false);
      }
      return;
    } else {
      const userTextRating = {
        // @ts-ignore
        user_id: user.id,
        text_id: text.id,
        plausibility: userRateSelected,
        vote_weight: user?.trust_index
      };
      await createUserTextRating(userTextRating);


      for (let errorDetail of errorDetails) {
        const { id, ...rest } = errorDetail;
        await createUserErrorDetail(rest);
      }

      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
      animationGainPoints(10, 0, 0);
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
    setErrorDetails([]);
    setShowMessage(false);
    setMessageContent(<></>);
    setErrorSpecifying(false);
    setHighlightEnabled(false);
    setUserRateSelected(100);
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

  const HighlightedWord = ({ token, index }: { token: Token; index: number }) => {
    const isSelected = selectedWords.includes(index);
    return (
      <TouchableOpacity
        onPress={showMessage ? undefined : () => onTokenPress(index)}
        style={tw(
          `m-0 p-[1px] ${token.isCurrentSelection ? token.color : token.isSelected ? getErrorColor(token.sentenceId) : "bg-transparent"}`
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
  };

  const addErrorDetail = () => {
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
    setErrorDetails([...errorDetails, {
      id: nextId,
      user_id: user?.id,
      text_id: text.id,
      vote_weight: user?.status === 'medecin' ? user?.trust_index + 30 : user?.trust_index,
      content: selectedTokens.map(token => token.content).join(''),
      word_positions: wordPositions,
      color: colors[colorIndex]
    }]);

    setNextId(nextId + 1);
    setColorIndex((colorIndex + 1) % colors.length);
  };


  const getErrorColor = (sentenceId: any) => {
    if (sentenceId === null) {
      return "bg-transparent";
    }
    const sentence = errorDetails.find(spec => spec.id === sentenceId);
    return sentence ? sentence.color : "bg-transparent";
  };

  const onTokenPress = (wordIndex: number) => {
    if (!highlightEnabled) return;
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
  };


  const renderErrorDetail = (errorDetail: ErrorDetail) => (
    <View key={errorDetail.id} style={tw(`flex-row items-center m-1 max-w-[400px] ml-9`)}>
      {errorDetail.content ? (
        <View style={tw("flex-shrink")}>
          <Text style={tw(`text-lg mr-2 ${errorDetail.color ? errorDetail.color : ''} font-primary`)}>{errorDetail.content}</Text>
        </View>
      ) : (
        <Text style={tw("text-lg mr-2")}>Contenu vide</Text>
      )}
      <TouchableOpacity onPress={() => removeErrorDetail(errorDetail.id)}>
        <Entypo name="cross" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  const removeErrorDetail = (errorDetailId: number) => {
    setErrorDetails(errorDetails.filter(errorDetail => errorDetail.id !== errorDetailId));
  };

  const renderText = (text: TextWithTokens) => {
    if (!text) return null;

    return (
      <SafeAreaView style={tw("flex-1")}>
        <View
          style={[
            tw("bg-[#FFFEE0] rounded-xl justify-center mx-2 mt-2 lg:mt-4 xl:mt-4"),
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
            {text.tokens.flatMap((token: Token, idx: number) => {
              const isNewLine = token.content.includes('\n');
              if (isNewLine) {
                return token.content.split('\n').map((content, lineIdx) => {
                  if (lineIdx > 0) {
                    // Pour chaque saut de ligne après le premier, ajouter un espace vertical
                    return <View key={`${idx}-${lineIdx}`} style={{ width: '100%', height: 20 }} />;
                  }
                  return <HighlightedWord token={{ ...token, content }} index={idx} key={`${idx}-${lineIdx}`} />;
                });
              } else {
                return <HighlightedWord token={token} index={idx} key={idx} />;
              }
            })}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  const updateTokensColor = (text: TextWithTokens, positions: number[]) => {
    const newTokens = [...text.tokens];
    newTokens.forEach((token, index) => {
      if (positions.includes(index)) {
        token.color = 'text-red-500';
      }
    });
    return { ...text, tokens: newTokens };
  };

  const returnToChoicePlausibility = async () => {
    setErrorSpecifying(false);
  };


  const plausibilityDescription = (value: any) => {
    if (value === 0) return "très peu plausible";
    if (value <= 25.00) return "peu plausible";
    if (value <= 50.00) return "moyennement plausible";
    if (value <= 75.00) return "assez plausible ";
    return "complètement plausible";
  };

  const getPlausibilityConfig = (plausibility?: number) => {
    if (plausibility === undefined) {
      return plausibilityConfigs[plausibilityConfigs.length - 1];
    }
    return plausibilityConfigs.find(config => plausibility <= config.maxThreshold) || plausibilityConfigs[plausibilityConfigs.length - 1];
  };


  const animationGainPoints = (pointsEarned: number, catchProbability: number, trustEarned: number) => {
    scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    if (isTutorial) { pointsEarned = 0; catchProbability = 0; }

    setTimeout(() => {
      // TODO augmenter trustEarned seulement quand la question était un test
      const addLengthPoints: number = text && typeof text.length === 'number' ? text.length / 60 : 0;

      updateUserStats(pointsEarned + addLengthPoints, catchProbability, trustEarned);
    }, 100);
  }


  return (
    <ImageBackground source={require('images/bg_room_2.webp')} style={tw('flex-1')}>
      <SafeAreaView style={tw("flex-1")}>
        <ScrollView ref={scrollViewRef}>
          <CustomHeaderInGame title="Mytho ou pas" backgroundColor="bg-whiteTransparent" />
          <View style={tw('flex-row justify-end')}>
            <NextButton bgColor="rgb(255, 254, 224)" func={goToNextSentence} isDisabled={isTutorial} />
            <HelpButton onHelpPress={showHelpModal} />
          </View>

          {noMoreTexts ? (
            <View style={tw('items-center justify-center mt-4')}>
              <Text style={tw('text-lg text-red-500')}>Plus de texte pour le moment. Reviens plus tard.</Text>
            </View>
          ) : (
            <View>
              <View style={tw("flex-1 mb-2")}>
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

              <View style={tw("mx-4 mt-2 mb-2 pb-12")}>
                {errorDetails.map(errorDetail => renderErrorDetail(errorDetail)
                )}
              </View>
            </View>
          )}
          <View>
            {user?.moderator && (
              <View style={tw("mb-4 mx-2 h-[300px]")}>
                <InfoText
                  textId={text?.id ?? 0}
                  num={text?.num ?? ''}
                  origin={text?.origin ?? ''}
                  test_plausibility={text?.test_plausibility ?? 0}
                  is_plausibility_test={text?.is_plausibility_test ?? false}
                />
              </View>
            )}
          </View>
        </ScrollView>

        <CustomModal
          isVisible={isModalPlausibilityVisible}
          onClose={handleCloseModalPlausibility}
        >
          <View style={tw('flex-row ')}>
            <TouchableOpacity
              style={[
                tw("p-3 mr-3 rounded-lg bg-orange-200"),
                tutorialStep === 1 ? tw(" opacity-30") : tw("opacity-100"),
              ]}
              onPress={() => {
                setIsModalPlausibilityVisible(false);
                setHighlightEnabled(true);
                setErrorSpecifying(true);
              }}
              disabled={tutorialStep === 1}
            >
              <Text style={tw("font-semibold text-orange-500")}
              >Source du doute</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={tw("bg-green-200 p-3 rounded-lg")}
              onPress={() => {
                setIsModalPlausibilityVisible(false);
                onNextCard();
              }}
            >
              <Text style={tw("text-green-700 font-semibold")}>Aller au texte suivant</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>

        {errorSpecifying ? (
          <SafeAreaView>
            <View style={tw('absolute bottom-3 left-4 flex-row')}>
              <TouchableOpacity
                style={[
                  tw('bg-blue-500 rounded-full justify-center items-center flex-row p-1 mr-1'),
                ]}
                onPress={() => {
                  returnToChoicePlausibility();
                }}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text style={tw('font-primary text-white mr-1')}
                >Changer la plausibilité</Text>
              </TouchableOpacity>

              {errorDetails.length > 0 && (
                <TouchableOpacity
                  style={[
                    tw('bg-blue-500 rounded-full justify-center items-center flex-row p-1'),
                  ]}
                  onPress={() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }}
                >
                  <MaterialIcons name="arrow-downward" size={25} color="white" />
                  <Text style={tw('font-primary text-white mr-1')}>
                    Annotations
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={tw('absolute bottom-3 right-4 flex-col w-52')}>
              {isSelectionStarted &&
                <TouchableOpacity
                  key={"add"}
                  style={tw(`px-2 items-center flex-row justify-center rounded-full h-12 mx-2 mb-1 ${isSelectionStarted ? 'bg-blue-500' : 'bg-blue-50'}`)}
                  onPress={() => {
                    addErrorDetail();
                  }}
                  disabled={!isSelectionStarted}
                >
                  <MaterialIcons name="add" size={22} color="white" />
                  <Text style={tw("text-white font-primary text-lg")}>Valider la sélection</Text>
                </TouchableOpacity>
              }

              {!showMessage &&
                <TouchableOpacity
                  key={"next"}
                  style={tw(`px-2 items-center flex-row justify-center rounded-full h-12 mx-2 ${errorDetails.length > 0 ? 'bg-primary' : 'bg-green-200'}`)}
                  disabled={errorDetails.length === 0}
                  onPress={onNextCard}
                >
                  <Text style={tw("text-white font-primary text-lg")}>Texte suivant</Text>

                  <View style={tw(`rounded-full h-6 w-6 flex items-center justify-center ml-2 ${errorDetails.length > 0 ? 'bg-primaryLighter' : 'bg-green-100'}`)}>
                    <Text style={tw('text-white font-bold')}>{errorDetails.length}</Text>
                  </View>
                </TouchableOpacity>
              }
            </View>
          </SafeAreaView>
        ) : (
          <>
            {!showMessage &&
              // Boutons de plausibilité  
              <View

                style={[
                  tw("flex flex-row justify-evenly py-1 md:py-1"),
                  {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                  },
                ]}
              >

                <TouchableOpacity style={tw('items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14 my-auto bg-red-200')}
                  onPress={async () => {
                    setIsModalPlausibilityVisible(true);
                    setUserRateSelected(0);
                  }} >
                  <Entypo name="cross" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity style={tw('items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14 my-auto bg-orange-100')}
                  onPress={async () => {
                    setIsModalPlausibilityVisible(true);
                    setUserRateSelected(25);
                  }} >
                  <Entypo name="flag" size={28} color="orange" />
                </TouchableOpacity>

                <TouchableOpacity style={tw('items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14 my-auto bg-yellow-100')}
                  onPress={() => {
                    setIsModalPlausibilityVisible(true);
                    setUserRateSelected(50);
                  }}  >
                  <AntDesign name="question" size={30} color="orange" />
                </TouchableOpacity>

                <TouchableOpacity style={tw('items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14 my-auto bg-green-50')}
                  onPress={async () => {
                    setUserRateSelected(75);
                    setIsModalPlausibilityVisible(true);
                  }} >
                  <Ionicons name="checkmark" size={24} color="#48d1cc" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={tw('items-center justify-center rounded-full w-12 h-12 md:w-14 md:h-14 my-auto bg-green-200')}
                  onPress={async () => {
                    setUserRateSelected(100);
                    onNextCard();
                  }}
                >
                  <Ionicons name="checkmark-done-sharp" size={24} color="green" />
                </TouchableOpacity>
              </View>
            }
          </>
        )}
        {showMessage &&
          <View style={tw(' flex-col w-full bottom-0')} >
            <View style={tw("bg-red-200 p-2 rounded-lg w-full flex-row justify-between items-center")}>
              <View>
                {messageContent}
              </View>
              <TouchableOpacity
                style={tw("bg-red-500 px-4 rounded-lg h-8 my-1 flex-row items-center")}
                onPress={() => goToNextSentence(false)}
              >
                <Text style={tw("text-white font-primary text-lg")}>Continuer</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
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
            <ScrollView style={[tw('flex-1'), { maxHeight: window.height * 0.8 }]}>
              <View style={tw('p-4')}>
                {getModalHelpContent(tw)}
                <TouchableOpacity onPress={() => {
                  launchTuto();
                  setIsHelpModalVisible(false);
                }} style={tw('bg-primary py-2 px-4 rounded self-center')}>
                  <Text style={tw('text-white font-bold text-center font-primary')}>Lancer le tutoriel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </CustomModal>

        <SuccessModal
          isVisible={successModalVisible}
          onDismiss={handleDismissSuccessModal}
        />

      </SafeAreaView >
    </ImageBackground >

  );
};

export default MythoOuPasScreen;