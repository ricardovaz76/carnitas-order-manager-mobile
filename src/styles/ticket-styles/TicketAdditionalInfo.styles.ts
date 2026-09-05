import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const AdditionalInfostyles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 8,
    backgroundColor: COLORS.bgAdditionalInfo,
  },
  text: { fontSize: 12, fontStyle: "italic", color: COLORS.additionalInfoText },
});
