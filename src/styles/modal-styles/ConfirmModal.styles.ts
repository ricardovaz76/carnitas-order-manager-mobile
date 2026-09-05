import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const ConfirmModalstyles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(22, 23, 27, 0.6)",
    borderRadius: 8,
    zIndex: 10,
  },
  box: {
    alignItems: "center",
    gap: 16,
    borderRadius: 8,
    padding: 20,
    minWidth: 240,
    backgroundColor: COLORS.paper,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: COLORS.ink,
  },
  buttonRow: { flexDirection: "row", gap: 8, width: "100%" },
  button: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  pressed: { opacity: 0.85 },
  buttonText: { fontSize: 14, fontWeight: "600", color: COLORS.buttonText },
});
