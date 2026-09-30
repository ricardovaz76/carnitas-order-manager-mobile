import DeliveryTicket from "@/components/delivery-components/DeliveryTicket";
import PanelHeader from "@/components/panel-components/PanelHeader";
import { useMyDeliveries } from "@/hooks/useCustomerInfo";
import { useToast } from "@/hooks/useToast";
import { completeOrder } from "@/lib/queries/order-mutation-queries";
import { Deliverystyles } from "@/styles/Delivery.styles";
import { COLORS } from "@/styles/StyleTokens";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { View } from "react-native";

// Customer info is fetched and kept live in the dashboard layout,
// useMyDeliveries filters it down to the rows assigned to the current user's driver id
export default function DeliveryBoard() {
  const { deliveries, removeDelivery } = useMyDeliveries();
  const showToast = useToast();

  async function handleComplete(Id: number) {
    try {
      const wasCompleted = await completeOrder(Id);
      if (!wasCompleted) {
        showToast("Order isn't ready to complete yet", "error");
      }
      else {
        removeDelivery(Id);
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
