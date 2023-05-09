import { useTailwind } from "tailwind-rn";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Achievement } from "models/Achievement";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons, Entypo, SimpleLineIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const AchievementItem = ({ achievement }: { achievement : Achievement}) => {
  const tw = useTailwind();

    const IconComponent = MaterialCommunityIcons;
    const opacity = achievement.userHasAchievement ? 1 : 0.3;
  
    return (
      <View style={tw('flex-row items-center p-4 bg-white rounded-lg mb-4')}>
        <IconComponent
          name={achievement.picto}
          size={24}
          color={achievement.color}
          style={{ opacity }}
        />
        <View style={tw('ml-4')}>
          <Text style={[tw('font-bold text-lg'), { opacity }]}>{achievement.name}</Text>
          <Text style={[tw('text-gray-600'), { opacity }]}>{achievement.description}</Text>
        </View>
      </View>
    );
  };

export default AchievementItem;
