import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';

const MainScreenEmptyBoard = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <ImageBackground source={require('images/board_empty.png')} style={[tw('flex-1 relative'), StyleSheet.absoluteFill]}>
            <View style={tw("flex-1 items-center")}>
                <ScrollView style={tw('w-full')}>
                    {!authState.isAuthenticated && <MainTitle title={"Bienvenue sur HostoMytho"} />}
                </ScrollView>

                <View style={StyleSheet.absoluteFill}>
                    {authState.isAuthenticated &&
                        <Text
                            style={[
                                tw("mb-8 font-bold text-4xl md:text-6xl text-center text-orange-400 dark:text-white font-SpringSnowstorm"),
                                {
                                    position: 'absolute',
                                    top: '82%',
                                    left: '28%', // Ajustez cette valeur pour décaler le texte vers la gauche
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: 0, height: 0 },
                                    textShadowRadius: 5
                                }
                            ]}
                        >
                            {"HostoMytho"}
                        </Text>
                    }

                    <View style={StyleSheet.absoluteFill}>
                        <TouchableOpacity onPress={() => navigation.navigate("Main")} style={{ position: 'absolute', top: '11%', left: '15%' }}>
                            <Image source={require('images/post_it.png')} style={{ width: windowWidth * 0.1, aspectRatio: 1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("PlausibilityGame")} style={{ position: 'absolute', top: '30%', left: '17%' }}>
                            <Image source={require('images/multi_post_it.png')} style={{ width: windowWidth * 0.1, aspectRatio: 1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("HypothesisGame")} style={{ position: 'absolute', top: '20%', left: '70%' }}>
                            <Image source={require('images/paper.png')} style={{ width: windowWidth * 0.1, aspectRatio: 1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("TypeSentenceGame")} style={{ position: 'absolute', top: '40%', left: '40%' }}>
                            <Image source={require('images/paper_2.png')} style={{ width: windowWidth * 0.1, aspectRatio: 1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("TemporalEntity")} style={{ position: 'absolute', top: '58%', right: '24%' }}>
                            <Image source={require('images/post_it_green.png')} style={{ width: windowWidth * 0.08, aspectRatio: 1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("TemporalLinkGame")} style={{ position: 'absolute', top: '15%', left: '50%' }}>
                            <Image source={require('images/polaroid_picture.png')} style={{ width: windowWidth * 0.1, aspectRatio: 1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Main")} style={{ position: 'absolute', top: '50%', left: '57%' }}>
                            <Image source={require('images/polaroid_smile.png')} style={{ width: windowWidth * 0.1, aspectRatio: 1 }} />
                        </TouchableOpacity>
                    </View>

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

        </ImageBackground>
    );
};

export default MainScreenEmptyBoard;
