import React from "react";
import { ImageBackground, ScrollView, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { useAuth } from "services/context/AuthContext";

const SettingsScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();

    return (
        <ImageBackground source={require('images/bg_corridor_dark.webp')} style={tw('flex-1')}>
            <View style={tw("flex-1 ")}>
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                    <CustomHeaderEmpty title="Paramètres" backgroundColor="bg-whiteTransparent" />
                    <View style={tw('mx-auto pt-20 items-center')}>
                        <View style={{ ...tw('mb-2 p-6 rounded-lg'), backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                            <View>
                                <PrimaryButton title="À Propos" destination="APropos" />
                                <PrimaryButton title="Règles et explications" destination="ReglesDuJeu" />
                                <PrimaryButton title="Aide et contact" destination="Aide" />
                                <PrimaryButton title="Politique de confidentialité" destination="PolitiqueDeConfidentialite" />

                                {/* {authState.isAuthenticated &&
                                    <View>
                                        <PrimaryButton title="Notifications" destination="Notif" />
                                    </View>
                                } */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default SettingsScreen;
