import React from "react";
import { useTailwind } from "tailwind-rn";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Achievement } from "models/Achievement";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  Entypo,
  SimpleLineIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

const getIconComponent = (libName: string) => {
  switch (libName) {
    case "MaterialCommunityIcons":
      return MaterialCommunityIcons;
    case "FontAwesome":
      return FontAwesome;
    case "FontAwesome5":
      return FontAwesome5;
    case "Entypo":
      return Entypo;
    case "SimpleLineIcons":
      return SimpleLineIcons;
    case "AntDesign":
      return AntDesign;
    case "Ionicons":
      return Ionicons;
    default:
      return MaterialCommunityIcons;
  }
};

const AchievementItem = ({
    achievement,
  }: {
    achievement: Achievement;
  }) => {
    const tw = useTailwind();
  
    const defaultLib = achievement.picto ? achievement.lib : "AntDesign";
    const IconComponent = getIconComponent(defaultLib);
    const opacity = achievement.userHasAchievement ? 1 : 0.3;
    
    const iconName = achievement.picto || "checkcircleo";
    const iconColor = achievement.color || "mediumseagreen";
  
    return (
      <View style={tw("flex-row items-center p-4 bg-white rounded-lg mb-4")}>
        <IconComponent
          name={iconName}
          size={24}
          color={iconColor}
          style={{ opacity }}
        />
        <View style={tw("ml-4")}>
          <Text style={[tw("font-bold text-lg"), { opacity }]}>
            {achievement.name}
          </Text>
          <Text style={[tw("text-gray-600"), { opacity }]}>
            {achievement.description}
          </Text>
        </View>
      </View>
    );
  };
  

export default AchievementItem;
