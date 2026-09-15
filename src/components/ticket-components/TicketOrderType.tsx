import CopyButton from "@/components/buttons/CopyButton";
import DriverAssignMenu from "@/components/driver-components/DriverAssignMenu";
import { useToast } from "@/hooks/useToast";
import { assignDriverToOrder } from "@/lib/queries/driver-mutation-queries";
import { COLORS } from "@/styles/StyleTokens";
import { OrderTypestyles } from "@/styles/Ticket.styles";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { MapPin, Phone } from "lucide-react-native";
import { useState } from "react";
import { Text, View } from "react-native";

interface TicketOrderTypeProps {
  orderId: number;
  orderType: string;
  address: string | null;
  phone: string | null;
  driverId: string | null;
}

export default function TicketOrderType({ orderId, orderType, address, phone, driverId, }: TicketOrderTypeProps) {
  const delivery = orderType === "delivery";

  const [assignDriverId, setAssignDriverId] = useState<string | null>(null);
  const [prevDriverId, setPrevDriverId] = useState<string | null>(null);
  const showToast = useToast();

  if (driverId !== prevDriverId) {
    setPrevDriverId(driverId);
    setAssignDriverId(driverId);
  }

  async function handleAssign(newDriverId: string) {
    const previous = assignDriverId;
    setAssignDriverId(newDriverId);
    try {
      await assignDriverToOrder(orderId, newDriverId);
    } catch (err) {
      setAssignDriverId(previous);
      showToast(
        getErrorMessage(err, "Failed to assign driver to order"),
        "error",
      );
    }
  }

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
            {address && (<CopyButton value={address} label="address"/>)}
          </View>
          <View style={OrderTypestyles.infoRow}>
            <Phone size={11} color={COLORS.customerInfoInk} />
            <Text style={[OrderTypestyles.infoText, OrderTypestyles.mono]}>
              {phone ?? "No phone number given yet"}
            </Text>
            {phone && (<CopyButton value={phone} label="phone"/>)}
          </View>
          <DriverAssignMenu assignedDriverId={assignDriverId} onAssign={handleAssign}/>
        </View>
      )}
    </View>
  );
}
