import React, { useState } from 'react';
import AchievementModal from 'components/AchievementModal';
import { Achievement } from 'models/Achievement';

export const AchievementContext = React.createContext({
    unlockAchievement: (newAchievement: Achievement) => { },
});

export const AchievementProvider = ({ children }: { children: any }) => {
    const [achievement, setAchievement] = useState<Achievement | null>(null);

    const unlockAchievement = (newAchievement: Achievement) => {
        console.log(newAchievement);

        setAchievement(newAchievement);
    };

    const closeAchievement = () => {
        setAchievement(null);
    };

    return (
        <AchievementContext.Provider value={{ unlockAchievement }}>
            {children}
            <AchievementModal
                achievement={achievement}
                isVisible={achievement !== null}
                onClose={closeAchievement}
            />
        </AchievementContext.Provider>
    );
};
