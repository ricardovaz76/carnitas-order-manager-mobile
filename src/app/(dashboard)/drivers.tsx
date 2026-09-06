import DriversBoard from "@/components/DriversBoard";
import { COLORS } from "@/styles/StyleTokens";
import { View } from "react-native";

export default function DriversScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bgDeep }}>
      <DriversBoard />
    </View>
  );
}
