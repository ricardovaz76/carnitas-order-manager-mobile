import { COLORS } from "@/styles/StyleTokens";
import { OrderTypestyles } from "@/styles/ticket-styles/TicketOrderType.styles";
import { MapPin, Phone } from "lucide-react-native";
import { Text, View } from "react-native";
// import DriverAssignMenu from "@/components/assign-drivers-components/DriverAssignMenu";
// import { useToast } from "@/hooks/useToast";
// import { assignDriverToOrder } from "@/lib/queries/driverMutations";
// import { getErrorMessage } from "@/utils/getErrorMessage";
// import { useEffect, useState } from "react";

interface TicketOrderTypeProps {
  orderId: number;
  orderType: string;
  address: string | null;
  phone: string | null;
  driverId: string | null;
}

export default function TicketOrderType({
  orderType,
  address,
  phone,
}: TicketOrderTypeProps) {
  const delivery = orderType === "delivery";

  // Driver assignment - re-enable once we get to the drivers page
  // const [assignDriverId, setAssignDriverId] = useState<string | null>(null);
  // const showToast = useToast();

  // useEffect(() => {
  //   setAssignDriverId(driverId);
  // }, [driverId]);

  // async function handleAssign(newDriverId: string) {
  //   const previous = assignDriverId;
  //   setAssignDriverId(newDriverId);
  //   try {
  //     await assignDriverToOrder(orderId, newDriverId);
  //   } catch (err) {
  //     setAssignDriverId(previous);
  //     showToast(getErrorMessage(err, "Failed to assign driver to order"), "error");
  //   }
  // }

  return (
    <View>
      <Text style={OrderTypestyles.orderType}>{orderType}</Text>
      {delivery && (
        <View style={OrderTypestyles.deliveryInfo}>
          <View style={OrderTypestyles.infoRow}>
            <MapPin size={11} color={COLORS.customerInfoInk} />
            <Text style={OrderTypestyles.infoText}>
              {address ?? "No address given yet"}
            </Text>
          </View>
          <View style={OrderTypestyles.infoRow}>
            <Phone size={11} color={COLORS.customerInfoInk} />
            <Text style={[OrderTypestyles.infoText, OrderTypestyles.mono]}>
              {phone ?? "No phone number given yet"}
            </Text>
          </View>
          {/* <DriverAssignMenu assignedDriverId={assignDriverId} onAssign={handleAssign} /> */}
        </View>
      )}
    </View>
  );
}
