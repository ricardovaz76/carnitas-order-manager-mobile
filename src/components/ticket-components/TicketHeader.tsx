import TicketOrderType from "@/components/ticket-components/TicketOrderType";
import { COLORS } from "@/styles/StyleTokens";
import { TicketHeaderstyles } from "@/styles/ticket-styles/TicketHeader.styles";
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
  const [, tick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => tick((n) => n + 1), 15000);
    return () => clearInterval(interval);
  }, []);

  return Math.max(0, Math.floor((Date.now() - firedAt) / 60000));
}

function urgencyColor(minutes: number): string {
  if (minutes >= 10) return COLORS.urgent;
  if (minutes >= 5) return COLORS.new;
  return COLORS.ready;
}

export default function TicketHeader({
  orderId,
  orderType,
  firedAt,
  customerInfo,
  driverId,
}: TicketHeaderProps) {
  const minutes = useElapsedMinutes(firedAt);
  const badgeColor = urgencyColor(minutes);

  return (
    <View style={TicketHeaderstyles.container}>
      <View>
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
