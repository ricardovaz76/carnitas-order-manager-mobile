import Panel from "@/components/panel-components/Panel";
import PanelTabs from "@/components/panel-components/PanelTabs";
import {
  groupOrdersByStatus,
  STATUS_PANELS,
  type GroupedOrders,
} from "@/lib/grouporders";
import type { Order } from "@/lib/types/ordertypes";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface MobileLayoutProps {
  orders: Order[];
}

export default function MobileLayout({ orders }: MobileLayoutProps) {
  const grouped = groupOrdersByStatus(orders);
  const [activeTab, setActiveTab] = useState<keyof GroupedOrders>("new");
  const activePanel = STATUS_PANELS[activeTab];

  return (
    <View style={styles.container}>
      <PanelTabs
        grouped={grouped}
        activeTab={activeTab}
        onSelect={setActiveTab}
      />
      <View style={styles.content}>
        <Panel
          title={activePanel.title}
          orders={grouped[activeTab]}
          color={activePanel.color}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 16 },
});
