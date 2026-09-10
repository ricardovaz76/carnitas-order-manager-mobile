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
    async function loadDeliveries() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return;
      }
      const rows = await getMyDeliveries(user.id);
      setDeliveries(rows);
    }
    void loadDeliveries();
  }, []);

  async function handleComplete(Id: number) {
    try {
      const wasCompleted = await completeOrder(Id);
      if (!wasCompleted) {
        showToast("Order isn't ready to complete yet", "error");
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