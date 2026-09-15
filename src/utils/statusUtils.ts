import { type Status } from "@/lib/types";
import { COLORS } from "@/styles/StyleTokens";

export const orderStatus: Record<Status, string> = {
  new: "Start Cooking",
  in_progress: "Mark Ready",
  ready: "Mark as Complete",
};

export const statusColor: Record<Status, string> = {
  new: COLORS.new,
  in_progress: COLORS.cooking,
  ready: COLORS.ready,
};
