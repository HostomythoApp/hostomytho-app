import { useTailwind } from "tailwind-rn";
import { Text } from "react-native";

const MainTitle = ({ title }: { title: string }) => {
  const tw = useTailwind();

  return <Text style={tw("text-black text-center text-lg")}>{title}</Text>;
};

export default MainTitle;
