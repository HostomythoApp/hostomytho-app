import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import { Skin } from 'models/Skin';
import skinImages from 'utils/skinImages';
import { getUserSkins, getEquippedUserSkins, unequipSkin } from 'services/api/skins';
import { equipSkin } from 'services/api/skins';

const SkinsManagementScreen = (props: any) => {
    const tw = useTailwind();
    const { user, updateStorageUserFromAPI } = useUser();

    const { navigation } = props;

    const window = Dimensions.get('window');
    const isMobile = window.width < 768;
    const [equippedSkins, setEquippedSkins] = useState<Skin[]>([]);
    const skinTypes = ["visage", "lunettes", "chapeau", "veste", "pilosité"];
    const [skins, setSkins] = useState<Record<string, Skin[]>>({});
    const [apiSkins, setApiSkins] = useState<Skin[]>([]);

    const skinOrder = {
        'chapeau': 5,
        'cheveux': 4,
        'veste': 3,
        'lunettes': 2,
        'visage': 1,
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                const allSkins = await getUserSkins(user.id);
                const equippedSkinsFromApi = await getEquippedUserSkins(user.id);
                setSkins(allSkins);
                setApiSkins(equippedSkinsFromApi);
            }
        };
        fetchData();
    }, [user]);

    useEffect(() => {
        if (JSON.stringify(apiSkins.sort()) !== JSON.stringify([...equippedSkins].sort())) {
            setEquippedSkins(Array.from(new Set(apiSkins)));
        }
    }, [apiSkins]);

    const clickOnSkin = async (skin: Skin) => {
        if (isEquipped(skin)) {
            const updatedSkin = await unequipSkin(user.id, skin.id);
            setEquippedSkins(equippedSkins.filter(skin => skin.id !== updatedSkin.id));
        } else {
            const updatedSkin = await equipSkin(user.id, skin.id);
            setEquippedSkins([...equippedSkins, updatedSkin]);
        }
    };



    const isEquipped = (skin: Skin) => {
        return equippedSkins.some(equippedSkin => equippedSkin.id === skin.id);
    };

    return (
        <ImageBackground
            source={require('images/bg_bureau.png')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            <CustomHeaderEmpty backgroundColor='bg-transparent' textColor='white' />
            <View style={tw('flex-1 flex-row items-start justify-start relative')}>
                {!isMobile &&
                    <View style={tw('w-1/4 h-3/4 mb-10 ml-0 mr-auto mt-auto items-end justify-center')}>
                        <Image
                            source={require('images/character/man.png')}
                            style={tw('absolute w-full h-full ')}
                            resizeMode="contain"
                        />

                        {Object.values(equippedSkins).map((skin: Skin) => (


                            <Image
                                key={`${skin.id}-equipped-${equippedSkins.length}`}
                                // @ts-ignore
                                source={skinImages[skin.image_url]}
                                style={tw(' absolute w-full h-full')}
                                resizeMode="contain"
                            />
                        ))}
                    </View>
                }

                <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center z-20")} style={[tw('w-3/5 h-full'), { marginright: '5%' }]}>
                    <View style={[tw('w-full mt-4 px-2 max-w-5xl'), isMobile ? tw('pt-2') : tw('pt-6')]}>
                        <View style={tw('flex-row justify-center')}>
                            <View style={[tw('mt-4'), isMobile ? tw('w-4/5') : tw('w-3/5')]}>

                            </View>
                        </View>

                        {isMobile &&
                            <View style={tw('w-full h-1/4 items-center justify-start')}>
                                <Image
                                    source={require('images/character/man.png')}
                                    style={tw('w-2/3 h-full mb-0 ml-auto mr-auto mt-0')}
                                    resizeMode="contain"
                                />
                            </View>
                        }

                        <View style={tw('flex-col')}>
                            <View style={[tw('justify-between my-6 flex-wrap  '), isMobile ? tw('flex-col mt-2') : tw('flex-row mt-8')]}>
                                <View style={[tw('mt-0'), isMobile ? tw('w-full mr-0 mb-4') : tw('w-3/4 mr-2')]}>
                                    <Text style={tw('text-xl font-bold mb-2 pl-2 text-white font-primary')}>Objets possédés</Text>

                                    {skinTypes.map(type => {
                                        return (
                                            <View style={tw('bg-white mb-2 py-2 rounded-lg')}>
                                                <View key={type}>
                                                    <Text style={tw('text-xl font-bold mb-2 pl-2 text-black font-primary')}>{type}</Text>

                                                    <View style={tw('flex-row')}>
                                                        {skins[type]?.map(skin => {
                                                            return (
                                                                <TouchableOpacity
                                                                    key={skin.id}
                                                                    style={[
                                                                        tw('p-2 rounded-lg mb-2 overflow-hidden h-16'),
                                                                        isEquipped(skin) ? tw('border-2 border-blue-500') : tw('border-2 border-transparent')
                                                                    ]}
                                                                    onPress={() => clickOnSkin(skin)}
                                                                >
                                                                    <Image
                                                                        source={skinImages[skin.image_url]}
                                                                        style={type === 'veste' ? tw('w-20 h-16') : tw('w-20 h-40')}
                                                                        resizeMode="contain"
                                                                    />
                                                                </TouchableOpacity>
                                                            );
                                                        })}
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    })}

                                </View>

                                <View style={[tw('flex-1'), isMobile ? tw('') : tw('mr-2')]}>
                                </View>
                            </View>


                            <View style={[tw('justify-between my-6 flex-wrap'), isMobile ? tw('flex-col') : tw('flex-row')]}>

                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default withAuth(SkinsManagementScreen);