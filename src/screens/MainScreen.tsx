import React, { useState } from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import LogoutButton from "components/LogoutButton";

const MainScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();

    if (!authState.isAuthenticated) {
        return (
            <View style={tw("flex-1 justify-center items-center")}>
                <MainTitle title={"Bienvenue sur HostoMytho"} />
                <View>
                    <PrimaryButton title="Plausibilité des textes" destination="PlausibilityGame" />
                    <PrimaryButton title="Plausibilité des textes détaillée" destination="PlausibilityGameDetailed" />
                    <PrimaryButton title="Spécifier le type des phrases" destination="TypeSentenceGame" />
                    <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntity" />
                    <PrimaryButton title="Spécifier les liens temporelles" destination="TemporalLinkGame" />
                    <PrimaryButton title="Connexion" destination="Login" />
                    <PrimaryButton title="Inscription" destination="SignUpScreen" />
                    <PrimaryButton title="Profil" destination="Profile" />
                </View>
            </View>);
    } else {
        return (<View style={tw("flex-1 justify-center items-center")}>
            <MainTitle title={"Bonjour " + user?.username} />
            <View>
                <PrimaryButton title="Plausibilité des textes" destination="PlausibilityGame" />
                <PrimaryButton title="Plausibilité des textes détaillée" destination="PlausibilityGameDetailed" />
                <PrimaryButton title="Spécifier le type des phrases" destination="TypeSentenceGame" />
                <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntity" />
                <PrimaryButton title="Spécifier les liens temporelles" destination="TemporalLinkGame" />
                <PrimaryButton title="Profil" destination="Profile" />
                <PrimaryButton title="Paramètres" destination="Settings" />
                <LogoutButton />
            </View>
        </View>);
    }
};

export default MainScreen;
