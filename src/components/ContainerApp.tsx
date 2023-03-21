import { useTailwind } from "tailwind-rn";
import { StyleSheet, Text, View, Image, SafeAreaView, Button } from "react-native";

export default function ContainerApp() {
  const tw = useTailwind();

  return (
    <SafeAreaView>
      <View style={tw("")}>
        <Text style={tw("font-semibold")}>Hello Tsqsdailwind</Text>
        <Button title="Go to Home" />
      </View>
    </SafeAreaView>
  );
}
