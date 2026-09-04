export type Status = "new" | "in_progress" | "ready";
export const Pounds: Record<string, string> = {
  carnitas: "lb",
  chicharron: "lb",
};

export interface OrderItem {
  id: string;
  item: string;
  quantity: number;
  toppings: string | null;
}

export interface Order {
  id: number;
  orderType: "pickup" | "delivery";
  status: "new" | "in_progress" | "ready";
  firedAt: number;
  items: OrderItem[];
  additionalInfo: string | null;
  customerPhone: string | null;
  customerAddress: string | null;
  driverId: string | null;
}
