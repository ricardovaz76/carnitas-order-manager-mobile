import { COLORS } from "@/styles/StyleTokens";
import { Platform, StyleSheet } from "react-native";

export const Ticketstyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.paper,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: COLORS.paper,
  },
});
