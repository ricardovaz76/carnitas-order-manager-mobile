import OrdersBoard from "@/components/OrdersBoard";
import { COLORS } from "@/styles/StyleTokens";
import { View } from "react-native";

export default function DashboardScreen() {
  return (
      <View style={{ flex: 1, backgroundColor: COLORS.bgDeep }}>
        <OrdersBoard />
      </View>
  );
}
