import { useTailwind } from "tailwind-rn";
import { Text, View } from "react-native";

const WikiEncard = () => {
  const tw = useTailwind();

  return (
    <View style={tw('p-[13px] w-full bg-blue-100 absolute z-30')}>
      <Text style={tw('font-primary text-[16px] text-center text-blue-800')}>
        Mode Wiki activé : cliquez sur un mot pour avoir sa description Wikipedia. Celle-ci peut être imprécise ou un peu éloignée si aucune page n'est trouvée.
        {"\n"}
        Cliquez à nouveau sur le bouton pour quitter ce mode.
      </Text>
    </View>
  );
};

export default WikiEncard;
