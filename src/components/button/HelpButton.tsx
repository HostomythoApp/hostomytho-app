import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

const HelpButton = ({ onHelpPress }: { onHelpPress: any }) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity 
      style={tw('top-0 mr-2 ml-auto bg-[#FFFEE0] p-2 text-center w-11 rounded-t-none rounded-b-md')} 
      onPress={onHelpPress}
    >
      <Entypo name="help" size={16} color="#253529" />
    </TouchableOpacity>
  );
};

export default HelpButton;
