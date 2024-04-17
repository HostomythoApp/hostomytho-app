import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import FunctionButton from "components/FunctionButton";
import LogoutButton from "components/LogoutButton";
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import CustomModal from "components/modals/CustomModal";
import { deleteUser, updateUserEmail } from 'services/api/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from 'services/context/AuthContext';
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import InputField from 'components/InputField';
import { FontAwesome } from '@expo/vector-icons';
import PrimaryButton from 'components/PrimaryButton';

const ProfileSettingsScreen = (props: any) => {
    const tw = useTailwind();
    const { user, setUser } = useUser();
    const [modalVisible, setModalVisible] = useState(false);
    const { setAuthState } = useAuth();
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [email, setEmail] = useState(user?.email || '');
    const [updateError, setUpdateError] = useState('');

    const deleteAccount = async () => {
        if (user?.id) {
            try {
                deleteUser(user.id);
                setModalVisible(false);

                await AsyncStorage.clear();
                setUser(null);
                setAuthState({ isAuthenticated: false, token: null, isLoading: false });
                navigation.navigate("TableauDeBord");
            } catch (error) {
                console.error('Erreur lors de la déconnexion :', error);
            }

        }
    }

    const handleUpdateEmail = () => {
        if (user) {
            updateUserEmail(user.id, email)
                .then(response => {
                    if (response.status === 200) {
                        setUpdateError('');
                        // @ts-ignore
                        setEmail(user.email);
                        setUser({ ...user, email });
                        setEmailModalVisible(false);
                    } else {
                        // Gérer d'autres statuts de réponse ici si nécessaire
                        console.log(`Erreur lors de la mise à jour de l'email : ${response.statusText}`);
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 409) {
                        setUpdateError("L'adresse saisie est déjà utilisée par un compte");
                    } else {
                        console.error('Erreur lors de la mise à jour de l\'e-mail:', error);
                        setUpdateError('Une erreur est survenue lors de la mise à jour de l\'e-mail.');
                    }
                });
        }
    };

    return (
        <ImageBackground
            source={require('images/bg_office.jpg')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>

                <CustomHeaderEmpty title="Paramètre du profil" backgroundColor="bg-whiteTransparent" />
                <View style={tw('mx-auto min-w-[540px] pt-20 items-center')}>

                    <View style={tw('bg-white mb-2 p-6 rounded-lg w-full')}>

                        <View style={tw('flex-row justify-center items-center')} >
                            <Text style={tw('text-base mb-1 my-2 font-primary mr-3')}>
                                {user?.email ? user.email : "Vous n'avez pas renseigné d'email"}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                setEmail(user?.email || '');
                                setEmailModalVisible(true);
                            }}>
                                <FontAwesome name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={tw('text-base mb-2 font-primary text-center')}>
                            {user?.status ? `Statut : ${user.status}` : "Aucun statut renseigné"}
                        </Text>
                        <PrimaryButton title="Modifier le mot de passe" destination="ChangePassword" />

                        <LogoutButton />
                        <FunctionButton text={"Supprimer le compte"} func={() => setModalVisible(true)} />
                    </View>

                </View>
                <CustomModal isVisible={emailModalVisible} onClose={() => setEmailModalVisible(false)}>
                    <Text style={tw('text-center mb-4 font-primary text-lg')}>Modifier votre adresse e-mail</Text>
                    <InputField
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Entrez votre nouvel e-mail"
                        keyboardType="email-address"
                    />
                    {updateError !== '' && <Text style={tw('text-red-500 font-primary')}>{updateError}</Text>}

                    <FunctionButton text={"Modifier l'adresse email"} func={handleUpdateEmail} />
                </CustomModal>

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
        </ImageBackground >
    );
};

export default withAuth(ProfileSettingsScreen);
