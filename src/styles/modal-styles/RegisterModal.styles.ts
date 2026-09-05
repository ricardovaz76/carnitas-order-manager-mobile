import { StyleSheet } from "react-native";

export const RegisterModalstyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  cardWrapper: {
    width: "100%",
    maxWidth: 384,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
    elevation: 10,
  },
  card: {
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
  divider: {
    borderTopWidth: 1.5,
    borderStyle: "dashed",
    marginVertical: 16,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  submitText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
