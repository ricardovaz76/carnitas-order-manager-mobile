import Ticket from "@/components/ticket-components/Ticket";
import type { Order } from "@/lib/types/ordertypes";
import { PanelItemsstyles } from "@/styles/Panel.styles";
import { FlatList, Text, View } from "react-native";

interface PanelItemsProps {
  orders: Order[];
}

export default function PanelItems({ orders }: PanelItemsProps) {
  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => order.id.toString()}
      renderItem={({ item }) => <Ticket order={item} />}
      contentContainerStyle={PanelItemsstyles.list}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <View style={PanelItemsstyles.empty}>
          <Text style={PanelItemsstyles.emptyText}>No active orders</Text>
        </View>
      }
    />
  );
}
