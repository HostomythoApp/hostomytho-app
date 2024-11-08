import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "components/MainInput";
import FunctionButton from "components/FunctionButton";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { Dimensions } from "react-native";
import { useRoute } from '@react-navigation/native';
import { changePassword } from "services/api/utils";
import { useUser } from "services/context/UserContext";

const ChangePasswordScreen = () => {
    const tw = useTailwind();
    const { user } = useUser();
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorCheck, setPasswordErrorCheck] = useState(false);
    const navigation = useNavigation<RootStackNavigationProp<"Profil">>();
    const [errorMessage, setErrorMessage] = useState('');
    const inputWidth = Math.max(Dimensions.get('window').width * 0.4, 50);
    const route = useRoute();

    const [successMessage, setSuccessMessage] = useState('');



    const submit = async () => {
        setPasswordError(false);
        setPasswordErrorCheck(false);
        setErrorMessage('');
        setSuccessMessage('');

        if (password.length < 6) {
            setErrorMessage("Le mot de passe doit comporter au moins 6 caractères");
            return;
        }

        if (password.trim() === "") {
            setPasswordError(true);
            return;
        }
        if (password.trim() === "") {
            setPasswordErrorCheck(true);
            return;
        }

        if (password !== passwordCheck) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            if (user?.id) {
                await changePassword(password);
                setSuccessMessage("Votre mot de passe a été modifié avec succès.");
                setPassword('');
                setPasswordCheck('');
                setTimeout(() => {
                    navigation.navigate("Profil");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage("Erreur lors de la modification du mot de passe");
        }
    };


    return (
        <ImageBackground source={require('images/bg_office.jpg')} style={tw('absolute bottom-0 left-0 w-full h-full')}>

            <View style={tw("flex-1 items-center text-black")}>

                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                    <CustomHeaderEmpty title="Changement de mot de passe" backgroundColor="bg-whiteTransparent" />

                    <View style={tw('mx-auto w-full max-w-[740px] pt-20 items-center')}>
                        <View style={{ ...tw('mb-2 p-8  pt-12  m-4 rounded-lg w-full items-center'), backgroundColor: 'rgba(255, 255, 255, 1)' }}>

                            <Text style={tw('font-primary mb-2')}
                            >Entrez votre nouveau mot de passe. Celui-ci doit faire au moins 6 charactères.</Text>
                            <MainInput
                                text={"Nouveau mot de passe"}
                                value={password}
                                setter={setPassword}
                                hide={true}
                                onSubmitEditing={submit}
                                isError={passwordError}
                                width={inputWidth}
                                maxWidth={600}

                            />
                            {passwordError && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}
                            <MainInput
                                text={"Confirmer le mot de passe"}
                                value={passwordCheck}
                                setter={setPasswordCheck}
                                hide={true}
                                onSubmitEditing={submit}
                                isError={passwordErrorCheck}
                                width={inputWidth}
                                maxWidth={600}
                            />
                            {passwordErrorCheck && <Text style={tw("text-red-500")}>Veuillez remplir ce champ.</Text>}

                            <Text style={tw('text-center mt-1')}>
                                {errorMessage && <Text style={tw("font-primary text-lg text-red-500")}>{errorMessage}</Text>}
                                {successMessage && <Text style={tw("font-primary text-lg text-green-700")}>{successMessage}</Text>}
                            </Text>
                            <View style={tw('flex-row content-around')}
                            >
                                <TouchableOpacity
                                    // @ts-ignore
                                    onPress={() => navigation.navigate("ParametreProfil")}
                                    style={tw(` bg-secondary rounded mr-2 py-2 px-12 my-2 font-medium w-[250px]`)}
                                >
                                    <Text style={tw('text-white text-center text-lg font-primary')}
                                    >Retour</Text>
                                </TouchableOpacity>
                                <FunctionButton text={"Valider"} func={submit} width={250} />

                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default ChangePasswordScreen;