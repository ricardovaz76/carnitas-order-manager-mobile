import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const Panelstyles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.bgPanel,
    borderWidth: 1,
    borderColor: COLORS.bgPanelEdge,
  },
});
