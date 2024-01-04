import { useTailwind } from "tailwind-rn";
import { Text, View } from "react-native";

const StatBox = ({ title, value, color }: { title: string, value: any, color: string }) => {
  const tw = useTailwind();


  return (
    <View style={tw(` max-w-[320px] w-[250px] min-w-[180px] flex justify-around p-4 my-2 rounded-lg ${color} m-4 bg-white`)}>
      <Text style={tw('font-primary text-lg text-black')}>{title}</Text>
      <Text style={tw('font-primary text-lg text-black font-extrabold')}>{value}</Text>
    </View>
  );
};

export default StatBox;
