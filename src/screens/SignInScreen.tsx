import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "../components/MainInput";
import data from "data/fakeUserData.js";
import FunctionButton from "../components/FunctionButton";
import user from "../globalState";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "services/contexts/AuthContext";

const LoginScreen = () => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { storeToken } = useAuth();

    const submit = async () => {
        if (username.trim() === '' || password.trim() === '') {
            alert('Erreur, Veuillez remplir tous les champs');
        } else {
            // TODO Effectuez la requête de connexion et récupérez le token JWT, gérer les erreurs
            const token = "votre_token_jwt";
            await storeToken(token);
        }
    };

    return (
        <View style={tw("flex-1 justify-center items-center")}>

            <MainInput text={"Pseudo"} value={username} setter={setUsername} hide={false} />

            <MainInput text={"Mot de passe"} value={password} setter={setPassword} hide={true} />

            <FunctionButton text={"Connexion"} func={submit} />
        </View>
    );
};

export default LoginScreen;
