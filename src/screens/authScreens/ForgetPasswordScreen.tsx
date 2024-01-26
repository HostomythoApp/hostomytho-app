import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainInput from "components/MainInput";
import FunctionButton from "components/FunctionButton";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { Dimensions } from "react-native";
import { requestReset } from "services/api/utils";

const ForgetPasswordScreen = () => {
    const tw = useTailwind();
    const [mail, setMail] = useState('');
    const [mailError, setMailError] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState(''); // Nouvel état pour le message de confirmation
    const inputWidth = Math.max(Dimensions.get('window').width * 0.4, 50);

    const validateEmail = (email: string) => {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    const submit = async () => {
        setMailError(false);
        setConfirmationMessage('');

        if (!validateEmail(mail)) {
            setMailError(true);
            return;
        }

        try {
            await requestReset(mail);
            setConfirmationMessage("Si votre email est dans notre système, un mail de réinitialisation sera envoyé. Vérifiez bien dans vos spam si vous ne le voyez pas.");
            setMail('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ImageBackground source={require('images/bg_room_1.webp')} style={tw('absolute bottom-0 left-0 w-full h-full')}>
            <View style={tw("flex-1 items-center")}>
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                    <CustomHeaderEmpty title="Mot de passe oublié" backgroundColor="bg-whiteTransparent" />

                    <View style={tw('mx-auto w-full max-w-[740px] pt-20 items-center')}>
                        <View style={{ ...tw('mb-2 p-8 m-4 items-center rounded-lg w-full'), backgroundColor: 'rgba(255, 255, 255, 0.95)' }}>

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
                            <Text style={tw('text-center max-w-[500px]')}>
                                {mailError && <Text style={tw("text-red-500 font-primary")}>Veuillez entrer un email valide.</Text>}
                                {confirmationMessage && <Text style={tw("text-green-700 font-primary text-lg")}>{confirmationMessage}</Text>}
                            </Text>
                            <FunctionButton text={"Réinitialiser le mot de passe"} func={submit} width={inputWidth} />

                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default ForgetPasswordScreen;
