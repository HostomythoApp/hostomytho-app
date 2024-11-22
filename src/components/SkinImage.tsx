import React from 'react';
import { Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { Skin } from 'models/Skin';
import skinImages from 'utils/skinImages';

const SkinImage = ({ skin }: { skin: Skin | null }) => {
    const tw = useTailwind();

    if (!skin) {
        return null;
    }

    const getImageStyle = (type: string) => {
        switch (type) {
            case 'Vestes':
                return tw('w-20 h-28 -mt-6');
            case 'Visages':
                return tw('w-20 h-52 -mt-4');
            case 'Accessoires':
                return tw('w-20 h-52 -mt-[58px]');
            case 'Cheveux':
                return tw('w-20 h-52 -mt-1');
            case 'Chapeaux':
                return tw('w-20 h-52 mt-2');
            case 'Lunettes':
                return tw('w-20 h-52 -mt-1');
            default:
                return tw('w-20 h-52');
        }
    };

    return (
        // @ts-ignore
        <Image source={skinImages[skin.image_url]}
            style={getImageStyle(skin.type)}
            resizeMode="contain" />
    );

};

export default SkinImage;
