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
            case 'veste':
                return tw('w-20 h-28 -mt-6');
            case 'visage':
                return tw('w-20 h-52 -mt-4');
            case 'stetho':
                return tw('w-20 h-52 -mt-[58px]');
            case 'cheveux':
                return tw('w-20 h-52 -mt-1');
            case 'chapeau':
                return tw('w-20 h-52 mt-2');
            case 'lunettes':
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
