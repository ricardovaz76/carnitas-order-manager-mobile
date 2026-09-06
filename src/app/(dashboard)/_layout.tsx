import UserMenu from "@/components/UserMenu";
import { DeliveryDriversProvider } from "@/hooks/useDeliveryDrivers";
import { getDeliveryDrivers } from "@/lib/queries/get-delivery-drivers-queries";
import { supabase } from "@/lib/supabase/supabase";
import { Driver } from "@/lib/types/drivertypes";
import { COLORS } from "@/styles/StyleTokens";
import { Tabs } from "expo-router";
import { ChefHat, Truck } from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Header({ displayName }: { displayName: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <View style={styles.headerLeft}>
        <ChefHat color={COLORS.new} size={22} />
      </View>
      <UserMenu displayName={displayName} />
    </View>
  );
}

export default function DashboardLayout() {
  const [displayName, setDisplayName] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);

  // Grabs the current user's display name for the layout header
  useEffect(() => {
    async function loadUser() {
      const { data: { user }, } = await supabase.auth.getUser();
      if (!user) {
        return;
      } 

      const { data } = await supabase
        .from("users")
        .select("display_name")
        .eq("id", user.id)
        .single();

      setDisplayName(data?.display_name ?? "");
    }
    loadUser();
  }, []);

  // Fetches the list of delivery drivers from the database and sets them in state
  useEffect(() => {
    async function  loadDrivers() {
      const driverData = await getDeliveryDrivers();
      setDrivers(driverData);
    }
    loadDrivers();
  }, []);

   return (
    <DeliveryDriversProvider initialDrivers={drivers}>
      <Tabs
        screenOptions={{
          header: () => <Header displayName={displayName} />,
          tabBarActiveTintColor: COLORS.new,
          tabBarInactiveTintColor: COLORS.inkFaint,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: COLORS.bgPanelEdge,
            backgroundColor: COLORS.bgPanel,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
            textTransform: "uppercase",
          },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "Dashboard", tabBarIcon: ({ color }) => <ChefHat size={18} color={color} />, }}/>
        <Tabs.Screen name="drivers" options={{ title: "Drivers", tabBarIcon: ({ color }) => <Truck size={18} color={color} />, }}/>
      </Tabs>
    </DeliveryDriversProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgPanelEdge,
    backgroundColor: COLORS.bgDeep,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.paper },
});
