import PanelHeader from "@/components/panel-components/PanelHeader";
import PanelItems from "@/components/panel-components/PanelItems";
import type { Order } from "@/lib/types";
import { Panelstyles } from "@/styles/Panel.styles";
import { View } from "react-native";

interface PanelProps {
  title: string;
  orders: Order[];
  color: string;
}

export default function Panel({ title, orders, color }: PanelProps) {
  return (
    <View style={Panelstyles.container}>
      <PanelHeader title={title} itemCount={orders.length} color={color} />
      <PanelItems orders={orders} />
    </View>
  );
}
