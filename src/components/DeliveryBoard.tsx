import PanelHeader from "@/components/panel-components/PanelHeader";
import { useToast } from "@/hooks/useToast";
import { getMyDeliveries } from "@/lib/queries/delivery-queries";
import { completeOrder } from "@/lib/queries/order-mutation-queries";
import { supabase } from "@/lib/supabase/supabase";
import { type DeliveryInfo } from "@/lib/types/delivertypes";
import { Deliverystyles } from "@/styles/Delivery.styles";
import { COLORS } from "@/styles/StyleTokens";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useEffect, useState } from "react";
import { View } from "react-native";
import DeliveryTicket from "./delivery-components/DeliveryTicket";

export default function DeliveryBoard() {
 const [deliveries, setDeliveries] = useState<DeliveryInfo[]>([]);
 const showToast = useToast();

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

    async function loadDeliveries() {
      if (!user) {
        return;
      }
      const rows = await getMyDeliveries(driverData?.id);
      console.log("current:", deliveries);
      console.log("queried:", rows);

      setDeliveries(rows);
      console.log("new current:", deliveries);
    }

    await loadDeliveries();

    channel = supabase
      .channel(`driver-${driverData.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "customer_info",
          filter: `driver_id=eq.${driverData.id}`,
        },
        () => { void loadDeliveries(); }
      )
      // a broadcast receiver that receives broadcasts from src/lib/queries/driver-mutation-queries.ts
      // This lets the channel know that the order has be reassigned to another driver which requires another
      // loadDeliveries() invokation to remove the reassigned delivery order
      .on(
        "broadcast",
        { event: "delivery_removed" },
        () => { void loadDeliveries(); }
      )
      .subscribe();
  }

  void init();

  return () => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  };
}, []);

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