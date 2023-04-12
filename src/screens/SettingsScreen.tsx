import React from "react";
import {View} from "react-native";
import {useTailwind} from "tailwind-rn";
import data from "data/fakeUserData.js";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import FunctionButton from "../components/FunctionButton";
import user from "../globalState";
import {useNavigation} from "@react-navigation/native";

const SettingsScreen = ({}) => {
    const tw = useTailwind();
    const navigation = useNavigation();

    const deconnexion = () => {
        user.idUser = -1;
        navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
        });
    };


    const deleteAccount = () => {
        alert('suppr');
    }

    return (
        <View style={tw("flex-1 justify-center items-center")}>
            <MainTitle title={"Paramètres"}/>
            <View>
                <PrimaryButton title="Thème" destination="Theme"/>
                <PrimaryButton title="Politique de confidentialité" destination="PrivacyPolicy"/>
                <PrimaryButton title="Notifications" destination="Notif"/>
                <PrimaryButton title="Aide et contact" destination="Help"/>
                <FunctionButton text={"Déconnexion"} func={deconnexion}/>
                <FunctionButton text={"Supprimer son compte"} func={deleteAccount}/>
            </View>
        </View>);
};

export default SettingsScreen;
