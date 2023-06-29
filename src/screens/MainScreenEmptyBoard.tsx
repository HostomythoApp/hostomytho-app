import React from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import { useNavigation } from "@react-navigation/native";

const MainScreenEmptyBoard = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;
    return (
        <ImageBackground source={require('images/board_empty.png')} style={[tw('flex-1 relative'), StyleSheet.absoluteFill]}>
            <View style={tw("flex-1 items-center")}>

                <View style={StyleSheet.absoluteFill}>
                    <Text
                        style={[
                            // tw("mb-8 font-bold text-center text-orange-400 font-IrishGrover"),
                            tw("mb-8  text-center text-orange-400 font-BubblegumSans"),
                            // tw("mb-8 text-center text-orange-400 font-MochiyPopOne"),
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
                        {/* TODO problème font sur android */}
                    </Text>

                    <View style={StyleSheet.absoluteFill}>
                        <TouchableOpacity onPress={() => navigation.navigate("Main")} style={{ position: 'absolute', top: '13%', left: '25%' }}>
                            <Image source={require('images/post_it.png')} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("PlausibilityGame")} style={{ position: 'absolute', top: '30%', left: '17%' }}>
                            <Image source={require('images/paper.png')} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("HypothesisGame")} style={{ position: 'absolute', top: '20%', left: '70%' }}>
                            <Image source={require('images/post_it2.png')} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("TemporalEntity")} style={{ position: 'absolute', top: '40%', left: '40%' }}>
                            <Image source={require('images/paper_3.png')} style={{ width: windowWidth * 0.12, height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("PlausibilityGameDetailed")} style={{ position: 'absolute', top: '52%', right: '24%' }}>
                            <Image source={require('images/paper_2.png')} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("ConditionGame")} style={{ position: 'absolute', top: '15%', left: '50%' }}>
                            <Image source={require('images/polaroid_picture.png')} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("NegationGame")} style={{ position: 'absolute', top: '50%', left: '57%' }}>
                            <Image source={require('images/polaroid_smile.png')} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1 }} />
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

        </ImageBackground>
    );
};

export default MainScreenEmptyBoard;
