import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import { ErrorType } from "models/ErrorType";
import { useUser } from 'services/context/UserContext';
import { getTextWithErrorValidated } from "services/api/texts";
import { TextWithError } from "interfaces/TextWithError";
import { getTypesError } from "services/api/errors";
import CustomHeaderInGame from "components/header/CustomHeaderInGame";

const ErrorTypeGameScreen = ({ }) => {
  const tw = useTailwind();
  const [text, setText] = useState<TextWithError>();
  const [errorTypes, setErrorTypes] = useState<ErrorType[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const response = await getTextWithErrorValidated(user?.id);
          setText(response);
          console.log("getTextWithErrorValidated");

          const responseTypeError = await getTypesError();
          setErrorTypes(responseTypeError);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user]);

  const renderErrorTypeButtons = () => {
    return errorTypes.map((errorType) => (
      <TouchableOpacity
        key={errorType.id}
        style={tw("bg-blue-500 m-2 p-2 rounded-full")}
        onPress={() => onTypeErrorPress(errorType)}
      >
        <Text style={tw("text-white text-base")}>{errorType.name}</Text>
      </TouchableOpacity>
    ));
  };

  const onTypeErrorPress = (errorType: ErrorType) => {
    // TODO: handle error type selection
  };

  const renderText = () => {
    console.log(text);

    if (typeof text === "undefined") {
      return null;
    }
    const errorPositions = text.positionErrorTokens.split(", ").map(Number);
    return (
      <View style={tw("flex-row flex-wrap")}>
        {text && text.tokens.map((token, idx) => (

          <Text
            key={idx}
            style={[
              tw("text-xl"),
              errorPositions.includes(token.position) && tw("bg-red-200")
            ]}
          >
            {token.content + (token.is_punctuation ? "" : " ")}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <ImageBackground source={require('images/bg_corridor_dark.png')} style={tw('flex-1')}>
      <SafeAreaView style={tw("flex-1")}>
        <ScrollView >
          <CustomHeaderInGame title="Spécification des types d'erreurs" backgroundColor="bg-whiteTransparent" />
          <View style={tw("flex-1 p-4 justify-center items-center")}>
            {text && renderText()}
          </View>
          <View style={tw("flex-wrap flex-row justify-around mb-4")}>
            {renderErrorTypeButtons()}
          </View>
        </ScrollView>
      </SafeAreaView >
    </ImageBackground >
  );

};

export default ErrorTypeGameScreen;
