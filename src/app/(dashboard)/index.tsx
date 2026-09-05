import OrdersBoard from "@/components/OrdersBoard";
import { COLORS } from "@/styles/StyleTokens";
import { View } from "react-native";
// import { getActiveDrivers } from "@/lib/queries/deliveryDrivers";
// import { DeliveryDriversProvider } from "@/hooks/useDrivers";

export default function DashboardScreen() {
  // Driver data - re-enable once we get to the drivers page
  // const [drivers, setDrivers] = useState<Driver[]>([]);
  // useEffect(() => {
  //   getActiveDrivers().then(setDrivers);
  // }, []);

  // add DeliveryDriversProvider

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bgDeep }}>
      <OrdersBoard />
    </View>
  );
}
