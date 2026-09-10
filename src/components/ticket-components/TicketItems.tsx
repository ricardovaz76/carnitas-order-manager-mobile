import TicketAdditionalInfo from "@/components/ticket-components/TicketAdditionalInfo";
import TicketSource from "@/components/ticket-components/ticket-decor/TicketSource";
import { type OrderItem, Pounds } from "@/lib/types/ordertypes";
import { TicketItemsstyles } from "@/styles/Ticket.styles";
import { Text, View } from "react-native";

interface TicketItemsProps {
  orderItems: OrderItem[];
  additionalInfo: string | null;
}

export default function TicketItems({
  orderItems,
  additionalInfo,
}: TicketItemsProps) {
  return (
    <View>
      <View style={TicketItemsstyles.list}>
        {orderItems.map((order) => (
          <Text key={order.id} style={TicketItemsstyles.itemText}>
            {order.quantity} {Pounds[order.item] ?? "x"} {order.item}
            {order.toppings ? `: ${order.toppings}` : ""}
          </Text>
        ))}
      </View>
      {additionalInfo && <TicketAdditionalInfo info={additionalInfo} />}
      <TicketSource />
    </View>
  );
}
