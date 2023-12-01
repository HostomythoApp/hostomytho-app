import { useTailwind } from "tailwind-rn";
import { Text } from "react-native";

const MainTitle = ({ title }: { title: string }) => {
  const tw = useTailwind();

  return (
    <Text
      style={tw(
        "mb-8 font-bold text-3xl md:text-4xl md:mt-6 text-center text-gray-800 dark:text-white"
      )}
    >
      {title}
    </Text>
  );
};

export default MainTitle;
