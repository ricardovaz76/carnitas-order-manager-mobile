import TicketOrderType from "@/components/ticket-components/TicketOrderType";
import { COLORS } from "@/styles/StyleTokens";
import { TicketHeaderstyles } from "@/styles/Ticket.styles";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

interface TicketHeaderProps {
  orderId: number;
  orderType: string;
  firedAt: number;
  customerInfo: { address: string | null; phone: string | null };
  driverId: string | null;
}

function useElapsedMinutes(firedAt: number): number {
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    function update() {
      setMinutes(Math.max(0, Math.floor((Date.now() - firedAt) / 60000)));
    }

    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, [firedAt]);

  return minutes;
}

function urgencyColor(minutes: number): string {
  if (minutes >= 10) { 
    return COLORS.urgent; 
  }
  if (minutes >= 5) {
    return COLORS.new;
  }
  
  return COLORS.ready;
}

export default function TicketHeader({ orderId, orderType, firedAt, customerInfo, driverId, }: TicketHeaderProps) {
  const minutes = useElapsedMinutes(firedAt);
  const badgeColor = urgencyColor(minutes);

  return (
    <View style={TicketHeaderstyles.container}>
      <View style={TicketHeaderstyles.conent}>
        <Text style={TicketHeaderstyles.orderId}>#{orderId}</Text>
        <TicketOrderType
          orderId={orderId}
          orderType={orderType}
          address={customerInfo.address}
          phone={customerInfo.phone}
          driverId={driverId}
        />
      </View>

      <View
        style={[
          TicketHeaderstyles.badge,
          { backgroundColor: badgeColor + "22", borderColor: badgeColor },
        ]}
      >
        <Text style={[TicketHeaderstyles.badgeText, { color: badgeColor }]}>
          {minutes}m
        </Text>
      </View>
    </View>
  );
}
