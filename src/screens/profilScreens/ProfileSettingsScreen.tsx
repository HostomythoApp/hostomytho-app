import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Modal, Pressable, StyleSheet, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import FunctionButton from "components/FunctionButton";
import LogoutButton from "components/LogoutButton";
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';

const ProfileSettingsScreen = (props: any) => {
    const tw = useTailwind();
    const { user } = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const deleteAccount = () => {
        // TODO A faire
        // alert('deleteAccount');
    }

    return (
        <View style={tw("flex-1")}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Profil supprimé</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Fermer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Supprimer le profil</Text>
            </Pressable>
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
                    <FunctionButton text={"Supprimer le compte"} func={deleteAccount} />
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
export default withAuth(ProfileSettingsScreen);
