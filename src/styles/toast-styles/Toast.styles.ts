import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const Toaststyles = StyleSheet.create({
  container: { position: "absolute", left: 16, right: 16, gap: 8, zIndex: 100 },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.bgPanel,
    borderWidth: 1,
    borderColor: COLORS.bgPanelEdge,
    borderLeftWidth: 4,
  },
  icon: { marginTop: 1 },
  textContainer: { flex: 1 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  message: { fontSize: 14, color: COLORS.paper },
});
