import React, { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet, ImageBackground, SafeAreaView, ScrollView } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { getUserCriminals } from 'services/api/criminals';
import { suspectsImagesMapping } from 'utils/suspectsImagesMapping';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

export interface Criminal {
    name: string;
    description: string;
    imageId: number;
}

const CriminalsCaughtScreen = () => {
    const tw = useTailwind();
    const { user } = useUser();
    const [criminals, setCriminals] = useState<Criminal[]>([]);

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

    const { width } = Dimensions.get('window');
    const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: 'white' },
        child: { width, justifyContent: 'center', alignItems: 'center', padding: 50 },
        text: { fontSize: width * 0.05, textAlign: 'center' },
        textBackground: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 5,
        },
        pagination: { position: 'absolute', top: 100 }
    });

    return (
        <View style={tw('flex-1')}>
            <ImageBackground source={require('images/bg_bureau.png')} style={tw('flex-1')} resizeMode="cover">
            </ImageBackground>
            <SafeAreaView style={[tw('flex-1'), StyleSheet.absoluteFillObject]}>
                <ScrollView >
                <CustomHeaderEmpty title="Criminels arrêtés" backgroundColor="bg-whiteTransparent" />

                    <SwiperFlatList
                        index={0}
                        showPagination
                        paginationStyle={styles.pagination}
                        data={criminals}
                        style={tw('pt-24')}
                        renderItem={({ item }) => (
                            <View style={styles.child}>
                                <Image
                                    source={suspectsImagesMapping[item.imageId]}
                                    style={tw('w-64 h-64 rounded-md')}
                                    resizeMode="contain"
                                />
                                <View style={styles.textBackground}>
                                    <Text style={[styles.text, tw('text-xl font-bold mt-2 text-white')]}>{item.name}</Text>
                                </View>
                                <View style={styles.textBackground}>
                                    <Text style={[styles.text, tw('text-sm text-white')]}>{item.description}</Text>
                                </View>
                            </View>
                        )}
                    />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default CriminalsCaughtScreen;
