import React, { useState } from 'react';
import { Achievement } from 'models/Achievement';
import TimedCustomModal from "components/modals/TimedCustomModal";
import { View, Text } from "react-native";
import AchievementIcon from 'components/AchievementIcon';
import { useTailwind } from "tailwind-rn";

export const AchievementContext = React.createContext({
    unlockAchievement: (newAchievement: Achievement) => { },
});

export const AchievementProvider = ({ children }: { children: any }) => {
    const tw = useTailwind();
    const [achievement, setAchievement] = useState<Achievement | null>(null);

    const unlockAchievement = (newAchievement: Achievement) => {
        setAchievement(newAchievement);
    };

    const closeAchievement = () => {
        setAchievement(null);
    };

    return (
        <AchievementContext.Provider value={{ unlockAchievement }}>
            {children}
            <TimedCustomModal
                isVisible={achievement !== null}
                onClose={closeAchievement}
            >
                <View style={tw('bg-white rounded-xl p-5')}>
                    <Text style={tw('text-center text-green-500 font-bold text-lg')}>Haut fait débloqué</Text>

                    <View style={tw('border-b border-gray-400 my-4')} />

                    <View style={tw('flex-row items-center justify-center mb-5')}>
                        <AchievementIcon achievement={achievement} />
                        <Text style={tw('ml-3 text-lg font-bold')}>{achievement?.name}</Text>
                    </View>
                    <Text style={tw('text-center')}>{achievement?.description}</Text>
                </View>
            </TimedCustomModal>

        </AchievementContext.Provider>
    );
};
