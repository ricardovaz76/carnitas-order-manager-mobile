import type { Order } from "@/lib/types";
import { COLORS } from "@/styles/StyleTokens";

export interface GroupedOrders {
  new: Order[];
  inProgress: Order[];
  ready: Order[];
}

export function groupOrdersByStatus(orders: Order[]): GroupedOrders {
  return {
    new: orders.filter((order) => order.status === "new"),
    inProgress: orders.filter((order) => order.status === "in_progress"),
    ready: orders.filter((order) => order.status === "ready"),
  };
}

export const STATUS_PANELS: Record<
  keyof GroupedOrders,
  { tabTitle: string; title: string; color: string }
> = {
  new: { tabTitle: "New", title: "New Order", color: COLORS.new },
  inProgress: {
    tabTitle: "In",
    title: "In The Kitchen",
    color: COLORS.cooking,
  },
  ready: { tabTitle: "Ready", title: "Ready to Go", color: COLORS.ready },
};
