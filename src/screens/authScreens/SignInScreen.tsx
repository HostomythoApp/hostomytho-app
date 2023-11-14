import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "components/MainInput";
import FunctionButton from "components/FunctionButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "services/context/AuthContext";
import { signInUser } from "services/api/user";
import { useUser } from "services/context/UserContext";
import { RootStackNavigationProp } from "navigation/Types";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { Dimensions } from "react-native";

const LoginScreen = () => {
    const tw = useTailwind();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const { storeToken } = useAuth();
    const { setUser } = useUser();
    const navigation = useNavigation<RootStackNavigationProp<"ForgetPassword">>();
    const [errorMessage, setErrorMessage] = useState('');
    const inputWidth = Math.max(Dimensions.get('window').width * 0.4, 50);

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
                    navigation.navigate("TableauDeBord");
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
        <View style={tw("flex-1")}>

            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                <CustomHeaderEmpty title="Connexion" />
                <View style={tw("flex-1 justify-center items-center pt-24")}>
                    <MainInput
                        text={"Pseudo"}
                        value={username}
                        setter={setUsername}
                        hide={false}
                        onSubmitEditing={submit}
                        isError={usernameError}
                        width={inputWidth}
                        maxWidth={600}
                    />
                    {usernameError && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}
                    <MainInput
                        text={"Mot de passe"}
                        value={password}
                        setter={setPassword}
                        hide={true}
                        onSubmitEditing={submit}
                        isError={passwordError}
                        width={inputWidth}
                        maxWidth={600}
                    />
                    {passwordError && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}

                    <Text>
                        {errorMessage && <Text style={tw("text-red-500")}>{errorMessage}</Text>}
                    </Text>
                    <FunctionButton text={"Connexion"} func={submit} width={inputWidth} />
                    <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
                        <Text style={tw("text-blue-500 mt-2")}>Mot de passe oublié ?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default LoginScreen;