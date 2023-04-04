import { useTailwind } from "tailwind-rn";
import {Text, TextInput, TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const MainInput = ({
  value,
    text,
    hide,
    setter,
}:{
    setter: any,
    text: string,
    hide: boolean,
}) => {
  const tw = useTailwind();

  return (

      <TextInput
          style={tw("block my-1 px-2 py-1 text-base leading-6 text-gray-700 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300")}
          placeholder={text}
          value={value}
          secureTextEntry={hide}
          onChangeText={setter}
      />

  );
};

export default MainInput;
