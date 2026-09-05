import { COLORS, FONTS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const fieldStyles = StyleSheet.create({
  container: { marginBottom: 16 },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  asterisk: { fontSize: 12, color: COLORS.urgent },
  label: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: COLORS.inkFaint,
    fontFamily: FONTS.mono,
  },
  input: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: COLORS.paper,
    borderWidth: 1,
    borderColor: COLORS.paperEdge,
    color: COLORS.ink,
    fontFamily: FONTS.mono,
    fontSize: 14,
  },
  inputFocused: { borderColor: COLORS.new, borderWidth: 2 },
});
