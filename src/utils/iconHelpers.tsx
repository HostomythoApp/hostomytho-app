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

export default getIconComponent;