import { COLORS, FONTS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const OrderTypestyles = StyleSheet.create({
  orderType: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
    color: COLORS.ink,
  },
  deliveryInfo: { marginTop: 4, gap: 2 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoText: { fontSize: 12, color: COLORS.customerInfoInk },
  mono: { fontFamily: FONTS.mono },
});
