import React, { useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const InputField = ({ value, onChangeText, placeholder, keyboardType }: {

  value: string,
  onChangeText?: any;
  placeholder?: any,
  keyboardType?: any,
}) => {
  const tw = useTailwind();
  const [isValidEmail, setIsValidEmail] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (text: string) => {
    if (emailRegex.test(text) || text === '') {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
    onChangeText(text);
  };

  return (
    <View style={tw('mb-4')}>
      <TextInput
        style={tw(`bg-white text-lg p-3 border ${isValidEmail ? 'border-gray-300' : 'border-red-500'} rounded`)}
        value={value}
        onChangeText={handleEmailChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
      {!isValidEmail && <Text style={tw('text-red-500 text-xs mt-1 font-primary text-center')}>Veuillez entrer une adresse e-mail valide.</Text>}
    </View>
  );
};

export default InputField;
