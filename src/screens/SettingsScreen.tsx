import React from "react";
import {View} from "react-native";
import {useTailwind} from "tailwind-rn";
import data from "data/fakeUserData.js";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import FunctionButton from "../components/FunctionButton";

const SettingsScreen = ({}) => {
    const tw = useTailwind();

    const deconnexion = () => {
        data.member = null;
    }

    const deleteAccount = () => {
        alert('suppr');
    }

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <MainTitle title={"Bonjour " + data.member.login}/>
            <View>
                <PrimaryButton title="Politique de confidentialité" destination="PrivacyPolicy"/>
                <PrimaryButton title="Notifications" destination="Notif"/>
                <PrimaryButton title="Aide et contact" destination="Help"/>
                <FunctionButton text={"Decoonexion"} func={deconnexion}/>
                <FunctionButton text={"Supprimer son compte"} func={deleteAccount}/>
            </View>
        </View>);
};

export default SettingsScreen;
