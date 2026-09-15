import type { Delivery, DeliveryCustomerInfoRow } from "@/lib/types";

export function mapDeliveries(row: DeliveryCustomerInfoRow): Delivery {
  return {
    id: row.id,
    address: row.customer_address ?? null,
    phone: row.customer_phone ?? null,
    orderId: row.order_id,
  };
}