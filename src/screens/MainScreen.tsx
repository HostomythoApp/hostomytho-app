import React from "react";
import { View, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import PrimaryButton from "components/PrimaryButton";
import { useAuth } from "services/context/AuthContext";
import LogoutButton from "components/LogoutButton";
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";

const MainScreen = ({ }) => {
    const tw = useTailwind();
    const { authState } = useAuth();

    return (
        <View style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                <CustomHeaderEmpty title="Menu" />
                <View style={[tw('pt-20'), { minWidth: 100, alignSelf: 'center' }]}>
                    <View>
                        <PrimaryButton title="Tableau de bord" destination="TableauDeBord" />
                        <PrimaryButton title="Plausibilité des textes détaillés" destination="MythoOuPas" />
                        <PrimaryButton title="Plausibilité des textes" destination="Plausibilites" />
                        <PrimaryButton title="Trouver les hypothèses" destination="HypoMytho" />
                        <PrimaryButton title="Trouver les conditions" destination="CondiMytho" />
                        <PrimaryButton title="Trouver les négations" destination="MythoNo" />
                        <PrimaryButton title="Spécifier le type des phrases" destination="TypeSentenceGame" />
                        <PrimaryButton title="Trouver les entités et expressions temporelles" destination="TemporalEntity" />
                        <PrimaryButton title="Spécifier les liens temporels" destination="MythoTempo" />
                    </View>
                    {!authState.isAuthenticated &&
                        <View>
                            <PrimaryButton title="Connexion" destination="Connexion" />
                            <PrimaryButton title="Inscription" destination="Login" />
                        </View>
                    }
                    {authState.isAuthenticated &&
                        <View>
                            <PrimaryButton title="Profil" destination="Profil" />
                            <PrimaryButton title="Paramètres" destination="Parametres" />
                            <LogoutButton />
                        </View>
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default MainScreen;
