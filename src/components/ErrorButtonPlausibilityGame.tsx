import React, { FC } from "react";
import { useTailwind } from "tailwind-rn";
import { Text, TouchableOpacity } from "react-native";

interface ErrorButtonPlausibilityGameProps {
  type: 'Cohérence médicale' | 'Cohérence linguistique';
  setSelectedErrorType: (type: string) => void;
  selectedErrorType: string | null;
}

const ErrorButtonPlausibilityGame: FC<ErrorButtonPlausibilityGameProps> = ({ type, setSelectedErrorType, selectedErrorType }) => {
  const tw = useTailwind();
  const isSelected = type === selectedErrorType;
  return (
    <TouchableOpacity
      style={[
        tw(' mx-4 items-center justify-center rounded-lg border border-blue-500 py-2 px-4 '),
        isSelected ? tw('bg-blue-500') : tw('bg-white'),
      ]}
      onPress={() => {
        setSelectedErrorType(type);
      }}
    >
      <Text style={tw(`${isSelected ? 'text-white' : 'text-blue-500'} font-primary text-lg`)}>{type}</Text>
    </TouchableOpacity>
  );
};

export default ErrorButtonPlausibilityGame;
