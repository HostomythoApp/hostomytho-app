import React from "react";
import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn";


const RankingScreen = ({ }) => {
    const tw = useTailwind();

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <Text style={tw(' text-xl')}>Classements</Text>
        </View>);
};

export default RankingScreen;
