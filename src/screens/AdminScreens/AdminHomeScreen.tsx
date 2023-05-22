import React from 'react';
import { View, Text } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const AdminHomePage = () => {
  const tw = useTailwind();

  return (
    <View style={tw('flex-1 justify-center items-center')}>
      <Text style={tw('text-2xl text-blue-500')}>Page d'accueil de l'administration</Text>
    </View>
  );
};

export default AdminHomePage;
