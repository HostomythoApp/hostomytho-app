import React from "react";
import { ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const SettingsScreen = ({ }) => {
    const tw = useTailwind();

    return (
        <View style={tw("flex-1 items-center")}>
            <ScrollView style={tw('w-full')}>
                <CustomHeaderEmpty title="Paramètres" />
                <View style={{ minWidth: 100, alignSelf: 'center' }}>
                    <View>
                        <PrimaryButton title="Thème" destination="Theme" />
                        <PrimaryButton title="Politique de confidentialité" destination="PrivacyPolicy" />
                        <PrimaryButton title="Notifications" destination="Notif" />
                        <PrimaryButton title="Aide et contact" destination="Help" />
                    </View>
                </View>
            </ScrollView>
        </View>);
};

export default SettingsScreen;
