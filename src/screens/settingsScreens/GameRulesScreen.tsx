import React from "react";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { View, Text, ScrollView, SafeAreaView, ImageBackground } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainTitle from "components/MainTitle";

const GameRulesScreen = ({ }) => {
    const tw = useTailwind();

    return (
        <ImageBackground source={require('images/bg_corridor_dark.webp')} style={tw('flex-1')}>
            <SafeAreaView style={tw("flex-1")}>
                <ScrollView>
                    <CustomHeaderEmpty title="Règles du jeu" backgroundColor="bg-whiteTransparent"  />


                </ScrollView>

            </SafeAreaView>
        </ImageBackground>
    );
};

export default GameRulesScreen;
