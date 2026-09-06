import OrdersBoard from "@/components/OrdersBoard";
import { DeliveryDriversProvider } from "@/hooks/useDeliveryDrivers";
import { getActiveDrivers } from "@/lib/queries/get-delivery-drivers-queries";
import type { DriverMenu } from "@/lib/types/drivertypes";
import { COLORS } from "@/styles/StyleTokens";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function DashboardScreen() {
  const [drivers, setDrivers] = useState<DriverMenu[]>([]);

  useEffect(() => {
    async function loadDrivers() {
      const initialDriversData = await getActiveDrivers();
      setDrivers(initialDriversData);
    }
    void loadDrivers();
  }, []);

  return (
    <DeliveryDriversProvider initialDrivers={drivers}>
      <View style={{ flex: 1, backgroundColor: COLORS.bgDeep }}>
        <OrdersBoard />
      </View>
    </DeliveryDriversProvider>
  );
}
