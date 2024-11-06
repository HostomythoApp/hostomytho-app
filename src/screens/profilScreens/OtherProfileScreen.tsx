
import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import { Skin } from 'models/Skin';
import skinImages from 'utils/skinImages';
import ContentProfileScreen from 'screens/profilScreens/ContentProfileScreen';
import { characterImagesMapping } from 'utils/characterImagesMapping';
import Loader from 'components/Loader';
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackNavigationProp } from "navigation/Types";
import { responsiveTitle } from "utils/functions";
import { getUserDetailsById } from "services/api/user";
import { getEquippedUserSkins } from 'services/api/skins';

const OtherProfileScreen = (props: any) => {
    const tw = useTailwind();

    const window = Dimensions.get('window');
    const isMobile = window.width < 670;
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation<RootStackNavigationProp<"PolitiqueDeConfidentialite">>();
    // @ts-ignore
    const [characterImage, setCharacterImage] = useState<Skin[]>([]);
    const [equippedSkins, setEquippedSkins] = useState<Skin[]>([]);
    const [dataUser, setDataUser] = useState<any>(null);
    const route = useRoute();
    // @ts-ignore
    const userId = route.params?.userId;
    const windowWidth = Dimensions.get('window').width;

    useEffect(() => {
        if (userId) {
            fetchUsers(userId);
        }
    }, [userId]);


    useEffect(() => {
        // @ts-ignore
        setCharacterImage(characterImagesMapping[dataUser?.userGender || 'femme'][dataUser?.userColorSkin || 'clear']);
            setIsLoading(false);
    }, [dataUser?.userGender]);


    const fetchUsers = async (id: number) => {
        try {
            const result = await getUserDetailsById(id);
            setDataUser(result.data);
            const skins = await getEquippedUserSkins(id);
            setEquippedSkins(skins);
        } catch (error) {
            console.error('Error fetching user details', error);
        }
    };

    const StatBox = ({ title, value, color }: { title: string, value: any, color: string }) => {
        return (
            <View style={tw(` max-w-[250px] w-[30%] min-w-[140px] flex justify-around p-4 my-2 rounded-lg ${color} m-4 bg-white`)}>
                <Text style={[tw('font-primary text-black'), isMobile ? tw('text-base') : tw('text-base')]}
                >{title}</Text>
                <Text style={tw('font-primary text-lg text-black font-extrabold')}>{value}</Text>
            </View>
        );
    };

    return (
        <ImageBackground
            source={require('images/bg_office.jpg')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            {isLoading && <Loader />}
            <CustomHeaderEmpty backgroundColor='bg-transparent' textColor='white' />

            <View style={tw('flex-1 flex-row items-start justify-start relative')}>
                <View style={tw('w-1/4 h-3/4 mb-10 ml-0 mr-auto mt-auto items-end justify-center')}>
                    <Image
                        // @ts-ignore
                        source={characterImage}
                        style={tw('absolute w-full h-full ')}
                        resizeMode="contain"
                    />

                    {Object.values(equippedSkins).map((skin: Skin) => (
                        <Image
                            key={`imageSkin-${skin.id}`}
                            // @ts-ignore
                            source={skinImages[skin.image_url]}
                            style={tw('absolute w-full h-full')}
                            resizeMode="contain"
                        />
                    ))}
                </View>
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center z-20")} style={[tw('w-3/5 h-full'), { marginright: '5%' }]}>

                    <View style={[tw('w-4/5')]}>
                    <View style={tw('flex-row flex-wrap mt-4 justify-center')}>
                        {Array.from({ length: dataUser?.nbFirstMonthly || 0 }).map((_, index) => (
                            <Image
                                key={index}
                                source={require('images/ranking_1.png')}
                                style={{
                                    width: windowWidth * 0.05,
                                    height: windowWidth * 0.05,
                                    maxWidth: 70,
                                    minWidth: 50,
                                    minHeight: 50
                                }}
                                resizeMode="contain"
                            />
                        ))}
                    </View>
                        <Text style={[tw('font-bold mb-6 text-center text-[whitesmoke] font-MochiyPopOne pt-4 '),
                        {
                            fontSize: responsiveTitle(64)
                        }]}>{dataUser?.userName}</Text>

                        <Text style={tw('text-lg mb-4 text-center text-white font-primary')}>Points: {dataUser?.userPoints}</Text>
                    </View>

                    <View style={tw('w-full flex justify-center pt-4')}>
                        <View style={tw('w-auto m-auto max-w-6xl')}>

                            <View style={tw('justify-center flex-row rounded-xl p-4 pt-0 flex-wrap')}>
                                <StatBox title="Classement général :" value={dataUser?.generalRanking} color="border-l-4 border-blue-500" />
                                <StatBox title="Classement mensuel :" value={dataUser?.monthlyRanking} color="border-l-4 border-green-500" />
                                <StatBox title="Meilleur enquêteur mensuel :" value={dataUser?.nbFirstMonthly} color="border-l-4 border-yellow-500" />
                                <StatBox title="Hauts faits accomplis :" value={dataUser?.achievementCount} color="border-l-4 border-purple-500" />
                                <StatBox title="Criminels arrêtés :" value={dataUser?.criminalsCount} color="border-l-4 border-red-500" />
                                <StatBox title="Compte créé le :" value={dataUser?.createdAt} color="border-l-4 border-blue-500" />
                            </View>

                        </View>
                    </View>

                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default OtherProfileScreen;