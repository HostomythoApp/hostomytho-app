import React from "react";
import {View} from "react-native";
import {useTailwind} from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";

const SettingsScreen = ({}) => {
    const tw = useTailwind();

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <MainTitle title={"Paramètres"}/>
            <View>
                <PrimaryButton title="Thème" destination="Theme"/>
                <PrimaryButton title="Politique de confidentialité" destination="PrivacyPolicy"/>
                <PrimaryButton title="Notifications" destination="Notif"/>
                <PrimaryButton title="Aide et contact" destination="Help"/>
            </View>
        </View>);
};

export default SettingsScreen;
