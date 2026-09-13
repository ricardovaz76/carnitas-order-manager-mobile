import DeliveryTicket from "@/components/delivery-components/DeliveryTicket";
import PanelHeader from "@/components/panel-components/PanelHeader";
import { useAppResume } from "@/hooks/useAppResume";
import { useToast } from "@/hooks/useToast";
import { getMyDeliveries } from "@/lib/queries/delivery-queries";
import { completeOrder } from "@/lib/queries/order-mutation-queries";
import { supabase } from "@/lib/supabase/supabase";
import { type Delivery } from "@/lib/types/delivertypes";
import { Deliverystyles } from "@/styles/Delivery.styles";
import { COLORS } from "@/styles/StyleTokens";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function DeliveryBoard() {
 const [deliveries, setDeliveries] = useState<Delivery[]>([]);
 const [driverId, setDriverId] = useState<string | null>(null);
 const showToast = useToast();
 const resumeSignal = useAppResume();

  async function loadDeliveries(id: string) {
    const rows = await getMyDeliveries(id);
    setDeliveries(rows);
  }

  // resolve driver id, initial fetch, subscribe once
  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null;

    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return;
      }

      const { data: driverData, error: driverError } = await supabase
        .from("delivery_drivers")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (driverError || !driverData) {
        return;
      }

      setDriverId(driverData.id);
      await loadDeliveries(driverData.id);

      channel = supabase
        .channel(`driver-${driverData.id}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "customer_info", filter: `driver_id=eq.${driverData.id}` },
          () => { void loadDeliveries(driverData.id); }
        )
        .on("broadcast", { event: "delivery_removed" }, () => { void loadDeliveries(driverData.id); })
        .subscribe();
    }

    void init();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  // Resuming app state fetches the data
  useEffect(() => {
    if (!driverId) return;
    void loadDeliveries(driverId);
  }, [resumeSignal]);

  async function handleComplete(Id: number) {
    try {
      const wasCompleted = await completeOrder(Id);
      if (!wasCompleted) {
        showToast("Order isn't ready to complete yet", "error");
      }
      else {
        setDeliveries((prev) => prev.filter((delivery) => delivery.orderId !== Id))
      }
    } catch (error) {
      showToast(getErrorMessage(error, "Failed to complete order"), "error");
    }
  }

  return (
    <View style={Deliverystyles.panel}>
      <PanelHeader title="My Deliveries" itemCount={deliveries.length} color={COLORS.cooking} />
      {deliveries.map((delivery) => (
        <DeliveryTicket key={delivery.id} delivery={delivery} onRequestComplete={() => handleComplete(delivery.orderId)}/>
      ))}
    </View>
  );
}