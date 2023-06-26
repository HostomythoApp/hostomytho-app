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

const MainScreenEmptyBoard = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();
    const navigation = useNavigation();

    return (
        <ImageBackground source={require('images/board_empty.png')} style={tw('flex-1 relative')}>

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

                            <TouchableOpacity onPress={() => navigation.navigate("PlausibilityGame")} style={tw('absolute top-30 left-10')}>
                                <Image source={require('images/multi_post_it.png')} style={tw('w-10 h-10')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("HypothesisGame")} style={tw('absolute left-90')}>
                                <Image source={require('images/paper.png')} style={tw('w-10 h-10')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("TypeSentenceGame")} style={tw('absolute top-10 right-40')}>
                                <Image source={require('images/paper_2.png')} style={tw('w-10 h-10')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("TemporalEntity")} style={tw('absolute bottom-40 right-80')}>
                                <Image source={require('images/post_it_orange.png')} style={tw('w-10 h-10')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("TemporalLinkGame")} style={tw('absolute bottom-10 left-40')}>
                                <Image source={require('images/polaroid_picture.png')} style={tw('w-10 h-10')} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Main")} style={tw('absolute top-60 left-80')}>
                                <Image source={require('images/polaroid_smile.png')} style={tw('w-10 h-10')} />
                            </TouchableOpacity>
                        </View>
                        {!authState.isAuthenticated &&
                            <View>
                                <PrimaryButton title="Connexion" destination="Login" />
                                <PrimaryButton title="Inscription" destination="SignUpScreen" />
                            </View>
                        }
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

export default MainScreenEmptyBoard;
