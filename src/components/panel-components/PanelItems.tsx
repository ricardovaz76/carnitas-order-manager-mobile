import Ticket from "@/components/Ticket";
import type { Order } from "@/lib/types/ordertypes";
import { PanelItemsstyles } from "@/styles/panel-styles/PanelItems.styles";
import { ScrollView, Text, View } from "react-native";

interface PanelItemsProps {
  orders: Order[];
}

export default function PanelItems({ orders }: PanelItemsProps) {
  if (orders.length <= 0) {
    return (
      <View style={PanelItemsstyles.empty}>
        <Text style={PanelItemsstyles.emptyText}>Nothing here right now</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={PanelItemsstyles.list}
      showsVerticalScrollIndicator={false}
    >
      {orders.map((order) => (
        <Ticket key={order.id} order={order} />
      ))}
    </ScrollView>
  );
}
