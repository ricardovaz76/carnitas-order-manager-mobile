import { STATUS_PANELS, type GroupedOrders } from "@/lib/mappers/grouporders";
import { PanelTabstyles } from "@/styles/Panel.styles";
import { COLORS } from "@/styles/StyleTokens";
import { Pressable, Text, View } from "react-native";

interface PanelTabsProps {
  grouped: GroupedOrders;
  activeTab: keyof GroupedOrders;
  onSelect: (tab: keyof GroupedOrders) => void;
}

export default function PanelTabs({ grouped, activeTab, onSelect, }: PanelTabsProps) {
  const tabs = Object.keys(STATUS_PANELS) as (keyof GroupedOrders)[];

  return (
    <View style={PanelTabstyles.container}>
      {tabs.map((key) => {
        const panel = STATUS_PANELS[key];
        const isActive = activeTab === key;
        const count = grouped[key].length;

        return (
          <Pressable
            key={key}
            onPress={() => onSelect(key)}
            style={[
              PanelTabstyles.tab,
              {
                backgroundColor: isActive ? COLORS.bgPanel : "transparent",
                borderBottomColor: isActive ? panel.color : "transparent",
              },
            ]}
          >
            <Text style={[ PanelTabstyles.tabLabel, { color: isActive ? panel.color : COLORS.inkFaint }, ]}>
              {panel.tabTitle}
            </Text>
            <View
              style={[
                PanelTabstyles.badge,
                {
                  backgroundColor: isActive
                    ? panel.color + "33"
                    : COLORS.bgPanelEdge,
                },
              ]}
            >
              <Text style={[ PanelTabstyles.badgeText, { color: isActive ? panel.color : COLORS.inkFaint }, ]}>
                {count}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
