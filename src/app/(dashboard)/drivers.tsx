import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet, Text, View } from "react-native";

export default function DriversScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Drivers page goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.bgDeep,
  },
  text: { color: COLORS.paper },
});
