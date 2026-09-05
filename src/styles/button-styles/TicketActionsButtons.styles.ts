import { StyleSheet } from "react-native";

export const TicketActionsButtonsstyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  button: { borderRadius: 4, paddingHorizontal: 12, paddingVertical: 6 },
  pressed: { opacity: 0.7 },
  label: { fontSize: 12, fontWeight: "600" },
});
