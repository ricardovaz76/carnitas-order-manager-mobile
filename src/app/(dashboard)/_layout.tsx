import UserMenu from "@/components/UserMenu";
import { AppResumeContext } from "@/hooks/useAppResume";
import { DeliveryDriversProvider } from "@/hooks/useDeliveryDrivers";
import { registerForPushNotifications } from "@/lib/notifications/registerForPushNotifications";
import { getDeliveryDrivers } from "@/lib/queries/get-delivery-drivers-queries";
import { createHandleInsert, createHandleUpdate } from "@/lib/realtime-handlers/driverRealtimeHandler";
import { supabase } from "@/lib/supabase/supabase";
import { Driver } from "@/lib/types";
import { COLORS } from "@/styles/StyleTokens";
import { Tabs } from "expo-router";
import { Navigation, ReceiptText, Truck } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus, Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Header({ displayName }: { displayName: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
      <View style={styles.headerLeft}>
        <Image source={require('../../../assets/images/header-avatar.png')} style={styles.headerLogo}/>
      </View>
      <UserMenu displayName={displayName} />
    </View>
  );
}

export default function DashboardLayout() {
  const [displayName, setDisplayName] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [resumeSignal, setResumeSignal] = useState(0);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const insets = useSafeAreaInsets();

  // registers user for notifications (if they have not yet registered then a request will be made for permission)
  useEffect(() => {
    void registerForPushNotifications();
  }, []);

  // Listener that keeps track of the app state (app running foreground/background)
  // This is important to refetch data on app state returning to foreground
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const cameToForeground = appState.current.match(/inactive|background/) && nextState === "active";
      if (cameToForeground) {
        setResumeSignal((prev) => prev+1);
      }

      appState.current = nextState;
    });
    return () => subscription.remove();
  }, []);

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

  // initial fetch delivery drivers list
  useEffect(() => {
    async function  loadDrivers() {
      const driverData = await getDeliveryDrivers();
      setDrivers(driverData);
    }
    loadDrivers();
  }, [resumeSignal]);
  
  // realtime listeners to update driver status live
  useEffect(() => {
    const handleInsert = createHandleInsert(setDrivers);
    const handleUpdate = createHandleUpdate(setDrivers);
    
    const channel = supabase
      .channel("delivery_drivers_changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "delivery_drivers" }, handleInsert)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "delivery_drivers" }, handleUpdate)
      .subscribe();
    
      return () => {
        supabase.removeChannel(channel);
      };
  }, []);

   return (
    <AppResumeContext.Provider value={resumeSignal}>
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
              height: 67 + insets.bottom,
              paddingBottom: insets.bottom,
              paddingTop: 8
            },
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: "700",
              textTransform: "uppercase",
            },
          }}
        >
          <Tabs.Screen name="index" options={{ title: "Orders", tabBarIcon: ({ color }) => <ReceiptText size={18} color={color} />, }}/>
          <Tabs.Screen name= "delivery" options={{ title: "Delivery", tabBarIcon: ({ color }) => <Navigation size={18} color={color}/>, }} />
          <Tabs.Screen name="drivers" options={{ title: "Drivers", tabBarIcon: ({ color }) => <Truck size={18} color={color} />, }}/>
        </Tabs>
      </DeliveryDriversProvider>
    </AppResumeContext.Provider>
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
  headerLogo: { width: 32, height: 32, borderRadius: 13 }
});
