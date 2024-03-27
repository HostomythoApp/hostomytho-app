import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { getAchievementsWithUserStatus } from "services/api/achievements";
import { useUser } from 'services/context/UserContext';
import { Achievement } from "models/Achievement";
import AchievementIcon from 'components/AchievementIcon';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';

const AchievementsScreen = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const tw = useTailwind();
    const { user } = useUser();

    useEffect(() => {
        const fetchAndSetAchievements = async () => {
            if (user) {
                const userId = user.id;
                const achievementsData = await getAchievementsWithUserStatus(userId);
                setAchievements(achievementsData);
            }
        };

        fetchAndSetAchievements();
    }, [user]);

    return (
        <ImageBackground
            source={require('images/bg_office.jpg')}
            style={tw("absolute bottom-0 left-0 w-full h-full")}
            resizeMode="cover"
        >
            <CustomHeaderEmpty title="Hauts faits" backgroundColor="bg-whiteTransparent" />

            <FlatList style={tw('pt-20 pb-12')}
                data={achievements}
                renderItem={({ item }) => (
                    <View style={[tw("flex-row items-center p-4 bg-white rounded-lg mb-4 w-full max-w-[700px] self-center"), { opacity: item.userHasAchievement ? 1 : 0.6 }]}>
                        <AchievementIcon achievement={item} />
                        <View style={tw("ml-4")}>
                            <Text style={tw("font-bold text-lg")}>
                                {item.name}
                            </Text>
                            <Text style={tw("text-gray-600")}>
                                {item.description}
                            </Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={tw('pb-20')} 
            />
        </ImageBackground>

    );
};

export default AchievementsScreen;
