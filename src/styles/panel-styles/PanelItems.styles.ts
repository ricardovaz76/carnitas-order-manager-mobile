import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const PanelItemsstyles = StyleSheet.create({
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.bgPanelEdge,
  },
  emptyText: { fontSize: 12, color: COLORS.inkFaint },
  list: { gap: 16 },
});
