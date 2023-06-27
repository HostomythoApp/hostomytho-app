import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import ClickableElement from "components/ClickableElement";
import MainTitle from "components/MainTitle";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import LogoutButton from "components/LogoutButton";
import { useNavigation } from "@react-navigation/native";

const MainScreenBoard = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('images/main_background.png')} style={tw('flex-1 relative')}>

            <View style={tw("flex-1 items-center")}>
                <ScrollView style={tw('w-full')}>
                    {!authState.isAuthenticated && <MainTitle title={"Bienvenue sur HostoMytho"} />}
                    {authState.isAuthenticated &&
                        <Text
                            style={[
                                tw("mb-8 font-bold text-4xl md:text-6xl md:mt-7 text-center text-orange-400 dark:text-white font-SpringSnowstorm"),
                                {
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: 0, height: 0 },
                                    textShadowRadius: 5
                                }
                            ]}
                        >
                            {"HostoMytho"}
                        </Text>
                    }
                    <View style={{ minWidth: 100, alignSelf: 'center' }}>
                        <View>
                            {/* <PrimaryButton title="Plausibilité des textes" destination="PlausibilityGame" /> */}
                            <TouchableOpacity onPress={() => navigation.navigate("Main")} style={tw('absolute top-10 left-40')}>
                                <Image source={require('images/post_it.png')} style={tw('w-10 h-10')} />
                            </TouchableOpacity>
                            {/* <PrimaryButton title="Trouver les hypothèses" destination="HypothesisGame" />
                            <PrimaryButton title="Trouver les conditions" destination="HypothesisGame" />
                            <PrimaryButton title="Trouver les négations" destination="HypothesisGame" />
                            <PrimaryButton title="Spécifier le type des phrases" destination="TypeSentenceGame" />
                            <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntity" />
                            <PrimaryButton title="Tableau de bord" destination="MainScreenBoard" /> */}
                            {/* <PrimaryButton title="Spécifier les liens temporelles" destination="TemporalLinkGame" /> */}
                        </View>
                        {/* {!authState.isAuthenticated &&
                            <View>
                                <PrimaryButton title="Connexion" destination="Login" />
                                <PrimaryButton title="Inscription" destination="SignUpScreen" />
                            </View>
                        } */}
                        {authState.isAuthenticated &&
                            <View>
                                {/* <PrimaryButton title="Profil" destination="Profile" />
                                <PrimaryButton title="Paramètres" destination="Settings" /> */}
                            </View>
                        }
                    </View>
                </ScrollView>
            </View>

        </ImageBackground>
    );
};

export default MainScreenBoard;
