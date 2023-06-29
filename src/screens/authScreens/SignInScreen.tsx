import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "components/MainInput";
import FunctionButton from "components/FunctionButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "services/context/AuthContext";
import { signInUser } from "services/api/user";
import { useUser } from "services/context/UserContext";
import { RootStackNavigationProp } from "navigation/Types";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const LoginScreen = () => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { storeToken } = useAuth();
    const { setUser } = useUser();
    const navigation = useNavigation<RootStackNavigationProp<"Main">>();
    const [errorMessage, setErrorMessage] = useState('');

    const submit = async () => {
        setUsernameError(false);
        setPasswordError(false);
        setErrorMessage('');

        if (username.trim() === "" || password.trim() === "") {
            if (username.trim() === "") setUsernameError(true);
            if (password.trim() === "") setPasswordError(true);
        } else {
            try {
                const response = await signInUser(username, password);
                if (response.status === 200) {
                    const token = response.data.token;
                    await storeToken(token);
                    setUser(response.data.user);
                    navigation.navigate("Main");
                }
            } catch (error: any) {
                if (error.response.status === 401) {
                    setErrorMessage("Mot de passe incorrect");
                } else if (error.response.status === 404) {
                    setErrorMessage("L'utilisateur n'existe pas");
                } else {
                    setErrorMessage("Problème de connexion");
                }
            }
        }
    };

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <CustomHeaderEmpty title="Connexion" />
            <MainInput
                text={"Pseudo"}
                value={username}
                setter={setUsername}
                hide={false}
                onSubmitEditing={submit}
                isError={usernameError}
            />
            {usernameError && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}
            {/* TODO Ajouter mot de passe oublié */}
            <MainInput
                text={"Mot de passe"}
                value={password}
                setter={setPassword}
                hide={true}
                onSubmitEditing={submit}
                isError={passwordError}
            />
            {passwordError && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}

            <FunctionButton text={"Connexion"} func={submit} />
            <Text>
                {errorMessage && <Text style={tw("text-red-500")}>{errorMessage}</Text>}
            </Text>
        </View>
    );
};

export default LoginScreen;
