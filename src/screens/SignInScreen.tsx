import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "../components/MainInput";
import data from "data/fakeUserData.js";
import FunctionButton from "../components/FunctionButton";
import user from "../globalState";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "services/contexts/AuthContext";
import { signInUser } from "../services/api/user";


const LoginScreen = () => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const { storeToken } = useAuth();


    const submit = async () => {
        if (username.trim() === "" || password.trim() === "") {
            alert("Erreur, Veuillez remplir tous les champs");
        } else {
            try {
                const response = await signInUser(username, password);
                if (response.status === 200) {
                    const token = response.data.token;
                    await storeToken(token);
                    navigation.navigate("Main");
                } else {
                    alert(response.data.error);
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                alert("Erreur lors de la connexion, veuillez réessayer.");
            }
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
