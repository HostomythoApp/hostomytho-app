import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Modal, Pressable, StyleSheet, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import FunctionButton from "components/FunctionButton";
import LogoutButton from "components/LogoutButton";
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import CustomModal from "components/modals/CustomModal";

const ProfileSettingsScreen = (props: any) => {
    const tw = useTailwind();
    const { user } = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const deleteAccount = () => {
        // TODO A faire
        setModalVisible(false);
    }

    return (
        <View style={tw("flex-1")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>

                <CustomHeaderEmpty title="Paramètre du profil" />
                <View style={tw('mx-auto min-w-[540px] pt-20 items-center')}>

                    <Text style={tw('text-base mb-1 my-2 font-primary')}>
                        {user?.email ? user.email : "Vous n'avez pas renseigné d'email"}
                    </Text>

                    <Text style={tw('text-base mb-2 font-primary')}>
                        {user?.status ? `Vous êtes ${user.status}` : "Aucun statut renseigné"}
                    </Text>

                    <LogoutButton />
                    <FunctionButton text={"Supprimer le compte"} func={() => setModalVisible(true)} />

                </View>

                <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
                    <Text style={tw('text-center mb-4 font-primary text-lg')}>Etes-vous sûr de vouloir supprimer votre compte ?</Text>
                    <Pressable
                        style={[tw('bg-red-600 px-4 py-2 rounded'), { alignSelf: 'center' }]}
                        onPress={deleteAccount}
                    >
                        <Text style={tw('text-white font-primary text-lg')}>Confirmer la suppression</Text>
                    </Pressable>
                </CustomModal>
            </ScrollView>
        </View>
    );
};

export default withAuth(ProfileSettingsScreen);
