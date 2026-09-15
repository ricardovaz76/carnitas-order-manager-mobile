import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const CopyButtonstyles = StyleSheet.create({
  button: {
    padding: 3,
    borderRadius: 4,
  },
  buttonPressed: {
    opacity: 0.8,
  },
});

export const ToggleStatusstyles = StyleSheet.create({
  track: {
    width: 40,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    justifyContent: "center",
  },
  thumb: {
    position: "absolute",
    width: 16,
    height: 16,
    borderRadius: 8,
    top: 2,
    left: 2,
  },
});

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

export const StatusButtonstyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  pressed: { opacity: 0.8 },
  label: { fontWeight: "600", fontSize: 14, color: COLORS.paper },
});

export const TicketActionsButtonsstyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  button: { borderRadius: 4, paddingHorizontal: 12, paddingVertical: 6 },
  pressed: { opacity: 0.7 },
  label: { fontSize: 12, fontWeight: "600" },
});

export const CompleteButtonstyles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: COLORS.ready,
    marginTop: 8,
  },
  text: {
    color: COLORS.paper,
    fontWeight: "600",
    fontSize: 14,
  },
});