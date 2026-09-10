import DeliveryBoard from "@/components/DeliveryBoard";
import { COLORS } from "@/styles/StyleTokens";
import { View } from "react-native";

export default function DeliveryScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bgDeep }}>
      <DeliveryBoard/>
    </View>
  );
}