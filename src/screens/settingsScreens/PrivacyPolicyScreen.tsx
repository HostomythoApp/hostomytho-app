import React from "react";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { View, Text, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import MainTitle from "components/MainTitle";

const PrivacyPolicysScreen = ({ }) => {
    const tw = useTailwind();

    return (
        <View style={tw("flex-1 items-center text-black")}>
            <ScrollView style={tw('w-full')}>
                <CustomHeaderEmpty title="Paramètres" />
                <Text>En dev</Text>

            </ScrollView>
        </View>);
};

export default PrivacyPolicysScreen;
