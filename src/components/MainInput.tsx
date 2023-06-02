import { useTailwind } from "tailwind-rn";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const MainInput = ({
  text,
  hide,
  setter,
  value,
  onSubmitEditing,
  isError
}: {
  setter: any;
  text: string,
  hide: boolean,
  value: string,
  onSubmitEditing?: any;
  isError: boolean
}) => {
  const tw = useTailwind();
  const errorStyle = isError ? tw("border-red-500") : {};

  return (
    <TextInput
      style={{ ...tw("block my-1 px-2 py-1 leading-6 text-gray-700 border border-gray-300 rounded-md"), ...errorStyle }}
      placeholder={text}
      secureTextEntry={hide}
      onChangeText={setter}
      value={value}
      onSubmitEditing={onSubmitEditing}
    />
  );
};

export default MainInput;
