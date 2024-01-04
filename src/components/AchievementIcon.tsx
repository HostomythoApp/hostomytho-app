import React from 'react';
import getIconComponent from "utils/iconHelpers";
import { Achievement } from "models/Achievement";
import { Image , Text} from "react-native";
import { achievementsImagesMapping } from 'utils/achievementsImagesMapping';

const AchievementIcon = ({ achievement }: { achievement: Achievement | null}) => {
    if (!achievement) {
        return null;
    }

    const LibToLoad = achievement.picto ? achievement.lib : "AntDesign";
    const IconComponent = getIconComponent(LibToLoad);

    const iconName = achievement.picto || "checkcircleo";
    const iconColor = achievement.color || "mediumseagreen";

    // Utilisez le mappage pour obtenir le chemin de l'image
    if (LibToLoad === "image" && achievementsImagesMapping[iconName]) {
        return (
            <Image
                source={achievementsImagesMapping[iconName]}
                style={{
                    width: 38,
                    height: 38,
                }}
            />
        );
    } else {
        return <IconComponent name={iconName} size={24} color={iconColor} />;
    }
};

export default AchievementIcon;