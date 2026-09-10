import PanelHeader from "@/components/panel-components/PanelHeader";
import { getMyDeliveries } from "@/lib/queries/delivery-queries";
import { supabase } from "@/lib/supabase/supabase";
import { type DeliveryInfo } from "@/lib/types/delivertypes";
import { Deliverystyles } from "@/styles/Delivery.styles";
import { COLORS } from "@/styles/StyleTokens";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function DeliveryBoard() {
 const [deliveries, setDeliveries] = useState<DeliveryInfo[]>([]);

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
  }, [])


  return (
    <View style={Deliverystyles.panel}>
      <PanelHeader title="My Deliveries" itemCount={deliveries.length} color={COLORS.cooking} />
    </View>
  );
}