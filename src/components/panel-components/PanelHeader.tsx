import { PanelHeaderstyles } from "@/styles/panel-styles/PanelHeader.styles";
import { Text, View } from "react-native";

interface PanelHeaderProps {
  title: string;
  itemCount: number;
  color: string;
}

export default function PanelHeader({
  title,
  itemCount,
  color,
}: PanelHeaderProps) {
  return (
    <View style={PanelHeaderstyles.container}>
      <View style={PanelHeaderstyles.left}>
        <View style={[PanelHeaderstyles.dot, { backgroundColor: color }]} />
        <Text style={PanelHeaderstyles.title}>{title}</Text>
      </View>
      <View
        style={[PanelHeaderstyles.badge, { backgroundColor: color + "22" }]}
      >
        <Text style={[PanelHeaderstyles.badgeText, { color }]}>
          {itemCount}
        </Text>
      </View>
    </View>
  );
}
