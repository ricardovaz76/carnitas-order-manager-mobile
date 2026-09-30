import type { Order, OrderItem, OrderItemRow, OrderRow } from "@/lib/types";

export interface OrderWithItems extends OrderRow {
  order_items: OrderItemRow[];
}

export function mapOrder(row: OrderWithItems): Order {
  return {
    id: row.id,
    orderType: row.order_type,
    status: row.order_status,
    firedAt: new Date(row.created_at).getTime(),
    additionalInfo: row.additional_info,
    items: row.order_items.map(
      (item): OrderItem => ({
        id: item.id,
        item: item.item_name,
        quantity: Number(item.quantity),
        toppings: item.toppings,
      }),
    ),
  };
}
