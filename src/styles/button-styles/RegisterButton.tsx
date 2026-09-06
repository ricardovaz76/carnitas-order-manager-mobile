import { StyleSheet } from "react-native";

export const RegisterButtonstyles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
