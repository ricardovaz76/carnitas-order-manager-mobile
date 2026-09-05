import { Platform } from "react-native";

export const COLORS = {
  bgPanel: "#1E2024",
  bgPanelEdge: "#2A2C31",
  paper: "#F6F1E6",
  paperEdge: "#E8E0CD",
  ink: "#23241F",
  inkFaint: "#6B6A5F",
  new: "#E8A23D",
  cooking: "#4C7EA8",
  ready: "#4C9A6A",
  urgent: "#C4432B",
  bgAdditionalInfo: "#EFE6CE",
  additionalInfoText: "#6B5A2A",
  bgDeep: "#16171B",
  buttonText: "#F0EEE6",
  customerInfoInk: "#979795",
};

export const FONTS = {
  mono: Platform.select({
    ios: "Courier",
    android: "monospace",
    default: "monospace",
  }),
};
