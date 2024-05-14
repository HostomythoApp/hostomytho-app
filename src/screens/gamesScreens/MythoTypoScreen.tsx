import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Linking } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ErrorType } from "models/ErrorType";
import { useUser } from 'services/context/UserContext';
import { getTextTestWithErrorValidated, getTextWithErrorValidated, getTextWithErrorValidatedById, getTextWithErrorValidatedNotPlayed } from "services/api/texts";
import { TextWithError } from "interfaces/TextWithError";
import { createUserTypingError, getTypeByErrorId, getTypesError, isErrorTest } from "services/api/errors";
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import { MaterialIcons } from '@expo/vector-icons';
import InfoText from "components/InfoText";
import CustomModal from "components/modals/CustomModal";
import { getModalHelpContent, getTutorialContentForStep } from "tutorials/tutorialErrorTypeGame";
import HelpButton from "components/button/HelpButton";
import NextButton from "components/button/NextButton";
import { completeTutorialForUser, isTutorialCompleted } from "services/api/games";
import ModalDoctorsExplanation from "components/modals/ModalDoctorsExplanation";
import { openWikipediaPageForWord, responsiveFontSize } from "utils/functions";
import SuccessModal from "components/modals/SuccessModal";
import WikiButton from "components/button/WikiButton";

const MythoTypoScreen = ({ }) => {
  const tw = useTailwind();
  const [text, setText] = useState<TextWithError>();
  const [errorTypes, setErrorTypes] = useState<ErrorType[]>([]);
  const { user, completeTutorial } = useUser();
  const [selectedErrorType, setSelectedErrorType] = useState<number>(0);
  const { updateUserStats } = useUser();
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const window = Dimensions.get('window');
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isTutorial, setIsTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [tutorialFailed, setTutorialFailed] = useState(false);
  const [isTutorialCheckComplete, setIsTutorialCheckComplete] = useState(false);
  const [resetTutorialFlag, setResetTutorialFlag] = useState(false);
  const [isInvisibleTest, setIsInvisibleTest] = useState(false);
  const [wikiMode, setWikiMode] = useState(false);

  useEffect(() => {
    fetchNewTypesError();
  }, []);

  useEffect(() => {
    async function checkTutorialCompletion() {
      if (user) {
        const completed = await isTutorialCompleted(user.id, 3);
        setIsTutorial(!completed);
        setIsTutorialCheckComplete(true);
      } else {
        setIsTutorial(false);
        setIsTutorialCheckComplete(true);
      }
    }
    checkTutorialCompletion();
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

        const randomNumber = Math.floor(Math.random() * 100);

        // 20% de chance d'avoir un test
        if (randomNumber < 20) {
          response = await getTextTestWithErrorValidated();
        } else {
          response = await getTextWithErrorValidatedNotPlayed(user.id);
          // response = await getTextWithTokensById(114);
        }

      } else {
        response = await getTextWithErrorValidated();
      }
      setText(response);
    } catch (error) {
      console.error("Erreur lors de la récupération de nouvelles erreurs :", error);
    }
  };

  const fetchTestText = async () => {
    try {
      const response = await getTextTestWithErrorValidated();
      setText(response);
    } catch (error) {
      console.error("Erreur lors de la récupération du texte de test.", error);
    }
  };

  const fetchNewTypesError = async () => {
    const responseTypeError = await getTypesError();
    setErrorTypes(responseTypeError);
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
          break;
        case 2:
          // response = await getTextWithErrorValidatedById(54);
          response = await getTextWithErrorValidatedById(5);
          setText(response);
          break;
        case 3:
          response = await getTextWithErrorValidatedById(53);
          setText(response);
          break;
        case 4:
          response = await getTextWithErrorValidatedById(145);
          setText(response);
          break;
        case 5:
          response = await getTextTestWithErrorValidated();
          setText(response);
          break;
      }
      const tutorialContent = getTutorialContentForStep(nextStep, tw);
      if (tutorialContent) {
        if (tutorialStep == 1) {
          setTimeout(() => {
            showModal(tutorialContent);
          }, 600);
        } else {
          showModal(tutorialContent);
        }
      }
    } else {
      if (questionsAsked < 7) {
        fetchTestText();
      } else {
        // Si nous avons posé les 10 questions, on vérifie si l'utilisateur a réussi le tutoriel.
        if (correctAnswers >= 4) {
          showModal(getTutorialContentForStep(98, tw));
          setIsTutorial(false);
          if (user) {
            completeTutorial(3, "MythoTypo");
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
    if (tutorialStep == 1) {
      nextTutorialStep();
    }
  };

  const launchTuto = () => {
    setResetTutorialFlag(true);
    setSelectedErrorType(0);
    setShowMessage(false);
    setMessageContent("");
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
      console.error("Aucune erreur à traiter.");
      return;
    }

    try {
      const isTestResult = await isErrorTest(text.idUserErrorDetail);
      if (isTestResult.isTest) {
        const errorTypeData = await getTypeByErrorId(text.idUserErrorDetail);
        const isUserCorrect = selectedErrorType === errorTypeData.id;

        if (isUserCorrect) {
          if (!isTutorial) {
            updateUserStats(3, 1, 2);
          }
          goToNextSentence(isUserCorrect);
        } else {


          if (isInvisibleTest) {
            updateUserStats(3, 1, 2);
            goToNextSentence(false);
          } else {
            updateUserStats(0, 0, -1);
            const messageCorrection = getCorrectionMessage(errorTypeData.id);
            setShowMessage(true);
            setMessageContent(messageCorrection);
          }
        }
      } else {
        updateUserStats(3, 1, 0);
        const userTypingErrorData = {
          // @ts-ignore
          user_id: user.id,
          user_error_details_id: text.idUserErrorDetail,
          error_type_id: selectedErrorType,
        };
        // TODO augmenter poids erreur concernée
        await createUserTypingError(userTypingErrorData);
        goToNextSentence(true);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'erreur suivante :", error);
    }
  };


  const goToNextSentence = async (isCorrect = false) => {
    if (isTutorial) {
      setQuestionsAsked(questionsAsked + 1);
      if (isCorrect) {
        setSuccessModalVisible(true);
        setCorrectAnswers(correctAnswers + 1);
      }
    }
    setSelectedErrorType(0);
    setShowMessage(false);
    setMessageContent("");
    setLoading(false);
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

  const getCorrectionMessage = (errorTypeId: number) => {
    switch (errorTypeId) {
      case 1:
        return "L'erreur était plutôt une faute de français.";
      case 2:
        return "L'erreur concerne la cohérence médicale du texte.";
      case 3:
        return "L'erreur est une répétition.";
      case 4:
        return "L'erreur appartient à une autre catégorie.";
      default:
        return "Ce n'était pas une erreur.";
    }
  };

  const renderErrorTypeButtons = () => {
    return errorTypes.map((errorType) => {
      const isSelected = selectedErrorType === errorType.id;

      return (
        <TouchableOpacity
          key={errorType.id}
          style={[
            tw("m-2 p-2 rounded-full text-center items-center justify-center "),
            {
              backgroundColor: isSelected ? '#B0E0E6' : '#adbfe1',
              minWidth: 150,
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowRadius: 4,
              elevation: 3
            }
          ]}
          // @ts-ignore
          onPress={() => onTypeErrorPress(errorType)}
        >
          <Text style={[
            tw("text-base font-primary"),
            isSelected ? tw("text-black") : tw("text-white")
          ]}>
            {errorType.name}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  const onTypeErrorPress = (errorType: ErrorType) => {
    setSelectedErrorType(errorType.id);
  };

  const onTokenPress = useCallback((wordIndex: number) => {
    if (wikiMode) {
      const token = text!.tokens[wordIndex];
      const word = token.content;
      openWikipediaPageForWord(word);
      // toggleWikiMode(false);
    }
  }, [wikiMode]);

  const renderText = () => {
    if (typeof text === "undefined") {
      return null;
    }
    const errorPositions = text.positionErrorTokens.split(", ").map(Number);

    return (
      <View style={[
        tw("p-6 m-4 rounded-xl flex-row flex-wrap "),
        {
          backgroundColor: 'rgba(176, 224, 230, 0.92)',
          shadowColor: 'black',
          shadowOffset: { width: -2.6, height: 3 },
          shadowOpacity: 0.6,
          shadowRadius: 5,
        }
      ]}>
        {text && text.tokens.flatMap((token, idx) => {
          const isNewLine = token.content.includes('\n');
          if (isNewLine) {
            // Créer un élément pour chaque saut de ligne dans le token
            return token.content.split('\n').map((_, lineIdx) => (
              <View key={`${idx}-${lineIdx}`} style={{ width: '100%', height: lineIdx === 0 ? 0 : 20 }} />
            ));
          } else {
            // Pour les autres tokens, retourner simplement le texte
            return (
              <TouchableOpacity
                key={idx}
                onPress={showMessage ? undefined : () => onTokenPress(idx)}
                style={[
                  tw("font-primary p-[1px]"),
                  errorPositions.includes(token.position) && tw("bg-red-200")]}>
                <Text
                  style={[
                    tw("font-primary text-gray-800"),
                    token.color ? tw(token.color) : null,
                    {
                      fontSize: responsiveFontSize(30)
                    }
                  ]}>
                  {token.content}
                </Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  return (
    <ImageBackground source={require('images/bg_room_1.jpg')} style={tw('flex-1')}>
      <View style={tw("flex-1")}>
        <ScrollView>
          {wikiMode && (
            <View style={tw('p-[13px] w-full bg-blue-100 absolute z-30')}>
              <Text style={tw('font-primary text-[16px] text-center text-blue-800')}>
                Mode Wiki activé : cliquez sur un mot pour voir sa page Wikipedia. Cliquez à nouveau dessus pour quitter ce mode.
                {"\n"}
                Attention, certaines pages peuvent contenir des images sensibles ou inappropriés.
              </Text>
            </View>
          )}
          <CustomHeaderInGame title="Mytho-Typo" backgroundColor="bg-whiteTransparent" />
          <View style={tw('flex-row justify-between z-40')}>
            <WikiButton func={() => toggleWikiMode()} />
            <View style={tw('flex-row')}>
              <NextButton func={goToNextSentence} isDisabled={isTutorial} />
              <HelpButton onHelpPress={showHelpModal} />
            </View>
          </View>
          <View style={tw("flex-wrap flex-row justify-around p-4 pb-0 rounded-xl")}>
            {renderErrorTypeButtons()}
          </View>
          <View style={tw("flex-1 p-4 pt-0 justify-center items-center")}>
            {text && renderText()}
          </View>
          {
            isTutorial &&
            <View style={tw('mx-4 p-4 bg-white rounded-lg  w-72')}>
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
          {user?.moderator && (
            <View style={tw("mb-4 mx-2")}>
              <InfoText
                textId={text?.id ?? 0}
                num={text?.num ?? ''}
                idUserErrorDetail={text?.idUserErrorDetail ?? 0}
                vote_weight={text?.vote_weight ?? 0}
              />
            </View>
          )}
        </ScrollView>

        {selectedErrorType > 0 && (
          <View style={tw('absolute bottom-3 right-4 flex-col w-auto')}>
            <TouchableOpacity
              disabled={showMessage}
              style={[
                tw("bg-primary py-2 px-4 flex-row items-center justify-center rounded-full"),
                {
                  minWidth: 150,
                  shadowColor: 'black',
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                  elevation: 3
                }
              ]}
              onPress={onNextCard}
            >
              <Text style={tw("text-white text-lg font-primary")}
              >Cas suivant</Text>
              <MaterialIcons name="navigate-next" size={24} color={'white'} />
            </TouchableOpacity>
          </View>
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
      </View >
    </ImageBackground >
  );
};

export default MythoTypoScreen;
