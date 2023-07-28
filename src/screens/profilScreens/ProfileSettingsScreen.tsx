import React from 'react';
import { TouchableOpacity, Text, View, ScrollView } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import FunctionButton from "components/FunctionButton";
import LogoutButton from "components/LogoutButton";
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';

const ProfileSettingsScreen = (props: any) => {
    const tw = useTailwind();
    const { user } = useUser();

    const deleteAccount = () => {
        // TODO A faire
        alert('deleteAccount');
    }

    return (
        <View style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>

                <CustomHeaderEmpty title="Paramètre du profil" />
                <View style={tw('mx-auto min-w-[540px] pt-20 items-center')}>

                    <Text style={tw(' text-base mb-1 my-2')}>
                        {user?.email ? user.email : "Vous n'avez pas renseigné d'email"}
                    </Text>

                    <Text style={tw('text-base mb-2')}>
                        {user?.status ? `Vous êtes ${user.status}` : "Aucun statut renseigné"}
                    </Text>

                    <LogoutButton />
                    <FunctionButton text={"Supprimer le compte"} func={deleteAccount} />
                </View>
            </ScrollView>
        </View>
    );
};

export default withAuth(ProfileSettingsScreen);
