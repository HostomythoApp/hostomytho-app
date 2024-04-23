import React, { useEffect, useState } from 'react';
import { Image, View, Text, Dimensions } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Skin } from 'models/Skin';
import { characterImagesMapping } from 'utils/characterImagesMapping';
import skinImages from 'utils/skinImages';

interface CharacterPortraitProps {
  gender: any;
  color_skin: any;
  skins: Skin[];
}

const CharacterPortrait: React.FC<CharacterPortraitProps> = ({ gender, color_skin, skins }) => {
  const tw = useTailwind();
  const windowWidth = Dimensions.get('window').width;
  const portraitWidth = windowWidth * 0.087;
  const portraitHeight = portraitWidth * 1.15; 

  // @ts-ignore
  const characterImage = characterImagesMapping[gender || 'homme'][color_skin || 'clear'];

  return (
    <View style={[tw('relative'), { width: portraitWidth, height: portraitHeight }]}>
      <Image
        source={characterImage}
        style={tw('w-full h-full')}
        resizeMode="contain"
      />
      {skins.map((skin) => (
        <Image
          key={skin.id}
          // @ts-ignore
          source={skinImages[skin.image_url]}
          style={tw('absolute w-full h-full')}
          resizeMode="contain"
        />
      ))}
    </View>
  );
};

export default CharacterPortrait;
