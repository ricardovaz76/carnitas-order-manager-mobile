import { COLORS, FONTS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const TicketHeaderstyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderStyle: "dashed",
    borderBottomColor: COLORS.inkFaint,
  },
  orderId: {
    fontFamily: FONTS.mono,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: COLORS.ink,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeText: { fontSize: 12, fontWeight: "700", fontFamily: FONTS.mono },
});
