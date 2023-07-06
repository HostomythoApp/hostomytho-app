import React, { useState } from "react";
import { View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Dimensions } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const MainScreenBoard = ({ }) => {
    const tw = useTailwind();
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation<RootStackNavigationProp<"Main">>();

    return (
        <ImageBackground source={require('images/main_background.png')} style={tw('flex-1 relative')}>
            <CustomHeaderEmpty title="" backgroundColor="bg-transparent" textColor="white" />

            <View style={tw("flex-1 items-center")}>
                <Text
                    style={[
                        tw("mb-8  text-center text-orange-400 font-BubblegumSans"),
                        {
                            position: 'absolute',
                            top: '74%',
                            left: windowWidth > 768 ? '16%' : '10%',
                            fontSize: windowWidth > 768 ? windowWidth * 0.11 : 60,
                            textShadowColor: '#000',
                            textShadowOffset: { width: -8, height: 11 },
                            textShadowRadius: 7,
                        }
                    ]}
                >
                    {"HostoMytho"}
                </Text>

                <View style={{ minWidth: 100, alignSelf: 'center' }}>
                    <View>
                    </View>
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
