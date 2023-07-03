import { useTailwind } from "tailwind-rn";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FunctionButton = ({
  text,
  func,
  width,
}: {
  text: string,
  func: () => void;
  width?: number,
}) => {
  const tw = useTailwind();
  const widthStyle = { minWidth: 300, maxWidth: width || 50 };

  return (
    <TouchableOpacity
      onPress={func}
      style={{ ...tw("bg-primary rounded py-2 px-12 my-2 font-medium "), ...widthStyle }}
    >
      <Text style={tw("text-white text-center text-lg")}>{text}</Text>
    </TouchableOpacity>

  );
};

export default FunctionButton;
