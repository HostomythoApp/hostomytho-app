import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "components/MainInput";
import FunctionButton from "components/FunctionButton";
import { useNavigation } from "@react-navigation/native";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { Dimensions } from "react-native";
import { sendMail } from "services/api/utils";

const ForgetPasswordScreen = () => {
    const tw = useTailwind();
    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState(false);
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState('');
    const inputWidth = Math.max(Dimensions.get('window').width * 0.4, 50);

    const validateEmail = (email: string) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const submit = async () => {
        setMailError(false);
        setErrorMessage('');

        if (!validateEmail(mail)) {
            setMailError(true);
            setErrorMessage('Veuillez entrer un email valide.');
            return;
        }

        try {
            const response = await sendMail(mail);
            if (response.status === 200) {
                alert("Un email a été envoyé à votre adresse pour récupérer votre mot de passe.");
                navigation.navigate("Login");
            }
        } catch (error: any) {
            if (error.response.status === 404) {
                setErrorMessage("Cet email n'est associé à aucun compte.");
            } else {
                setErrorMessage("Problème de connexion");
            }
        }
    };

    return (
        <View style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                <CustomHeaderEmpty title="Envoyer un mail de récupération" />
                <View style={tw("flex-1 justify-center items-center pt-24")}>
                    <MainInput
                        text={"Email"}
                        value={mail}
                        setter={setMail}
                        hide={false}
                        onSubmitEditing={submit}
                        isError={mailError}
                        width={inputWidth}
                        maxWidth={600}
                    />
                    {mailError && <Text style={tw("text-red-500")}>{errorMessage}</Text>}
                    <FunctionButton text={"Réinitialiser le mot de passe"} func={submit} width={inputWidth} />
                </View>
            </ScrollView>
        </View>
    );
};

export default ForgetPasswordScreen;
