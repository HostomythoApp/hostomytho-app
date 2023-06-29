import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions } from "react-native";
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
    const windowWidth = Dimensions.get('window').width;

    return (
        <ImageBackground source={require('images/main_background.png')} style={tw('flex-1 relative')}>

            <View style={tw("flex-1 items-center")}>
                <Text
                    style={[
                        tw("mb-8  text-center text-orange-400 font-BubblegumSans"),
                        {
                            position: 'absolute',
                            top: '74%',
                            left: '16%',
                            fontSize: windowWidth * 0.11,
                            textShadowColor: '#000',
                            textShadowOffset: { width: -8, height: 11 },
                            textShadowRadius: 7
                        }
                    ]}
                >
                    {"HostoMytho"}
                </Text>
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
                    {/* {authState.isAuthenticated && */}
                    <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ position: 'absolute', bottom: 0, left: 0, padding: 0, width: windowWidth * 0.10, height: windowWidth * 0.10 }}>
                        <View style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderTopRightRadius: 30,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={require('images/settings1.png')} style={{ width: windowWidth * 0.05, height: windowWidth * 0.1, resizeMode: 'contain' }} />
                        </View>
                    </TouchableOpacity>
                    {/* } */}

                    {/* {authState.isAuthenticated && */}
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ position: 'absolute', bottom: 0, right: 0, padding: 0, width: windowWidth * 0.10, height: windowWidth * 0.10 }}>
                        <View style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderTopLeftRadius: 30,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={require('images/icon_detective2.png')} style={{ width: windowWidth * 0.08, height: windowWidth * 0.08, resizeMode: 'contain' }} />
                        </View>
                    </TouchableOpacity>
                    {/* } */}
                </View>
            </View>

        </ImageBackground>
    );
};

export default MainScreenBoard;
