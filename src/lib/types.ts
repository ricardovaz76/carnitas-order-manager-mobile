import type { Database } from "@/lib/supabase/database.types";

// =========================== Order Types ====================================
export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];

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

// =========================== Driver Types ====================================
export type DeliveryDriversRow = Database["public"]["Tables"]["delivery_drivers"]["Row"];
export type UserRows = Database["public"]["Tables"]["users"]["Row"];

export interface Driver {
  id: string;
  name: string;
  phone: string;
  active: boolean;
}


// =========================== Delivery Types ====================================
export interface Delivery {
  id: string;
  address: string | null;
  phone: string | null;
  orderId: number;
}

// =========================== Customer Types ====================================
export type CustomerInfoRow = Database["public"]["Tables"]["customer_info"]["Row"];
export type DeliveryCustomerInfoRow = Pick<
  CustomerInfoRow,
  "id" | "customer_address" | "customer_phone" | "order_id"
>;