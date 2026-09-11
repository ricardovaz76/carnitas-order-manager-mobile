import type { Database } from "@/lib/supabase/database.types";
import type { Delivery } from "@/lib/types/delivertypes";

export type CustomerInfoRow = Database["public"]["Tables"]["customer_info"]["Row"];
type DeliveryCustomerInfoRow = Pick<
  CustomerInfoRow,
  "id" | "customer_address" | "customer_phone" | "order_id"
>;


export function mapDeliveries(row: DeliveryCustomerInfoRow): Delivery {
  return {
    id: row.id,
    address: row.customer_address ?? null,
    phone: row.customer_phone ?? null,
    orderId: row.order_id,
  };
}