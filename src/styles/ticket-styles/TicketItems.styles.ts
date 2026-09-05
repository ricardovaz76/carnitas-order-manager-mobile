import { COLORS, FONTS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const TicketItemsstyles = StyleSheet.create({
  list: { alignItems: "flex-start", marginBottom: 8 },
  itemText: { fontFamily: FONTS.mono, fontSize: 14, color: COLORS.ink },
});
