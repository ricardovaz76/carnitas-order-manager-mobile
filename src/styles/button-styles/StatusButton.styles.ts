import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const StatusButtonstyles = StyleSheet.create({
  button: {
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
  },
  pressed: { opacity: 0.8 },
  label: { fontWeight: "600", fontSize: 14, color: COLORS.bgDeep },
});
