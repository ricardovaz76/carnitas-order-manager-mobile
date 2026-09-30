import type { CustomerInfo, CustomerInfoRow } from "@/lib/types";

export function mapCustomerInfo(row: CustomerInfoRow): CustomerInfo {
  return {
    id: row.id,
    orderId: row.order_id,
    address: row.customer_address ?? null,
    phone: row.customer_phone ?? null,
    driverId: row.driver_id ?? null,
  };
}
