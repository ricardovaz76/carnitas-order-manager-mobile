import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const Perforationstyles = StyleSheet.create({
  container: {
    height: 10,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: "hidden",
  },
});

export const Sourcestyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  text: { fontSize: 12, color: COLORS.inkFaint },
});
