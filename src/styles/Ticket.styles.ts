import { COLORS, FONTS } from "@/styles/StyleTokens";
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

export const OrderTypestyles = StyleSheet.create({
  orderType: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "capitalize",
    color: COLORS.ink,
  },
  deliveryInfo: { marginTop: 4, gap: 2 },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 6 },
  infoText: { fontSize: 12, color: COLORS.customerInfoInk, flexShrink: 1, maxWidth: "90%" },
  DeliveryInfoText: { fontSize: 16, fontWeight: 600, textDecorationLine: "underline", flexShrink: 1, maxWidth: "85%" },
  mono: { fontFamily: FONTS.mono },
});

export const TicketItemsstyles = StyleSheet.create({
  list: { alignItems: "flex-start", marginBottom: 8 },
  itemText: { fontFamily: FONTS.mono, fontSize: 14, color: COLORS.ink },
});

export const TicketHeaderstyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingBottom: 8,
    marginBottom: 8,
    borderBottomWidth: 1.5,
    borderStyle: "dashed",
    borderBottomColor: COLORS.inkFaint,
  },
  conent: { flex: 1 },
  orderId: {
    fontFamily: FONTS.mono,
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: COLORS.ink,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  badgeText: { fontSize: 12, fontWeight: "700", fontFamily: FONTS.mono },
});

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
