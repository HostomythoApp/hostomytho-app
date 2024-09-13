import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { getUserCriminals } from 'services/api/criminals';
import { suspectsImagesMapping } from 'utils/suspectsImagesMapping';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import PrimaryButton from "components/PrimaryButton";

export interface Criminal {
    name: string;
    description: string;
    imageId: number;
}

const CriminalsCaughtScreen = () => {
    const tw = useTailwind();
    const { user } = useUser();
    const [criminals, setCriminals] = useState<Criminal[]>([]);
    const isEmptyCriminalsList = criminals.length === 0;
    const { width } = Dimensions.get('window');
    useEffect(() => {
        const loadCriminals = async () => {
            if (user) {
                try {
                    const userCriminals = await getUserCriminals(user.id);
                    // @ts-ignore
                    setCriminals(userCriminals);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        loadCriminals();
    }, [user?.id]);

    const NoCriminalsView = () => (
        <View style={tw('flex-1 justify-center items-center p-6')}>
            <Text style={tw('text-xl lg:text-2xl text-white text-center mb-4 font-primary')}>
                Vous n'avez pas encore attrapé de criminel
            </Text>
            <View style={tw('w-80')}>
                <PrimaryButton title="Enquête en cours" destination="Investigation" />
            </View>
        </View>
    );

    const NoConnectedView = () => (
        <View style={tw('flex-1 justify-center items-center p-6')}>
            <Text style={tw('text-xl lg:text-2xl text-white text-center mb-4 font-primary')}>
                Vous n'avez pas encore attrapé de criminel
            </Text>
            <View style={tw('w-80')}>
                <PrimaryButton title="Créer un compte pour commencer l'enquête" destination="Login" />
                <PrimaryButton title="Se connecter" backgroundColor="bg-secondary" destination="Connexion" />

            </View>
        </View>
    );

    const styles = StyleSheet.create({
        container: { flex: 1, },
        // @ts-ignore
        child: { width, justifyItems: 'center', alignItems: 'center', padding: 48 },
        pagination: { position: 'absolute', top: 80 },
        paginationItem: { height: 32, width: 32 }
    });
    return (
        <View style={tw('flex-1')}>
            <ImageBackground source={require('images/bg_office.jpg')} style={tw('flex-1')} resizeMode="cover">
            </ImageBackground>
            <SafeAreaView style={[tw('flex-1'), StyleSheet.absoluteFillObject]}>
                <ScrollView contentContainerStyle={tw((!user || isEmptyCriminalsList ? 'flex-grow justify-center' : ''))}>
                    <CustomHeaderEmpty title="Criminels arrêtés" backgroundColor="bg-whiteTransparent" backToMain={true} />
                    <View style={tw(`flex-1 ${!user || isEmptyCriminalsList ? 'pt-20 justify-center items-center' : 'pt-20'} `)}>
                        {
                            !user ? (
                                <NoConnectedView />
                            ) : isEmptyCriminalsList ? (
                                <NoCriminalsView />
                            ) : (
                                <SwiperFlatList
                                    index={0}
                                    showPagination
                                    paginationStyle={styles.pagination}
                                    paginationStyleItem={styles.paginationItem}
                                    data={criminals}
                                    showsHorizontalScrollIndicator
                                    automaticallyAdjustContentInsets
                                    disableGesture={true}
                                    renderItem={({ item }) => (
                                        <View style={[styles.child]} >
                                            <Image
                                                // @ts-ignore
                                                source={suspectsImagesMapping[item.imageId]}
                                                style={tw(' w-44 h-44 lg:w-64 lg:h-64 rounded-md')}
                                                resizeMode="contain"
                                            />
                                            <View style={tw('bg-black bg-opacity-60 p-2 rounded')}>
                                                <Text style={[tw('font-bold mt-2 text-white text-center font-primary text-xl')]}>{item.name}</Text>
                                            </View>
                                            {item.description ? (
                                                <View style={tw('bg-black bg-opacity-60 p-2 rounded')}>
                                                    <Text style={[tw('text-white font-primary text-lg')]}>{item.description}</Text>
                                                </View>
                                            ) : null}
                                        </View>
                                    )}
                                />
                            )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default CriminalsCaughtScreen;
