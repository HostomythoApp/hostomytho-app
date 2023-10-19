import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, Dimensions, Touchable } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useAuth } from "services/context/AuthContext";
import { useUser } from "services/context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import { getMessageMenu } from "services/api/utils";
import { MessageMenu } from 'models/MessageMenu';

const MainBoardScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();
    const { user } = useUser();
    const navigation = useNavigation<RootStackNavigationProp<"Main">>();
    const windowWidth = Dimensions.get('window').width;
    const [menuMessage, setMenuMessage] = useState<MessageMenu | null>(null);
    const [messageExpanded, setMessageExpanded] = useState(false);

    useEffect(() => {
        getMessageMenu()
            .then((message) => {

                setMenuMessage(message);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const toggleMessage = () => {
        setMessageExpanded(!messageExpanded);
    }

    return (
        <ImageBackground source={require('images/bg_desk_smaller.jpeg')} style={[tw('flex-1 relative'), StyleSheet.absoluteFill]}>
            <View style={tw("flex-1 items-center")}>
                {menuMessage && menuMessage.active &&
                    <TouchableOpacity onPress={toggleMessage} style={[tw("absolute top-0 right-0 p-4 bg-blue-500 bg-opacity-70 rounded-xl"), { zIndex: 1 }]}>
                        {messageExpanded ? (
                            <>
                                <Text style={tw("text-white text-lg")}>{menuMessage.title}</Text>
                                <Text style={tw("text-white")}>{menuMessage.message}</Text>
                                <Text style={tw("text-white text-center text-sm mt-2 italic")}>Cliquez sur le message pour le réduire</Text>
                            </>
                        ) : (
                            <Text style={tw("text-white text-lg")}>Cliquez ici</Text>
                        )}
                    </TouchableOpacity>
                }


                <View style={StyleSheet.absoluteFill}>
                    <View style={StyleSheet.absoluteFill}>
                        <TouchableOpacity onPress={() => navigation.navigate("Main")}
                            style={{
                                position: 'absolute',
                                // top: windowWidth > 768 ? '20%' : '20%',
                                // left: windowWidth > 768 ? '20%' : '20%',

                                top: windowWidth > 768 ? '43%' : '43%',
                                left: windowWidth > 768 ? '48%' : '48%',
                            }}>
                            <Image source={require('images/map.png')} style={{ width: windowWidth * 0.1, height: windowWidth * 0.1, minWidth: 90, minHeight: 90 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("Investigation")}
                            style={{
                                position: 'absolute',
                                top: windowWidth > 768 ? '54%' : '54%',
                                left: windowWidth > 768 ? '21%' : '21%',
                            }}>
                            <Image source={require('images/article.png')}
                                style={{
                                    width: windowWidth * 0.08, height: windowWidth * 0.08, minWidth: 70, minHeight: 70,
                                    shadowColor: 'black',
                                    shadowOffset: { width: -1, height: 2 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 1,
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("HypothesisGame")}
                            style={{
                                position: 'absolute',
                                top: windowWidth > 768 ? '27%' : '27%',
                                left: windowWidth > 768 ? '54%' : '54%',
                            }}>
                            <Image source={require('images/postit_hypothese.png')}
                                style={{
                                    width: windowWidth * 0.06, height: windowWidth * 0.06, minWidth: 60, minHeight: 60,
                                    shadowColor: 'black',
                                    shadowOffset: { width: -1.6, height: 1 },
                                    shadowOpacity: 0.6,
                                    shadowRadius: 1,
                                }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("ErrorTypeGame")}
                            style={{
                                position: 'absolute',
                                top: windowWidth > 768 ? '56%' : '56%',
                                left: windowWidth > 768 ? '68%' : '68%',
                            }}>
                            <Image
                                resizeMode="contain"

                                source={require('images/paper_2.png')} style={{ width: windowWidth * 0.12, height: windowWidth * 0.1, minWidth: 70, minHeight: 70 }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("PlausibilityGameDetailed")}
                            style={{
                                position: 'absolute',
                                top: windowWidth > 768 ? '40%' : '40%',
                                left: windowWidth > 768 ? '30%' : '30%',
                            }}>
                            <Image source={require('images/postit_plausibility.png')}
                                style={{
                                    width: windowWidth * 0.07, height: windowWidth * 0.07, minWidth: 65, minHeight: 65,
                                    shadowColor: 'black',
                                    shadowOffset: { width: -0.8, height: 1.5 },
                                    shadowOpacity: 0.4,
                                    shadowRadius: 1,
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => navigation.navigate("TemporalLinkGame")}
                            style={{
                                position: 'absolute',
                                top: windowWidth > 768 ? '56%' : '56%',
                                left: windowWidth > 768 ? '37%' : '37%',
                            }}>
                            <Image source={require('images/postit_condition.png')} style={{
                                width: windowWidth * 0.06, height: windowWidth * 0.06, minWidth: 60, minHeight: 60,
                                shadowColor: 'black',
                                shadowOffset: { width: -1, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                transform: [{ rotate: '4deg' }]
                            }} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("NegationGame")}
                            style={{
                                position: 'absolute',
                                top: windowWidth > 768 ? '20%' : '20%',
                                left: windowWidth > 768 ? '40%' : '40%',
                            }}>
                            <Image source={require('images/postit_negation.png')} style={{
                                width: windowWidth * 0.07, height: windowWidth * 0.07, minWidth: 65, minHeight: 65,
                                shadowColor: 'black',
                                shadowOffset: { width: 1, height: 1 },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                transform: [{ rotate: '-8deg' }]
                            }} />
                        </TouchableOpacity>

                        <View style={{
                            position: 'absolute',
                            top: '16.5%',
                            left: windowWidth > 768 ? '63%' : '63%',
                        }}>
                            <Image source={require('images/small_postit_month.png')} resizeMode="contain" style={{
                                height: windowWidth * 0.04, minWidth: 40, minHeight: 40,
                                shadowColor: 'black',
                                shadowOffset: { width: 1, height: 1 },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,

                            }} />
                            <View
                                style={tw("flex-row")}>
                                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={tw('mt-2')}
                                >
                                    <Image source={require('images/polaroid_character_3.png')} style={{
                                        width: windowWidth * 0.08, height: windowWidth * 0.08, minWidth: 60, minHeight: 60,
                                        shadowColor: 'black',
                                        shadowOffset: { width: 1, height: 1 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 1,
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={tw('mr-[-18px] ml-[-18px] z-10')}
                                >
                                    <Image source={require('images/polaroid_character_2.png')} style={{
                                        width: windowWidth * 0.08, height: windowWidth * 0.08, minWidth: 60, minHeight: 60,
                                        shadowColor: 'black',
                                        shadowOffset: { width: 1, height: 1 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 1,
                                    }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={tw('mt-4')}>
                                    <Image source={require('images/polaroid_character_1.png')} style={{
                                        width: windowWidth * 0.08, height: windowWidth * 0.08, minWidth: 60, minHeight: 60,
                                        shadowColor: 'black',
                                        shadowOffset: { width: 1, height: 1 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 1,
                                    }} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("CriminalsCaught")}
                            style={{
                                position: 'absolute',
                                top: '17%',
                                left: '21%',
                                flexDirection: 'row',

                            }}>
                            <Image source={require('images/suspects/suspect_identification_2.png')} style={{
                                width: windowWidth * 0.06, height: windowWidth * 0.06, minWidth: 65, minHeight: 65,
                                shadowColor: 'black',
                                shadowOffset: { width: 1, height: 1 },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                resizeMode: 'contain',
                            }} />
                            <Image source={require('images/suspects/suspect_identification_1.png')} style={{
                                width: windowWidth * 0.06, height: windowWidth * 0.06, minWidth: 65, minHeight: 65,
                                shadowColor: 'black',
                                shadowOffset: { width: 1, height: 1 },
                                shadowOpacity: 0.5,
                                shadowRadius: 1,
                                resizeMode: 'contain',
                                transform: [{ translateX: -25 }, { translateY: 10 }]
                            }} />
                        </TouchableOpacity>

                    </View>

                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Settings")}
                    style={{ position: 'absolute', top: 0, left: 0, padding: 0, width: windowWidth * 0.10, height: windowWidth * 0.10, minWidth: 100, minHeight: 100 }}>
                    <View style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        borderBottomRightRadius: 30,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image source={require('images/settings1.png')}
                            style={{ width: windowWidth * 0.05, height: windowWidth * 0.1, resizeMode: 'contain', minWidth: 50, minHeight: 100 }} />
                    </View>
                </TouchableOpacity>


                {!authState.isAuthenticated &&
                    <View style={[tw("absolute bottom-2 right-2")]}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}
                            style={tw("mb-2 py-2 px-4 bg-blue-500 bg-opacity-70 rounded-xl")}>
                            <Text style={tw("text-center text-white text-lg")}>Se connecter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}
                            style={tw("py-2 px-4 bg-green-500 bg-opacity-70 rounded-xl")}>
                            <Text style={tw("text-center text-white text-lg")}>Créer un compte</Text>
                        </TouchableOpacity>
                    </View>
                }

                {authState.isAuthenticated &&
                    <TouchableOpacity onPress={() => navigation.navigate("Profile")}
                        style={{ position: 'absolute', bottom: 0, right: 0, padding: 0, width: windowWidth * 0.10, height: windowWidth * 0.10, minWidth: 100, minHeight: 100 }}>
                        <View style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderTopLeftRadius: 30,
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Image source={require('images/icon_profil.png')}
                                style={{ width: windowWidth * 0.06, height: windowWidth * 0.06, resizeMode: 'contain', minWidth: 60, minHeight: 60 }} />
                        </View>
                    </TouchableOpacity>
                }
            </View>

        </ImageBackground>
    );
};

export default MainBoardScreen;
