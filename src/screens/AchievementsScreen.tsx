import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTailwind } from "tailwind-rn";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { getAchievementsWithUserStatus } from "services/api/achievements";
import AchievementItem from "components/AchievementItem";
import { useUser } from 'services/auth/UserContext';
import { Achievement } from "models/Achievement";

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
        <View style={tw('flex-1 bg-gray-100')}>
            <FlatList
                data={achievements}
                renderItem={({ item }) => <AchievementItem achievement={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={tw('p-4')}
            />
        </View>
    );
};

export default AchievementsScreen;
