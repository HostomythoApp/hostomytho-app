import React, { useState } from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import data from "data/fakeUserData.js";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import user from "../globalState";
import { useNavigation } from "@react-navigation/native";

const MainScreen = ({ }) => {
    const tw = useTailwind();
    const Navigation = useNavigation();

    if (user.idUser === -1) {
        return (
            <View style={tw("flex-1 justify-center items-center")}>
                <MainTitle title={"Bienvenu sur HostoMytho"} />
                <View>
                    <PrimaryButton title="Plausibilité des textes" destination="PlausibilityGame" />
                    <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntityScreen" />
                    <PrimaryButton title="Spécifier les liens temporelles" destination="TemporalLinkGameScreen" />
                    <PrimaryButton title="Connexion" destination="Login" />
                    <PrimaryButton title="Inscription" destination="SignIn" />
                </View>
            </View>);
    } else {
        return (<View style={tw("flex-1 justify-center items-center")}>
            <MainTitle title={"Bonjour " + data.member[user.idUser].login} />
            <View>
                <PrimaryButton title="Plausibilité des textes" destination="PlausibilityGame" />
                <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntityScreen" />
                <PrimaryButton title="Spécifier les liens temporelles" destination="TemporalLinkGameScreen" />
                <PrimaryButton title="Profil" destination="Profile" />
                <PrimaryButton title="Paramètres" destination="Settings" />
            </View>
        </View>);
    }
};

export default MainScreen;
