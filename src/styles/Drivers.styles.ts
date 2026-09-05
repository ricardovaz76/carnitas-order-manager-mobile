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
