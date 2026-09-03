import { COLORS, FONTS } from "@/styles/StyleTokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.bgDeep,
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 384,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: COLORS.bgPanel,
    borderWidth: 1,
    borderColor: COLORS.bgPanelEdge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgPanelEdge,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.buttonText,
  },
  form: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  requiredText: {
    fontSize: 12,
    marginBottom: 16,
    color: COLORS.urgent,
    fontFamily: FONTS.mono,
  },
  divider: {
    borderTopWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.bgPanelEdge,
    marginTop: 12,
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: COLORS.new,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    fontWeight: "600",
    fontSize: 14,
    color: COLORS.bgDeep,
  },
});
