import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import withAuth from 'services/context/withAuth';
import { useUser } from 'services/context/UserContext';
import { Skin } from 'models/Skin';
import skinImages from 'utils/skinImages';
import { getUserSkins, getEquippedUserSkins, unequipSkin } from 'services/api/skins';
import { equipSkin } from 'services/api/skins';
import { useSkins } from 'services/context/SkinsContext';

const SkinsManagementScreen = (props: any) => {
    const tw = useTailwind();
    const { user, updateStorageUserFromAPI } = useUser();
    const window = Dimensions.get('window');
    const isMobile = window.width < 768;
    // const [equippedSkins, setEquippedSkins] = useState<Skin[]>([]);
    const skinTypes = ["visage", "lunettes", "chapeau", "veste", "pilosité"];
    const [skins, setSkins] = useState<Record<string, Skin[]>>({});
    const [apiSkins, setApiSkins] = useState<Skin[]>([]);
    const { equippedSkins, setEquippedSkins } = useSkins();
    
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
            const updatedEquippedSkins = equippedSkins.filter(skin => skin.id !== updatedSkin.id);
            setEquippedSkins(updatedEquippedSkins);
        } else {
            const updatedSkin = await equipSkin(user.id, skin.id);
            setEquippedSkins([...equippedSkins, updatedSkin]);
        }
    
        // Si vous devez mettre à jour les données de l'utilisateur, vous pouvez le faire ici
        if (user?.id) {
            updateStorageUserFromAPI(user.id);
        }
    };
    


    const isEquipped = (skin: Skin) => {
        return equippedSkins.some(equippedSkin => equippedSkin.id === skin.id);
    };

    return (

        <View style={[tw('w-full mt-4 px-2 max-w-5xl'), isMobile ? tw('pt-2') : tw('pt-6')]}>
            <View style={tw('flex-row justify-center')}>
                <View style={[tw('mt-4'), isMobile ? tw('w-4/5') : tw('w-3/5')]}>
                    <Text style={[tw('font-bold mb-6 text-center text-[whitesmoke] font-MochiyPopOne'), isMobile ? tw('text-1xl') : tw(' text-3xl leading-10')]}>Changement d'apparence</Text>
                </View>
            </View>

            <View style={tw('flex-col')}>
                <View style={[tw('justify-between my-6 flex-wrap  '), isMobile ? tw('flex-col mt-2') : tw('flex-row mt-8')]}>
                    <View style={[tw('mt-0'), isMobile ? tw('w-full mr-0 mb-4') : tw('w-3/4 mr-2')]}>
                        <Text style={tw('text-xl font-bold mb-2 pl-2 text-white font-primary')}>Objets possédés</Text>

                        {skinTypes.map(type => {
                            return (
                                <View key={type} style={tw('bg-white mb-2 py-2 rounded-lg')}>
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
            </View>
        </View>

    );
};

export default withAuth(SkinsManagementScreen);