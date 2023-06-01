import React from 'react';
import getIconComponent from "utils/iconHelpers";
import { Achievement } from "models/Achievement";

const AchievementIcon = ({ achievement }: { achievement: Achievement | null}) => {
    if (!achievement) {
        return null;
    }
    const LibToLoad = achievement.picto ? achievement.lib : "AntDesign";
    const IconComponent = getIconComponent(LibToLoad);

    const iconName = achievement.picto || "checkcircleo";
    const iconColor = achievement.color || "mediumseagreen";

    return <IconComponent name={iconName} size={24} color={iconColor} />;
};

export default AchievementIcon;
