import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import ClickableElement from "components/ClickableElement";
import MainTitle from "components/MainTitle";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import LogoutButton from "components/LogoutButton";

const MainScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();

    return (
        <ImageBackground source={require('images/main_background.png')} style={tw('flex-1')}>
   
        <View style={tw("flex-1 items-center")}>
            <ScrollView style={tw('w-full')}>
                {!authState.isAuthenticated && <MainTitle title={"Bienvenue sur HostoMytho"} />}
                {authState.isAuthenticated && <MainTitle title={"Bonjour " + user?.username} />}
                <View style={{ minWidth: 100, alignSelf: 'center' }}>
                    <View>
                        {/* <PrimaryButton title="Plausibilité des textes" destination="PlausibilityGame" /> */}
                        <ClickableElement destination="PlausibilityGameDetailed" />
                        <PrimaryButton title="Trouver les hypothèses" destination="HypothesisGame" />
                        <PrimaryButton title="Trouver les conditions" destination="HypothesisGame" />
                        <PrimaryButton title="Trouver les négations" destination="HypothesisGame" />
                        <PrimaryButton title="Spécifier le type des phrases" destination="TypeSentenceGame" />
                        <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntity" />
                        <PrimaryButton title="Tableau de bord" destination="MainScreenBoard" />
                        {/* <PrimaryButton title="Spécifier les liens temporelles" destination="TemporalLinkGame" /> */}
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

        </ImageBackground>
    );
};

export default MainScreen;
