import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import LogoutButton from "components/LogoutButton";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const MainScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();

    return (
        <View style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                <CustomHeaderEmpty title="Menu" />
                <View style={[tw('pt-20'), { minWidth: 100, alignSelf: 'center' }]}>
                    <View>
                        <PrimaryButton title="Tableau de bord" destination="MainEmptyBoard" />
                        <PrimaryButton title="Tableau de bord - Exemple de rendu" destination="MainBoard" />
                        <PrimaryButton title="Plausibilité des textes détaillée" destination="PlausibilityGameDetailed" />
                        <PrimaryButton title="Plausibilité des textes" destination="PlausibilityGame" />
                        <PrimaryButton title="Trouver les hypothèses" destination="HypothesisGame" />
                        <PrimaryButton title="Trouver les conditions" destination="NegationGame" />
                        <PrimaryButton title="Trouver les négations" destination="ConditionGame" />
                        <PrimaryButton title="Spécifier le type des phrases" destination="TypeSentenceGame" />
                        <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntity" />
                        <PrimaryButton title="Spécifier les liens temporelles" destination="TemporalLinkGame" />
                    </View>
                    {!authState.isAuthenticated &&
                        <View>
                            <PrimaryButton title="Connexion" destination="Login" />
                            <PrimaryButton title="Inscription" destination="SignUpScreen" />
                        </View>
                    }
                    {authState.isAuthenticated &&
                        <View>
                            <PrimaryButton title="Profil" destination="Profile" />
                            <PrimaryButton title="Paramètres" destination="Settings" />
                            <LogoutButton />
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default MainScreen;
