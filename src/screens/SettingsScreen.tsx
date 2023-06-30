import React from "react";
import { ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import MainTitle from "components/MainTitle";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { useAuth } from "services/context/AuthContext";

const SettingsScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();

    return (
        <View style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                <CustomHeaderEmpty title="Paramètres" />
                <View style={{ minWidth: 100, alignSelf: 'center', paddingTop: 60 }}>
                    <View>
                        {!authState.isAuthenticated &&
                            <View>
                                <PrimaryButton title="Aide et contact" destination="Help" />
                            </View>
                        }
                        <PrimaryButton title="Objectifs de l'application" destination="PrivacyPolicy" />
                        <PrimaryButton title="Règles et explications" destination="PrivacyPolicy" />
                        <PrimaryButton title="Aide et contact" destination="Help" />
                        <PrimaryButton title="Politique de confidentialité" destination="PrivacyPolicy" />
                        {authState.isAuthenticated &&
                            <View>
                                <PrimaryButton title="Thème" destination="Theme" />
                                <PrimaryButton title="Notifications" destination="Notif" />
                            </View>
                        }



                    </View>
                </View>
            </ScrollView>
        </View>);
};

export default SettingsScreen;
