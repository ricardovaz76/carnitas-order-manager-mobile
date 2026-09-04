import type { Database } from "@/lib/supabase/database.types";
import type { Order, OrderItem } from "@/lib/types/ordertypes";

export type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
export type OrderItemRow = Database["public"]["Tables"]["order_items"]["Row"];
export type CustomerInfoRow =
  Database["public"]["Tables"]["customer_info"]["Row"];

export interface OrderWithItems extends OrderRow {
  order_items: OrderItemRow[];
  customer_info: CustomerInfoRow | null;
}

export function mapOrder(row: OrderWithItems): Order {
  return {
    id: row.id,
    orderType: row.order_type,
    status: row.order_status,
    firedAt: new Date(row.created_at).getTime(),
    additionalInfo: row.additional_info,
    customerPhone: row.customer_info?.customer_phone ?? null,
    customerAddress: row.customer_info?.customer_address ?? null,
    items: row.order_items.map(
      (item): OrderItem => ({
        id: item.id,
        item: item.item_name,
        quantity: Number(item.quantity),
        toppings: item.toppings,
      }),
    ),
    driverId: row.customer_info?.driver_id ?? null,
  };
}
