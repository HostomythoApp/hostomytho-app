import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ErrorType } from "models/ErrorType";
import { useUser } from 'services/context/UserContext';
import { getTextTestWithErrorValidated, getTextWithErrorValidated, getTextWithErrorValidatedNotPlayed } from "services/api/texts";
import { TextWithError } from "interfaces/TextWithError";
import { getTypeByErrorId, getTypesError, isErrorTest } from "services/api/errors";
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import { MaterialIcons } from '@expo/vector-icons';
import InfoText from "components/InfoText";
import CustomModal from "components/modals/CustomModal";
import { getModalHelpContent, getTutorialContentForStep } from "tutorials/tutorialErrorTypeGame";
import HelpButton from "components/button/HelpButton";
import NextButton from "components/button/NextButton";
import { completeTutorialForUser, isTutorialCompleted } from "services/api/games";
import ModalDoctorsExplanation from "components/modals/ModalDoctorsExplanation";

const ErrorTypeGameScreen = ({ }) => {
  const tw = useTailwind();
  const [text, setText] = useState<TextWithError>();
  const [errorTypes, setErrorTypes] = useState<ErrorType[]>([]);
  const { user } = useUser();
  const [selectedErrorType, setSelectedErrorType] = useState<number>(0);
  const { updateUserStats } = useUser();
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
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

  useEffect(() => {
    fetchNewTypesError();
  }, []);

  useEffect(() => {
    async function checkTutorialCompletion() {
      if (user) {
        const completed = await isTutorialCompleted(user.id, 3);
        setIsTutorial(!completed);
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
        response = await getTextWithErrorValidatedNotPlayed(user.id);
      } else {
        response = await getTextWithErrorValidated();
      }
      setText(response);
    } catch (error) {
      console.error("Erreur lors de la récupération de nouvelles erreurs :", error);
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
          response = await getTextWithErrorValidated();
          setText(response);
          break;
        case 2:
          response = await getTextWithErrorValidated();
          setText(response);
          break;
        case 3:
          response = await getTextWithErrorValidated();
          setText(response);
          break;
      }
      const tutorialContent = getTutorialContentForStep(nextStep, tw);
      if (tutorialContent) {
        showModal(tutorialContent);
      }
    } else {
      if (questionsAsked < 10) {
        fetchTestText();
      } else {
        // Si nous avons posé les 10 questions, on vérifie si l'utilisateur a réussi le tutoriel.
        if (correctAnswers >= 6) {
          showModal(getTutorialContentForStep(98, tw));
          setIsTutorial(false);

          if (user) {
            completeTutorialForUser(user.id, 3);
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

  const fetchTestText = async () => {
    try {
      const response = await getTextTestWithErrorValidated();
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
      const isTestResult = await isErrorTest(text.idErrorAggregation);
      if (isTestResult.isTest) {
        const errorTypeData = await getTypeByErrorId(text.idErrorAggregation);
        const isUserCorrect = selectedErrorType === errorTypeData.id;

        if (isUserCorrect) {
          if (!isTutorial) {
            updateUserStats(2, 1, 1);
          }
          goToNextSentence(isUserCorrect);
        } else {
          if (!isTutorial) {
            updateUserStats(0, 0, -1);
          }
          const messageCorrection = getCorrectionMessage(errorTypeData.id);
          setShowMessage(true);
          setMessageContent(messageCorrection);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'erreur suivante :", error);
    }
  };


  const goToNextSentence = async (isCorrect = false) => {
    if (isTutorial && tutorialStep > 2) {
      setQuestionsAsked(questionsAsked + 1);
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }

    setSelectedErrorType(0);
    setShowMessage(false);
    setMessageContent("");
    setLoading(false);

    if (isTutorial) {
      nextTutorialStep();
    } else {
      fetchNewText();
    }
  };


  const getCorrectionMessage = (errorTypeId: number) => {
    switch (errorTypeId) {
      case 1:
        return "L'erreur était plutôt une faute de français.";
      case 2:
        return "En réalité, c'était une erreur de vocabulaire médical.";
      case 3:
        return "Il semblerait que l'erreur concerne la cohérence médicale du texte.";
      case 4:
        return "L'erreur appartient à une autre catégorie.";
      default:
        return "L'erreur a été classée dans une catégorie inconnue.";
    }
  };
  const renderErrorTypeButtons = () => {
    return errorTypes.map((errorType) => {
      const isSelected = selectedErrorType === errorType.id;

      return (
        <TouchableOpacity
          key={errorType.id}
          style={[
            tw("m-2 p-2 rounded-full border border-[#5077BE] text-center items-center justify-center "),
            {
              backgroundColor: isSelected ? '#5077BE' : 'white',
              minWidth: 150,
            }
          ]}
          onPress={() => onTypeErrorPress(errorType)}
        >
          <Text style={[
            tw("text-base font-primary"),
            isSelected ? tw("text-white") : tw("text-[#5077BE]")
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

  const renderText = () => {
    if (typeof text === "undefined") {
      return null;
    }
    const errorPositions = text.positionErrorTokens.split(", ").map(Number);
    return (
      <View style={[
        tw("p-6 m-4 rounded-xl flex-row flex-wrap "),
        {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          shadowColor: 'black',
          shadowOffset: { width: -2.6, height: 3 },
          shadowOpacity: 0.6,
          shadowRadius: 5,
        }
      ]}>
        {text && text.tokens.map((token, idx) => (
          <Text
            key={idx}
            style={[
              tw("text-xl font-primary p-[1px]"),
              errorPositions.includes(token.position) && tw("bg-red-200")
            ]}
          >
            {token.content}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ImageBackground source={require('images/bg_corridor_dark.webp')} style={tw('flex-1')}>
      <SafeAreaView style={tw("flex-1")}>
        <ScrollView >
          <CustomHeaderInGame title="Mytho-Typo" backgroundColor="bg-whiteTransparent" />
          <View style={tw('flex-row justify-end')}>
            <NextButton bgColor="rgba(255, 255, 255, 0.9)" func={goToNextSentence} isDisabled={isTutorial} />
            <HelpButton onHelpPress={showHelpModal} />
          </View>
          <View style={tw("flex-wrap flex-row justify-around p-4 pb-0 rounded-xl")}>
            {renderErrorTypeButtons()}
          </View>
          <View style={tw("flex-1 p-4 pt-0 justify-center items-center")}>
            {text && renderText()}
          </View>
          {
            tutorialStep > 2 && isTutorial && // Vérifier si l'utilisateur est dans l'étape des 10 questions
            <View style={tw('mx-4 p-4 bg-white rounded-lg  w-72')}>
              <View style={tw('flex-row justify-between items-center mb-2')}>
                <Text style={tw('font-primary text-base text-gray-600')}>
                  Questions posées:
                </Text>
                <Text style={tw('font-primary text-lg font-bold text-blue-600')}>
                  {Math.min(questionsAsked, 10)} / 10
                </Text>
              </View>
              <View style={tw('flex-row justify-between items-center')}>
                <Text style={tw('font-primary text-base text-gray-600')}>
                  Bonnes réponses:
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
                origin={text?.origin ?? ''}
              />
            </View>
          )}
        </ScrollView>

        {selectedErrorType > 0 && (
          <View style={tw('absolute bottom-3 right-4 flex-col w-auto')}>
            <TouchableOpacity
              style={tw("bg-primary p-3 flex-row items-center justify-center rounded-full")}
              onPress={onNextCard}
            >
              <Text style={tw("text-white text-lg font-primary")}>Erreur suivante</Text>
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
                  <Text style={tw('text-white font-bold text-center font-primary')}>Relancer le tutoriel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </CustomModal>
      </SafeAreaView >
    </ImageBackground >
  );
};

export default ErrorTypeGameScreen;
