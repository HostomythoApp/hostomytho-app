import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ErrorType } from "models/ErrorType";
import { useUser } from 'services/context/UserContext';
import { getTextWithErrorValidated, getTextWithErrorValidatedNotPlayed } from "services/api/texts";
import { TextWithError } from "interfaces/TextWithError";
import { getTypeByErrorId, getTypesError, isErrorTest } from "services/api/errors";
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import { MaterialIcons } from '@expo/vector-icons';
import InfoText from "components/InfoText";
import CustomModal from "components/modals/CustomModal";
import { getModalHelpContent } from "tutorials/tutorialErrorTypeGame";
import HelpButton from "components/button/HelpButton";
import NextButton from "components/button/NextButton";

const ErrorTypeGameScreen = ({ }) => {
  const tw = useTailwind();
  const [text, setText] = useState<TextWithError>();
  const [errorTypes, setErrorTypes] = useState<ErrorType[]>([]);
  const { user } = useUser();
  // const [selectedErrorTypes, setSelectedErrorTypes] = useState<number[]>([]);
  // const isNextButtonDisabled = selectedErrorTypes.length === 0;
  const [selectedErrorType, setSelectedErrorType] = useState<number | null>(null);
  const isNextButtonDisabled = selectedErrorType === null;
  const { updateUserStats } = useUser();
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const window = Dimensions.get('window');
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNewText = async () => {
    try {
      let response;
      if (user) {
        response = await getTextWithErrorValidatedNotPlayed(user.id);
      } else {
        response = await getTextWithErrorValidated();
      }
      setText(response);
      const responseTypeError = await getTypesError();
      setErrorTypes(responseTypeError);
    } catch (error) {
      console.error("Erreur lors de la récupération de nouvelles erreurs :", error);
    }
  };

  useEffect(() => {
    fetchNewText();
  }, []);

  // *********** Gestion Tuto *******************
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
          updateUserStats(2, 1, 1);
          goToNextSentence();
        } else {
          updateUserStats(0, 0, -1);
          const messageCorrection = getCorrectionMessage(errorTypeData.id);
          setMessageContent(messageCorrection);
          setShowMessage(true);
        }
      } else {
        goToNextSentence();
      }
    } catch (error) {
      console.error("Erreur lors de la vérification de l'erreur suivante :", error);
    }

  };

  const goToNextSentence = async () => {
    // setSelectedErrorTypes([]);
    setSelectedErrorType(0);
    setShowMessage(false);
    setMessageContent("");
    setLoading(false);
    fetchNewText();
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
      // const isSelected = selectedErrorTypes.includes(errorType.id);
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

  // const onTypeErrorPress = (errorType: ErrorType) => {
  //   setSelectedErrorType(prevState => prevState === errorType.id ? null : errorType.id);
  // };

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
            <NextButton bgColor="rgba(255, 255, 255, 0.9)" func={goToNextSentence} />
            <HelpButton onHelpPress={showHelpModal} />
          </View>
          <View style={tw("flex-wrap flex-row justify-around p-4 pb-0 rounded-xl")}>
            {renderErrorTypeButtons()}
          </View>
          <View style={tw("flex-1 p-4 pt-0 justify-center items-center")}>
            {text && renderText()}
          </View>
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

        {!isNextButtonDisabled && (
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
                onPress={goToNextSentence}
              >
                <Text style={tw("text-white font-primary text-lg")}>Continuer</Text>
              </TouchableOpacity>
            </View>

          }
        </View>

        <CustomModal
          isVisible={isHelpModalVisible}
          onClose={() => setIsHelpModalVisible(false)}
        >
          <View style={tw('flex-1')}>
            <ScrollView style={[tw('flex-1'), { maxHeight: window.height * 0.8 }]}>
              <View style={tw('p-4')}>
                {getModalHelpContent(tw)}
              </View>
            </ScrollView>
          </View>
        </CustomModal>
      </SafeAreaView >
    </ImageBackground >
  );
};

export default ErrorTypeGameScreen;
