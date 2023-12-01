import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { RootStackNavigationProp } from "navigation/Types";
import { useNavigation } from "@react-navigation/native";

const AdminLoginScreen = () => {
  const tw = useTailwind();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');    
  const navigation = useNavigation<RootStackNavigationProp<"Menu">>();


  const handleLogin = () => {
    // TODO: vérifier les informations de connexion de l'administrateur
    // faire appel à API pour vérifier ces informations
   if (username && password) {
      navigation.navigate('AdminHome');
    } else {
      Alert.alert('Erreur', 'Veuillez entrer un nom d\'utilisateur et un mot de passe.');
    }
  };

  return (
    <View style={tw('flex-1 justify-center p-4')}>
      <TextInput
        style={tw('border-2 border-gray-200 rounded-lg p-2 mb-4')}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={tw('border-2 border-gray-200 rounded-lg p-2 mb-4')}
        placeholder="Mot de passe"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} />
    </View>
  );
};

export default AdminLoginScreen;
