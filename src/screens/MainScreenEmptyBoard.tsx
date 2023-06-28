import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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

                <View style={StyleSheet.absoluteFill}>
                    <Text
                        style={[
                            tw("mb-8 font-bold text-center text-orange-400 dark:text-orange-400 font-SpringSnowstorm"),
                            {
                                position: 'absolute',
                                top: '74%',
                                left: '26%',
                                fontSize: windowWidth * 0.1,
                                textShadowColor: '#000',
                                textShadowOffset: { width: -8, height: 11 },
                                textShadowRadius: 7
                            }
                        ]}
                    >
                        {"HostoMytho"}
                    </Text>

                    <View style={StyleSheet.absoluteFill}>
                        <TouchableOpacity onPress={() => navigation.navigate("Main")} style={{ position: 'absolute', top: '13%', left: '25%' }}>
                            <Image source={require('images/post_it.png')} style={{ width: windowWidth * 0.1 , height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("PlausibilityGame")} style={{ position: 'absolute', top: '30%', left: '17%' }}>
                            <Image source={require('images/paper.png')} style={{ width: windowWidth * 0.1 , height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("HypothesisGame")} style={{ position: 'absolute', top: '20%', left: '70%' }}>
                            <Image source={require('images/post_it2.png')} style={{ width: windowWidth * 0.1 , height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("TemporalEntity")} style={{ position: 'absolute', top: '40%', left: '40%' }}>
                            <Image source={require('images/paper_3.png')} style={{ width: windowWidth * 0.12 , height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("PlausibilityGameDetailed")} style={{ position: 'absolute', top: '52%', right: '24%' }}>
                            <Image source={require('images/paper_2.png')} style={{ width: windowWidth * 0.1 , height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("ConditionGame")} style={{ position: 'absolute', top: '15%', left: '50%' }}>
                            <Image source={require('images/polaroid_picture.png')} style={{ width: windowWidth * 0.1 , height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("NegationGame")} style={{ position: 'absolute', top: '50%', left: '57%' }}>
                            <Image source={require('images/polaroid_smile.png')} style={{ width: windowWidth * 0.1 , height: windowWidth * 0.1 }} />
                        </TouchableOpacity>
                    </View>

                </View>
                {/* {!authState.isAuthenticated &&
                    <View>
                        <PrimaryButton title="Connexion" destination="Login" />
                        <PrimaryButton title="Inscription" destination="SignUpScreen" />
                    </View>
                } */}
                {/* {authState.isAuthenticated && */}
                    <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={{ position: 'absolute', top: '5%', right: '6%' }}>
                        {/* <AntDesign name="setting" size={windowWidth * 0.04} color="whitesmoke" /> */}
                        <Image source={require('images/settings1.png')} style={{ width: windowWidth * 0.05 , height: windowWidth * 0.1, resizeMode: 'contain' }} />

                    </TouchableOpacity>
                {/* } */}

                {/* {authState.isAuthenticated && */}
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
                        <Image source={require('images/icon_detective2.png')} style={{ width: windowWidth * 0.1 , height: windowWidth * 0.1, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                {/* } */}
            </View>

        </ImageBackground>
    );
};

export default MainScreenEmptyBoard;
