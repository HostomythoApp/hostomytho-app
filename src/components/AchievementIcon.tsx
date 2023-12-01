import React from 'react';
import getIconComponent from "utils/iconHelpers";
import { Achievement } from "models/Achievement";
import { Image } from "react-native";

const AchievementIcon = ({ achievement }: { achievement: Achievement | null}) => {
    if (!achievement) {
        return null;
    }

    const LibToLoad = achievement.picto ? achievement.lib : "AntDesign";
    const IconComponent = getIconComponent(LibToLoad);

    const iconName = achievement.picto || "checkcircleo";
    const iconColor = achievement.color || "mediumseagreen";

    if (LibToLoad === "image") {
        return (
            <Image
                source={{ uri: `images/achievements/${iconName}` }}
                style={{
                    width: 24,
                    height: 24,
                }}
            />
        );
    } else {
        return <IconComponent name={iconName} size={24} color={iconColor} />;
    }
};

export default AchievementIcon;
