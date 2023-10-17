import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { getUserCriminals } from 'services/api/criminals';
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import PrimaryButton from "components/PrimaryButton";
import ModalDeleteProfil from "components/modals/ModalDeleteProfil";


export interface Criminal {
    name: string;
    description: string;
    imageId: number;
}

const InvestigationScreen = () => {
    const tw = useTailwind();
    const { user } = useUser();
    const [criminals, setCriminals] = useState<Criminal[]>([]);
    const navigation = useNavigation<RootStackNavigationProp<"Main">>();
    // const investigationProgress = user?.percentageInvestigation || 0;
    const investigationProgress = 65;
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const loadCriminals = async () => {
            try {
                const userCriminals = await getUserCriminals(user.id);
                setCriminals(userCriminals);
            } catch (error) {
                console.error(error);
            }
        };

        loadCriminals();
    }, [user.id]);


    const modalArrestAttempt = () => {
        console.log("Tenter l'arrestation !");
    };


    const handleArrestAttempt = () => {
        // Logique pour gérer la tentative d'arrestation
        console.log("Tenter l'arrestation !");
        // Par exemple, naviguer vers un autre écran ou ouvrir un modal
    };

    return (
        <View style={tw('flex-1')}>
            <ImageBackground source={require('images/dark-background.jpg')} style={tw('flex-1')} resizeMode="cover">
                <SafeAreaView style={tw('flex-1')}>
                    <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')} >
                        <CustomHeaderEmpty title="Enquête en cours" backgroundColor="bg-whiteTransparent" />

                        <View style={tw('flex-1 p-2 pt-14 justify-center items-center')}>
                            <Image
                                source={require('images/unknown3.jpeg')}
                                style={tw('w-64 h-64')}
                                resizeMode="contain"

                            />

                            <Text style={tw('text-center font-bold font-primary text-lg text-white')}>Taux de certitude par rapport au criminel: {investigationProgress}%</Text>
                            <View style={tw('bg-gray-300 h-4 rounded mt-2 w-96')}>
                                <View
                                    style={[
                                        tw('bg-primary h-full rounded-l'),
                                        { width: `${investigationProgress}%` },
                                    ]}
                                ></View>
                            </View>

                            <TouchableOpacity
                                style={tw('bg-primary py-3 px-6 rounded mt-4')}
                                onPress={() => setModalVisible(true)}
                            >
                                <Text style={tw('text-white font-bold')}>Tenter l'arrestation</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
            <ModalDeleteProfil
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            >
                <View >
                    <Text style={tw('text-lg font-primary')}>Etes-vous sûr de vouloir tenter l'arrestation?</Text>
                    <Text style={tw('text-lg font-primary')}>Si celle-ci échoue, votre taux de certitude baissera.</Text>
                </View>
            </ModalDeleteProfil>
        </View>
    );
};

export default InvestigationScreen;
