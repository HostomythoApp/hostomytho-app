import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ErrorType } from "models/ErrorType";
import { useUser } from 'services/context/UserContext';
import { getTextWithErrorValidated, getTextWithErrorValidatedNotPlayed } from "services/api/texts";
import { TextWithError } from "interfaces/TextWithError";
import { getTypesError } from "services/api/errors";
import CustomHeaderInGame from "components/header/CustomHeaderInGame";
import { MaterialIcons } from '@expo/vector-icons';
import InfoText from "components/InfoText";
import CustomModal from "components/modals/CustomModal";
import { getModalHelpContent } from "tutorials/tutorialErrorTypeGame";
import HelpButton from "components/button/HelpButton";

const ErrorTypeGameScreen = ({ }) => {
  const tw = useTailwind();
  const [text, setText] = useState<TextWithError>();
  const [errorTypes, setErrorTypes] = useState<ErrorType[]>([]);
  const { user } = useUser();
  const [selectedErrorTypes, setSelectedErrorTypes] = useState<number[]>([]);
  const isNextButtonDisabled = selectedErrorTypes.length === 0;
  const { incrementPoints } = useUser();
  const [isHelpModalVisible, setIsHelpModalVisible] = useState(false);
  const window = Dimensions.get('window');
  
  const fetchData = async () => {
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
      setSelectedErrorTypes([]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  // *********** Gestion Tuto *******************
  const showHelpModal = () => {
    setIsHelpModalVisible(true)
  };
  // *****************************************************

  const handleNextError = () => {
    const isOtherSelected = selectedErrorTypes.some(errorTypeId => {
      const errorType = errorTypes.find(et => et.id === errorTypeId);
      return errorType?.name === "Autre";
    });

    if (!isOtherSelected && selectedErrorTypes.length > 0 && user) {
      incrementPoints(2);
    }
    fetchData();
  };

  const renderErrorTypeButtons = () => {
    return errorTypes.map((errorType) => {
      const isSelected = selectedErrorTypes.includes(errorType.id);
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
    if (selectedErrorTypes.includes(errorType.id)) {
      setSelectedErrorTypes(prevState => prevState.filter(id => id !== errorType.id));
    } else {
      setSelectedErrorTypes(prevState => [...prevState, errorType.id]);
    }
  };

  const renderText = () => {
    if (typeof text === "undefined") {
      return null;
    }
    const errorPositions = text.positionErrorTokens.split(", ").map(Number);
    return (
      <View style={[
        tw("bg-gray-100 p-6 m-4 rounded-xl flex-row flex-wrap "),
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
          <HelpButton onHelpPress={showHelpModal} />

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
              onPress={handleNextError}
            >
              <Text style={tw("text-white text-lg font-primary")}>Erreur suivante</Text>
              <MaterialIcons name="navigate-next" size={24} color={'white'} />
            </TouchableOpacity>
          </View>
        )}
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
