import React from "react";
import {View} from "react-native";
import {useTailwind} from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import FunctionButton from "components/FunctionButton";
import LogoutButton from "components/LogoutButton";

const SettingsScreen = ({}) => {
    const tw = useTailwind();

    const deleteAccount = () => {
        alert('deleteAccount');
    }

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <MainTitle title={"Paramètres"}/>
            <View>
                <PrimaryButton title="Thème" destination="Theme"/>
                <PrimaryButton title="Politique de confidentialité" destination="PrivacyPolicy"/>
                <PrimaryButton title="Notifications" destination="Notif"/>
                <PrimaryButton title="Aide et contact" destination="Help"/>
                <LogoutButton />
                <FunctionButton text={"Supprimer son compte"} func={deleteAccount}/>
            </View>
        </View>);
};

export default SettingsScreen;
