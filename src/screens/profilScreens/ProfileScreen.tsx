
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import { Skin } from 'models/Skin';
import skinImages from 'utils/skinImages';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import ContentProfileScreen from 'screens/profilScreens/ContentProfileScreen';
import SkinsManagementScreen from 'screens/profilScreens/SkinsManagementScreen';
import { useSkins } from 'services/context/SkinsContext';
import { characterImagesMapping } from 'utils/characterImagesMapping';

const ProfileScreen = (props: any) => {
    const tw = useTailwind();
    const { user, updateStorageUserFromAPI } = useUser();

    const window = Dimensions.get('window');
    const isMobile = window.width < 768;
    const [viewMode, setViewMode] = useState<'profile' | 'skinsManagement'>('profile');
    const { equippedSkins } = useSkins();

    // @ts-ignore
    const characterImage = characterImagesMapping[user?.gender || 'homme'][user?.color_skin || 'clear'];

    useEffect(() => {
        if (user?.id) {
            updateStorageUserFromAPI(user.id);
        }
    }, []);

    const toggleViewMode = () => {
        setViewMode(viewMode === 'profile' ? 'skinsManagement' : 'profile');
    };

    return (
        <ImageBackground
            source={require('images/bg_bureau.webp')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            <CustomHeaderEmpty backgroundColor='bg-transparent' textColor='white' />
            <View style={tw('flex-1 flex-row items-start justify-start relative')}>
                {!isMobile &&
                    <View style={tw('w-1/4 h-3/4 mb-10 ml-0 mr-auto mt-auto items-end justify-center')}>
                        <Image
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
                }
                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center z-20")} style={[tw('w-3/5 h-full'), { marginright: '5%' }]}>
                    {viewMode === 'profile' ?
                        <ContentProfileScreen user={user} />
                        :
                        <SkinsManagementScreen user={user} />
                    }
                </ScrollView>

                <TouchableOpacity
                    onPress={toggleViewMode} // Bascule entre les modes
                    style={tw('absolute bottom-0 left-0 min-w-[50px] min-h-[50px] max-h-[100px] justify-end')}
                >
                    {viewMode === 'profile' ?
                        <View style={tw('bg-black bg-opacity-50 rounded-tr-lg w-full h-full justify-center items-center flex-row')}>
                            <AntDesign name="skin" size={30} color="#ffffff" style={tw('m-1')} />
                            <Text style={tw('text-white font-primary ml-1 mr-3 text-lg')}
                            >Changer d'apparence</Text>
                        </View>
                        :
                        <View style={tw('bg-black bg-opacity-50 rounded-tr-lg w-full h-full justify-center items-center flex-row')}>
                            <Ionicons name="chevron-back" size={34} color="#ffffff" />

                            <Text style={tw('text-white font-primary ml-1 mr-3 text-lg')}
                            >Retour au profil</Text>
                        </View>
                    }
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default withAuth(ProfileScreen);