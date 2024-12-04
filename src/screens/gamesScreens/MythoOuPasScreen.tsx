import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Linking, ActivityIndicator } from "react-native";
import { useTailwind } from "tailwind-rn";
import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useUser } from 'services/context/UserContext';
import { Token } from "models/Token";
import CustomHeaderInGame from 'components/header/CustomHeaderInGame';
import PlausibilityButton from 'components/button/PlausibilityButton';
import { ErrorDetail } from "models/ErrorDetail";
import { getPlausibilityText, getTextTestPlausibility, getTextWithTokensById } from "services/api/texts";
import { TextWithTokens } from "interfaces/TextWithTokens";
import InfoText from 'components/InfoText';
import { plausibilityConfigs } from "utils/plausibilityConfigs";
import CustomModal from "components/modals/CustomModal";
import { getModalHelpContent, getTutorialContentForStep } from "tutorials/tutorialPlausibilityGame";
import HelpButton from "components/button/HelpButton";
import NextButton from "components/button/NextButton";
import { isTutorialCompleted } from "services/api/games";
import ModalDoctorsExplanation from "components/modals/ModalDoctorsExplanation";
import { UserErrorDetail } from "models/UserErrorDetail";
import { responsiveFontSize } from "utils/functions";
import SuccessModal from "components/modals/SuccessModal";
import WikiButton from "components/button/WikiButton";
import RatingButton from "components/button/RatingButton";
import { useAuth } from "services/context/AuthContext";
import { sendResponse } from "services/api/plausibility";
import WikiModal from "components/modals/WikiModal";
import WikiEncard from "components/WikiEncard";

const colors = [
  "bg-yellow-300",
  "bg-green-300",
  "bg-indigo-300",
  "bg-pink-300",
];

