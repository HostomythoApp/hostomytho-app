import { useTailwind } from "tailwind-rn";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Image } from "react-native";

const ClickableElement = ({
  destination
}: {
  destination?: string;
}) => {
  const tw = useTailwind();
  const navigation = useNavigation();
  return (
    // @ts-ignore
    <TouchableOpacity onPress={() => navigation.navigate(destination)}>
      <Image source={require('images/link_main_page.png')} style={tw('w-20 h-20')} />
    </TouchableOpacity>
  );
};

export default ClickableElement;
