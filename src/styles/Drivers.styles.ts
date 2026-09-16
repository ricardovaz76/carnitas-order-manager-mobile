import { COLORS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const DriversBoardstyles = StyleSheet.create({
  container: {
    padding: 16,
  },
  panel: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  table: {
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 12,
  },
  headerRow: {
    borderStyle: "solid",
    paddingVertical: 8,
  },
  headerCell: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cell: {
    fontSize: 13,
    paddingHorizontal: 8,
  },
  nameText: {
    fontWeight: "600",
  },
  nameCol: {
    flex: 2,
  },
  phoneCol: {
    flex: 2,
  },
  activeCol: {
    flex: 1,
    alignItems: "flex-start",
  },
});

export const DriversAssignMenustyles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "flex-start",
    marginTop: 6
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
  },
  buttonAssigned: {
    backgroundColor: COLORS.cooking,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  buttonUnassigned: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.cooking,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
  },
  labelAssigned: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.paper,
  },
  labelUnassigned: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.cooking,
  },
});

export const DriversListstyles = StyleSheet.create({
  menu: {
    position: "absolute",
    left: 0,
    top: 38,
    width: 224,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
    zIndex: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 12,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  divider: {
    borderTopWidth: 1,
  },
  empty: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 12,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexShrink: 1,
    minWidth: 0,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    flexShrink: 0,
  },
  rowText: {
    flexShrink: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  phone: {
    fontSize: 12,
  },
});