const MythoOuPasScreen = () => {
  const tw = useTailwind();
  const { authState } = useAuth();
  const [isModalPlausibilityVisible, setIsModalPlausibilityVisible] = useState(false);
  const [isModalWikiVisible, setIsModalWikiVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [highlightEnabled, setHighlightEnabled] = useState(false);
  const [errorSpecifying, setErrorSpecifying] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isSelectionStarted, setSelectionStarted] = useState(false);
  const [errorDetails, setErrorDetails] = useState<UserErrorDetail[]>([]);
  const [nextId, setNextId] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const window = Dimensions.get('window');
  const { user, completeTutorial, setUser, displayAchievements } = useUser();
  const [text, setText] = useState<TextWithTokens>();
  const [messageContent, setMessageContent] = useState<JSX.Element>(<></>);
  const [isComparaison, setIsComparaison] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
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
  const [wikiMode, setWikiMode] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [selectedWord, setSelectedWord] = useState('');

  useEffect(() => {
    if (!user) {
      setIsHelpModalVisible(true);
    }
  }, []);

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
        response = await getPlausibilityText();
      } else {
        // Si l'utilisateur n'est pas connecté, récupérer un texte de test par défaut
        response = await getTextTestPlausibility();
      }
      setText(response);
      setStartTime(Date.now());
    } catch (error) {
      console.error("Erreur lors de la récupération du nouveau texte :", error);
    }
  };

  const fetchTestText = async () => {
    try {
      const response = await getTextTestPlausibility();
      setText(response);
      setStartTime(Date.now());
    } catch (error) {
      console.error("Erreur lors de la récupération du texte de test.", error);
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
          response = await getTextWithTokensById(430);
          setText(response);
          break;
        case 2:
          response = await getTextWithTokensById(412);
          setText(response);
          break;
        case 3:
          response = await getTextWithTokensById(145);
          setText(response);
          break;
        case 4:
          response = await getTextWithTokensById(351);
          setText(response);
          break;
        case 5:
          response = await getTextTestPlausibility();
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
            completeTutorial(2, "MythoOuPas");
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
    setIsInvisibleTest(false);
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
    try {
      const userId = user?.id ?? 0;
      const endTime = Date.now();
      let responseTime: number;
      if (isTutorial) {
        responseTime = 10;
      } else {
        responseTime = (endTime - startTime) / 1000; // Temps en secondes
      }

      const result = await sendResponse({
        textId: text.id,
        userErrorDetails: errorDetails,
        userRateSelected: userRateSelected,
        sentencePositions: text.sentence_positions,
        responseNum: responseTime,
        userId
      });

      if (userId) {
        // @ts-ignore
        setUser(prevUser => ({
          ...prevUser,
          points: result.newPoints,
          catch_probability: result.newCatchProbability,
          trust_index: result.newTrustIndex,
          coeffMulti: result.newCoeffMulti
        }));
      }

      if (result.success) {
        if (userId > 0) {
          displayAchievements(result.newAchievements, result.showSkinModal, result.skinData);
        }
        goToNextSentence(true, true);
      } else {

        const allPositions: any = Array.from(new Set(result.correctPositions.flat()));
        setText(currentText => {
          if (!currentText) return currentText;
          return updateTokensColor(currentText, allPositions);
        });

        let plausibilityDescription;
        if (result.correctPlausibility !== null) {
          const plausibilityConfig = plausibilityConfigs.find(config => result.correctPlausibility <= config.maxThreshold) || plausibilityConfigs[plausibilityConfigs.length - 1];
          plausibilityDescription = (
            <View style={tw('flex-row items-center')}>
              <Text style={tw('text-[#B22222] font-primary text-lg')}>
                {`Hmm ce texte était plutôt ${plausibilityConfig.description}`}
              </Text>
              {/* @ts-ignore */}
              <PlausibilityButton config={plausibilityConfig.buttonConfig} />
            </View>
          );
        }

        const plausibilityConfig = result.averagePlausibility ? getPlausibilityConfig(result.averagePlausibility) : null;
        setIsComparaison(!!plausibilityConfig);
        let messageHeader = (
          <View>
            {plausibilityDescription}
            <Text style={tw(`text-${plausibilityConfig ? 'blue-800' : '[#B22222]'} font-primary text-lg`)}>
              {plausibilityConfig ? (
                <Text style={tw('text-lg text-center mb-2 ml-1')}
                >
                  {result.message}&nbsp;
                  En moyenne, ils ont choisi "{plausibilityConfig.description}"
                  {/* @ts-ignore */}
                  <PlausibilityButton config={plausibilityConfig.buttonConfig} />
                </Text>
              ) : (
                <Text style={tw(`text- ${isComparaison ? 'blue-800' : 'red-500'} font-primary text-lg`)}>
                  {result.message}
                </Text>
              )}
            </Text>
          </View>
        );

        if (isInvisibleTest && !plausibilityConfig) {
          if (userId > 0) {
            goToNextSentence(false);
          }
        } else {
          setMessageContent(messageHeader);
          setShowMessage(true);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'erreur suivante :", error);
    } finally {
      setSelectionStarted(false);
    }
  };


  const goToNextSentence = async (isCorrect = true, showSuccessModal = false) => {

    if (showSuccessModal && isCorrect) {
      setSuccessModalVisible(true);
    }
    if (isTutorial) {
      setQuestionsAsked(questionsAsked + 1);
      setIsInvisibleTest(false);
      nextTutorialStep();
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      }
    } else {
      if (isCorrect || isComparaison) {
        setIsInvisibleTest(false);
        fetchNewText();
      } else if (user) {
        fetchTestText();
        setIsInvisibleTest(true);
      } else {
        fetchTestText();
        setIsInvisibleTest(false);
      }
    }

    setErrorDetails([]);
    setShowMessage(false);
    setMessageContent(<></>);
    setErrorSpecifying(false);
    setHighlightEnabled(false);
    setUserRateSelected(100);
    setColorIndex(0);

  };

  const handleDismissSuccessModal = () => {
    setSuccessModalVisible(false);
  };

  const toggleWikiMode = (newMode?: boolean) => { setWikiMode(newMode !== undefined ? newMode : !wikiMode); }


  const HighlightedWord = ({ token, index }: { token: Token; index: number }) => {
    // const isSelected = selectedWords.includes(index);
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

  const onTokenPress = useCallback((wordIndex: number) => {
    if (wikiMode) {
      const token = text!.tokens[wordIndex];
      const word = token.content;

      setSelectedWord(word);
      setIsModalWikiVisible(true);
    } else {
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
    }
  }, [wikiMode, highlightEnabled, text, setText, setSelectionStarted]);

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
        <View style={[tw('flex-row items-center'), {
          backgroundColor: 'rgba(129, 83, 123, 0.4)',
        }
        ]}>
          <Entypo name="cross" size={24} color="red" />
          <Text style={tw('font-primary font-extrabold text-red-500')}
          >annuler la sélection</Text>
        </View>
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

  const getPlausibilityConfig = (plausibility?: number) => {
    if (plausibility === undefined) {
      return plausibilityConfigs[plausibilityConfigs.length - 1];
    }
    return plausibilityConfigs.find(config => plausibility <= config.maxThreshold) || plausibilityConfigs[plausibilityConfigs.length - 1];
  };

  return (
    <ImageBackground source={require('images/bg_room_2.jpg')} style={tw('flex-1')}>
      <View style={tw("flex-1")}>
        <ScrollView ref={scrollViewRef}>
          {wikiMode && (
            <WikiEncard />
          )}
          <CustomHeaderInGame title="Mytho ou pas" backgroundColor="bg-whiteTransparent" />
          <View style={tw('flex-row justify-between z-40')}>
            <WikiButton func={() => toggleWikiMode()} />
            <View style={tw('flex-row')}>
              <NextButton func={() => goToNextSentence(true)} isDisabled={isTutorial} />
              <HelpButton onHelpPress={showHelpModal} />
            </View>
          </View>

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
                  style={[tw('bg-blue-500 px-4 py-2 rounded-lg w-96 self-center p-3'),
                  {
                    shadowColor: 'black',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    elevation: 2
                  }]}
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
            {(tutorialStep === undefined || tutorialStep > 2 || tutorialStep === 0) && (
              <TouchableOpacity
                style={[
                  tw("p-3 mr-3 rounded-lg bg-orange-200 opacity-100"),
                ]}
                onPress={() => {
                  setIsModalPlausibilityVisible(false);
                  setHighlightEnabled(true);
                  setErrorSpecifying(true);
                  setWikiMode(false);
                }}
              >
                <Text style={tw("font-semibold text-orange-500")}
                >Source du doute</Text>
              </TouchableOpacity>
            )}

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

        <WikiModal
          isVisible={isModalWikiVisible}
          onClose={() => setIsModalWikiVisible(false)}
          word={selectedWord}
        />

        {errorSpecifying ? (
          <SafeAreaView>
            <View style={tw('absolute bottom-3 left-4 flex-row')}>
              <TouchableOpacity
                style={[
                  tw('bg-blue-500 rounded-full justify-center items-center flex-row p-1 mr-1'),
                  {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 3.84,
                    elevation: 2,
                  }
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
                    {
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.2,
                      shadowRadius: 3.84,
                      elevation: 2,
                    }
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
                  style={[tw(`px-2 items-center flex-row justify-center rounded-full h-12 mx-2 mb-1 ${isSelectionStarted ? 'bg-blue-500' : 'bg-blue-50'}`),
                  {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3.84,
                    elevation: 2,
                  }]}
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
                  style={[tw(`px-2 items-center flex-row justify-center rounded-full h-12 mx-2 ${errorDetails.length > 0 ? 'bg-primary' : 'bg-green-200'}`),
                  {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3.84,
                    elevation: 2,
                  }
                  ]}
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
                  tw("flex flex-row justify-evenly py-1 md:py-1 z-0"),
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
                <RatingButton
                  onPress={async () => {
                    setIsModalPlausibilityVisible(true);
                    setUserRateSelected(0);
                  }} iconName="cross" iconColor="red" bgColor="bg-red-200" tooltipText="Totalement faux" iconSize={32} iconLibrary="Entypo"
                />

                <RatingButton
                  onPress={async () => {
                    setIsModalPlausibilityVisible(true);
                    setUserRateSelected(25);
                  }} iconName="flag" iconColor="orange" bgColor="bg-orange-100" tooltipText="Plutôt faux" iconSize={28} iconLibrary="Entypo"
                />

                <RatingButton
                  onPress={async () => {
                    setIsModalPlausibilityVisible(true);
                    setUserRateSelected(50);
                  }} iconName="minus" iconColor="orange" bgColor="bg-yellow-100" tooltipText="Moyennement plausible" iconSize={24} iconLibrary="Entypo"
                />

                <RatingButton
                  onPress={async () => {
                    setIsModalPlausibilityVisible(true);
                    setUserRateSelected(75);
                  }} iconName="checkmark" iconColor="#48d1cc" bgColor="bg-green-50" tooltipText="Plutôt plausible" iconSize={24} iconLibrary="Ionicons"
                />

                <RatingButton
                  onPress={async () => {
                    setUserRateSelected(100);
                    onNextCard();
                  }} iconName="checkmark-done-sharp" iconColor="green" bgColor="bg-green-200" tooltipText="Complètement plausible" iconSize={24} iconLibrary="Ionicons"
                />
              </View>
            }
          </>
        )}
        {showMessage &&
          <View style={tw(' flex-col w-full bottom-0')} >
            <View style={tw(`bg-${isComparaison ? 'blue-100' : 'red-200'} p-2 rounded-lg w-full flex-row justify-between items-center`)}>

              <View style={tw(' w-5/6')}
              >
                {messageContent}
              </View>
              <TouchableOpacity
                style={tw(`bg-${isComparaison ? 'blue-500' : 'red-500'} px-4 rounded-lg h-8 my-1 flex-row items-center`)}
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
                {
                  authState.isAuthenticated &&
                  <TouchableOpacity onPress={() => {
                    launchTuto();
                    setIsHelpModalVisible(false);
                  }} style={tw('bg-primary py-2 px-4 rounded self-center')}>
                    <Text style={tw('text-white font-bold text-center font-primary')}>Lancer le tutoriel</Text>
                  </TouchableOpacity>
                }

              </View>
            </ScrollView>
          </View>
        </CustomModal>

        <SuccessModal
          isVisible={successModalVisible}
          onDismiss={handleDismissSuccessModal}
        />

      </View >
    </ImageBackground >

  );
};

export default MythoOuPasScreen;