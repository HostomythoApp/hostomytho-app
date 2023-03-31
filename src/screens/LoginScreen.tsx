import React, {useState} from "react";
import {Alert, Button, Text, TextInput, View} from "react-native";
import {useTailwind} from "tailwind-rn";

const LoginScreen = ({}) => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const submit = () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Erreur, Veuillez remplir tous les champs');
        } else {
            alert(`Nom : ${username}\nPassword : ${password}`);
        }
    };

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <TextInput
                style={tw("block w-full px-3 py-2 text-base leading-6 text-gray-700 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300\" type=\"text\" placeholder=\"Login\" ")}
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={tw("block w-full px-3 py-2 text-base leading-6 text-gray-700 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300\" type=\"text\" placeholder=\"Mot de passe")}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button title="Connexion" onPress={submit}/>
        </View>
    );
};

export default LoginScreen;
