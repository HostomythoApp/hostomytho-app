import { useTailwind } from "tailwind-rn";
import { Text, View } from "react-native";

const SmallStatBox = ({ title, value, color }: { title: string, value: any, color: string }) => {
  const tw = useTailwind();


  return (
    <View style={tw(`w-[164px] flex justify-around p-2 mr-2 rounded-lg ${color} bg-white mb-2`)}>
      <Text style={tw('font-primary text-black')}>{title}</Text>
      <Text style={tw('font-primary text-black font-extrabold')}>{value}</Text>
    </View>
  );
};

export default SmallStatBox;
